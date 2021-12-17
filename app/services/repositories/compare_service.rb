class Repositories::CompareService < ApplicationService
  attr_reader :owner, :project, :params

  def initialize(owner, project, params)
    @owner = owner
    @project = project
    @params  = params
  end

  def call
    compare!
  rescue => e
    raise Error, e.message
  end

  private

  def compare!
    base, head = compare_params

    # TODO: 处理fork的项目向源项目发送PR的base、head参数问题
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
