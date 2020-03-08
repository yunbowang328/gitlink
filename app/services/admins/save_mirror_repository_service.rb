class Admins::SaveMirrorRepositoryService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :mirror, :user, :params

  def initialize(mirror, user, params)
    @mirror = mirror
    @user   = user
    @params = params
  end

  def call
    mirror.assign_attributes(params)

    raise Error, '镜像别名重复' if MirrorRepository.where.not(id: mirror.id).exists?(type_name: params[:type_name])

    ActiveRecord::Base.transaction do
      record_operation! if mirror.persisted?

      mirror.save!
    end
  end

  private

  def record_operation!
    if mirror.type_name_changed?
      MirrorOperationRecord.create!(mirror_repository_id: mirror.id, status: 5,
                                    user_id: user.id, old_tag: mirror.type_name_in_database,
                                    new_tag: mirror.type_name)
    elsif mirror.status_changed?
      MirrorOperationRecord.create!(mirror_repository_id: mirror.id, status: 5,
                                    user_id: user.id, old_tag: mirror.status_in_database,
                                    new_tag: mirror.status)
    end
  end
end