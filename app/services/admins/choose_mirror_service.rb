class Admins::ChooseMirrorService < ApplicationService
  attr_reader :mirror, :user, :number

  def initialize(mirror, user, mirror_number)
    @mirror = mirror
    @user   = user
    @number = mirror_number
  end

  def call
    if mirror.mirrorID == number
      mirror.update_column(:status, 1)
      return
    end

    old_number = mirror.mirrorID
    mirror.update!(mirrorID: number, status: 1)
    MirrorOperationRecord.create!(mirror_repository_id: mirror.id, mirror_id: number, mirror_name: mirror.name,
                                  status: 1, user_id: user.id, old_tag: old_number, new_tag: mirror.mirrorID)
  end
end