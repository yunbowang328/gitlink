class Admins::DepartmentQuery < ApplicationQuery
  include CustomSortable

  attr_reader :params

  sort_columns :created_at, default_by: :created_at, default_direction: :desc

  def initialize(params)
    @params = params
  end

  def call
    departments = Department.where(is_auth: true).without_deleted

    keyword = params[:keyword].to_s.strip
    if keyword.present?
      departments = departments.joins(:school)
                      .where('schools.name LIKE :keyword OR departments.name LIKE :keyword', keyword: "%#{keyword}%")
    end

    if params[:with_member].to_s == 'true'
      subquery = DepartmentMember.where('department_id = departments.id').select('1 AS one').to_sql
      departments = departments.where("EXISTS(#{subquery})")
    end

    if params[:with_identifier].to_s == 'true'
      departments = departments.where.not(identifier: nil).where.not(identifier: '')
    end

    custom_sort(departments, params[:sort_by], params[:sort_direction])
  end
end