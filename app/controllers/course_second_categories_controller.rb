class CourseSecondCategoriesController < ApplicationController
  before_action :require_login, :check_auth
  before_action :set_category
  before_action :teacher_allowed

  # 目录重命名
  def rename_category
    tip_exception("毕设子目录不能重命名") if @category.category_type == "graduation"
    tip_exception("名称不能为空") if params[:name].blank?
    tip_exception("已存在同名子目录") if @course_module.course_second_categories.exists?(name: params[:name].strip)
    @category.update_attributes!(name: params[:name].strip)
    normal_status(0, "更新成功")
  end

  # 子目录的拖动
  def move_category
    tip_exception("移动失败") if params[:position].blank?
    unless params[:position].to_i == @category.position
      if params[:position].to_i < @category.position
        @course_module.course_second_categories.where("position < #{@category.position} and position >= ?", params[:position]).update_all("position = position + 1")
      else
        @course_module.course_second_categories.where("position > #{@category.position} and position <= ?", params[:position]).update_all("position = position - 1")
      end
      @category.update!(position: params[:position])
      normal_status(0, "移动成功")
    else
      normal_status(-1, "位置没有变化")
    end
  end

  def destroy
    tip_exception("毕设子目录不能删除") if @category.category_type == "graduation"
    ActiveRecord::Base.transaction do
      begin
        @course_module.course_second_categories.where("position > #{@category.position}").update_all("position = position - 1")
        # 更新相应对象的子目录id
        if @course_module.module_type == "shixun_homework"
          @category.homework_commons.update_all(course_second_category_id: 0)
          @right_url = "/courses/#{@course.id}/shixun_homeworks/#{@course_module.id}"
        elsif @course_module.module_type == "attachment"
          Attachment.where(course_second_category_id: @category.id).update_all(course_second_category_id: 0)
          @right_url = "/courses/#{@course.id}/files/#{@course_module.id}"
        end

        @category.destroy
      rescue Exception => e
        uid_logger_error(e.message)
        tip_exception("删除子目录失败")
      end
    end
  end

  private

  def set_category
    @category = CourseSecondCategory.find_by!(id: params[:id])
    @course_module = @category.course_module
    @course = @course_module.try(:course)
  end
end
