class Gitea::PullRequest::UpdateService < Gitea::ClientService
  attr_reader :owner, :repo, :params, :number, :token

  # params:
  # {
  #   "assignee": "string",
  #   "assignees": [
  #     "string"
  #   ],
  #   "base": "string",
  #   "body": "string",
  #   "due_date": "2021-01-11T10:11:52.074Z",
  #   "labels": [
  #     0
  #   ],
  #   "milestone": 0,
  #   "state": "string",
  #   "title": "string",
  #   "unset_due_date": true
  # }
  def initialize(owner, repo, number, params, token=nil)
    @owner  = owner
    @repo   = repo
    @params = params
    @number = number
    @token  = token
  end

  def call
    response = patch(url, request_params)

    status, message, body = render_response(response)
    json_format(status, message, body)
  end

  private

  def request_params
    Hash.new.merge(token: token, data: @params)
  end

  def url
    "/repos/#{owner}/#{repo}/pulls/#{number}".freeze
  end

  def json_format(status, message, body)
    case status
    when 201 then success(body)
    else
      error(message, status)
    end
  end

end
