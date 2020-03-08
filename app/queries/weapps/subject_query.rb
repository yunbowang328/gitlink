class Weapps::SubjectQuery < ApplicationQuery
  include CustomSortable
  attr_reader :params

  def initialize(current_laboratory, params)
    @current_laboratory = current_laboratory
    @params = params
  end

  def call
    subjects = @current_laboratory.subjects.unhidden.publiced.show_moblied

    # 课程体系的过滤
    if params[:sub_discipline_id].present?
      subjects = subjects.joins(:sub_disciplines).where(sub_disciplines: {id: params[:sub_discipline_id]})
    elsif params[:discipline_id].present?
      subjects = subjects.joins(:sub_disciplines).where(sub_disciplines: {discipline_id: params[:discipline_id]})
    else
      subjects = subjects.joins(:sub_discipline_containers).where(sub_discipline_containers: {container_type: "Subject"})
    end

    subjects = subjects.left_joins(:shixuns).select('subjects.id, subjects.name, subjects.excellent, subjects.stages_count, subjects.status, subjects.homepage_show,
                                                     subjects.shixuns_count, subjects.updated_at, IFNULL(sum(shixuns.myshixuns_count), 0) myshixuns_count')
                                            .group('subjects.id').order("subjects.homepage_show #{sort_type}, #{order_type} #{sort_type}")
    subjects
  end

  private

  def order_type
    params[:order] || "updated_at"
  end

  def sort_type
    params[:sort] || "desc"
  end
end