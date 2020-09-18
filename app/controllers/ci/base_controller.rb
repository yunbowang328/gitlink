class Ci::BaseController < ApplicationController
  before_action :require_login
  before_action :connect_to_ci_database

  def load_repo
    namespace = params[:owner]
    id = params[:repo] || params[:id]

    @ci_user, @repo = Ci::Repo.find_with_namespace(namespace, id)
  end

  private
    def authorize_access_project!
      unless @project.manager?(current_user)
        return render_forbidden
      end
    end

    def authorize_manage_builds!
      unless @project.owner?(current_user)
        return render_forbidden
      end
    end

    def authenticate_admin!
      return render_forbidden unless current_user.admin?
    end

    def authorize_owner_project!
      unless @project.owner?(current_user)
        return render_forbidden
      end
    end

    def find_cloud_account
      @cloud_account ||= current_user.ci_cloud_account
    end

    def load_ci_user
      begin
        @ci_user = Ci::User.find_by(user_login: params[:owner])
      rescue
        render_not_found
      end
    end

    # Dynamically sets the database connection.
    def connect_to_ci_database
      db_config = Rails.configuration.database_configuration[Rails.env]["ci_server_db"]
      return render_error('ci database config missing') if db_config.blank?

      req_params = {
        host: db_config["host"],
        username: db_config['username'],
        password: db_config['password'],
        port: db_config['port'],
        database: "#{current_user.login}_#{db_config['database']}"
      }
      db_params = Ci::Database.get_connection_params(req_params)
      Ci::Database.set_connection(db_params)
    end

end
