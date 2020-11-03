class CompareController < ApplicationController
  # skip_before_action :require_login
  before_action :load_repository

  def index
  end

  def show
    base_ref = Addressable::URI.unescape(params[:base])
    @ref = head_ref = Addressable::URI.unescape(params[:head])
    @compare_result = Gitea::Repository::Commits::CompareService.call(@owner.login, @project.identifier, base_ref, head_ref)

    # render json: @compare_result
  end
end
