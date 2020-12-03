# Edit a branch protections for a repository. Only fields that are set will be changed

class Gitea::Repository::ProtectedBranches::UpdateService < Gitea::ClientService
  attr_reader :owner, :repo, :name, :body, :token

  # owner: owner of the repo
  # repo: name of the repo
  # nmae: name of protected branch
  # body:
  #   {
  #   "approvals_whitelist_teams": [
  #     "string"
  #   ],
  #   "approvals_whitelist_username": [
  #     "string"
  #   ],
  #   "block_on_outdated_branch": true,
  #   "block_on_rejected_reviews": true,
  #   "branch_name": "string",
  #   "dismiss_stale_approvals": true,
  #   "enable_approvals_whitelist": true,
  #   "enable_merge_whitelist": true,
  #   "enable_push": true,
  #   "enable_push_whitelist": true,
  #   "enable_status_check": true,
  #   "merge_whitelist_teams": [
  #     "string"
  #   ],
  #   "merge_whitelist_usernames": [
  #     "string"
  #   ],
  #   "protected_file_patterns": "string",
  #   "push_whitelist_deploy_keys": true,
  #   "push_whitelist_teams": [
  #     "string"
  #   ],
  #   "push_whitelist_usernames": [
  #     "string"
  #   ],
  #   "require_signed_commits": true,
  #   "required_approvals": 0,
  #   "status_check_contexts": [
  #     "string"
  #   ]
  # }
  # eq:
  # Gitea::Repository::ProtectedBranches::UpdateService.call(user.login, repo.identifier, branch_name, body, user.gitea_token)
  def initialize(owner, repo, name, body, token=nil)
    @owner = owner
    @repo  = repo
    @name  = name
    @body  = body
    @token = token
  end

  def call
    response = patch(url, params)
    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private
  def params
    Hash.new.merge(token: token, data: body)
  end

  def url
    "/repos/#{owner}/#{repo}/branch_protections/#{name}".freeze
  end

  def json_format(status, message, body)
    case status
    when 200 then success(body)
    else
      error(message, status)
    end
  end
end
