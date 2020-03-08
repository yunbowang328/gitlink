module GitCommon

  extend ActiveSupport::Concern

  included do

  end


  # ------------------------
  # 版本库目录结构
  def repository
    begin
      @repo_url = repo_url @repo_path
      @trees = GitService.file_tree(repo_path: @repo_path, path: @path)
      logger.info("#11@@#@#@#@111#@@@@###{@trees}")

      # TPI(学员实训)不需要获取最近的一次提交
      if params[:controller] != "myshixuns" && @trees
        logger.info("#@@#@#@#@#@@@@###{@trees.try(:count)}")
        @latest_commit = [GitService.commits(repo_path: @repo_path).first]
        Rails.logger.info("########## #{@latest_commit}")
      end
    rescue Exception => e
      logger.error(e.message)
    end
  end

  def file_content
    @content = git_fle_content @repo_path, @path
  end

  # 版本库提交记录
  # Redo: commit接口需要按倒叙排列
  def commits
    begin
      @commits = GitService.commits(repo_path: @repo_path)
      logger.info("git first commit is #{@commits.try(:first)}")
      raise Educoder::TipException.new("请先创建版本库") if @commits.nil?
    rescue Exception => e
      uid_logger_error(e.message)
      raise Educoder::TipException.new("提交记录异常")
    end
  end

  # 为版本库添加文件
  def add_file
    @path, message, content = params[:path].strip, params[:message], params[:content]
    author_name, author_email = current_user.real_name, current_user.git_mail
    Rails.logger.info(" good repo_name is #{@repo_path}")
    @content = GitService.update_file(repo_path: @repo_path,
                                      file_path: @path,
                                      message: message.force_encoding('UTF-8'),
                                      content: content.force_encoding('UTF-8'),
                                      author_name: author_name,
                                      author_email: author_email)
  end

end