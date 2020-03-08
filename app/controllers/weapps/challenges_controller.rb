class Weapps::ChallengesController < Weapps::BaseController
  before_action :require_login
  before_action :set_challenge

  def is_play
    # 关卡有展示效果 || 选择题 || jupyter实训 || vnc || 隐藏代码窗口 || html+css实训
    # @challenge.show_type != -1 || @challenge.st == 1 || @shixun.is_jupyter? || @shixun.vnc ||
    #     @shixun.hide_code? || (@shixun.small_mirror_name & ["Css", "Html", "Web"]).present?
    play = @shixun.is_jupyter? || @shixun.vnc ||
        @shixun.hide_code? || (@shixun.small_mirror_name & ["Css", "Html", "Web"]).present?

    if play
      normal_status(-5, "该关卡暂不支持小程序")
    else
      render_ok
    end
  end


  private
  def set_challenge
    @challenge = Challenge.find_by!(id: params[:id])
    @shixun = @challenge.shixun
  end

end
