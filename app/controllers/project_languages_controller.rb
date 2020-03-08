class ProjectLanguagesController < ApplicationController
  def index
    @project_languages = ProjectLanguage.search(params[:name]).without_content
  end
end
