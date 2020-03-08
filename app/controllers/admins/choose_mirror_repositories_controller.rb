class Admins::ChooseMirrorRepositoriesController < Admins::BaseController
  def new
    @mirror     = MirrorRepository.find(params[:mirror_id])
    @new_mirror = MirrorOperationRecord.where(mirror_repository_id: @mirror.id, status: 1, user_id: -1).first
  end

  def create
    mirror = MirrorRepository.find(params[:mirror_id])
    Admins::ChooseMirrorService.call(mirror, current_user, params[:mirror_number])
  end
end