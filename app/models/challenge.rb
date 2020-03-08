class Challenge < ApplicationRecord
  # difficulty: 关卡难度: 1.简单 2.中等 3.困难
  # show_type: 效果展示：-1.无效果 1.图片 2.apk/exe 3.txt 4.html 5.mp3 6.mp4

  belongs_to :shixun, :touch => true, counter_cache: true
  belongs_to :user
  has_many :challenge_samples, :dependent => :destroy
  has_many :test_sets, :dependent => :destroy
  has_many :challenge_tags, :dependent => :destroy
  has_many :games, :dependent => :destroy
  has_many :challenge_chooses, :dependent => :destroy
  has_many :homework_challenge_settings, :dependent => :destroy
  has_many :praise_treads, as: :praise_tread_object, dependent: :destroy
  has_one :praise_tread_cache, as: :object, dependent: :destroy
  has_many :tidings
  # 参考答案
  has_many :challenge_answers, :dependent => :destroy
  has_many :exercise_bank_shixun_challenges, :dependent => :destroy
  # 回复
  has_many :discusses, :dependent => :destroy

  # acts_as_attachable

  scope :base_attrs, -> { select([:id, :subject, :position, :shixun_id, :st, :score, :path, :task_pass, :modify_time,
                                  :web_route, :answer, :exec_time, :praises_count]) }
  scope :choose_type, -> { where(st: 1) }
  scope :practice_type, -> { where(st: 0) }

  scope :fields_for_list, -> { select([:id, :subject, :st, :score, :position, :shixun_id]) }

  validates :task_pass, length: { maximum: 35000, too_long: "不能超过35000个字符" }


  after_commit :create_diff_record

  def next_challenge
    position = self.position + 1
    Challenge.where(:position => position, :shixun_id => self.shixun).first
  end

  # 用户关卡是否通关
  def has_passed?(user_id)
    self.games.present? && self.games.select{|game| game.user_id == user_id && game.status == 2}.length > 0
  end

  ## 选择题总分
  def choose_score
    self.score
    #self.challenge_chooses.pluck(:score).sum
  end

  def challenge_difficulty
    case difficulty
    when 1 then "简单"
    when 2 then "中等"
    when 3 then "困难"
    else ''
    end
  end

    # 关卡总分
  def all_score
    self.score
    # if self.st == 1
    #   self.choose_score
    # else
    #   self.score
    # end
  end

  # 开启挑战
  def open_game user_id, shixun
    game = self.games.where(user_id: user_id).first
    if game.present?
      shixun.task_pass || game.status != 3 ? "/tasks/#{game.identifier}" : ""
    else
      "/api/shixuns/#{shixun.identifier}/shixun_exec"
    end
  end

  # # 开启挑战
  # def open_game(user_id, shixun)
  #
  #
  #   game = self.games.select([:status, :identifier]).where(user_id: user_id).first
  #   game = self.games.select{|game| game.user_id == user_id}
  #   if game.present?
  #     shixun.task_pass || game.status != 3 ? "/tasks/#{game.identifier}" : ""
  #   else
  #     "/api/shixuns/#{shixun.identifier}/shixun_exec"
  #   end
  # end

  ## 用户关卡状态 0: 不能开启实训; 1:直接开启; 2表示已完成
  def user_tpi_status user_id
    # todo: 以前没加索引导致相同关卡,同一用户有多个games
    # 允许跳关则直接开启
    game = games.where(user_id: user_id).take
    if game.blank?
      position == 1 ? 1 : 0
    else
      if game.status == 3
        shixun.task_pass ? 1 : 0
      elsif game.status == 2
        2
      else
        1
      end
    end
  end

  def tags_show
    if self.challenge_tags.nil?
      "--"
    else
      self.try(:challenge_tags).map(&:name).join(";")
    end
  end

  ## 选择题答案
  def choose_answer
    result = []
    self.challenge_chooses.each do |choose|
      result << {:position => choose.position, :answer => (choose.answer.blank? ? choose.standard_answer : choose.answer)}
    end
  end

  # 关卡用户通关数
  def user_passed_count
    games.where(status: 2).count
  end

  # 关卡用户正在挑战的人数
  def playing_count
    games.where(status: [0, 1]).count
  end

  def last_challenge
    Challenge.find_by(position: position - 1, shixun_id: shixun_id)
  end

  # 关卡评测文件

  private

  def create_diff_record
    return unless task_pass_previously_changed?
    CreateDiffRecordJob.perform_later(User.current.id, id, 'Challenge', 'task_pass', task_pass_before_last_save, task_pass)
  end
end
