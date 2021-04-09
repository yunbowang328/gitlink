class Users::SyncGiteaForm 
  include ActiveModel::Model
  
  attr_accessor :login, :password, :email, :user

  validates :login, :password, :email, presence: true

  validate :check_user, :check_password

  def check_user 
    @user = User.find_by(login: login)
    raise '用户不存在.' unless user.present?
  end

  def check_password 
    raise '用户密码错误.' unless user.check_password?(password)
  end
end