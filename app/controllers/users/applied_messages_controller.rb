class Users::AppliedMessagesController < Users::BaseController 
  before_action :check_auth 
  after_action :view_messages, only: [:index]

  def index 
    @applied_messages = @_observed_user.applied_messages.order(viewed: :asc, created_at: :desc)
    @applied_messages = paginate @applied_messages
  end

  private 
  def check_auth 
    return render_forbidden unless current_user.admin? || observed_logged_user?
  end

  def view_messages
    @applied_messages.update_all(viewed: 'viewed')
  end
end