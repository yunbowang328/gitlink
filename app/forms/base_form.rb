class BaseForm
  include ActiveModel::Model

  def check_project_category(project_category_id)
    unless project_category_id == ''
      raise "project_category_id参数值无效." if project_category_id && !ProjectCategory.exists?(project_category_id)
    end
  end

  def check_project_language(project_language_id)
    unless project_language_id == ''
      raise "project_language_id参数值无效." if project_language_id && !ProjectLanguage.exists?(project_language_id)
    end
  end

  def check_repository_name(user_id, repository_name)
    check_reversed_keyword(repository_name)
    raise "项目标识已被使用." if Repository.where(user_id: user_id, identifier: repository_name.strip).exists?
  end

  def check_project_name(user_id, project_name)
    raise "项目名称已被使用." if Project.where(user_id: user_id, name: project_name.strip).exists?
  end

  def check_reversed_keyword(repository_name)
    raise "项目标识已被占用." if ReversedKeyword.check_exists?(repository_name)
  end

  def check_password(password)
    password = strip(password)
    raise PasswordFormatError, "密码8~16位密码，支持字母数字和符号" unless password =~ CustomRegexp::PASSWORD
  end

  def check_password_confirmation(password, password_confirmation)
    password = strip(password)
    password_confirmation = strip(password_confirmation)

    raise PasswordFormatError, "确认密码为8~16位密码，支持字母数字和符号" unless password_confirmation =~ CustomRegexp::PASSWORD
    raise PasswordConfirmationError, "两次输入的密码不一致" unless password == password_confirmation
  end

  def check_verifi_code(verifi_code, code)
    code = strip(code)
    # return if code == "123123" # TODO 万能验证码，用于测试
    raise VerifiCodeError, "验证码已失效" if !verifi_code&.effective?
    raise VerifiCodeError, "验证码不正确" if verifi_code&.code != code
  end

  private
  def strip(str)
    str.to_s.strip.presence
  end
end
