class Admins::DepartmentApplyQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    status = params[:status]

    applies = ApplyAddDepartment.where(status: status) if status.present?

    # 关键字模糊查询
    keyword = params[:keyword].to_s.strip
    if keyword.present?
      applies = applies.where('name LIKE :keyword', keyword: "%#{keyword}%")
    end

    custom_sort(applies, params[:sort_by], params[:sort_direction])
  end
end