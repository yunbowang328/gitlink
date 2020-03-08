class Admins::MirrorScriptsController < Admins::BaseController
  helper_method :current_mirror

  def index
    scripts = current_mirror.mirror_scripts.order(updated_at: :desc)
    @scripts = paginate scripts
  end

  def new
    @script = current_mirror.mirror_scripts.new
  end

  def create
    @script = current_mirror.mirror_scripts.new(form_params)

    if @script.save
      flash[:success] = '保存成功'
      redirect_to edit_admins_mirror_repository_mirror_script_path(current_mirror, @script)
    else
      flash[:danger] = '保存失败'
      render 'new'
    end
  end

  def edit
    @script = current_script
  end

  def update
    @script = current_script

    if @script.update(form_params)
      flash[:success] = '保存成功'
      redirect_to edit_admins_mirror_repository_mirror_script_path(current_mirror, @script)
    else
      flash[:danger] = '保存失败'
      render 'edit'
    end
  end

  def destroy
    current_script.destroy!
    render_delete_success
  end

  private

  def current_script
    @_current_script ||= current_mirror.mirror_scripts.find(params[:id])
  end

  def current_mirror
    @_current_mirror ||= MirrorRepository.find(params[:mirror_repository_id])
  end

  def form_params
    params.require(:mirror_script).permit(:script_type, :description, :script)
  end
end