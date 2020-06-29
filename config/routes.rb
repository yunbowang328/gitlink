Rails.application.routes.draw do

  require 'sidekiq/web'
  require 'admin_constraint'
  # mount Sidekiq::Web => '/sidekiq'

  mount Sidekiq::Web => '/sidekiq', :constraints => AdminConstraint.new

  get 'attachments/download/:id', to: 'attachments#show'
  get 'attachments/download/:id/:filename', to: 'attachments#show'
  get 'auth/qq/callback', to: 'oauth/qq#create'
  get 'auth/failure', to: 'oauth/base#auth_failure'
  get 'auth/cas/callback', to: 'oauth/cas#create'
  resources :edu_settings

  scope '/api' do
    resources :composes do
      resources :compose_projects, only: [:create, :destroy]
    end
    resources :attachments do
      collection do
        delete :destroy_files
      end
    end
    get 'home/index'
    get 'home/search'
    get 'main/first_stamp'

    get 'search', to: 'searchs#index'
    put    'commons/hidden',      to: 'commons#hidden'
    put    'commons/unhidden',    to: 'commons#unhidden'
    delete 'commons/delete',      to: 'commons#delete'

    resources :issues, except: [:index, :new,:create, :update, :edit, :destroy] do
      resources :journals, only: [:index, :create, :destroy, :edit, :update] do
        member do
          get :get_children_journals
        end
      end
      resources :issue_times, only: [:create] do
        collection do
          post :end_work
        end
      end
      resources :issue_depends, only: [:create, :destroy]
    end

    resources :project_categories, only: [:index, :show] do
      get :group_list, on: :collection
    end
    resources :project_languages, only: [:index, :show]
    resources :ignores, only: [:index, :show]
    resources :licenses, only: [:index, :show]

    resources :watchers, only: [:index] do
      collection do
        post :follow
        delete :unfollow
        get :check_watch
      end
    end
    resources :projects do
      resources :hooks
      resources :pull_requests, except: [:destroy] do
        member do
          post :pr_merge
          # post :check_merge
          post :refuse_merge
        end
        collection do
          post :check_can_merge
          get :create_merge_infos
          get :get_branches
        end
      end
      resources :version_releases, only: [:index,:new, :create, :edit, :update, :destroy]
      resources :project_trends, only: [:index, :create]
      resources :issues do
        collection do
          get :commit_issues
          get :index_chosen
          post :clean
          post :series_update
        end
        member do
         post :copy
         post :close_issue
         post :lock_issue
        end
      end
      resources :issue_tags, only: [:create, :edit, :update, :destroy, :index]
      resources :versions do
        member do
          post :update_status
        end
      end

      resources :praise_tread, only: [:index] do
        collection do
          post :like
          delete :unlike
          get :check_like
        end
      end
      resources :members, only: [:index, :create] do
        collection do
          delete :remove
          put :change_role
        end
      end
      resources :forks, only: [:create]
      collection do
        post :migrate
        get :group_type_list
        post :watch
      end
      member do
        get :branches
        post :watch
        get :watch_users
        get :praise_users
        get :fork_users
        get :simple
      end
    end

    resources :accounts do
      collection do
        post :login
        post :register
        post :reset_password
        get :logout
        get :get_verification_code
        get :valid_email_and_phone
        post :remote_register
        post :remote_update
        post :remote_login
        post :remote_password
      end
    end

    resources :users do
      member do
        get :homepage_info
        get :projects
        get :watch_users
        get :fan_users
      end
      collection do
        post :following
        post :unfollow
        get :get_user_info
        get :attachment_show
        get :html_show
        get :get_navigation_info
        post :reply_message
        get :search_user_projects
        post :brief_introduction
        post :attendance
        get :system_update
        get :me
        get :list
        post :sync_token
        post :sync_gitea_pwd
        post :sync_salt
      end

      scope module: :users do
        # resources :courses, only: [:index]
        resources :projects, only: [:index]
        # resources :subjects, only: [:index]
        resources :project_packages, only: [:index]
        # 私信
        # resources :private_messages, only: [:index, :create, :destroy]
        # resources :recent_contacts, only: [:index]
        # resource :private_message_details, only: [:show]
        # resource :unread_message_info, only: [:show]
      end


      resources :projects, module: :users, only: [] do
        get :search, on: :collection
      end

      resources :tidings, only: [:index]

      scope module: :users do
        resource :interest, only: [:create]

        resources :accounts, only: [:show, :update] do
          resource :phone_bind, only: [:create]
          resource :email_bind, only: [:create]
          resource :password, only: [:update]
          resource :avatar, only: [:update]
          resource :auth_attachment, only: [:create]
          resource :authentication_apply, only: [:create, :destroy]
          resource :professional_auth_apply, only: [:create, :destroy]
          resources :open_users, only: [:destroy]
        end
      end
    end

    resources :repositories, only: [:index, :show, :edit] do
      member do
        get :entries
        match :sub_entries, :via => [:get, :put]
        get :commits
        post :files
        get :tags
        post :create_file
        put :update_file
        delete :delete_file
        post :repo_hook
        post :sync_mirror
        get 'commits/:sha', to: 'repositories#commit', as: 'commit'
      end
    end

    resources :users_for_private_messages, only: [:index]

    resources :files, only: [:index, :show, :update] do
      collection do
        delete :bulk_delete
        put :bulk_move
        post :bulk_send
        put :bulk_public
        get :public_with_course_and_project
        get :mine_with_course_and_project
        post :import
        post :upload
        put :bulk_publish
      end
      member do
        get :histories
      end
    end

    resources :courses do
      member do
        get 'settings', :action => 'settings', :as => 'settings'
        post 'set_invite_code_halt'
        post 'set_public_or_private'
        post 'search_teacher_candidate'
        post 'add_teacher'
        post 'create_graduation_group'
        post 'join_graduation_group'
        post 'set_course_group'
        post 'change_course_admin'
        post 'change_member_role'
        post 'change_course_teacher'
        post 'delete_course_teacher'
        post 'teacher_application_review'
        post 'transfer_to_course_group'
        post 'delete_from_course'
        post 'add_students_by_search'
        post 'create_group_by_importing_file'
        post 'duplicate_course'
        post 'visits_plus_one'
        get 'get_historical_courses'
        get 'get_historical_course_students'
        get 'course_group_list'
        get 'add_teacher_popup'
        get 'teachers'
        get 'apply_teachers'
        get 'graduation_group_list'
        get 'top_banner'
        get 'left_banner'
        get 'students'
        get 'all_course_groups'
        get 'search_users'
        get 'base_info'
        get 'attahcment_category_list'
        get 'export_member_scores_excel'  #导出课堂信息
        get 'export_couser_info'
        get 'export_member_act_score'
        post 'switch_to_teacher'
        post 'switch_to_assistant'
        post 'switch_to_student'
        post 'exit_course'
        get 'informs'
        post 'update_informs'
        post 'new_informs'
        delete 'delete_informs'
        get 'online_learning'
        post 'join_excellent_course'
        get 'tasks_list'
        post 'update_task_position'
        get 'course_groups'
        post 'join_course_group'
        get 'work_score'
        get 'act_score'
        get 'statistics'
        get 'course_videos'
        delete 'delete_course_video'
        post :inform_up
        post :inform_down
      end

      collection do
        post 'apply_to_join_course'
        post 'search_course_list'
        get 'board_list'
        get 'mine'
        get 'search_slim'
      end

      resources :course_stages, shallow: true do
        member do
          post :up_position
          post :down_position
        end
      end

      resources :course_groups, shallow: true do
        member do
          post 'rename_group'
          post 'move_category'
          post 'set_invite_code_halt'
        end
      end
    end


    resources :course_modules, shallow: true do
      member do
        get 'sticky_module'
        get 'hidden_module'
        post 'rename_module'
        post 'add_second_category'
      end
      collection do
        post 'unhidden_modules'
      end
    end

    resources :course_second_categories, shallow: true do
      member do
        post 'rename_category'
        post 'move_category'
      end
    end


    resources :repertoires, only: [:index]

    scope module: :projects do
      resources :project_applies, only: [:create]
    end


    namespace :wechats do
      resource :js_sdk_signature, only: [:create]
    end

    resource :template, only: [:show]
    resource :setting, only: [:show]

    get '/auth/qq/callback', to: 'oauth/qq#create'
    get '/auth/wechat/callback', to: 'oauth/wechat#create'
    resource :bind_user, only: [:create]

    resources :hot_keywords, only: [:index]

    namespace :weapps do
      resource :home, only: [:show]
      resource :session, only: [:create]
      resource :register, only: [:create]
      resource :verification_code, only: [:create]
      resource :code_session, only: [:create]
      resource :verify, only: [:create]
      resource :check_account, only: [:create]
      resource :unbind_accounts, only: [:show, :destroy]

      resources :searchs, only: [:index]
      resources :course_stickies, only: [:create] do
        post :cancel_sticky, on: :collection
      end

      resources :shixun_lists, only: [:index]
      resources :subjects, path: :paths, only: [:index, :create, :update, :edit, :show]
      resources :challenges do
        get :is_play, on: :member
      end

      resources :courses, only: [:create, :update, :edit, :show] do
        member do
          get :shixun_homework_category
          get :teachers
          get :students
          get :course_groups
          get :basic_info
          get :course_activities
          post :change_member_roles
          delete :delete_course_teachers
          delete :delete_course_students
        end

        collection do
          get :check_invite_code
        end
      end
    end
  end

  namespace :admins do
    get '/', to: 'dashboards#index'
    resources :project_statistics, only: [:index] do
      collection do
        get :visits_static
      end
    end
    resources :project_languages
    resources :project_categories
    resources :project_licenses
    resources :project_ignores
    resources :major_informations, only: [:index]
    resources :ec_templates, only: [:index, :destroy] do
      collection do
        post :create_template
      end
    end
    resources :graduation_standards, only: [:index, :destroy] do
      collection do
        post :create_standard
      end
    end
    resources :auth_schools, only: [:index, :destroy] do
      collection do
        get :search_school
        post :add_school
        get :search_manager
        post :add_manager
        post :remove_manager
      end

    end
    resources :dashboards, only: [:index] do
      collection do
        get :month_active_user
        get :evaluate
      end
    end
    resources :files, only: [:create]

    resources :daily_school_statistics, only: [:index] do
      get :export, on: :collection
    end

    resources :school_statistics, only: [:index] do
      get :contrast, on: :collection
    end

    resources :users, only: [:index, :edit, :update, :destroy] do
      member do
        post :reward_grade
        post :lock
        post :unlock
        post :active
        post :reset_login_times
      end
    end
    resource :import_disciplines, only: [:create]
    resource :import_users, only: [:create]
    resource :import_course_members, only: [:create]
    resources :user_statistics, only: [:index] do
      get :export, on: :collection
    end
    resources :library_applies, only: [:index] do
      member do
        post :agree
        post :refuse
      end
    end
    resources :video_applies, only: [:index] do
      member do
        post :agree
        post :refuse
      end
    end
    resources :identity_authentications, only: [:index] do
      member do
        post :agree
        post :refuse
        post :revoke
      end

      collection do
        post :batch_agree
      end
    end
    resources :professional_authentications, only: [:index] do
      member do
        post :agree
        post :refuse
        post :revoke
      end

      collection do
        post :batch_agree
      end
    end
    resources :shixun_authorizations, only: [:index] do
      member do
        post :agree
        post :refuse
      end
    end
    resources :subject_authorizations, only: [:index] do
      member do
        post :agree
        post :refuse
      end
    end
    resources :project_package_applies, only: [:index] do
      member do
        post :agree
        post :refuse
      end
    end
    resources :item_authentications, only: [:index, :show] do
      member do
        post :agree
        post :refuse
      end
    end
    resources :examination_authentications, only: [:index] do
      member do
        post :agree
        post :refuse
      end
    end
    resources :shixuns, only: [:index,:destroy]
    resources :shixun_settings, only: [:index,:update] do
      post :update_tag_repertoires, on: :member
    end
    resources :shixun_feedback_messages, only: [:index]
    resources :shixun_recycles, only: [:index, :destroy] do
      post :resume, on: :member
    end
    resources :shixun_modify_records, only: [:index]
    resources :department_applies,only: [:index,:destroy] do
      collection do
        post :merge
      end
      member do
        post :agree
      end
    end
    resources :unit_applies,only: [:index,:destroy,:edit,:update] do
      member do
        post :agree
      end
    end
    resources :mirror_repositories, only: [:index, :new, :create, :edit, :update, :destroy] do
      collection do
        post :merge
        get :for_select
      end
      resources :mirror_scripts, only: [:index, :new, :create, :edit, :update, :destroy]
    end
    resources :choose_mirror_repositories, only: [:new, :create]
    resources :schools, only: [:index, :destroy]
    resources :departments, only: [:index, :create, :edit, :update, :destroy] do
      resource :department_member, only: [:create, :destroy]
      post :merge, on: :collection
    end

    resource :about, only: [:edit, :update]
    resource :agreement, only: [:edit, :update]
    resource :help_center, only: [:edit, :update]
    resource :contact_us, only: [:edit, :update] do
      patch :update_address, on: :collection
    end
    resources :cooperatives, only: [:index, :create, :update, :destroy] do
      post :drag, on: :collection
      post :replace_image_url, on: :member
    end
    resources :laboratories, only: [:index, :create, :destroy, :update] do
      member do
        get :shixuns_for_select
        get :subjects_for_select
        get :synchronize_user
        post :update_sync_course
      end

      resource :laboratory_setting, only: [:show, :update]
      resource :laboratory_user, only: [:create, :destroy]

      resources :carousels, only: [:index, :create, :update, :destroy] do
        post :drag, on: :collection
      end

      resources :laboratory_shixuns, only: [:index, :create, :destroy] do
        member do
          post :homepage
          post :cancel_homepage
        end
      end
      resources :laboratory_subjects, only: [:index, :create, :destroy] do
        member do
          post :homepage
          post :cancel_homepage
        end
      end
    end

    resources :weapp_carousels, only: [:index, :create, :update, :destroy] do
      post :drag, on: :collection
    end
    resources :weapp_adverts, only: [:index, :create, :update, :destroy] do
      post :drag, on: :collection
    end

    resources :subject_settings, only: [:index, :update] do
      post :update_mobile_show, on: :collection
    end

    resources :subjects, only: [:index, :edit, :update, :destroy] do
      member do
        post :hide
        post :cancel_hide
        post :homepage_show
        post :cancel_homepage_show
        post :excellent
        post :cancel_excellent
      end
    end

    resources :partners, only: [:index, :create, :destroy] do
      resources :customers, only: [:index, :create, :destroy]
    end

    resources :course_lists, only: [:index, :destroy] do
      post :merge, on: :collection
    end

    resources :courses, only: [:index, :destroy, :update]

    resources :projects, only: [:index, :destroy]

    resources :disciplines, only: [:index, :create, :edit, :update, :destroy] do
      post :adjust_position, on: :member
    end
    resources :sub_disciplines, only: [:index, :create, :edit, :update, :destroy] do
      post :adjust_position, on: :member
    end
    resources :tag_disciplines, only: [:index, :create, :edit, :update, :destroy] do
      post :adjust_position, on: :member
    end

    resources :repertoires, only: [:index, :create, :edit, :update, :destroy]
    resources :sub_repertoires, only: [:index, :create, :edit, :update, :destroy]
    resources :tag_repertoires, only: [:index, :create, :edit, :update, :destroy]

    resources :salesmans, only: [:index, :create, :edit, :update, :destroy] do
      post :batch_add, on: :collection
    end
    resources :salesman_channels, only: [:index, :create, :edit, :update, :destroy] do
      post :batch_add, on: :collection
    end
    resources :salesman_customers, only: [:index, :create, :edit, :update, :destroy] do
      post :batch_add, on: :collection
    end
  end


  #git 认证回调
  match 'gitauth/*url', to: 'gits#auth', via: :all

  get 'oauth/get_code', to: 'oauth#get_code'
  get 'oauth/get_token_callback', to: 'oauth#get_token_callback'

  root 'main#index'


  ## react用
  get '*path', to: 'main#index', constraints: ReactConstraint.new
end
