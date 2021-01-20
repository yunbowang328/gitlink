class Ci::PipelinesController < Ci::BaseController

  before_action :require_login, only: %i[list create]
  skip_before_action :connect_to_ci_db
  before_action :load_project, only: %i[content create_trustie_pipeline]
  before_action :load_repository, only: %i[create_trustie_pipeline]

  # ======流水线相关接口========== #
  def list
    @pipelines = Ci::Pipeline.where('identifier=?', params[:identifier])
  end

  def create
    ActiveRecord::Base.transaction do
      pipeline = Ci::Pipeline.new(pipeline_name: params[:pipeline_name], file_name: params[:file_name], login: current_user.login, identifier: params[:identifier])
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
      render_ok({id: pipeline.id})
    end
  rescue Exception => ex
    render_error(ex.message)
  end

  def update
    pipeline = Ci::Pipeline.find(params[:id])
    if pipeline
      pipeline.update!(pipeline_name: params[:pipeline_name])
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def destroy
    pipeline = Ci::Pipeline.find(params[:id])
    if pipeline
      pipeline.destroy!
    end
    render_ok
  rescue Exception => ex
    render_error(ex.message)
  end

  def content
    @yaml = "#pipeline \n"
    pipeline = Ci::Pipeline.find(params[:id])
    @sync = pipeline.sync
    @sha = ''
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
    if @sync == 1
      @sha = get_pipeline_file_sha(pipeline.file_name)
    end
  end

  def get_pipeline_file_sha(file_name)
    file_path_uri = URI.parse(file_name)
    interactor = Repositories::EntriesInteractor.call(@project.owner, @project.identifier, file_path_uri, ref: params[:ref] || "master")
    if interactor.success?
      file = interactor.result
      return file['sha']
    end
  end

  def create_trustie_pipeline
    pipeline = Ci::Pipeline.find(params[:id])
    sha = get_pipeline_file_sha(pipeline.file_name)
    if sha
      pipeline.update!(sync: 1)
      interactor = Gitea::UpdateFileInteractor.call(current_user.gitea_token, params[:owner], params.merge(identifier: @project.identifier,sha: sha))
      if interactor.success?
        render_ok
      else
        render_error(interactor.error)
      end
    else
      interactor = Gitea::CreateFileInteractor.call(current_user.gitea_token, @owner.login, content_params)
      if interactor.success?
        pipeline.update!(sync: 1)
        render_ok
      else
        render_error(interactor.error)
      end
    end
  end

  def content_params
    {
        filepath: params[:filepath],
        branch: params[:branch],
        new_branch: params[:new_branch],
        content: params[:content],
        message: params[:message],
        committer: {
            email: current_user.mail,
            name: current_user.login
        },
        identifier: @project.identifier
    }
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
            render_error("请选择模板！")
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