class Admins::AddLaboratoryUserService < ApplicationService
  attr_reader :laboratory, :params

  def initialize(laboratory, params)
    @laboratory = laboratory
    @params     = params
  end

  def call
    columns = %i[]
    LaboratoryUser.bulk_insert(*columns) do |worker|
      Array.wrap(params[:user_ids]).compact.each do |user_id|
        next if laboratory.laboratory_users.exists?(user_id: user_id)

        worker.add(laboratory_id: laboratory.id, user_id: user_id)
      end
    end
  end
end