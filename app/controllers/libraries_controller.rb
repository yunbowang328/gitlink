class LibrariesController < ApplicationController
  include PaginateHelper

  before_action :require_login, :check_auth, except: %i[index show]
  before_action :check_account,  except: %i[index show]
  after_action :increment_visit_count, only: [:show, :edit, :update]
  helper_method :current_library, :library_manageable?

  def index
    libraries = current_laboratory.libraries

    libraries =
      if User.current&.logged? && params[:type] == 'mine'
        libraries.where(user_id: current_user.id).order(created_at: :desc)
      else
        libraries.where(status: :published).order(visited_count: :desc)
      end

    keyword = params[:keyword].to_s.strip
    if keyword.present?
      libraries = libraries.where('title LIKE :keyword OR author_name LIKE :keyword OR author_school_name LIKE :keyword',
                                  keyword: "%#{keyword}%")
    end

    @count = libraries.count
    @libraries = paginate libraries.includes(:library_tags, user: :user_extension)

    ids = @libraries.map(&:id)
    @download_count_map = Attachment.where(container_type: 'Library', container_id: ids)
                            .group(:container_id).sum(:downloads)
  end

  def show
    unless current_library.published? || library_manageable?(current_library)
      return render_forbidden
    end
  end

  def create
    library = current_user.libraries.new
    Libraries::SaveService.call(library, current_user, save_params)
    render_ok({id: library.id})
  rescue Libraries::SaveService::Error => ex
    render_error(ex.message)
  end

  def update
    return render_forbidden unless library_manageable?(current_library)

    Libraries::SaveService.call(current_library, current_user, save_params)
    render_ok({id: current_library.id})
  rescue Libraries::SaveService::Error => ex
    render_error(ex.message)
  end

  def destroy
    if admin_or_business?
      current_library.destroy!
    elsif current_library.user_id == current_user&.id
      unless current_library.pending?
        render_error('只有草稿才能删除')
        return
      end

      current_library.destroy!
    else
      render_forbidden
      return
    end

    render_ok
  end

  private

  def current_library
    @_current_library ||= Library.find(params[:id])
  end

  def library_manageable?(library)
    current_user&.id == library.user_id || admin_or_business?
  end

  def increment_visit_count
    current_library.increment_visited_count! if current_library && current_library.id
  end

  def save_params
    params.permit(:title, :content, :author_name, :author_school_name,
                  :cover_id, :publish, attachment_ids: [], tag_ids: [])
  end
end