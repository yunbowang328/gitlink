class Ci::PipelinesController < Ci::BaseController

  before_action :require_login, only: %i[list create content]
  skip_before_action :connect_to_ci_db, except: %i[list create destroy content]
  before_action :load_project, only: %i[create content]
  before_action :load_repo, only: %i[create content]

  # ======流水线相关接口========== #
  def list
    @result = Array.new
    list = Ci::Pipeline.where('identifier=?', params[:identifier])
    # 查询build状态
    list.collect do |pipeline|
      pipeline.last_build_time = nil
      repo = load_repo_by_repo_slug("#{pipeline.login}/#{pipeline.identifier}")
      if repo
        build = repo.builds.order("build_created desc").find_by(build_target: pipeline.branch)
        if build
          pipeline.pipeline_status = build.build_status
          pipeline.last_build_time = Time.at(build.build_created)
        end
      end
      @result.push(pipeline)
    end
    @total_count = @result.size
    @pipelines = paginate @result
  end

  def create
    ActiveRecord::Base.transaction do
      size = Ci::Pipeline.where('branch=? and identifier=?', params[:branch], params[:repo]).size
      if size > 0
        render_error("#{params[:branch]}分支已经存在流水线！")
        return
      end
      pipeline = Ci::Pipeline.new(pipeline_name: params[:pipeline_name], file_name: params[:file_name],
                                  login: current_user.login, identifier: params[:repo], branch: params[:branch], event: params[:event])
      pipeline.save!

      # 默认创建四个初始阶段
      init_stages = Ci::PipelineStage::INIT_STAGES
      index = 1
      init_stages.each do |type, name|
        pipeline.pipeline_stages.build(
          stage_name: name,
          stage_type: type,
          show_index: index
        ).save!
        index += 1
      end
      create_pipeline_file(pipeline)
      create_ci_repo(pipeline)
      render_ok({id: pipeline.id})
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  # 在代码库创建文件
  def create_pipeline_file(pipeline)
    sha = get_pipeline_file_sha(pipeline.file_name, pipeline.branch)
    if sha
      logger.info "#{pipeline.file_name}已存在"
    else
      interactor = Gitea::CreateFileInteractor.call(current_user.gitea_token, @owner.login, content_params)
      if interactor.success?
        logger.info "#{pipeline.file_name}创建成功"
      end
    end
  end

  # 在drone数据库repo表新增一条repo记录
  def create_ci_repo(pipeline)
    if pipeline.branch != 'master'
      create_params = {
        repo_user_id: @ci_user.user_id,
        repo_namespace: @project.owner.login,
        repo_name: @project.identifier,
        repo_slug: "#{@project.owner.login}/#{@project.identifier}-" + pipeline.id.to_s,
        repo_clone_url: @project.repository.url,
        repo_branch: pipeline.branch,
        repo_config: pipeline.file_name
      }
      repo = Ci::Repo.create_repo(create_params)
      repo
    end
    nil
  end

  def get_pipeline_file_sha(file_name, branch)
    file_path_uri = URI.parse(file_name)
    interactor = Repositories::EntriesInteractor.call(@project.owner, @project.identifier, file_path_uri, ref: branch || 'master')
    if interactor.success?
      file = interactor.result
      file['sha']
    end
  end

  def content_params
    {
      filepath: params[:file_name],
      branch: params[:branch],
      new_branch: params[:new_branch],
      content: "#pipeline \n",
      message: 'create pipeline',
      committer: {
        email: current_user.mail,
        name: current_user.login
      },
      identifier: params[:repo]
    }
  end

  def update
    pipeline = Ci::Pipeline.find(params[:id])
    if pipeline
      pipeline.update!(pipeline_name: params[:pipeline_name],branch: params[:branch], event: params[:event])
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def destroy
    pipeline = Ci::Pipeline.find(params[:id])
    if pipeline
      repo = load_repo_by_repo_slug("#{pipeline.login}/#{pipeline.identifier}-" + pipeline.id.to_s)
      if repo
        repo.destroy!
      end
      pipeline.destroy!
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def content
    @yaml = "\n"
    pipeline = Ci::Pipeline.find(params[:id])
    stages = pipeline.pipeline_stages
    if stages && !stages.empty?
      init_step = stages.first.pipeline_stage_steps.first
      @yaml += init_step.content + "\n" + "steps:\n"
      stages = stages.slice(1, stages.size - 1)
      unless stages.empty?
        stages.each do |stage|
          steps = stage.pipeline_stage_steps
          next unless steps && !steps.empty?
          steps.each do |step|
            @yaml += step.content + "\n"
          end
        end
      end
    end
    @sha = get_pipeline_file_sha(pipeline.file_name, pipeline.branch)
    trigger = ''
    trigger += "  branch:\r\n  - #{pipeline.branch}\r\n" unless pipeline.branch.blank?
    unless pipeline.event.blank?
      trigger += "  event:\r\n"
      pipeline.event.split(',').each { |event| trigger += "  - #{event}\r\n"}
    end
    @yaml += "trigger:\r\n" + trigger unless trigger.blank?
    @branch = pipeline.branch
  end

  # =========阶段相关接口========= #
  def stages
    pipeline_id = params[:id]
    @pipeline_name = Ci::Pipeline.find(pipeline_id).pipeline_name
    @pipeline_stages = Ci::PipelineStage.where('pipeline_id=?', pipeline_id).order('show_index asc')
  end

  def create_stage
    ActiveRecord::Base.transaction do
      # 修改stage排序
      update_stage_index(params[:id], params[:show_index], 1)
      pipeline_stage = Ci::PipelineStage.new(stage_name: params[:stage_name],
                                             stage_type: params[:stage_type].blank? ? 'customize' : params[:stage_type],
                                             pipeline_id: params[:id], show_index: params[:show_index])
      pipeline_stage.save!
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def update_stage
    pipeline_stage = Ci::PipelineStage.find(params[:stage_id])
    if pipeline_stage
      pipeline_stage.update!(stage_name: params[:stage_name])
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def delete_stage
    ActiveRecord::Base.transaction do
      update_stage_index(params[:id], params[:show_index].to_i, -1)
      pipeline_stage = Ci::PipelineStage.find(params[:stage_id])
      if pipeline_stage
        pipeline_stage.destroy!
      end
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def update_stage_index(pipeline_id, show_index, diff)
    stages = Ci::Pipeline.find(pipeline_id).pipeline_stages
    stages.each do |stage|
      if stage.show_index >= show_index
        stage.update!(show_index: stage.show_index + diff)
      end
    end
  end

  # ========步骤相关接口========= #
  def steps
    @stage_type = Ci::PipelineStage.find(params[:stage_id]).stage_type
    @pipeline_stage_steps = Ci::PipelineStageStep.where('stage_id=?', params[:stage_id]).order('show_index asc')
  end

  def stage_step
    ActiveRecord::Base.transaction do
      steps = params[:steps]
      unless steps.empty?
        steps.each do |step|
          unless step[:template_id]
            render_error('请选择模板！')
            return
          end
          if !step[:id]
            step = Ci::PipelineStageStep.new(step_name: step[:step_name], stage_id: params[:stage_id],
                                             template_id: step[:template_id], content: step[:content], show_index: step[:show_index])
            step.save!
          else
            pipeline_stage_step = Ci::PipelineStageStep.find(step[:id])
            pipeline_stage_step.update(step_name: step[:step_name], content: step[:content],
                                       show_index: step[:show_index], template_id: step[:template_id])
          end
        end
      end
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def create_stage_step
    ActiveRecord::Base.transaction do
      steps = params[:steps]
      unless steps.empty?
        steps.each do |step|
          step = Ci::PipelineStageStep.new(step_name: step[:step_name], stage_id: params[:stage_id],
                                           template_id: step[:template_id], content: step[:content], show_index: step[:show_index])
          step.save!
        end
      end
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def update_stage_step
    ActiveRecord::Base.transaction do
      steps = params[:steps]
      unless steps.empty?
        steps.each do |step|
          pipeline_stage_step = Ci::PipelineStageStep.find(step[:id])
          if pipeline_stage_step
            pipeline_stage_step.update(step_name: step[:step_name], content: step[:content], template_id: step[:template_id])
          end
        end
      end
      render_ok
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def delete_stage_step
    pipeline_stage_step = Ci::PipelineStageStep.find(params[:step_id])
    if pipeline_stage_step
      pipeline_stage_step.destroy!
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end
end
