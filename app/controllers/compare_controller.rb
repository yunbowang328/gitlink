class CompareController < ApplicationController
  # skip_before_action :require_login
  before_action :load_repository

  def index
  end

  def show
    compare
  end

  private
  def compare
    base, head = compare_params

    # TODO: 处理fork的项目向源项目发送PR的base、head参数问题
    @compare_result ||=
      head.include?(":") ? gitea_compare(base, head) : gitea_compare(head, base)
  end

  def compare_params
    base = Addressable::URI.unescape(params[:base])
    head = params[:head].include?('json') ? params[:head]&.split('.json')[0] : params[:head]

    [base, head]
  end

  def gitea_compare(base, head)
    Gitea::Repository::Commits::CompareService.call(@owner.login, @project.identifier, base, head)
  end
end
