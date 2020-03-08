class Myshixun < ApplicationRecord
  include ApplicationHelper
  has_many :games, :dependent => :destroy
  has_many :student_works
  has_one :shixun_modify, :dependent => :destroy

  belongs_to :user
  belongs_to :user_extension, foreign_key: :user_id
  belongs_to :shixun, counter_cache: true

  has_one :last_executable_task, -> { where(status: [0, 1]).reorder(created_at: :asc) }, class_name: 'Game'
  has_one :last_task, -> { all }, class_name: 'Game'

  validates_uniqueness_of :shixun_id, :scope => :user_id, :message => "shixun_id and user_id unique error"
  scope :finished, lambda { where(status: 1) }
  scope :search_myshixun_user, ->(user_id){where(user_id:user_id)}


  def owner
    self.user
  rescue ActiveRecord::RecordNotFound
  end

  def output_times
    games.map(&:evaluate_count).sum.to_i
  end

  def repo_path
    "#{self.repo_name}.git"
  end


  def repo_save_path
    self.repo_name.split('/').last
  end

  def is_complete?
    self.status == 1
  end

  # 判断TPM的代码是否被修改了
  # 判断依据是看tpm的最新提交记录和tpi数据库中存储的commit_id是否一致
  def repository_is_modified shixun_repo_path
    myshixun_commit_id = self.commit_id
    if myshixun_commit_id.blank?
      myshixun_commit_id = GitService.commits(repo_path: self.repo_path).last["id"]
      self.update_column(:commit_id, myshixun_commit_id)
    end
    shixun_commit_id = GitService.commits(repo_path: shixun_repo_path).first["id"]
    Rails.logger.warn("###############shixun_commit_id is #{shixun_commit_id}")
    Rails.logger.warn("###############myshixun_commit_id is #{self.commit_id}")
    result = myshixun_commit_id != shixun_commit_id ? true :false
    return result
  end

  def mirror_name
    self.shixun.mirror_repositories.map(&:type_name).blank? ? "" : self.shixun.mirror_repositories.map(&:type_name)
  end

  def main_mirror
    self.shixun.mirror_repositories.published_main_mirror.try(:first)
  end

  # 当前任务：一个实训中只可能一个未完成任务(status 0或1只会存在一条记录)
  # status:0 可以测评的; 1 正在测评的; 2评测通过的； 3未开启的
  # 如果都完成，则当前任务为最后一个任务
  def current_task games
    current_game = games.select{|game| game.status == 1 || game.status == 0}.last
    if current_game.blank?
      current_game = games.last
    end
    current_game
  end


  # 挑战至第几关（已完成关卡数+1）
  def exec_count
    gcount = self.games.select{|game| game.status == 2}.size
    gcount = gcount < self.games.size ? (gcount + 1) : gcount
  end

  # 个人实训得分
  def total_score
    self.games.select{|game| game.status == 2 && game.final_score > 0}.pluck(:final_score).sum.to_i
  end

  # 个人通关数
  def passed_count
    self.games.select{|game| game.status == 2}.size
  end

  # 指定时间前完成的关卡数
  def time_passed_count time
    time.present? ? self.games.select{|game| game.status == 2 && game.end_time < time}.size : 0
  end

  # 查看答案的关卡数，只统计通关前看的关卡
  def view_answer_count
    answer_ids = user.grades.joins("join games on grades.container_id = games.id").where("container_type = 'Answer' and games.status=2 and games.end_time > grades.created_at").pluck(:container_id)
    self.games.select{|game| game.status == 2 && game.answer_open != 0 && answer_ids.include?(game.id)}.size
  end

  # 通关时间
  def passed_time
    self.status == 1 ? self.games.select{|game| game.status == 2}.map(&:end_time).max : "--"
  end

  # 耗时
  def total_spend_time
    game_spend_time total_cost_time
  end

  # 通关总耗时
  def total_cost_time
    self.games.select{|game| game.status == 2}.map(&:cost_time).sum.to_i
  end

end
