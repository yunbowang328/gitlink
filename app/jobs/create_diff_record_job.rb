class CreateDiffRecordJob < ApplicationJob
  queue_as :default

  def perform(user_id, obj_id, obj_klass, column_name, before, after)
    user = User.find_by(id: user_id)
    obj = obj_klass.constantize.find_by(id: obj_id)

    return if user.blank? || obj.blank?

    CreateDiffRecordService.call(user, obj, column_name, before, after)
  end
end