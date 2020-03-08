class Admins::LibraryAppliesController < Admins::BaseController
  def index
    params[:status] ||= 'pending'
    applies = Admins::LibraryApplyQuery.call(params)

    @library_applies = paginate applies.preload(library: :user)
  end

  def agree
    Libraries::AgreeApplyService.new(current_library_apply, current_user).call
    render_success_js
  end

  def refuse
    Libraries::RefuseApplyService.new(current_library_apply, current_user, reason: params[:reason]).call

    render_success_js
  end

  private

  def current_library_apply
    @_current_library_apply ||= LibraryApply.find(params[:id])
  end
end