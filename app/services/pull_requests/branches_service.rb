class PullRequests::BranchesService < ApplicationService

  attr_reader :user, :project

  def initialize(user, project)
    @user = user
    @project = project
  end

  def call
    all_branches = []
    user_name = user.try(:show_real_name)
    identifier = project.repository.try(:identifier)
    get_all_branches = Gitea::Repository::Branches::ListService.new(user, identifier).call
    all_branches = branch_lists(user_name,user.try(:login), identifier, get_all_branches) if get_all_branches && get_all_branches.size > 0
    return all_branches
  end

  def branch_lists(user_name,user_login, identifier, branches)
    branches_array = []
    branches.each do |b|
      branch_params = {
        user_name: user_name,
        user_login: user_login,
        identifier: identifier,
        name: b["name"],
        can_merge: b["user_can_merge"],
      }
      branches_array.push(branch_params)
    end
    return branches_array
  end

end