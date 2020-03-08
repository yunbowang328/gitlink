class Weapps::HomesController < Weapps::BaseController
  before_action :require_login

  def show
    # banner
    @carousels = WeappSettings::Carousel.only_online
    # 广告
    @advert = WeappSettings::Advert.only_online.first

    # 我的课堂
    @category = params[:category] && ["manage", "study"].include?(params[:category]) ? params[:category] : (current_user.is_teacher? ? "manage" : "study")
    @courses = case @category
              when 'study' then
                current_user.as_student_courses.started
              when 'manage' then
                current_user.manage_courses
               end
    @courses = @courses.not_deleted.not_excellent
    @courses = @courses.where(id: current_laboratory.all_courses)
    @course_count = @courses.count
    order_str = "course_members.sticky=1 desc, course_members.sticky_time desc, courses.created_at desc"
    @courses = paginate(@courses.order(order_str).includes(:teacher, :school))
    @user = current_user
  end
end