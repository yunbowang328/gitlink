module ProjectsHelper

  def render_zh_project_type(project_type)
    case project_type
    when 'common' then "开源托管项目"
    when 'sync_mirror' then "镜像托管项目"
    when 'mirror' then "开源镜像项目"
    end
  end

  def render_zip_url(project, archive_name)
    [gitea_domain, project.owner.login, project.identifier, "archive", "#{archive_name}.zip"].join('/')
  end

  def render_tar_url(project, archive_name)
    [gitea_domain, project.owner.login, project.identifier, "archive", "#{archive_name}.tar.gz"].join('/')
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

  def json_response(project)
    repo = project.repository
    tmp_json = {}
    unless project.common?
      tmp_json = tmp_json.merge({
        mirror_status: repo.mirror_status,
        mirror_num: repo.mirror_num,
        mirror_url: repo.mirror_url,
        first_sync: repo.first_sync?,
      })
    end

    tmp_json = tmp_json.merge({
      identifier: project.identifier,
      name: project.name,
      id: project.id,
      type: project.numerical_for_project_type,
      author: {
        login: project.owner.login,
        name: project.owner.real_name,
        image_url: url_to_avatar(project.owner)
      }
    }).compact
    render json: tmp_json
  end
end
