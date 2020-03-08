class CommitPollNotifyJobJob < ApplicationJob
  queue_as :notify

  def perform(poll_id, user_id)
    poll = Poll.find_by(id: poll_id)
    user = User.find_by(id: user_id)
    return if [poll, user].any?(&:blank?)
    course = poll.course

    attrs = %i[user_id trigger_user_id container_id container_type parent_container_id parent_container_type
              belong_container_id belong_container_type tiding_type viewed status created_at updated_at]

    same_attrs = {
      trigger_user_id: user.id,
      container_id: poll.id, container_type: 'Poll',
      parent_container_id: poll.id, parent_container_type: 'CommitPoll',
      belong_container_id: course.id, belong_container_type: 'Course',
      tiding_type: 'Poll', viewed: 0, status: 0
    }
    Tiding.bulk_insert(*attrs) do |worker|
      course.course_member(user).member_teachers.each do |teacher|
        worker.add same_attrs.merge(user_id: teacher.user_id)
      end
    end
  end
end
