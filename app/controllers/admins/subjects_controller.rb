class Admins::SubjectsController < Admins::BaseController
  def index
    default_sort('created_at', 'desc')

    subjects = Admins::SubjectQuery.call(params)
    @subjects = paginate subjects.includes(user: { user_extension: :school })
  end

  def edit
    @subject = current_subject
  end

  def update
    current_subject.update!(update_params)

    flash[:success] = '保存成功'
    redirect_to admins_subject_settings_path
  end

  def destroy
    current_subject.destroy!

    render_delete_success
  end

  # 隐藏
  def hide
    current_subject.update!(hidden: true)
    render_ok
  end

  # 展示
  def cancel_hide
    current_subject.update!(hidden: false)
    render_ok
  end

  # 设为主页展示
  def homepage_show
    current_subject.update!(homepage_show: true)
    render_ok
  end

  # 取消主页展示
  def cancel_homepage_show
    current_subject.update!(homepage_show: false)
    render_ok
  end

  # 设为金课
  def excellent
    current_subject.update!(excellent: true, public: 2)
    render_ok
  end

  # 取消金课
  def cancel_excellent
    current_subject.update!(excellent: false)
    render_ok
  end

  private

  def current_subject
    @_current_subject ||= Subject.find(params[:id])
  end

  def update_params
    params.require(:subject).permit(:repertoire_id, :subject_level_system_id, :student_count)
  end
end