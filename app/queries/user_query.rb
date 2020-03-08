class UserQuery < ApplicationQuery
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def call
    users = User.where(type: 'User')

    # 真实姓名
    if name = strip_param(:name)
      users = users.where('LOWER(CONCAT(users.lastname, users.firstname)) LIKE ?', "%#{name.downcase}%")
    end

    # 单位名称
    if school = strip_param(:school)
      users = users.joins(user_extension: :school).where('schools.name LIKE ?', "%#{school}%")
    end

    # 职业
    if (identity = strip_param(:identity)) && UserExtension.identities.keys.include?(identity)
      users = users.joins(:user_extension).where(user_extensions: { identity: identity })
    end

    users
  end
end