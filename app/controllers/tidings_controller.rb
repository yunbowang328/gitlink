class TidingsController < ApplicationController
  include PaginateHelper

  before_action :require_login
  after_action :update_onclick_time!, only: [:index]

  def index
    tidings = current_user.tidings.visible
    @onclick_time = current_user.click_time

    tiding_types =
      case params[:type]
      when 'notice'      then 'System'
      when 'apply'       then 'Apply'
      when 'course'      then %w(HomeworkCommon Exercise Poll GraduationTask GraduationTopic)
      when 'project'     then 'Project'
      when 'interaction' then %w(Comment Mentioned Praise Fan)
      when 'project_package' then %w(Created Destroyed Bidding BiddingEnd BiddingWon BiddingLost)
      end
    tidings = tidings.where(tiding_type: tiding_types) if tiding_types.present?

    tidings = tidings.where(container_type: 'JoinCourse', status: 0) if params[:type] == 'course_apply'
    # @course_apply_count = tidings.where("created_at > '#{@onclick_time}'").where(container_type: 'JoinCourse', status: 0).count
    @course_apply_count = tidings.where(container_type: 'JoinCourse', status: 0).count

    tidings = tidings.where(container_type: 'ProjectPackage') if params[:type] == 'project_package'

    @count   = tidings.count
    @tidings = paginate(tidings.order(created_at: :desc), per_page: 10)
  end

  private

  def update_onclick_time!
    current_user.onclick_time.touch(:onclick_time)
  end
end
