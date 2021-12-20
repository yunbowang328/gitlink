class Admins::UserQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_on, :last_login_on, :experience, :grade, default_by: :created_on, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    users = User.where(type: 'User')

    # 云上实验室
    users = users.where(laboratory_id: params[:laboratory_id]) if params[:laboratory_id].present?

    # 状态
    status = params[:status]
    users = users.where(status: status) if status.present?

    # 职业
    users = users.joins(:user_extension).where(user_extensions: { identity: params[:identity] }) if params[:identity].present?

    # 授权类型
    if params[:auto_trial].present?
      users = users.joins(user_extension: :school).where(schools: { auto_users_trial: params[:auto_trial].to_i == 1 })
    end

    # 关键字检索
    keyword = params[:keyword].to_s.strip.presence
    if keyword
      sql = 'CONCAT(lastname, firstname) LIKE :keyword OR login LIKE :keyword OR mail LIKE :keyword OR phone LIKE :keyword OR nickname LIKE :keyword '
      users = users.where(sql, keyword: "%#{keyword}%")
    end

    # 姓名
    name = params[:name].to_s.strip.presence
    if name.present?
      users = users.where('CONCAT(lastname, firstname) LIKE :name', name: "%#{name}%")
    end

    # 单位ID
    users = users.joins(:user_extension).where(user_extensions: { school_id: params[:school_id] }) if params[:school_id].present?

    # 学校名称
    school_name = params[:school_name].to_s.strip.presence
    users = users.joins(user_extension: :school).where('schools.name LIKE ?', "%#{school_name}%") if school_name

    custom_sort(users, params[:sort_by], params[:sort_direction])
  end
end