class Admins::IdentityAuthenticationsController < Admins::BaseController
  def index
    params[:status] ||= 'pending'
    params[:sort_direction] = params[:status] == 'pending' ? 'asc' : 'desc'

    applies = Admins::ApplyUserAuthenticationQuery.call(params.merge(type: 1))

    @applies = paginate applies.preload(user: { user_extension: [:school, :department] })
  end

  def agree
    Admins::IdentityAuths::AgreeApplyService.call(current_apply)
    render_success_js
  end

  def refuse
    Admins::IdentityAuths::RefuseApplyService.call(current_apply, params)

    render_success_js
  end

  def batch_agree
    ApplyUserAuthentication.real_name_auth.where(id: params[:ids]).each do |apply|
      begin
        Admins::IdentityAuths::AgreeApplyService.call(apply)
      rescue => e
        Util.logger_error(e)
      end
    end

    render_ok
  end

  def revoke
    Admins::IdentityAuths::RevokeApplyService.call(current_apply)

    render_success_js
  end

  private

  def current_apply
    @_current_apply ||= ApplyUserAuthentication.real_name_auth.find(params[:id])
  end
end