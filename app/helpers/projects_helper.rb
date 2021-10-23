module ProjectsHelper
  def menu_hash_by_name(name)
    {
      menu_name: name
    }
  end

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

  def render_download_file_url(owner, repository, filepath, ref)
    [base_url, "/api/#{owner&.login}/#{repository.identifier}/raw?filepath=#{filepath}&ref=#{ref}"].join
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
    repo = Repository.includes(:mirror).select(:id, :is_mirror, :mirror_url, :source_clone_url).find_by(project: project)

    tmp_json = {}
    unless project.common?
      tmp_json = tmp_json.merge({
        is_mirror: repo.is_mirror ? true : false,
        mirror_status: repo.mirror_status,
        mirror_num: repo.mirror_num,
        mirror_url: repo.remote_mirror_url,
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
      project_category_id: project.project_category_id,
      project_language_id: project.project_language_id,
      license_id: project.license_id,
      ignore_id: project.ignore_id
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
end
