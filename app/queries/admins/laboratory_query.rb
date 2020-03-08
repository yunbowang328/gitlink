class Admins::LaboratoryQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :id, default_by: :id, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    laboratories = Laboratory.all

    keyword = strip_param(:keyword)
    if keyword.present?
      like_sql = 'schools.name LIKE :keyword OR laboratories.identifier LIKE :keyword'
      laboratories = laboratories.left_joins(:school).where(like_sql, keyword: "%#{keyword}%")
    end

    custom_sort laboratories, params[:sort_by], params[:sort_direction]
  end
end