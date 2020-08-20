class Ci::BaseController < ApplicationController
  before_action :require_login

  def load_repo
    namespace = params[:owner]
    id = params[:repo] || params[:id]

    @user, @repo = Ci::Repo.find_with_namespace(namespace, id)
  end
end
