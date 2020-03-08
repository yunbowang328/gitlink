json.is_teacher @is_teacher
json.course_modules @course_modules.each do |mod|
  json.id mod.id
  json.name mod.module_name
  json.type mod.module_type
  json.position mod.position
  json.task_count course_task_count(@course, mod.module_type)
  json.main_id mod.module_type == "board" ? @course.course_board.try(:id) : @course.id
  json.category_url module_url(mod, @course)
  if @second_category_type.include?(mod.module_type)
    case mod.module_type
      when "course_group"
        # json.none_group_count @course.none_group_count
        # json.second_category left_group_info @course
      when "board"
        course_board = @course.course_board
        if course_board.present?
          json.second_category course_board.children.each do |board|
            json.category_id board.id
            json.category_name board.name
            json.position board.position
            json.category_count board.messages_count
            json.category_type "messages"
            json.second_category_url "/courses/#{@course.id}/boards/#{board.id}"
          end
        end
      else
        json.second_category mod.course_second_categories.each do |category|
          json.category_id category.id
          json.category_name category.name
          json.position category.position
          json.category_count category_task_count(@course, category, @user)
          json.category_type category.category_type_str
          json.second_category_url category_url(category, @course)
        end
    end
  end
end

json.hidden_modules @hidden_modules.each do |mod|
  json.id mod.id
  json.name mod.module_name
  json.type mod.module_type
  json.position mod.position
end