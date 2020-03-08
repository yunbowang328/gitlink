module Weapps::CoursesHelper
  require 'chinese_pinyin'

  def teacher_list teachers, user_course_identity
    data = []
    teachers.each do |teacher|
      if teacher.user.present?
        teacher_user = teacher.user
        name = teacher_user.real_name
        role = teacher.role == "CREATOR" ? "管理员" : teacher.role == "PROFESSOR" ? "教师" : "助教"
        member_roles = user_course_identity < Course::ASSISTANT_PROFESSOR ? teacher_user.course_role(teacher.course) : []
        item = {name: name, course_member_id: teacher.id, login: teacher_user.login, user_id: teacher.user_id, role: role,
                school: teacher_user.school_name, image_url: url_to_avatar(teacher_user), member_roles: member_roles}
        pinyin = Pinyin.t(name.strip, splitter: '')
        first_char = pinyin[0]
        letter = first_letter first_char
        if data.pluck(:letter).include?(letter)
          data.select{|a|a[:letter]==letter}.first[:items] << item
        else
          data << {letter: letter, items: [item]}
        end
      end
    end
    # data = data.sort do |a, b|
    #   [a[:letter]] <=> [b[:letter]]
    # end
    # data.push(data.shift) if data.select{|a|a[:letter]=='#'}.first.present? # '#'排在最后
    return data
  end


  def student_list students, excellent, user_course_identity
    data = []
    students.each do |student|
      if student.user.present?
        student_user = student.user
        name = student_user.real_name
        phone = excellent ? "" : student_user.hidden_phone
        member_roles = user_course_identity < Course::ASSISTANT_PROFESSOR ? student_user.course_role(student.course) : []
        item = {name: name, course_member_id: student.id, login: student_user.login, user_id: student.user_id,
                student_id: student_user.student_id, image_url: url_to_avatar(student_user), phone: phone, member_roles: member_roles}
        pinyin = Pinyin.t(name.strip, splitter: '')
        first_char = pinyin[0]
        letter = first_letter first_char
        if data.pluck(:letter).include?(letter)
          data.select{|a|a[:letter]==letter}.first[:items] << item
        else
          data << {letter: letter, items: [item]}
        end
      end
    end
    # data = data.sort do |a, b|
    #   [a[:letter]] <=> [b[:letter]]
    # end
    # data.push(data.shift) if data.select{|a|a[:letter]=='#'}.first.present? # '#'排在最后
    return data
  end

  def first_letter char
    if char.ord >= 97 && char.ord <= 122
      letter = (char.ord - 32).chr.to_s
    elsif char.ord >= 65 && char.ord <= 90
      letter = char
    else
      letter = '#'
    end
    letter
  end
end