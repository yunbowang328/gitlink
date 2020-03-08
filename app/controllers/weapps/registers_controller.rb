class Weapps::RegistersController < Weapps::BaseController
  before_action :require_wechat_login!

  def create
    # 查询验证码是否正确;type只可能是1或者8
    type = phone_mail_type(params[:login].strip)
    code = params[:code].strip

    if type == 1
      uid_logger("start register by phone:  type is #{type}")
      pre = 'p'
      email = nil
      phone = params[:login]
      verifi_code = VerificationCode.where(phone: phone, code: code, code_type: 1).last
    else
      uid_logger("start register by email:  type is #{type}")
      pre = 'm'
      email = params[:login]
      phone = nil
      verifi_code = VerificationCode.where(email: email, code: code, code_type: 8).last
    end
    uid_logger("start register:  verifi_code is #{verifi_code}, code is #{code}, time is #{Time.now.to_i - verifi_code.try(:created_at).to_i}")
    # check_code = (verifi_code.try(:code) == code.strip && (Time.now.to_i - verifi_code.created_at.to_i) <= 10*60)
    # todo 上线前请删除万能验证码"513231"
    unless code == "513231" && request.subdomain == "test-newweb"
      return render_error('验证码不正确') if verifi_code.try(:code) != code.strip
      return render_error('验证码已失效') if !verifi_code&.effective?
    end

    login = User.generate_login(pre)
    @user = User.new(admin: false, login: login, mail: email, phone: phone, type: 'User')
    @user.password = params[:password]
    # 现在因为是验证码，所以在注册的时候就可以激活
    @user.activate
    # 必须要用save操作，密码的保存是在users中
    ActiveRecord::Base.transaction do
      @user.save!
      UserExtension.create!(user_id: @user.id)
      # 绑定微信号
      OpenUsers::Wechat.create!(user: @user, uid: session_unionid)

      # 注册完成，手机号或邮箱想可以奖励500金币
      RewardGradeService.call(
        @user,
        container_id: @user.id,
        container_type: pre == 'p' ? 'Phone' : 'Mail',
        score: 500
      )
    end
    successful_authentication(@user)
    # session[:user_id] = @user.id
    session[:"#{default_yun_session}"] = @user.id

    # render_ok(user_id: @user.id)
  end

  private

  # 1 手机类型；0 邮箱类型
  # 注意新版的login是自动名生成的
  def phone_mail_type value
    value =~ /^1\d{10}$/ ? 1 : 0
  end
end