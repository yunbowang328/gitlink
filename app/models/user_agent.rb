class UserAgent < ApplicationRecord
  has_many :user_actionss, :foreign_key => "ip", :primary_key => "ip"
  USER_AD = 1  # 广告宣传的引流
  USER_REGISTER = 2 # 引流注册
  USER_COMPETITION = 3 # 引流参加竞赛
end
