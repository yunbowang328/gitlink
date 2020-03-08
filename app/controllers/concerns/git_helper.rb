module GitHelper
  extend ActiveSupport::Concern

  # 版本库目录空间
  def repo_namespace(user_login, shixun_identifier)
    "#{user_login}/#{shixun_identifier}.git"
  end

  # 版本库文件内容，带转码
  def git_fle_content(repo_path, path)
    begin
      Rails.logger.info("git file content: repo_path is #{repo_path}, path is #{path}")

      content = GitService.file_content(repo_path: repo_path, path: path)

      Rails.logger.info("git file content: content is #{content}")
      decode_content = nil
      if content.present?
        content = content["content"]   #6.24 -hs 这个为新增，因为当实训题里含有选择题时，这里会报错,undefined method `[]' for nil:NilClass

        content = Base64.decode64(content)
        cd = CharDet.detect(content)
        Rails.logger.info "encoding: #{cd['encoding']} confidence: #{cd['confidence']}"
        # 字符编码问题，GB18030编码识别率不行
        decode_content =
            if cd["encoding"] == 'GB18030' && cd['confidence'] > 0.8
              content.encode('UTF-8', 'GBK', {:invalid => :replace, :undef => :replace, :replace => ' '})
            else
              content.force_encoding('UTF-8')
            end
      end

      decode_content

    rescue Exception => e
      Rails.logger.error(e.message)
      raise Educoder::TipException.new("文档内容获取异常")
    end
  end

  # 更新文件代码
  # content：　文件内容；message：提交描述
  def update_file_content(content, repo_path, path, mail, username, message)
    #content = Base64.encode64(content)
    GitService.update_file(repo_path: repo_path, file_path: path, message: message,
                           content: content, author_name: username, author_email: mail)
  end

  def update_file_base64_content(content, repo_path, path, mail, username, message)
    content = Base64.encode64(content)
    GitService.update_file_base64(repo_path: repo_path, file_path: path, message: message,
                           content: content, author_name: username, author_email: mail)
  end

  # 添加目录
  def git_add_folder(folder_path, author_name, author_email, message)
    GitService.add_tree(file_path: folder_path, message: message, author_name: author_name, author_email: author_email)
  end

  # 删除文件
  def git_delete_file(file_path, author_name, author_email, message)
    GitService.delete_file(file_path: file_path, message: message, author_name: author_name, author_email: author_email)
  end

  # 版本库Fork功能
  def project_fork(container, original_rep_path, username)
    raise Educoder::TipException.new("fork源路径为空,fork失败!") if original_rep_path.blank?
    # 将要生成的仓库名字
    new_repo_name = "#{username.try(:strip)}/#{container.try(:identifier)}#{ Time.now.strftime("%Y%m%d%H%M%S")}"
    # uid_logger("start fork container: repo_name is #{new_repo_name}")
    GitService.fork_repository(repo_path: original_rep_path, fork_repository_path: (new_repo_name + ".git"))
    container.update_attributes!(:repo_name => new_repo_name)
  end

  #实训题的关卡url初始化
  def challenge_path(path)
    cha_path = path.present? ? path.split("；") : []
    cha_path.reject(&:blank?)[0].try(:strip)
  end
end