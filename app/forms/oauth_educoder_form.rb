class OauthEducoderForm
  include ActiveModel::Model

  attr_accessor :login, :token, :callback_url

  validates :login, presence: true
  validates :token, presence: true
  validates :callback_url, presence: true

  validate :check_callback_url!
  validate :check_auth!

  def check_auth!
    Rails.logger.info "====login: #{login} ====token: #{token} ==== callback_url: #{callback_url}"
    secret = OauthEducoder.config[:access_key_secret]
    Rails.logger.info "==== secret: #{secret}"
    before_raw_pay_load = Digest::SHA1.hexdigest("#{login}#{secret}#{Time.now.to_i/60-1}")
    now_raw_pay_load = Digest::SHA1.hexdigest("#{login}#{secret}#{Time.now.to_i/60}")

    Rails.logger.info "==== before_raw_pay_load: #{before_raw_pay_load}"
    Rails.logger.info "==== now_raw_pay_load: #{now_raw_pay_load}"
    Rails.logger.info "==== token: #{token}"

    if token != now_raw_pay_load && token != before_raw_pay_load
      raise '你的请求无效值无效.'
    end
  end

  def check_callback_url!
    request_host = URI.parse(callback_url).host
    callback_url = OauthEducoder.config[:callback_url_host]

    raise 'callback_url参数无效.' if request_host != callback_url
  end

end
