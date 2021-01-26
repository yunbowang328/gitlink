class Ci::TemplatesController < Ci::BaseController

  before_action :require_login, only: %i[list create]
  skip_before_action :connect_to_ci_db

  #======模板管理======#
  def list
    stage_type = params[:stage_type]
    template_name = params[:name]
    templates = template_name.blank? ? Ci::Template.all : Ci::Template.where("template_name like ?", "%#{template_name}%")
    templates = templates.select{ |template| template.login == current_user.login} unless current_user.admin?
    if !stage_type.blank?  && stage_type != 'all'
      templates = templates.select{ |template| template.stage_type == stage_type}
    end
    @total_count = templates.map(&:id).count
    @templates = paginate templates
  end

  def show
    @template = Ci::Template.find(params[:id])
  end

  def create
    stage_type = params[:stage_type]
    category = params[:category]
    if category.blank?
      category = Ci::Template::STAGE_TYPES[:"#{stage_type}"]
    end

    if params[:id]
      template = Ci::Template.find(params[:id])
      if template
        template.update!(template_name: params[:template_name],
                         stage_type: stage_type,
                         category: category,
                         parent_category: Ci::Template::STAGE_TYPES[:"#{stage_type}"],
                         content: params[:content],
                         login: current_user.admin? ? 'admin' : current_user.login
        )
      end
    else
      template = Ci::Template.new(template_name: params[:template_name],
                                  stage_type: stage_type,
                                  category: category,
                                  parent_category: Ci::Template::STAGE_TYPES[:"#{stage_type}"],
                                  content: params[:content],
                                  login: current_user.admin? ? 'admin' : current_user.login
      )
      template.save!
    end
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

  #======流水线模板查询=====#
  def templates_by_stage
    stage_type = params[:stage_type]
    if stage_type != Ci::PipelineStage::CUSTOMIZE_STAGE_TYPE
      @templates = Ci::Template.where("stage_type = ?", stage_type)
      @templates = @templates.select{ |template| template.login == current_user.login || template.login == 'admin'} unless current_user.admin?
      # 根据模板类别分组
      @category_templates = @templates.group_by{ |template| template.category }
    else
      # 自定义阶段，按阶段分类分类返回模板列表
      @templates = Ci::Template.where("stage_type != ?", Ci::PipelineStage::INIT_STAGE_TYPE)
      @templates = @templates.select{ |template| template.login == current_user.login || template.login == 'admin'} unless current_user.admin?
      @category_templates = @templates.group_by{ |template| template.parent_category }
    end
  end

end
