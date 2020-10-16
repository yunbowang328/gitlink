class Ci::BaseController < ApplicationController
  include Ci::DbConnectable

  before_action :require_login
  before_action :connect_to_ci_database, if: -> { current_user && !current_user.is_a?(AnonymousUser) && current_user.devops_certification? }

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

    def authenticate_manager!
      unless @project.manager?(current_user)
        return render_forbidden
      end
    end

    def authenticate_admin!
      return render_forbidden unless current_user.admin?
    end

    def authorize_owner!
      unless @project.owner?(current_user)
        return render_forbidden
      end
    end

    def find_cloud_account
      @cloud_account ||= current_user.ci_cloud_account
      @cloud_account.blank? ? nil : @cloud_account
    end

    def load_ci_user
      @ci_user ||= Ci::User.find_by(user_login: params[:owner])
      @ci_user.blank? ? raise("未找到相关的记录") : @ci_user
    end

end
