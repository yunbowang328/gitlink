class Projects::Webhooks::CreateForm < BaseForm
  attr_accessor :type, :url, :http_method, :content_type, :secret, :events, :active, :branch_filter

  validates :url, format: { with: URI::regexp(%w[http https]), message: "请输入正确的地址" }
  validates :active, inclusion: {in: [true, false]}
  validates :http_method, inclusion: { in: %w(POST GET), message: "请输入正确的请求方式"}
  validates :content_type, inclusion: { in: %w(json form), message: "请输入正确的Content Type"}
end