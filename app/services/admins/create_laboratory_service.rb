class Admins::CreateLaboratoryService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :params

  def initialize(params)
    @params = params
  end

  def call
    raise Error, '单位不能为空' if params[:school_id].blank?
    raise Error, '该单位已存在' if Laboratory.exists?(school_id: params[:school_id])

    ActiveRecord::Base.transaction do
      laboratory = Laboratory.create!(school_id: params[:school_id])

      laboratory.create_laboratory_setting!
    end
  end
end