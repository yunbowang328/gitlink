require 'uri'
require 'net/http'

class SyncEducoderShixunJob < ApplicationJob
  queue_as :default

  def perform(url, private_token, page, per_page)
    uri = URI("#{url}?page=#{page}&per_page=#{per_page}&private_token=#{private_token}")
    puts "-------url: #{uri}"
    response = Net::HTTP.get_response(uri)

    result = JSON.parse(response.body)

    if result['status'] != 0
      puts "======= 接口请求失败！"
      return
    end

    result['data']['repositories'].each do |re|
      next if re['repo_name'].blank?
      next if ProjectEducoder.exists?(repo_name: re['repo_name'])

      language = ProjectLanguage.find_by_name re['language']
      language = ProjectLanguage.create!(name: re['language']) if language.blank?

      category = ProjectCategory.find_by_name re['category']
      category = ProjectCategory.create!(name: re['category']) if category.blank?

      project_params =
        {
          name: re['name'],
          # user_id: params[:user_id],
          description: re['description'],
          project_category_id: category.id,
          project_language_id: language.id,
          is_public: true,
          # ignore_id: params[:ignore_id],
          # license_id: params[:license_id],
          identifier: re['repo_name'],
          platform: Project.platforms[:educoder]
        }

      project = Project.new(project_params)

      ActiveRecord::Base.transaction do
        if project.save!
          repo_params =
            {
              hidden: false,
              project_id: project.id,
              identifier: re['repo_name']
            }

          ProjectEducoder.create!(
            project_id: project.id,
            owner: re['username'],
            repo_name: re['repo_name'],
            forked_count: re['forked_count'],
            commit_count: re['commit_count'],
            image_url: re['image_url'])

          repo = Repository.new(repo_params)
          repo.save!

          puts "项目: #{re['name']} 同步成功"
        else
          puts "项目: #{re['name']} 同步失败"
        end
      end
    end
  end

end
