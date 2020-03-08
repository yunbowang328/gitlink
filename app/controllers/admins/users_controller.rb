class Admins::UsersController < Admins::BaseController
  def index
    params[:sort_by] = params[:sort_by].presence || 'created_on'
    params[:sort_direction] = params[:sort_direction].presence || 'desc'

    users = Admins::UserQuery.call(params)
    @users = paginate users.includes(user_extension: :school)
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    Admins::UpdateUserService.call(@user, update_params)
    flash[:success] = '保存成功'
    redirect_to edit_admins_user_path(@user)
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = '保存失败'
    render 'edit'
  rescue Admins::UpdateUserService::Error => ex
    flash.now[:danger] = ex.message
    render 'edit'
  end

  def destroy
    User.find(params[:id]).destroy!

    render_delete_success
  end

  def lock
    User.find(params[:id]).lock!

    render_ok
  end

  def unlock
    User.find(params[:id]).activate!

    render_ok
  end

  def reward_grade
    user = User.find(params[:user_id])
    return render_unprocessable_entity('金币数量必须大于0') if params[:grade].to_i <= 0

    RewardGradeService.call(user, container_id: user.id, container_type: 'Feedback', score: params[:grade].to_i, not_unique: true)

    render_ok(grade: user.grade)
  end

  def reset_login_times
    User.find(params[:id]).reset_login_times!

    render_ok
  end

  private

  def update_params
    params.require(:user).permit(%i[lastname nickname gender identity technical_title student_id is_shixun_marker
                                    mail phone location location_city school_id department_id admin business is_test
                                    password professional_certification authentication])
  end
end