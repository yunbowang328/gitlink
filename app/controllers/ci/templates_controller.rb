class Ci::TemplatesController < ApplicationController

  def list
    @templates = Ci::Template.all
  end

  def templates_by_stage
    stage_type = params[:stage_type]
    @templates = Ci::Template.where("stage_type = ?", stage_type)
    #根据模板类别分组
    @category_templates = @templates.group_by{ |template| template.category }
  end

  def create
    template = Ci::Template.new(template_name: params[:template_name],
                                stage_type: params[:stage_type],
                                category: params[:category],
                                content: params[:content]
                               )
    template.save!
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

end
