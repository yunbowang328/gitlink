class Ci::TemplatesController < ApplicationController

  def list
    @templates = Ci::Template.all
  end

  def templates_by_stage
    stage_type = params[:stage_type]
    if stage_type != Ci::PipelineStage::CUSTOMIZE_STAGE_TYPE
      @templates = Ci::Template.where("stage_type = ?", stage_type)
      # 根据模板类别分组
      @category_templates = @templates.group_by{ |template| template.category }
    else
      # 自定义阶段，按阶段分类分类返回模板列表
      @templates = Ci::Template.where("stage_type != ?", Ci::PipelineStage::INIT_STAGE_TYPE)
      @category_templates = @templates.group_by{ |template| template.parent_category }
    end
  end

  def create
    template = Ci::Template.new(template_name: params[:template_name],
                                stage_type: params[:stage_type],
                                category: params[:category],
                                parent_category: params[:parent_category],
                                content: params[:content]
                               )
    template.save!
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def update
    template = Ci::Template.find(params[:id])
    template.update!(template_name: params[:template_name],
                     stage_type: params[:stage_type],
                     category: params[:category],
                     parent_category: params[:parent_category],
                     content: params[:content]
    )
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def destroy
    template = Ci::Template.find(params[:id])
    if template
      template.destroy!
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

end
