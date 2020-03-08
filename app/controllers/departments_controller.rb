class DepartmentsController < ApplicationController
  skip_before_action :check_sign

  def for_option
    render_ok(departments: current_school.departments.without_deleted.select(:id, :name).as_json)
  end

  private

  def current_school
    @_current_school ||= School.find(params[:id])
  end
end