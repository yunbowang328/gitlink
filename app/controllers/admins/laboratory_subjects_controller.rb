class Admins::LaboratorySubjectsController < Admins::BaseController
  helper_method :current_laboratory, :current_laboratory_subject

  def index
    laboratory_subjects = Admins::LaboratorySubjectQuery.call(current_laboratory, params)

    includes_tables = { subject: [:repertoire, :subject_level_system, user: {user_extension: :school}] }
    @laboratory_subjects = paginate(laboratory_subjects.includes(includes_tables))
  end

  def create
    subject = Subject.find(params[:subject_id])
    Subjects::CopySubjectService.call(subject, current_user, current_laboratory)
    render_ok
  end

  def destroy
    return render_js_error('不能删除自建课程', type: :notify) if current_laboratory_subject.ownership?

    ActiveRecord::Base.transaction do
      current_subject = current_laboratory_subject.subject
      # 实训软删除，并解除与子站的关联
      current_laboratory.laboratory_shixuns.where(shixun_id: current_subject.shixuns).destroy_all
      current_subject.shixuns.update_all(status: -1)
      current_subject.destroy!

      render_delete_success
    end
  end


  def homepage
    current_laboratory_subject.update!(homepage: true)
    render_ok
  end

  def cancel_homepage
    current_laboratory_subject.update!(homepage: false)
    render_ok
  end

  private

  def current_laboratory
    @_current_laboratory ||= Laboratory.find(params[:laboratory_id])
  end

  def current_laboratory_subject
    @_current_laboratory_subject ||= current_laboratory.laboratory_subjects.find(params[:id])
  end
end