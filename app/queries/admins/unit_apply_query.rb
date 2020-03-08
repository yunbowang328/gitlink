class Admins::UnitApplyQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    unit_applies = ApplyAddSchool.where(status:0)

    # 关键字模糊查询
    keyword = params[:keyword].to_s.strip
    if keyword.present?
      unit_applies = unit_applies.where("name like ?","%#{keyword}%")
    end

    custom_sort(unit_applies, params[:sort_by], params[:sort_direction])
  end
end

