class Admins::UsersController < Admins::BaseController
  before_action :finder_user, except: [:index]

  def index
    params[:sort_by] = params[:sort_by].presence || 'created_on'
    params[:sort_direction] = params[:sort_direction].presence || 'desc'

    users = Admins::UserQuery.call(params)
    @users = paginate users.includes(:user_extension, projects: :members)
  end

  def edit
  end

  def update
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
    @user.destroy!
    Gitea::User::DeleteService.call(@user.login)

    render_delete_success
  end

  def lock
    @user.lock!

    render_ok
  end

  def unlock
    @user.activate!

    render_ok
  end

  def reward_grade
    return render_unprocessable_entity('金币数量必须大于0') if params[:grade].to_i <= 0

    RewardGradeService.call(@user, container_id: @user.id, container_type: 'Feedback', score: params[:grade].to_i, not_unique: true)

    render_ok(grade: @user.grade)
  end

  def reset_login_times
    @user.reset_login_times!

    render_ok
  end

  private

  def finder_user
    @user = User.find(params[:id])
  end

  def update_params
    params.require(:user).permit(%i[lastname nickname gender identity technical_title student_id is_shixun_marker
                                    mail phone location location_city school_id department_id admin business is_test
                                    password professional_certification authentication login])
  end
end
