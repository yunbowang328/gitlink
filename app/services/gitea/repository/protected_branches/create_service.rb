# Create a branch protections for a repository

class Gitea::Repository::ProtectedBranches::CreateService < Gitea::ClientService
  attr_reader :owner, :repo, :body, :token

  # owner: owner of the repo
  # repo: name of the repo
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

  def initialize(owner, repo, body={}, token=nil)
    @owner = owner
    @repo  = repo
    @body  = body
    @token = token
  end

  def call
    response = post(url, params)
    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private
  def params
    Hash.new.merge(token: token, data: body)
  end

  def url
    "/repos/#{owner}/#{repo}/branch_protections".freeze
  end

  def json_format(status, message, body)
    case status
    when 201 then success(body)
    else
      error(message, status)
    end
  end

end
