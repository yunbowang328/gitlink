class Ci::CreateCloudAccountForm
  include ActiveModel::Model

  attr_accessor :ip_num, :account, :secret

  # validates :project_id, :account, :secret, presence: true
  validates :account, :secret, presence: true
  validates :ip_num, presence: true, format: { with: CustomRegexp::IP, multiline: true, message: 'IP 地址格式不对' }

end
