class Admins::MirrorRepositoriesController < Admins::BaseController
  before_action :check_shixun_mirrors!, only: [:index]

  def index
    mirrors = MirrorRepository.all
    mirrors = mirrors.reorder(status: :desc, main_type: :desc, type_name: :asc)

    @mirrors = paginate mirrors.includes(:mirror_scripts)
    @error_mirror_names = MirrorRepository.where(status: 5).pluck(:name)
  end

  def new
    @mirror = MirrorRepository.new
  end

  def create
    @mirror = MirrorRepository.new
    Admins::SaveMirrorRepositoryService.call(@mirror, current_user, form_params)

    flash[:success] = '保存成功'
    redirect_to edit_admins_mirror_repository_path(@mirror)
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = '保存失败'
    render 'new'
  rescue Admins::SaveMirrorRepositoryService::Error => ex
    flash.now[:danger] = ex.message
    render 'new'
  end

  def edit
    @mirror = current_mirror
  end

  def update
    @mirror = current_mirror

    Admins::SaveMirrorRepositoryService.call(current_mirror, current_user, form_params)

    flash[:success] = '保存成功'
    redirect_to edit_admins_mirror_repository_path(current_mirror)
  rescue ActiveRecord::RecordInvalid
    flash.now[:danger] = '保存失败'
    render 'edit'
  rescue Admins::SaveMirrorRepositoryService::Error => ex
    flash.now[:danger] = ex.message
    render 'edit'
  end

  def destroy
    return render_js_error('该状态下不允许删除') unless current_mirror.deletable?

    current_mirror.destroy!

    render_delete_success
  end

  def for_select
    mirrors = MirrorRepository.all

    keyword = params[:keyword].to_s.strip
    mirrors = mirrors.where('name LIKE ?', "%#{keyword}%") if keyword.present?

    @mirrors = paginate mirrors

    render_ok(count: @mirrors.total_count, mirrors: @mirrors.as_json(only: %i[id name]))
  end

  def merge
    origin_mirror = MirrorRepository.find(params[:mirror_id])
    mirror = MirrorRepository.find(params[:new_mirror_id])

    ActiveRecord::Base.transaction do
      origin_mirror.update!(name: mirror.name, mirrorID: mirror.mirrorID)
      mirror.destroy!
    end
  end

  private

  def current_mirror
    @_current_mirror ||= MirrorRepository.find(params[:id])
  end

  def form_params
    columns = %i[type_name main_type time_limit resource_limit cpu_limit memory_limit description status]
    params.require(:mirror_repository).permit(*columns)
  end

  def check_shixun_mirrors!
    return unless request.format.html?

    Admins::CheckShixunMirrorsService.call
  rescue Admins::CheckShixunMirrorsService::Error => e
    internal_server_error(e.message)
  end
end
