class Gitea::UserForm
  include ActiveModel::Model
  EMAIL_REGEX = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_\-.]+(\.[a-zA-Z0-9_-]+)+$/

  include ActiveModel::Model
  attr_accessor :username, :email, :password

  validates :username, presence: true
  # validates :email, presence: true, format: { with: EMAIL_REGEX, multiline: true }
  validates :email, presence: true

  validates :password, presence: true

  # validate :check_username, :check_email

  attr_reader :record

  def persist
    @record = id ? User.find(id) : User.new

    if valid?
      @record.attributes = attributes.except(:password_confirmation, :id)
      @record.save!
      true
    else
      false
    end
  end

  private
  def check_username
    Rails.logger.info("#######_______username________#################{username}")
    # errors.add(:login, :exist)
    raise "#{username} 已使用." if User.exists?(login: username.strip)
  end

  def check_email
    raise "#{email} 已使用." if User.exists?(mail: email.strip)
  end
end
