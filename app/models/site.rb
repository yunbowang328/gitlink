# == Schema Information
#
# Table name: sites
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  url        :string(255)
#  key        :string(255)
#  site_type  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Site < ApplicationRecord
  # add: 添加类链接
  # personal: 个人名下类链接,
  # common: 普通链接
  enum site_type: { add: 0, personal: 1, common: 2 }

  def self.set_default_menu
    set_add_menu!
    set_personal_menu!
    set_common_menu!
  end

  private
    def self.set_add_menu!
      adds= [
        {name: '新建镜像项目', key: 'add_mirror_project', url: '/projects/mirror/new'},
        {name: '新建托管项目', key: 'add_common', url: '/projects/deposit/new'},
        {name: '新建组织', key: 'add_r', url: '/organize/new'}]

      adds.each { |ele|
        Site.find_or_create_by(key: ele[:key]) do |site|
          site.name = ele[:name]
          site.url = ele[:url]
          site.site_type = Site.site_types[:add]
        end
      }
    end

    def self.set_personal_menu!
      personals = [
        {name: '个人中心', key: 'my_page', url: '/users/current_user'},
        {name: '我的组织', key: 'my_organizes', url: '/users/current_user/organizes'}
      ]

      personals.each { |ele|
        Site.find_or_create_by(key: ele[:key]) do |site|
          site.name = ele[:name]
          site.url = ele[:url]
          site.site_type = Site.site_types[:personal]
        end
      }
    end

    def self.set_common_menu!
      commons = [
        {name: '通知', key: 'notice', url: '/users/current_user/user_messages'},
        {name: '找回密码', key: 'lost_password', url: '/account/lost_password'},
        {name: '注册', key: 'register', url: '/register'}
      ]

      commons.each { |ele|
        Site.find_or_create_by(key: ele[:key]) do |site|
          site.name = ele[:name]
          site.url = ele[:url]
          site.site_type = Site.site_types[:common]
        end
      }
    end
end
