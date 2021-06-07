class Admins::UsersController < Admins::BaseController
  def index
    params[:sort_by] = params[:sort_by].presence || 'created_on'
    params[:sort_direction] = params[:sort_direction].presence || 'desc'

    users = Admins::UserQuery.call(params)
    @users = paginate users.includes(:user_extension, projects: :members)
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

  def new
    @user = User.new
  end
  
  def create
    logger.info "---validate_create_params: #{validate_create_params}"
    Users::AdminCreateUserForm.new(validate_create_params).validate!

    user = User.new(create_params)
    user.type = 'User'
    user.login = User.generate_login("p")
    ActiveRecord::Base.transaction do
      if user.save!
        UserExtension.create!(user_id: user.id)
        interactor = Gitea::RegisterInteractor.call({username: user.login, email: user.mail, password: create_params[:password]})
        if interactor.success?
          gitea_user = interactor.result
          result = Gitea::User::GenerateTokenService.call(user.login, create_params[:password])
          user.gitea_token = result['sha1']
          user.gitea_uid = gitea_user[:body]['id']
          user.save!
        end
      end
    end

    flash[:success] = '保存成功'
    redirect_to admins_users_path
  rescue ActiveRecord::RecordInvalid => e
    logger.info "------------ #{e.message}"
    puts e.message
    flash.now[:danger] = e.message
    render 'new'
  rescue Exception => ex
    flash.now[:danger] = ex.message
    render 'new'
  end


  private
  def update_params
    params.require(:user).permit(%i[lastname nickname gender identity technical_title student_id is_shixun_marker
                                    mail phone location location_city school_id department_id admin business is_test
                                    password professional_certification authentication])
  end

  def create_params
    params.require(:user).permit(%i[nickname gender mail phone location location_city password professional_certification])
  end

  def validate_create_params
    create_params.slice(:mail, :phone, :password)
  end
end
