class CourseGroupsController < ApplicationController
  before_action :require_login, :check_auth
  before_action :set_group, except: [:create]
  before_action :find_course, only: [:create]
  before_action :teacher_allowed, except: [:set_invite_code_halt]

  def create
    tip_exception("分班名称不能为空") if params[:name].blank?
    if @course.course_groups.where(name: params[:name]).count > 0
      normal_status(-1, "已存在同名分班")
    else
      course_group = @course.course_groups.create!(name: params[:name], position: @course.course_groups.count + 1)
      render :json => {group_id: course_group.id, status: 0, message: "创建成功"}
    end
  end

  def destroy
    ActiveRecord::Base.transaction do
      begin
        @course.course_groups.where("position > #{@group.position}").update_all("position = position - 1")
        # 将该分班的学生转到未分班
        @group.course_members.update_all(course_group_id: 0)
        @group.destroy
      rescue Exception => e
        uid_logger_error(e.message)
        tip_exception("删除分班失败")
      end
    end
  end

  # 分班重命名
  def rename_group
    tip_exception("名称不能为空") if params[:name].blank?
    if @course.course_groups.where(name: params[:name]).count > 0
      normal_status(-1, "已存在同名分班")
    else
      @group.update_attributes(name: params[:name].strip)
      normal_status(0, "更新成功")
    end
  end

  # 分班的拖动
  def move_category
    tip_exception("移动失败") if params[:position].blank?
    unless params[:position].to_i == @group.position
      if params[:position].to_i < @group.position
        @course.course_groups.where("position < #{@group.position} and position >= ?", params[:position]).update_all("position = position + 1")
      else
        @course.course_groups.where("position > #{@group.position} and position <= ?", params[:position]).update_all("position = position - 1")
      end
      @group.update_attributes(position: params[:position])
      normal_status(0, "移动成功")
    else
      normal_status(-1, "位置没有变化")
    end
  end

  # 邀请码停用/启用
  def set_invite_code_halt
    teacher = @course.teachers.find_by(user_id: current_user.id)
    tip_exception(403, "无权限") unless current_user.admin_or_business? ||
      (teacher.present? && (teacher.teacher_course_groups.pluck(:course_group_id).include?(@group.id) || teacher.teacher_course_groups.size == 0))
    @group.update!(invite_code_halt: !@group.invite_code_halt)
    normal_status(0, "成功")
  end

  private

  def set_group
    @group = CourseGroup.find_by!(id: params[:id])
    @course = @group.course
  end
end
