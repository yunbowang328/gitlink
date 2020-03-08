class CourseMember < ApplicationRecord
  # role 1：创建者 2：老师  3：助教  4：学生
  enum role: { CREATOR: 1, PROFESSOR: 2, ASSISTANT_PROFESSOR: 3, STUDENT: 4 }
  # is_active: true:当前活跃身份（多重身份的用户）

  belongs_to :course, counter_cache: true
  belongs_to :user
  belongs_to :course_group, counter_cache: true, optional: true
  belongs_to :graduation_group, optional: true
  has_many :teacher_course_groups, dependent: :destroy

  scope :teachers_and_admin, -> { where(role: %i[CREATOR PROFESSOR ASSISTANT_PROFESSOR]) }
  scope :students, ->(course) { where(course_id: course.id, role: %i[STUDENT])}
  scope :course_find_by_ids, lambda { |k,ids| where("#{k}": ids)}
  scope :course_students, -> {where(role: %i[STUDENT])}

  #用户的身份查询
  scope :course_user_role, lambda { |k| where(role: k)}

  # 未分班
  scope :ungroup_students, -> { where(course_group_id: 0, role: 4) }

  # after_destroy :delete_works
  # after_create :work_operation
  def delete_works
    if self.role == "STUDENT"
      course = self.course
      student_works = StudentWork.joins(:homework_common).where(user_id: self.user_id, homework_commons: {course_id: course.id})
      student_works.update_all(is_delete: 1)

      exercise_users = ExerciseUser.joins(:exercise).where(user_id: self.user_id, exercises: {course_id: course.id})
      exercise_users.update_all(is_delete: 1)

      poll_users = PollUser.joins(:poll).where(user_id: self.user_id, polls: {course_id: course.id})
      poll_users.update_all(is_delete: 1)

      course.graduation_works.where(user_id: self.user_id).update_all(is_delete: 1)
    end
  end

  def work_operation
    if self.role == "STUDENT"
      recover_works
      create_exercise_users
      create_graduation_works
      create_poll_users
      create_student_works
    end
  end

  # 加入班级时还原作品(如果有已删除作品的话)
  def recover_works
    course = self.course

    student_works = StudentWork.joins(:homework_common).where(user_id: self.user_id, homework_commons: {course_id: course.id})
    student_works.update_all(is_delete: 0)

    exercise_users = ExerciseUser.joins(:exercise).where(user_id: self.user_id, exercises: {course_id: course.id})
    exercise_users.update_all(is_delete: 0)

    poll_users = PollUser.joins(:poll).where(user_id: self.user_id, polls: {course_id: course.id})
    poll_users.update_all(is_delete: 0)

    graduation_works = course.graduation_works.where(user_id: self.user_id)
    graduation_works.update_all(is_delete: 0)
  end

  # 加入班级时创建作业的作品(如果没有作品才创建)
  def create_student_works
    course = self.course

    homework_commons = course.homework_commons.where(homework_type: %i[normal group practice])
    str = ""
    homework_commons.each do |homework|
      next if homework.student_works.where(user_id: self.user_id).any?
      str += "," if str != ""
      str += "(#{homework.id}, #{user_id}, '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}', '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}')"
    end

    if str != ""
      sql = "insert into student_works (homework_common_id, user_id, created_at, updated_at) values" + str
      ActiveRecord::Base.connection.execute sql
    end
  end

  # 加入班级时创建已发布试卷的作品(如果没有作品才创建)
  def create_exercise_users
    course = self.course
    exercises = course.exercises

    str = ""
    exercises.each do |exercise|
      next if exercise.exercise_users.where(user_id: self.user_id).any?
      str += "," if str != ""
      str += "(#{user_id}, #{exercise.id}, 0, '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}', '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}')"
    end

    if str != ""
      sql = "insert into exercise_users (user_id, exercise_id, commit_status, created_at, updated_at) values" + str
      ActiveRecord::Base.connection.execute sql
    end
  end

  # 加入班级时创建已发布问卷的作品(如果没有作品才创建)
  def create_poll_users
    course = self.course
    polls = course.polls

    str = ""
    polls.each do |poll|
      next if poll.poll_users.where(user_id: self.user_id).any?
      str += "," if str != ""
      str += "(#{user_id}, #{poll.id}, 0, '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}', '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}')"
    end

    if str != ""
      sql = "insert into poll_users (user_id, poll_id, commit_status, created_at, updated_at) values" + str
      ActiveRecord::Base.connection.execute sql
    end
  end

  # 创建毕设任务作品(如果没有作品才创建)
  def create_graduation_works
    course = self.course
    tasks = course.graduation_tasks

    str = ""
    tasks.each do |task|
      next if task.graduation_works.where(user_id: self.user_id).any?
      str += "," if str != ""
      str += "(#{task.id}, #{user_id}, #{course_id}, '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}', '#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}')"
    end

    if str != ""
      sql = "insert into graduation_works (graduation_task_id, user_id, course_id, created_at, updated_at) values" + str
      ActiveRecord::Base.connection.execute sql
    end
  end

  # 分班名称
  def course_group_name
    self.course_group_id == 0 ? "未分班" : course_group.try(:name)
  end

  # 学生的分班老师
  def member_teachers
    teacher_groups = course.teacher_course_groups
    if teacher_groups.count > 0
      member_ids = teacher_groups.where(course_group_id: self.try(:course_group_id)).pluck(:course_member_id).compact

      none_group_teachers = teacher_groups.pluck(:course_member_id).compact.size > 0 ? teacher_groups.pluck(:course_member_id).compact.join(',') : -1
      teachers = course.teachers.where("course_members.id not in (#{none_group_teachers}) or
                                            course_members.id in (#{member_ids.size > 0 ? member_ids.join(',') : -1})")
    else
      teachers = course.teachers
    end
    teachers
  end
end
