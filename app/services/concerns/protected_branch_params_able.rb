module ProtectedBranchParamsAble
  extend ActiveSupport::Concern

  private

  # {
  #   "approvals_whitelist_teams": [
  #     "string"
  #   ], //批准团队(或审查团队)白名单
  #   "approvals_whitelist_username": [
  #     "string"
  #   ], // 批准用户(或审查者)白名单
  #   "block_on_outdated_branch": true, // 如果拉取过时，阻止合并
  #   "block_on_rejected_reviews": true, // 拒绝审核，阻止合并请求
    # "branch_name": "string",  //分支名称
  #   "dismiss_stale_approvals": true, // 取消过时的批准
  #   "enable_approvals_whitelist": true, //是否批准仅限列入白名单的用户或者团队， 主要用户pr的审核批准计数功能
  #   "enable_merge_whitelist": true, // 是否启用合并请求白名单
  #   "enable_push": true, //启用、禁止推送
  #   "enable_push_whitelist": true, // 是否启动推送白名单
  #   "enable_status_check": true, //是否启用状态检查
  #   "merge_whitelist_teams": [
  #     "string"
  #   ], // 合并请求团队白名单
  #   "merge_whitelist_usernames": [
  #     "string"
  #   ], // 合并请求用户白名单
  #   "protected_file_patterns": "string", //保护文件模式
  #   "push_whitelist_deploy_keys": true, // 具有推送权限的部署密钥白名单
  #   "push_whitelist_teams": [
  #     "string"
  #   ], //推送团队白名单
  #   "push_whitelist_usernames": [
  #     "string"
  #   ], //推送用户白名单
  #   "require_signed_commits": true, //是否需要签名提交
  #   "required_approvals": 0, // 所需批准数
  #   "status_check_contexts": [
  #     "string"
  #   ] // 状态检查规则
  # }


  #  branch_name                   :string(255)      default("")
  #  can_push                      :boolean          default("0"), not null
  #  enable_whitelist              :boolean          default("0")
  #  whitelist_user_i_ds           :text(65535)
  #  whitelist_team_i_ds           :text(65535)
  #  enable_merge_whitelist        :boolean          default("0"), not null
  #  whitelist_deploy_keys         :boolean          default("0"), not null
  #  merge_whitelist_user_i_ds     :text(65535)
  #  merge_whitelist_team_i_ds     :text(65535)
  #  enable_status_check           :boolean          default("0"), not null
  #  status_check_contexts         :text(65535)
  #  approvals_whitelist_user_i_ds :text(65535)
  #  approvals_whitelist_team_i_ds :text(65535)
  #  required_approvals            :integer          default("0")
  #  enable_approvals_whitelist    :boolean          default("0"), not null
  #  block_on_rejected_reviews     :boolean          default("0"), not null
  #  dismiss_stale_approvals       :boolean          default("0"), not null
  #  require_signed_commits        :boolean          default("0"), not null
  #  protected_file_patterns       :text(65535)
  #  block_on_outdated_branch      :boolean          default("0"), not null
  def protected_branch_params
    {
      branch_name: params[:branch_name],
      can_push: can_push_params,
      enable_whitelist: enable_whitelist_params,
      whitelist_user_i_ds: whitelist_user_i_ds_params,
      # whitelist_team_i_ds: whitelist_team_i_ds_params,
      enable_merge_whitelist: enable_merge_whitelist_params,
      merge_whitelist_user_i_ds: merge_whitelist_user_i_ds_params,
      # merge_whitelist_team_i_ds: merge_whitelist_team_i_ds_params,
      enable_status_check: enable_status_check_params,
      required_approvals: params[:required_approvals] || 0,
      enable_approvals_whitelist: enable_approvals_whitelist_params,
      approvals_whitelist_user_i_ds: approvals_whitelist_user_i_ds_params,
      # approvals_whitelist_team_i_ds: approvals_whitelist_team_i_ds_params,
      block_on_rejected_reviews: block_on_rejected_reviews_params,
      dismiss_stale_approvals: dismiss_stale_approvals_params,
      require_signed_commits: require_signed_commits_params,
      block_on_outdated_branch: block_on_outdated_branch_params
    }
  end

  def enable_status_check_params
    str_to_boolean(params[:enable_status_check] || false)
  end

  def enable_approvals_whitelist_params
    str_to_boolean(params[:enable_approvals_whitelist] || false)
  end
  def block_on_rejected_reviews_params
    str_to_boolean(params[:block_on_rejected_reviews] || false)
  end

  def dismiss_stale_approvals_params
    str_to_boolean(params[:dismiss_stale_approvals] || false)
  end

  def require_signed_commits_params
    str_to_boolean(params[:require_signed_commits] || false)
  end

  def block_on_outdated_branch_params
    str_to_boolean(params[:block_on_outdated_branch] || false)
  end

  def can_push_params
    return false if !can_push?
    return true if enable_whitelist?
    str_to_boolean(params[:enable_push])
  end

  def enable_whitelist_params
    return false if !can_push?
    str_to_boolean(params[:enable_push_whitelist])
  end

  def whitelist_user_i_ds_params
    return [] if !can_push?
    user_ids(get_push_whitelist_usernames)
  end

  def whitelist_team_i_ds_params
    # params[:push_whitelist_usernames]
  end

  def enable_merge_whitelist_params
    str_to_boolean(params[:enable_merge_whitelist] || false)
  end

  def merge_whitelist_user_i_ds_params
    return [] if !enable_merge_whitelist?
    user_ids(get_merge_whitelist_usernames)
  end

  def merge_whitelist_team_i_ds_params
    params[:merge_whitelist_teams]
  end

  def approvals_whitelist_user_i_ds_params
    return [] if !enable_approvals_whitelist?
    user_ids(get_approvals_whitelist_usernames)
  end

  def approvals_whitelist_team_i_ds_params
    params[:approvals_whitelist_teams]
  end

  def user_ids(names)
    member_ids & names_by_params(names)
  end

  def member_ids
    @repository.project.writable_members.map(&:user_id)
  end

  def names_by_params(names)
    User.where(login: names.to_a).ids
  end

  def get_push_whitelist_usernames
    return [] if !can_push? || !enable_whitelist?
    filter_empty_element Array(params[:push_whitelist_usernames])
  end

  def get_merge_whitelist_usernames
    return [] if !enable_merge_whitelist?
    filter_empty_element Array(params[:merge_whitelist_usernames])
  end

  def get_approvals_whitelist_usernames
    return [] if !enable_approvals_whitelist?
    filter_empty_element Array(params[:approvals_whitelist_usernames])
  end

  def check_users!(names)
    names.each {|name|
      check_user!(name)
      break
    }
  end

  def check_user!(name)
    user_exist = User.exists?(login: name)
    raise Error, "user '#{name}' does not exist" if !user_exist
  end

  def can_push?
    str_to_boolean(params[:enable_push]) === true
  end

  def enable_whitelist?
    str_to_boolean(params[:enable_push_whitelist]) === true
  end

  def enable_merge_whitelist?
    str_to_boolean(params[:enable_merge_whitelist]) === true
  end

  def enable_approvals_whitelist?
    str_to_boolean(params[:enable_approvals_whitelist]) === true
  end

  def filter_empty_element(array)
    array.reject { |e| e.to_s.empty? }
  end

  def gitea_protected_branch_saved?(protected_branch)
    protected_branch[:status] == :success
  end

  def gitea_protected_branch_params
    {
      approvals_whitelist_username: get_approvals_whitelist_usernames,
      branch_name: params[:branch_name],
      enable_approvals_whitelist: enable_approvals_whitelist_params,
      enable_merge_whitelist: enable_merge_whitelist_params,
      enable_push: can_push_params,
      enable_push_whitelist: enable_whitelist_params,
      enable_status_check: enable_status_check_params,
      # merge_whitelist_teams: [],
      merge_whitelist_usernames: get_merge_whitelist_usernames,
      # protected_file_patterns: string,
      # push_whitelist_deploy_keys: true,
      # push_whitelist_teams: [],
      push_whitelist_usernames: get_push_whitelist_usernames,
      block_on_rejected_reviews: block_on_rejected_reviews_params,
      dismiss_stale_approvals: dismiss_stale_approvals_params,
      require_signed_commits: require_signed_commits_params,
      block_on_outdated_branch: block_on_outdated_branch_params

    }
  end

  def validate!
    protected_branch_exists = repository.protected_branches.exists?(params[:branch_name])
    raise Error, "Protected branch '#{branch_name}' already exists" if protected_branch_exists

    check_users!(get_push_whitelist_usernames)  if get_push_whitelist_usernames.any?
    check_users!(get_merge_whitelist_usernames)  if get_merge_whitelist_usernames.any?
    check_users!(get_approvals_whitelist_usernames)  if get_approvals_whitelist_usernames.any?

    raise Error, '分支名称不能为空' if params[:branch_name].blank?

  end
end
