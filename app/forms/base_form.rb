class BaseForm
  include ActiveModel::Model

  def check_project_category(project_category_id)
    raise "project_category_id参数值无效." if project_category_id && !ProjectCategory.exists?(project_category_id)
  end

  def check_project_language(project_language_id)
    raise "project_language_id参数值无效." if project_language_id && !ProjectLanguage.exists?(project_language_id)
  end

  def check_repository_name(user_id, repository_name)
    check_reversed_keyword(repository_name)
    raise "仓库名称已被使用." if Repository.where(user_id: user_id, identifier: repository_name.strip).exists?
  end

  def check_project_name(user_id, project_name)
    raise "项目名称已被使用." if Project.where(user_id: user_id, name: project_name.strip).exists?
  end

  def check_reversed_keyword(repository_name)
    raise "仓库名称已被占用." if ReversedKeyword.is_reversed(repository_name).exists?
  end
  
end
