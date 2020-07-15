class DevOps::BuildsController < ApplicationController
  before_action :require_login
  before_action :find_project

  def index
  end

  def show
  end

  private
    def find_project
      @repo = Repository.find params[:id]
    end
end
