class Admins::SchoolsController < Admins::BaseController
  def index
    params[:sort_by] ||= 'created_at'
    params[:sort_direction] ||= 'desc'

    schools = Admins::SchoolQuery.call(params)
    @total_count =  schools.map(&:id).count
    @schools = paginate schools

    school_ids = @schools.map(&:id)
    @department_count = Department.where(school_id: school_ids).group(:school_id).count
  end

  def destroy
    users = User.joins(:user_extension).where(user_extensions: { school_id: current_school.id })

    ActiveRecord::Base.transaction do
      users.update_all(profile_completed: false)
      current_school.destroy!
    end

    render_delete_success
  end

  private

  def current_school
    @_current_school ||= School.find(params[:id])
  end
end