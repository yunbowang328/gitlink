class Gitlab::Client
  # Defines methods related to repositories.
  module Repositories

    def trees(project, options={})
      get "/projects/#{project}/repository/tree", query: options
    end
    alias_method :repo_trees, :trees

    def files(project, file_path, ref)
      get "/projects/#{project}/repository/files", query: {file_path: file_path, ref: ref}
    end
    alias_method :repo_files, :files

    def file_blob(project, options={})
      get("/projects/#{project}/repository/blobs", query: options)
    end
    # Gets a list of project repository tags.
    #
    # @example
    #   Gitlab.tags(42)
    #
    # @param  [Integer] project The ID of a project.
    # @param  [Hash] options A customizable set of options.
    # @option options [Integer] :page The page number.
    # @option options [Integer] :per_page The number of results per page.
    # @return [Array<Gitlab::ObjectifiedHash>]
    def tags(project, options={})
      get("/projects/#{project}/repository/tags", :query => options)
    end
    alias_method :repo_tags, :tags

    # Creates a new project repository tag.
    #
    # @example
    #   Gitlab.create_tag(42,'new_tag','master')
    #
    # @param  [Integer] project The ID of a project.
    # @param  [String]  tag_name The name of the new tag.
    # @param  [String]  ref The ref (commit sha, branch name, or another tag) the tag will point to.
    # @return [Gitlab::ObjectifiedHash]
    def create_tag(project, tag_name, ref)
      post("/projects/#{project}/repository/tags", body: {tag_name: tag_name, ref: ref})
    end
    alias_method :repo_create_tag, :create_tag

    # Gets a list of project commits.
    #
    # @example
    #   Gitlab.commits('viking')
    #   Gitlab.repo_commits('gitlab', :ref_name => 'api')
    #
    # @param  [Integer] project The ID of a project.
    # @param  [Hash] options A customizable set of options.
    # @option options [String] :ref_name The branch or tag name of a project repository.
    # @option options [Integer] :page The page number.
    # @option options [Integer] :per_page The number of results per page.
    # @option options [String] :search The obj of results's search value.
    # @return [Array<Gitlab::ObjectifiedHash>]
    def commits(project, options={})
      get("/projects/#{project}/repository/commits", :query => options)
    end
    alias_method :repo_commits, :commits

    # Gets a list of project commits.
    #
    # @example
    #   Gitlab.commits('viking')
    #   Gitlab.repo_commits('gitlab', :ref_name => 'api')
    #
    # @param  [Integer] project The ID of a project.
    # @param  [Hash] options A customizable set of options.
    # @option options [String] :ref_name The branch or tag name of a project repository.
    # @option options [Integer] :page The page number.
    # @option options [Integer] :per_page The number of results per page.
    # @return [Array<Gitlab::ObjectifiedHash>]
    def commits_total_count(project, options={})
      get("/projects/#{project}/repository/commits_total_count", :query => options)
    end
    alias_method :repo_commits, :commits_total_count

    # Gets total project commits.
    #
    # @example
    # @param  [Integer] project The ID of a project.
    # @param  [Hash] options A customizable set of options.
    # @option options [String] :rev The branch or tag name of a project repository.
    # @return [Hash<Gitlab::ObjectifiedHash>]
    def user_static(project, options={})
      get("/projects/#{project}/repository/user_static", :query => options)
    end

    def get_branch_commit_id(project, git_tree, ref_name)
      get("/projects/#{project}/repository/get_branch_commit_id?git_tree=#{git_tree}&ref_name=#{ref_name}")
    end


    # Gets a specific commit identified by the commit hash or name of a branch or tag.
    #
    # @example
    #   Gitlab.commit(42, '6104942438c14ec7bd21c6cd5bd995272b3faff6')
    #   Gitlab.repo_commit(3, 'ed899a2f4b50b4370feeea94676502b42383c746')
    #
    # @param  [Integer] project The ID of a project.
    # @param  [String] sha The commit hash or name of a repository branch or tag
    # @return [Gitlab::ObjectifiedHash]
    def commit(project, sha)
      get("/projects/#{project}/repository/commits/#{sha}")
    end
    alias_method :repo_commit, :commit

    # Gets a statics of project repository.
    #
    # @example
    #   Gitlab.commits('viking')
    #   Gitlab.repo_commits('gitlab', :ref_name => 'api')
    #
    # @param  [Integer] project The ID of a project.
    # @param  [Hash] options A customizable set of options.
    # @option options [String] :ref_name The branch or tag name of a project repository.
    # @option options [String] :creator The user name of a project repository.
    # @option options [Integer] :period Statistics over time. 1:total 2：one month 3：one week
    # @return [Array<Gitlab::ObjectifiedHash>]
    def rep_stats(project, options={})
      get("/projects/#{project}/repository/rep_stats", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    def rep_stats_week(project, options={})
      get("/projects/#{project}/repository/rep_stats_week", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    def rep_stats_month(project, options={})
      get("/projects/#{project}/repository/rep_stats_month", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    def rep_user_stats(project, options={})
      get("/projects/#{project}/repository/rep_user_stats", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    # static all users
    def admin_rep_stats_week(project, options={})
      get("/projects/#{project}/repository/admin_rep_stats_week", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    def admin_rep_stats_month(project, options={})
      get("/projects/#{project}/repository/admin_rep_stats_month", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    def admin_rep_stats_all(project, options={})
      get("/projects/#{project}/repository/admin_rep_stats_all", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    # Gets a tree activities of project repository.
    #
    # @example
    #   Gitlab.commits('viking')
    #   Gitlab.repo_commits('gitlab', :ref_name => 'api')
    #
    # @param  [Integer] project The ID of a project.
    # @param  [Hash] options A customizable set of options.
    # @option options [String] :ref_name The branch or tag name of a project repository.
    # @option options [String] :creator The user name of a project repository.
    # @option options [Integer] :period Statistics over time. 1:total 2：one month 3：one week
    # @return [Array<Gitlab::ObjectifiedHash>]
    def rep_last_changes(project, options={})
      get("/projects/#{project}/repository/rep_last_changes", :query => options)
    end
    alias_method :repo_rep_stats, :rep_stats

    # Get the diff of a commit in a project.
    #
    # @example
    #   Gitlab.commit_diff(42, '6104942438c14ec7bd21c6cd5bd995272b3faff6')
    #   Gitlab.repo_commit_diff(3, 'ed899a2f4b50b4370feeea94676502b42383c746')
    #
    # @param  [Integer] project The ID of a project.
    # @param  [String] sha The name of a repository branch or tag or if not given the default branch.
    # @return [Gitlab::ObjectifiedHash]
    def commit_diff(project, sha)
      get("/projects/#{project}/repository/commits/#{sha}/diff") 
    end
    alias_method :repo_commit_diff, :commit_diff

    # Get the commits count of each contributor in a project
    # @param [Integer] project the ID fo a project.
    # @return [Gitlab::ObjectifiedHash]
    def contributors(project)
      get("/projects/#{project}/repository/contributors")
    end

    # Get an archive of the repository
    # @param [Integer] project the ID fo a project.
    # sha (optional) - The commit SHA to download defaults to the tip of the default branch
    # @return [Gitlab::ObjectifiedHash]
    def project_archive(project, sha)
      get("/projects/#{project}/repository/archive?sha=#{sha}")
    end

    # update file
    def edit_file(project, username, options={})
      put("/projects/#{project}/repository/files?username=#{username}", :body => options)
    end

    alias_method :repo_project_archive, :project_archive
  end
end
