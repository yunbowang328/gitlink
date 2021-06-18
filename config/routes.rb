Rails.application.routes.draw do

  require 'sidekiq/web'
  require 'sidekiq/cron/web'
  require 'admin_constraint'

  # mount Sidekiq::Web => '/sidekiq', :constraints => AdminConstraint.new

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'

  get 'attachments/entries/get_file', to: 'attachments#get_file'
  get 'attachments/download/:id', to: 'attachments#show'
  get 'attachments/download/:id/:filename', to: 'attachments#show'

  get 'auth/qq/callback', to: 'oauth/qq#create'
  get 'auth/failure', to: 'oauth/base#auth_failure'
  get 'auth/cas/callback', to: 'oauth/cas#create'

  get 'oauth/bind', to: 'oauth/educoder#bind'
  get 'oauth/register', to: 'oauth#register'
  post 'oauth/auto_register', to: 'oauth#auto_register'

  resources :edu_settings

  scope '/api' do
    namespace :ci  do
      resources :languages, only: [:index, :show] do
        collection do
          get :common
        end
      end

      resources :templates, only: [:list,:templates_by_stage,:create,:update,:destroy,:show] do
        collection do
          get :list
          get :templates_by_stage
        end
      end

      resources :secrets do
      end

      resources :pipelines do
        collection do
          get :list
        end
        member do
          get :content
          get :stages
          post :create_stage
          post :create_trustie_pipeline
          delete :delete_stage, :path => ":stage_id/delete_stage", to: 'pipelines#delete_stage'
          put :update_stage, :path => ":stage_id/update_stage", to: 'pipelines#update_stage'
          get :stage_steps, :path => ":stage_id/steps", to: 'pipelines#steps'
          post :create_stage_step, :path => ":stage_id/create_step", to: 'pipelines#create_stage_step'
          post :stage_step, :path => ":stage_id/stage_step", to: 'pipelines#stage_step'
          delete :delete_stage_step, :path => ":stage_id/:step_id/delete_step", to: 'pipelines#delete_stage_step'
          put :update_stage_step, :path => ":stage_id/update_step", to: 'pipelines#update_stage_step'
        end
      end

      # resources :repos, only: :index do
      #   collection do
      #     get 'get_trustie_pipeline', to: 'builds#get_trustie_pipeline', as: 'get_trustie_pipeline'
      #     get ':number', to: 'builds#detail', as: 'detail'
      #     post ':number', to: 'builds#restart', as: 'restart'
      #     delete ':number', to: 'builds#delete', as: 'delete'
      #     get ':number/logs/:stage/:step', to: 'builds#logs', as: 'logs'
      #   end
      # end
    end

    resources :statistic, only: [:index] do
      collection do
        get :platform_profile
        get :platform_code
        get :active_project_rank
        get :active_developer_rank
      end
    end
    resources :sync_forge, only: [:create] do
      collection do
        post :sync_users
        post :sync_range_projects
      end
    end
    resources :composes do
      resources :compose_projects, only: [:create, :destroy]
    end
    resources :attachments do
      member do
        post :preview_attachment
      end
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

    resources :owners, only: [:index]

    scope module: :organizations do
      resources :organizations, except: [:edit, :new] do
        resources :organization_users, only: [:index, :destroy] do
          collection do
            delete :quit
          end
        end
        resources :teams, except: [:edit, :new] do
          collection do
            get :search
          end
          resources :team_users, only: [:index, :create, :destroy] do
            collection do
              delete :quit
            end
          end
          resources :team_projects, only: [:index, :create, :destroy] do ;end
        end
        resources :projects, only: [:index] do
          collection do
            get :search
          end
        end
        get :recommend, on: :collection
      end
    end

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

    resources :applied_projects, only: [:create]

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
      resources :praise_tread, only: [:index] do
        collection do
          post :like
          delete :unlike
          get :check_like
        end
      end

      collection do
        post :migrate
        get :group_type_list
        get :recommend
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
        post :change_password
      end
    end

    resources :users do
      member do
        get :homepage_info
        get :projects
        get :watch_users
        get :fan_users
        get :hovercard
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
        get :trustie_projects
        get :trustie_related_projects
        post :sync_user_info

        scope '/ci', module: :ci do
          scope do
            post(
              '/cloud_account/bind',
              to: 'cloud_accounts#bind',
              as: :bind_cloud_acclount
            )

            post(
                '/cloud_account/trustie_bind',
                to: 'cloud_accounts#trustie_bind',
                as: :trustie_bind_cloud_acclount
            )

            get(
              '/cloud_account',
              to: 'cloud_accounts#show',
              as: :get_cloud_account
            )

            delete(
              '/cloud_account/unbind',
              to: 'cloud_accounts#unbind',
              as: :unbind_cloud_acclount
            )

            get(
              'oauth_grant',
              to: 'cloud_accounts#oauth_grant',
              as: :ci_oauth_grant
            )
          end
        end
      end

      scope module: :users do
        resources :applied_messages, only: [:index]
        resources :applied_transfer_projects, only: [:index] do 
          member do 
            post :accept
            post :refuse
          end
        end
        resources :applied_projects, only: [:index] do 
          member do 
            post :accept
            post :refuse
          end
        end
        resources :headmaps, only: [:index]
        resources :is_pinned_projects, only: [:index, :update] do 
          collection do 
            post :pin 
          end
        end
        resources :statistics, only: [:index] do 
          collection do 
            get :activity 
            get :develop 
            get :role 
            get :major
          end
        end
        resources :project_trends, only: [:index]
        resources :organizations, only: [:index]
        # resources :projects, only: [:index]
        # resources :subjects, only: [:index]
        resources :project_packages, only: [:index]
        # 私信
        # resources :private_messages, only: [:index, :create, :destroy]
        # resources :recent_contacts, only: [:index]
        # resource :private_message_details, only: [:show]
        # resource :unread_message_info, only: [:show]
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

    # Project Area START
    scope "/:owner/:repo" do
      scope do
        get(
          '/activity',
          to: 'project_trends#index',
          as: :project_activity
        )
      end

      resource :projects, path: '/', except: [:show, :edit] do
        member do
          get :menu_list
          get :branches
          get :simple
          get :watchers, to: 'projects#watch_users'
          get :stargazers, to: 'projects#praise_users'
          get :members, to: 'projects#fork_users'
          match :about, :via => [:get, :put, :post]
        end
      end

      resource :repositories, path: '/', only: [:show, :create, :edit] do
        member do
          get :files
          get :detail
          get :archive
          get :entries
          match :sub_entries, :via => [:get, :put]
          get :commits
          get :tags
          get :contributors
          post :create_file
          put :update_file
          delete :delete_file
          post :repo_hook
          post :sync_mirror
          get :top_counts
          get 'commits/:sha', to: 'repositories#commit', as: 'commit'
          get 'readme'
          get 'languages'
        end
      end

      # protected_branches
      scope do
        get(
          '/protected_branches/',
          to: 'protected_branches#index'
        )
        get(
          '/protected_branches/:branch_name',
          to: 'protected_branches#show'
        )
        get(
          '/protected_branches/:branch_name/edit',
          to: 'protected_branches#edit'
        )
        delete(
          '/protected_branches/:branch_name',
          to: 'protected_branches#destroy'
        )
        post(
          '/protected_branches',
          to: 'protected_branches#create'
        )
        patch(
          '/protected_branches/:branch_name',
          to: 'protected_branches#update'
        )
      end

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

      # compare
      resources :compare, only: [:index, :create]
      get '/compare/:base...:head' => 'compare#show', :as => 'compare',
            :constraints => { base: /.+/, head: /.+/ }

      resources :pull_requests, :path => :pulls, except: [:destroy] do
        member do
          post :pr_merge
          # post :check_merge
          post :refuse_merge
          get :files
          get :commits
        end
        collection do
          post :check_can_merge
          get :create_merge_infos
          get :get_branches
        end
      end

      resources :versions, :path => :milestones do
        member do
          post :update_status
        end
      end

      resources :members, :path => :collaborators, only: [:index, :create] do
        collection do
          delete :remove
          put :change_role
        end
      end

      resources :hooks
      resources :forks, only: [:create]
      resources :project_trends, :path => :activity, only: [:index, :create]
      resources :issue_tags, :path => :labels, only: [:create, :edit, :update, :destroy, :index]
      resources :version_releases, :path => :releases, only: [:index,:new, :create, :edit, :update, :destroy]

      scope module: :ci do
        scope do
          match(
            'ci_authorize',
            to: 'projects#authorize',
            as: :ci_authorize,
            :via => [:get, :put]
          )
          get(
            'get_trustie_pipeline',
            to: 'projects#get_trustie_pipeline',
            as: :get_trustie_pipeline
          )
          put(
            'update_trustie_pipeline',
            to: 'projects#update_trustie_pipeline',
            as: :update_trustie_pipeline
          )
          post(
            'activate',
            to: 'projects#activate',
            as: :ci_activate_project
          )
          delete(
            'deactivate',
            to: 'projects#deactivate',
            as: :ci_deactivate_project
          )
        end

        resources :cloud_accounts, only: [:create] do
          member do
            post :activate
            delete :deactivate
          end
        end
        resources :builds, param: :build do
          member do
            post :restart
            delete :stop
            get '/logs/:stage/:step', to: 'builds#logs', as: 'logs'
          end
        end
      end

      scope module: :projects do
        resources :teams, only: [:index, :create, :destroy]
        resources :project_units, only: [:index, :create]
        resources :applied_transfer_projects, only: [:create] do 
          collection do 
            get :organizations
            post :cancel
          end
        end
        scope do
          get(
            '/blob/*id/diff',
            to: 'blob#diff',
            constraints: { id: /.+/, format: false },
            as: :blob_diff
          )
          get(
            '/blob/*id',
            to: 'blob#show',
            constraints: { id: /.+/, format: false },
            as: :blob
          )
          delete(
            '/blob/*id',
            to: 'blob#destroy',
            constraints: { id: /.+/, format: false }
          )
          put(
            '/blob/*id',
            to: 'blob#update',
            constraints: { id: /.+/, format: false }
          )
          post(
            '/blob/*id',
            to: 'blob#create',
            constraints: { id: /.+/, format: false }
          )
        end

        scope do
          get(
            '/raw/*id',
            to: 'raw#show',
            constraints: { id: /.+/, format: /(html|js)/ },
            as: :raw
          )
        end

        scope do
          get(
            '/blame/*id',
            to: 'blame#show',
            constraints: { id: /.+/, format: /(html|js)/ },
            as: :blame
          )
        end

        scope do
          get(
            '/tree/*id',
            to: 'tree#show',
            constraints: { id: /.+/, format: /(html|js)/ },
            as: :tree
          )
        end
      end
    end
    # Project Area END

    scope module: :helps do
      resources :faqs, only: [:index]
    end
  end

  namespace :admins do
    mount Sidekiq::Web => '/sidekiq'
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
    resources :faqs
    resources :laboratories, only: [:index, :create, :destroy, :update] do
      member do
        get :shixuns_for_select
        get :subjects_for_select
        get :synchronize_user
        post :update_sync_course
      end

      resource :laboratory_setting, only: [:show, :update, :new]
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
