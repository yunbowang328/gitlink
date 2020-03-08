module GraduationWorksHelper
  include GraduationTasksHelper

  # 作品最终成绩
  # 参数： work作品， current_user用户，course_identity用户在课堂的身份
  def work_final_score work, current_user, course_identity
    work_score =
        if work.work_score.nil?
          "--"
        else
          if work.check_score_power? current_user, course_identity
            format("%.1f", work.work_score < 0 ? 0 : work.work_score.round(1))
          else
            "**"
          end
        end
    # work_score 最终成绩； late_penalty 迟交扣分； final_score 最终评分
    {username: work.user.full_name, login: work.user.login, work_score: work_score, final_score: work.final_score}
  end
end
