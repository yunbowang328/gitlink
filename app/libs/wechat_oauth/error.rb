class WechatOauth::Error < StandardError
  attr_reader :code

  def initialize(code, msg)
    super(msg)
    @code = code
  end

  def message
    I18n.t("oauth.wechat.#{code}")
  rescue I18n::MissingTranslationData
    super
  end
end