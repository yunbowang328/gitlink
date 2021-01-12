class CompareController < ApplicationController
  # skip_before_action :require_login
  before_action :load_repository

  def index
  end

  def show
    base = Addressable::URI.unescape(params[:base])
    head = params[:head].include?('json') ? params[:head]&.split('.json')[0] : params[:head]
    @compare_result = Gitea::Repository::Commits::CompareService.call(@owner.login, @project.identifier, head, base)

    # render json: @compare_result
  end
end
