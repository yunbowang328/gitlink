class Libraries::SubmitService < ApplicationService
  Error = Class.new(StandardError)

  attr_reader :library

  def initialize(library)
    @library = library
  end

  def call
    return if library.processing? || library.published?

    raise Error, '该状态下不能提交审核' unless library.may_submit?

    ActiveRecord::Base.transaction do
      library.published_at = Time.current
      library.submit
      library.save!

      library.library_applies.create!
      send_library_apply_notify!
    end
  end

  private

  def send_library_apply_notify!
    Tiding.create!(user_id: 1, trigger_user_id: library.user_id,
                   container_id: library.id, container_type: 'Library',
                   tiding_type: 'Apply', status: 0)
  end
end