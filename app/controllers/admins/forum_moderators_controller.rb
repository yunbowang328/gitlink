class Admins::ForumModeratorsController < Admins::BaseController
  before_action :set_forum

  def new

  end

  def create
    user_ids = params[:member_ids]
    is_children = @forum_section.parent_id.present?
    if user_ids.present? && user_ids.size > 0
      user_ids = user_ids.reject(&:blank?)
      user_ids.each do |user_id|
        unless ForumModerator.exists?(user_id: user_id, forum_section_id: @forum_section.id)
          @forum_section.forum_moderators.create!(user_id: user_id, is_children: is_children)
        end
        unless is_children
          children_forum_sections = @forum_section.children_forum
          children_forum_sections.each do |children|
            unless ForumModerator.exists?(user_id: user_id, forum_section_id: children.id)
              children.forum_moderators.create!(user_id: user_id, is_children: true)
            end
          end
        end
      end

      @forum_moderators = @forum_section.forum_moderators
      @forum_status = 1
    else
      @forum_status = -1
    end
  end

  def destroy
    @forum_moderator = ForumModerator.find_by_id(params[:id])
    @forum_moderator.destroy
  end

  def search_user
    return_html = ""
    user_name = params[:user_name].strip
    if user_name.present?
      users = User.where("( LOWER(login) LIKE ? or LOWER(concat(lastname, firstname)) LIKE ? or LOWER(mail) LIKE ? )",
                         "%#{user_name}%","%#{user_name}%","%#{user_name}%")
      users.each do |u|
        check_html = "<input id='check_user_#{u.login}' class='magic-checkbox' type='checkbox' name='member_ids[]' value=""#{u.id}"" checked='false'><label for='check_user_#{u.login}'>#{u.try(:show_name)}</label>"
        return_html << check_html
      end
    end
    render json: {html: return_html }
  end

  private

  def set_forum
    @forum_section = ForumSection.find_by_id(params[:forum_section_id])
  end

end