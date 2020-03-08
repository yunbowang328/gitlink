class Users::RecentContactsController < Users::BaseController
  before_action :private_user_resources!

  def index
    contacts  = observed_user.recent_contacts.distinct
    contacts = contacts.where(laboratory_id: current_laboratory.id) unless current_laboratory.main_site?
    @contacts = contacts.order('private_messages.created_at DESC').limit(10).includes(:user_extension)
  end
end