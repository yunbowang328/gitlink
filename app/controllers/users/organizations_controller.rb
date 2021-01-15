class Users::OrganizationsController < Users::BaseController

  def index
    if current_user.logged?
      logged_organizations_sql = observed_user.organizations.with_visibility(%w(common limited)).to_sql
      privacy_organizations_sql = observed_user.organizations.with_visibility("privacy").joins(:organization_users).where(organization_users: {user_id: current_user.id}).to_sql
      @organizations = Organization.from("( #{ logged_organizations_sql } UNION #{ privacy_organizations_sql } ) AS users")
    else
      @organizations = observed_user.organizations.with_visibility("common")
    end

    @organizations = @organizations.includes(:organization_extension).order(id: :asc)
  end
end