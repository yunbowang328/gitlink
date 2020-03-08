class Users::ProjectService
  include CustomSortable

  sort_columns :created_on, :updated_on, default_by: :updated_on, default_direction: :desc

  attr_reader :user, :params

  def initialize(user, params)
    @user   = user
    @params = params
  end

  def call
    projects = Project.joins(members: :member_roles).where(members: { user_id: user.id })

    keyword = params[:keyword].to_s.strip
    projects = projects.where('name LIKE ?', "%#{keyword}%") if keyword.present?

    projects = projects.where.not(status: 9)  # without archived status

    projects = category_filter(projects)
    projects = status_filter(projects)

    custom_sort(projects, params[:sort_by], params[:sort_direction])
  end

  private

  def category_filter(relations)
    roles = case params[:category]
            when 'study'  then [4, 5]
            when 'manage' then 3
            else [3, 4, 5]
            end
    relations.where(member_roles: { role_id: roles })
  end

  def status_filter(relations)
    return relations unless self_or_admin?

    case params[:status]
    when 'publicly' then relations.where(is_public: true)
    when 'personal' then relations.where(is_public: false)
    else relations
    end
  end

  def self_or_admin?
    User.current.id == user.id || User.current.admin?
  end
end