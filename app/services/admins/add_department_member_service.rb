class Admins::AddDepartmentMemberService < ApplicationService

  attr_reader :department, :params

  def initialize(department, params)
    @department = department
    @params     = params
  end

  def call
    columns = %i[]
    DepartmentMember.bulk_insert(*columns) do |worker|
      Array.wrap(params[:user_ids]).compact.each do |user_id|
        next if department.department_members.exists?(user_id: user_id)

        worker.add(department_id: department.id, user_id: user_id)
      end
    end
  end
end