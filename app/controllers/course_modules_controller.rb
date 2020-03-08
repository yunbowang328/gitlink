class CourseModulesController < ApplicationController
  before_action :require_login, :check_auth
  before_action :set_module, except: [:unhidden_modules]
  before_action :find_course, only: [:unhidden_modules]
  before_action :teacher_or_admin_allowed, except: [:add_second_category]
  before_action :teacher_allowed, only: [:add_second_category]

  # 模块置顶
  def sticky_module
    # position为1则不做处理，否则该模块的position置为1，position小于当前模块的position加1
    unless @course_module.position == 1
      @course.course_modules.where("position < #{@course_module.position}").update_all("position = position + 1")
      @course_module.update_attributes(position: 1)
    end
    normal_status(0, "置顶成功")
  end

  # 模块隐藏
  def hidden_module
    tip_exception("请至少保留一个课堂模块") if @course.none_hidden_course_modules.where.not(id: @course_module.id).size == 0
    @course_module.update_attributes(hidden: 1)
    normal_status(0, "更新成功")
  end

  # 模块重命名
  def rename_module
    name = params[:name].strip
    tip_exception("名称不能为空") if name.blank?
    tip_exception("已存在同名模块") if @course.course_modules.exists?(module_name: name)
    @course_module.update_attributes(module_name: name)

    case @course_module.module_type
    when 'board'
      @course.course_board.update_columns(name: name)
    end
    normal_status(0, "更新成功")
  end

  # 模块的显示
  def unhidden_modules
    tip_exception("请选择要显示的模块") if params[:module_ids].blank?
    @course.course_modules.where(id: params[:module_ids]).update_all(hidden: 0)
    normal_status(0, "更新成功")
  end

  # 添加二级目录
  def add_second_category
    tip_exception("子目录名称不能为空") if params[:name].blank?
    tip_exception("已存在同名子目录") if @course_module.course_second_categories.exists?(name: params[:name].strip)
    ActiveRecord::Base.transaction do
      begin
        category = @course_module.course_second_categories.create!(name: params[:name].strip, category_type: @course_module.module_type,
        course_id: @course.id, position: @course_module.course_second_categories.count + 1)
        render :json => {category_id: category.id, status: 0, message: "添加成功"}
      rescue Exception => e
        uid_logger_error(e.message)
        tip_exception("添加子目录失败")
      end
    end
  end

  private

  def set_module
    @course_module = CourseModule.find_by!(id: params[:id])
    @course = @course_module.course
  end
end
