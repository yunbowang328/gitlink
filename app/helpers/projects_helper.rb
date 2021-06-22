module ProjectsHelper

  def render_zh_project_type(project_type)
    case project_type
    when 'common' then "开源托管项目"
    when 'sync_mirror' then "镜像托管项目"
    when 'mirror' then "开源镜像项目"
    end
  end

  def render_zip_url(owner, repository, archive)
    [base_url, archive_repositories_path(owner&.login, repository, "#{archive}.zip")].join
  end

  def render_tar_url(owner, repository, archive)
    [base_url, archive_repositories_path(owner&.login, repository, "#{archive}.tar.gz")].join
  end

  def render_http_url(project)
    [gitea_domain, project.owner.login, "#{project.identifier}.git"].join('/')
  end

  def gitea_domain
    Gitea.gitea_config[:domain]
  end

  def find_user_by_login_or_mail(identifier)
    (User.find_by_login identifier) || (User.find_by_mail identifier)
  end

  def json_response(project, user)
    # repo = project.repository
    repo = Repository.includes(:mirror).select(:id, :mirror_url).find_by(project: project)

    tmp_json = {}
    unless project.common?
      tmp_json = tmp_json.merge({
        mirror_status: repo.mirror_status,
        mirror_num: repo.mirror_num,
        mirror_url: repo.mirror_url,
        first_sync: repo.first_sync?
      })
    end

    tmp_json = tmp_json.merge({
      identifier: render_identifier(project),
      name: project.name,
      platform: project.platform,
      id: project.id,
      repo_id: repo.id,
      open_devops: (user.blank? || user.is_a?(AnonymousUser)) ? false : project.open_devops?,
      type: project.numerical_for_project_type,
      author: render_owner(project),
      is_secret: project.is_secret,
      is_member: project.member?(user.id),
      user_apply_signatures: project.apply_signatures.with_user_id(user.id).collect{|s| {id: s.id, status: s.status}}
    }).compact

    render json: tmp_json
  end

  def render_owner(project)
    if project.educoder?
      {
        login: project.project_educoder.owner,
        name: project.project_educoder.owner,
        type: 'Educoder',
        image_url: project.project_educoder.image_url
      }
    else
      {
        login: @owner.login,
        name: @owner.real_name,
        type: @owner.type,
        image_url: url_to_avatar(@owner)
      }
    end
  end

  def render_identifier(project)
    project.educoder? ? project.project_educoder&.repo_name&.split('/')[1] : project.identifier
  end

  def render_author(project)
    project.educoder? ? project.project_educoder&.repo_name&.split('/')[0] : project.owner.login
  end

  def render_educoder_avatar_url(project_educoder)
    [Rails.application.config_for(:configuration)['educoder']['cdn_url'], project_educoder&.image_url].join('/')
  end

  def render_avatar_url(owner)
    ['images', url_to_avatar(owner)].join('/')
  end
end
