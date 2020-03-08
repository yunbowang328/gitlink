class DuplicateCourseService < ApplicationService
  attr_reader :origin_course, :user, :course

  def initialize(origin_course, user)
    @user          = user
    @origin_course = origin_course
  end

  def call
    ActiveRecord::Base.transaction do
      @course = copy_course!

      copy_course_modules!

      join_course!

      copy_homework_commons!

      copy_exercises!

      copy_polls!

      copy_attachments!

      course
    end
  end

  private

  def copy_course!
    create_attrs = origin_course.as_json(only: %i[name class_period credit course_list_id])
    create_attrs.merge!(tea_id: user.id, school_id: user.school_id, is_public: 0, is_copy: 1)

    Course.create!(create_attrs)
  end

  def copy_course_modules!
    @second_category_list = {}
    origin_course.course_modules.each do |course_module|
      attrs = course_module.as_json(only: %i[module_type position hidden module_name])
      new_course_module = CourseModule.create!(attrs.merge(course_id: course.id))
      # 复制子目录
      course_module.course_second_categories.each do |second_category|
        category_attr =  second_category.as_json(only: %i[category_type name position])
        new_second_category =
            CourseSecondCategory.create!(category_attr.merge(course_id: course.id, course_module_id: new_course_module.id))
        @second_category_list[second_category.id] = new_second_category.id
      end
    end
  end

  def join_course!
    CourseMember.create!(course_id: course.id, user_id: user.id, role: 1)
  end

  def copy_homework_commons!
    origin_course.homework_commons.where(homework_type: %i[normal group practice]).find_each do |origin_homework|
      homework_attrs = origin_homework.as_json(only: %i[name description homework_type homework_bank_id reference_answer])

      course_second_category_id = @second_category_list[origin_homework.course_second_category_id]

      homework = HomeworkCommon.create!(homework_attrs.merge(user_id: user.id, course_id: course.id,
                                                             course_second_category_id:course_second_category_id))

      origin_homework.attachments.find_each do |origin_attachment|
        attachment = origin_attachment.copy
        attrs = { container: homework, author_id: origin_homework.user_id, copy_from: origin_attachment.id }
        attachment.assign_attributes(attrs)
        attachment.save!

        origin_attachment.increment!(:quotes)
      end

      homework.create_homework_detail_manual!

      if homework.group_homework_type?
        attrs = origin_homework.homework_detail_group.as_json(only: %i[min_num max_num base_on_project])
        homework.create_homework_detail_group!(attrs)
      elsif homework.practice_homework_type?
        HomeworkCommonsShixun.create!(homework_common_id: homework.id, shixun_id: origin_homework.homework_commons_shixun.shixun_id)
        HomeworksService.new.create_shixun_homework_cha_setting(homework, origin_homework.shixuns.first)
      end


      origin_homework.increment!(:quotes)
      origin_homework.homework_bank.increment!(:quotes) if origin_homework.homework_bank
    end
  end

  def copy_exercises!
    origin_course.exercises.find_each do |origin_exercise|
      attrs = origin_exercise.as_json(only: %i[exercise_name exercise_description exercise_bank_id])
      exercise = course.exercises.create!(attrs.merge(user_id: user.id))

      origin_exercise.exercise_questions.find_each do |origin_question|
        question_attrs = origin_question.as_json(only: %i[question_title question_type question_number question_score shixun_name shixun_id is_ordered level])
        # question_attrs[:question_type] ||= 1
        question = exercise.exercise_questions.create!(question_attrs)

        exercise_choice_map = {}
        origin_question.exercise_choices.each_with_index do |origin_choice, index|
          choice_attrs = { choice_position: index + 1, choice_text: origin_choice.choice_text }
          choice = question.exercise_choices.create!(choice_attrs)

          # exercise_choice_map[origin_choice.id] = choice.id 标准答案中存的是choice_position, 直接取原题的exercise_choice_id就行
        end

        origin_question.exercise_standard_answers.find_each do |origin_answer|
          question.exercise_standard_answers.create!(
            exercise_choice_id: origin_answer.exercise_choice_id,
            answer_text: origin_answer.answer_text
          )
        end

        origin_question.exercise_shixun_challenges.each_with_index do |sc, index|
          question.exercise_shixun_challenges.create!({position: index+1, challenge_id: sc.challenge_id,
                                                            shixun_id: sc.shixun_id, question_score: sc.question_score})
        end
      end

      origin_exercise.exercise_bank.increment!(:quotes) if exercise.exercise_bank
    end
  end

  def copy_polls!
    origin_course.polls.includes(poll_questions: :poll_answers).find_each do |origin_poll|
      poll_attrs = origin_poll.as_json(only: %i[polls_name polls_description exercise_bank_id])
      poll = course.polls.create!(poll_attrs.merge(user_id: user.id))

      origin_poll.poll_questions.each do |origin_question|
        attr_names = %i[question_title question_type is_necessary question_number max_choices min_choices]
        question_attrs = origin_question.as_json(only: attr_names)
        question_attrs[:question_type] ||= 1

        question = poll.poll_questions.create!(question_attrs)

        origin_question.poll_answers.each_with_index do |origin_answer, index|
          question.poll_answers.create!(answer_position: index + 1, answer_text: origin_answer.answer_text)
        end
      end

      origin_poll.exercise_bank.increment!(:quotes) if origin_poll.exercise_bank
    end
  end

  def copy_attachments!
    origin_course.attachments.each do |origin_attachment|
      attachment = origin_attachment.copy
      # attachment.tag_list.add(origin_attachment.tag_list) # tag关联
      attachment.container = course
      attachment.created_on = Time.now
      attachment.publish_time = nil
      attachment.author_id = User.current.id
      attachment.copy_from = origin_attachment.copy_from || origin_attachment.id
      attachment.is_publish = 0
      attachment.attachtype ||= 4
      attachment.course_second_category_id = @second_category_list[origin_attachment.course_second_category_id]

      attachment.save!
      origin_course.update_quotes(attachment)
    end
  end
end