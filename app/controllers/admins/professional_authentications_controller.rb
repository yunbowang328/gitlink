class Admins::ProfessionalAuthenticationsController < Admins::BaseController
  def index
    params[:status] ||= 'pending'
    params[:sort_direction] = params[:status] == 'pending' ? 'asc' : 'desc'

    applies = Admins::ApplyUserAuthenticationQuery.call(params.merge(type: 2))

    @applies = paginate applies.preload(user: { user_extension: [:school, :department] })
  end

  def agree
    Admins::ProfessionalAuths::AgreeApplyService.call(current_apply)
    render_success_js
  end

  def refuse
    Admins::ProfessionalAuths::RefuseApplyService.call(current_apply, params)

    render_success_js
  end

  def batch_agree
    ApplyUserAuthentication.professional_auth.where(id: params[:ids]).each do |apply|
      begin
        Admins::ProfessionalAuths::AgreeApplyService.call(apply)
      rescue => e
        Util.logger_error(e)
      end
    end

    render_ok
  end

  def revoke
    Admins::ProfessionalAuths::RevokeApplyService.call(current_apply)
    render_success_js
  end

  private

  def current_apply
    @_current_apply ||= ApplyUserAuthentication.professional_auth.find(params[:id])
  end
end