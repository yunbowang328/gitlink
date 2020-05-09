class ProjectLanguagesController < ApplicationController
  def index
    #@project_languages = ProjectLanguage.search(params[:name]).
    q = ProjectLanguage.ransack(name_cont: params[:name])
    @project_languages = q.result(distinct: true)
  end
end
