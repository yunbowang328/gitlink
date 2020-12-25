class Admins::LaboratoriesController < Admins::BaseController
  def index
    default_sort('id', 'desc')

    laboratories = Admins::LaboratoryQuery.call(params)
    @laboratories = paginate laboratories.preload(:laboratory_users)
  end

  def new 
    respond_to do |format|
      format.js
    end
  end

  def create
    Admins::CreateLaboratoryService.call(create_params)
    render_ok
  rescue Admins::CreateLaboratoryService::Error => ex
    render_error(ex.message)
  end

  def destroy
    current_laboratory.destroy!

    render_delete_success
  end

  def shixuns_for_select
    except_shixun_ids = current_laboratory.laboratory_shixuns.pluck(:shixun_id)

    shixuns = Shixun.where.not(id: except_shixun_ids)

    keyword = params[:keyword].to_s.strip
    if keyword.present?
      like_sql = 'shixuns.name LIKE :keyword OR CONCAT(users.lastname, users.firstname) LIKE :keyword '\
                 'OR mirror_repositories.name LIKE :keyword'
      shixuns = shixuns.joins(:user, :mirror_repositories).where(like_sql, keyword: "%#{keyword}%")
    end

    @count = shixuns.count
    @shixuns = paginate(shixuns.includes(:user))
  end

  def subjects_for_select
    except_subject_ids = current_laboratory.laboratory_subjects.pluck(:subject_id)

    subjects = Subject.where.not(id: except_subject_ids)

    keyword = params[:keyword].to_s.strip
    if keyword.present?
      like_sql = 'subjects.name LIKE :keyword OR CONCAT(users.lastname, users.firstname) LIKE :keyword'
      subjects = subjects.joins(:user).where(like_sql, keyword: "%#{keyword}%")
    end

    @count = subjects.count
    @subjects = paginate(subjects.includes(:user))
  end

  def synchronize_user
    school = current_laboratory.school
    users = User.joins(:user_extension).where(user_extensions: {school_id: school.id})
    users.update_all(laboratory_id: current_laboratory.id)
  end

  def update_sync_course
    current_laboratory.update!(sync_course: !current_laboratory.sync_course)
    @laboratory = current_laboratory
  end

  def update
    @laboratory = current_laboratory
    unless @laboratory.update_attributes!(setting_params)
      redirect_to admins_laboratories_path
      flash[:danger] = "更新失败"
    end
  end

  private

  def current_laboratory
    @_current_laboratory ||= Laboratory.find(params[:id])
  end

  def create_params
    params.permit(:school_id)
  end

  def setting_params
    params.permit(:sync_course, :sync_subject, :sync_shixun)
  end
end
