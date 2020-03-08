class Admins::SubjectSettingsController < Admins::BaseController
  def index
    default_sort('created_at', 'desc')

    subjects = Admins::SubjectQuery.call(params)
    @sub_disciplines = SubDiscipline.where(subject: 1).pluck(:name,:id)
    @subjects = paginate subjects.includes(:repertoire, :subject_level_system, :sub_disciplines)
  end

  def update
    sub_discipline_ids = params[:sub_disciplines] || []
    sub_ids = sub_discipline_ids.reject(&:blank?).map(&:to_i)
    old_sub_ids = current_subject.sub_discipline_containers.pluck(:sub_discipline_id)
    new_ids = sub_ids - old_sub_ids
    delete_ids = old_sub_ids - sub_ids
    sub_params = new_ids.map{|sub| {sub_discipline_id: sub}}
    ActiveRecord::Base.transaction do
      current_subject.sub_discipline_containers.where(sub_discipline_id: delete_ids).destroy_all
      current_subject.sub_discipline_containers.create!(sub_params)
    end
  end

  def update_mobile_show
    subject = Subject.find(params[:subject_id])
    subject.update_attributes(:show_mobile => params[:show_mobile])
  end

  private

  def current_subject
    @_current_subject ||= Subject.find(params[:id])
  end

end