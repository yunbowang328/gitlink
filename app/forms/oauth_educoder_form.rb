class OauthEducoderForm
  include ActiveModel::Model

  attr_accessor :login, :oauth_token, :callback_url, :raw_pay_load

  validates :login, presence: true
  validates :oauth_token, presence: true
  validates :callback_url, presence: true
  validates :raw_pay_load, presence: true

  validate :check_oauth_token!
  validate :check_callback_url!

  def checke_raw_pay_load!
    secret = OauthEducoder.config[:access_key_secret]

    before_raw_pay_load = "#{login}#{secret}#{Time.now.to_i/60-1}"
    now_raw_pay_load = "#{login}#{secret}#{Time.now.to_i/60-1}"

    if raw_pay_load != Digest::SHA1.hexdigest(now_raw_pay_load) || raw_pay_load != Digest::SHA1.hexdigest(before_raw_pay_load)
      raise '你的请求无效值无效.'
    end
  end

  def checke_raw_pay_load!
    secret = OauthEducoder.config[:access_key_secret]
    raise 'oauth_token值无效.' if oauth_token != secret
  end

  def check_callback_url!
    request_host = URI.parse(callback_url).host
    callback_url = OauthEducoder.config[:callback_url_host]

    raise 'callback_url参数无效.' if request_host != callback_url
  end

end
