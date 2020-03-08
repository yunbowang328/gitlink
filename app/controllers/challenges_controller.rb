class ChallengesController < ApplicationController
  before_action :require_login, :check_auth, except: [:index]
  before_action :find_shixun, only: [:new, :create, :index]
  skip_before_action :verify_authenticity_token, only: [:create, :update, :create_choose_question, :crud_answer]
  before_action :find_challenge, only: [:edit, :show, :update, :create_choose_question, :index_down, :index_up,
                                        :edit_choose_question, :show_choose_question, :destroy_challenge_choose,
                                        :update_choose_question, :destroy, :crud_answer, :answer]
  # 关卡更新和操作的权限控制
  before_action :update_allowed, except: [:index]
  # 关卡访问的权限控制
  before_action :shixun_access_allowed, only: [:index]

  include ShixunsHelper
  include ChallengesHelper


  

  # 新建实践题
  def new
    @position = @shixun.challenges.count + 1
    @st = params[:st].to_i
    @task_pass_default = PlatformSample.find_by(samples_type: "taskPass").try(:contents)
  end

  # params
  #       challenge:{"subject": "标题", "task_pass": "过关任务",
  #                  "diffculty": "关卡难度", "score": "关卡分数", "st": "关卡类型"} 关卡相关信息
  #       challenge_tag: 关卡标签
  #
  def create
    ActiveRecord::Base.transaction do
      begin
        @challenge = Challenge.new(challenge_params)
        @challenge.position = @shixun.challenges.count + 1
        @challenge.shixun_id = @shixun.id
        @challenge.user_id = current_user.id
        @challenge.modify_time = Time.now
        @challenge.save!

        # 实训是否需要重置, 非实践任务创建第一个阶段调用, 避免不包含实践任务的实训进行模拟实战报错 todo: 新建实训需要重置TPI
        # shixun_modify_status_without_publish(@shixun, 1) if @challenge.position != 1

        tags = params[:challenge_tag]
        if tags.present?
            tags.each do |tag|
              # TODO 创建tag的时候为什么一直报challenge choose必须存在??
              ChallengeTag.create!(name: tag, challenge_id: @challenge.id)
            end
        end
      rescue Exception => e
        uid_logger_error("create challenge failed #{e}")
      end
    end
  end

  # 创建选择题
  def create_choose_question
    ActiveRecord::Base.transaction do
      begin
        @challenge_choose = ChallengeChoose.new(chooce_params)
        @challenge_choose.position = @challenge.challenge_chooses.count + 1
        @challenge_choose.category = @challenge_choose.standard_answer.length == 1 ? 1 : 2
        @challenge_choose.challenge_id = @challenge.id

        if @challenge_choose.save!
          # 创建选项
          params[:question][:cnt].each_with_index do |test, index|
            answer = params[:choice][:answer][index]
            ChallengeQuestion.create(:option_name => test,
                                     :challenge_choose_id => @challenge_choose.id,
                                     :position => index, :right_key => answer)
          end
          # 创建单选多选的技能标签
          if params[:challenge_tag].present?
            params[:challenge_tag].each do |tag|
              ChallengeTag.create(:name => tag, :challenge_choose_id => @challenge_choose.id, :challenge_id => @challenge.id)
            end
          end
          @challenge.update_column(:score, @challenge.challenge_chooses.sum(:score))
        end
      rescue Exception => e
        raise ActiveRecord::Rollback
      end
    end
  end

  # 选择题详情页面
  def show_choose_question
    @challenge_choose = ChallengeChoose.find params[:choose_id]

  end

  # 选择题更新页面
  def update_choose_question
    @challenge_choose = ChallengeChoose.find(params[:choose_id])
    ActiveRecord::Base.transaction do
      if params[:standard_answer] != @challenge_choose.standard_answer
        @challenge.update_column(:modify_time, Time.now)
      end
      @challenge_choose.update_attributes(chooce_params)
      @challenge.update_column(:score, @challenge.challenge_chooses.sum(:score))
      # 单选多选题的更新
      category = @challenge_choose.standard_answer.length > 1 ? 2 : 1
        @challenge_choose.update_column(:category, category)
      begin
        @challenge_choose.challenge_questions.delete_all
        params[:question][:cnt].each_with_index do |test, index|
          answer = params[:choice][:answer][index]
          ChallengeQuestion.create(:option_name => test, :challenge_choose_id => @challenge_choose.id, :position => index, :right_key => answer)
        end
        @challenge_choose.challenge_tags.delete_all unless @challenge_choose.challenge_tags.blank?
        if params[:challenge_tag].present?
          params[:challenge_tag].each do |tag|
            ChallengeTag.create(:name => tag, :challenge_choose_id => @challenge_choose.id, :challenge_id => @challenge.id)
          end
        end
        @challenge_choose = ChallengeChoose.find params[:choose_id]
      rescue Exception => e
        raise ActiveRecord::Rollback
      end
    end
  end

  # 选择题的编辑
  def edit_choose_question
    @challenge_choose = ChallengeChoose.find params[:choose_id]
  end

  def destroy_challenge_choose
    ActiveRecord::Base.transaction do
      @challenge_choose = ChallengeChoose.where(:id => params[:choose_id]).first
      pos = @challenge_choose.position
      @challenge.challenge_chooses.where("position > ?", pos).update_all("position = position - 1")
      @challenge_choose.destroy
      @status = 1
      # 发起重置请求 TODO: 重置实训需要后续做
      # shixun_modify_status_without_publish(@shixun, 1)
    end
  end

  # 编辑模式
  # tab 0,nil 过关任务, 1 评测设置, 2 参考答案
  def edit
    @tab = params[:tab].to_i
    @power =  @shixun.status == 0
    challenge_num = Challenge.where(:shixun_id => @shixun).count
    @position = @challenge.position
    @chooses = @challenge.challenge_chooses
    if @position < challenge_num
      @next_challenge = Challenge.where(:shixun_id => @shixun, :position => @position + 1).first
    end
    @prev_challenge = Challenge.where(:shixun_id => @shixun, :position => @position - 1).first if @position - 1 > 0
  end

  def index
    uid_logger("identifier: #{params}")

    @challenges = @shixun.challenges.fields_for_list

    @editable = @shixun.status == 0 # before_action：有判断权限，如果没发布，则肯定是管理人员
    @user = current_user
    @shixun.increment!(:visits)
  end

  

  def show
    @tab = params[:tab].nil? ? 1 : params[:tab].to_i
    challenge_num = @shixun.challenges_count
    @power = @shixun.status == 0 # 之前验证走过了是不是管理员，因此这里只用判断是否发布
    @position = @challenge.position
    if @position < challenge_num
      @next_challenge = Challenge.where(:shixun_id => @shixun, :position => @position + 1).first
    end
    @prev_challenge = Challenge.where(:shixun_id => @shixun, :position => @position - 1).first if @position - 1 > 0
  end

  # tab 0:过关任务的更新; 1:评测设置的更新; 2:表示参考答案的更新;
  def update
    begin
      ActiveRecord::Base.transaction do
        tab = params[:tab].to_i
        @challenge.update_attributes!(challenge_params)
        if tab == 0 && @challenge.st == 0
          @challenge.challenge_tags.delete_all
          if params[:challenge_tag].present?
            params[:challenge_tag].each do |input|
              ChallengeTag.create!(:name => input, :challenge_id => @challenge.id)
            end
          end
        elsif tab == 1
          path = @challenge.path
          exec_path = @challenge.exec_path
          test_set = @challenge.test_sets
          sets_output = test_set.map(&:output)
          sets_input = test_set.map(&:input)
          sets_open = test_set.map(&:is_public)
          set_score = test_set.map(&:score)
          set_match_rule = test_set.map(&:match_rule)
          params_hidden = params[:test_set].map{|set| set[:hidden].to_i == 0}
          params_output = params[:test_set].map{|set| set[:output] }
          params_input = params[:test_set].map{|set| set[:input] }
          params_score = params[:test_set].map{|set| set[:score]}
          params_test_set = params[:test_set].map{|set| set[:match_rule]}
          # 测试集变化则需要更新(输入、 输出、 是否隐藏)
          if sets_output != params_output || sets_open != params_hidden || sets_input != params_input ||
              set_score != params_score || params_test_set != set_match_rule
            test_set.delete_all unless test_set.blank?
            params[:test_set].each_with_index do |set, index|
              # last： 末尾匹配， full: 全完匹配
              logger.info("set: #{set}; match_rule : #{set[:match_rule]}")
              match_rule = set[:match_rule] == 'last' ? 'last' : 'full'
              TestSet.create!(:challenge_id => @challenge.id,
                             :input => "#{set[:input]}",
                             :output => "#{set[:output]}",
                             :is_public => params_hidden[index],
                             :score => set[:score],
                             :match_rule => "#{match_rule}",
                             :position => (index + 1))
            end
            @challenge.update_column(:modify_time, Time.now)
            # 测试集的
            @shixun.myshixuns.update_all(:system_tip => 0)
          end
          if params[:challenge][:show_type].to_i == -1
            @challenge.update_attributes(picture_path: nil, web_route: nil, expect_picture_path: nil, original_picture_path: nil)
          end
          # 关卡评测执行文件如果被修改，需要修改脚本内容
          logger.info("############shixun_publiced:#{@shixun.public == 0}")
          if @shixun.public == 0
            script = modify_shixun_script @shixun, @shixun.evaluate_script
            @shixun.shixun_info.update_column(:evaluate_script, script)
          end
          # TODO:
          # if path != params[:challenge][:path]
          #   shixun_modify_status_without_publish(@shixun, 1)
          # end
          #Attachment.attach_files(@challenge, params[:attachments])
        end

      end
    rescue Exception => e
      logger.error("##update_challenges: ##{e.message}")
      tip_exception("#{e.message}")
    end

  end

  # 参考答案的'增,删,改'
  # POST: /shixuns/:id/challenges/:id/crud_answer
  # {'challenge_answer': [
  #   {'name': 'name', contents: 'contents', score: 10},
  #   {...},
  #   {...}, ...]
  #}
  def crud_answer
    if @challenge.challenge_answers && params[:challenge_answer].blank?
      @challenge.challenge_answers.destroy_all
    else
      raise '参考答案不能为空' if params[:challenge_answer].empty?
      raise '占比之和必须为100%' if params[:challenge_answer].map{|a| a[:score]}.sum != 100
      ActiveRecord::Base.transaction do
        @challenge.challenge_answers.destroy_all if @challenge.challenge_answers
        params[:challenge_answer].each_with_index do |answer, index|
          # 内容为空不保存
          next if answer[:contents].blank?
          ChallengeAnswer.create!(name: answer[:name], contents: answer[:contents],
                                 level: index+1, score: answer[:score], challenge_id: @challenge.id)
        end
      end
    end
  end

  # 查看参考答案接口
  def answer
    @answers = @challenge.challenge_answers
  end

  def index_down
    next_challenge = @challenge.next_challenge
    position = @challenge.position
    @challenge.update_attribute(:position, (position + 1))
    next_challenge.update_attribute(:position, next_challenge.position - 1)
    # 关卡位置被修改，需要修改脚本
    script = modify_shixun_script @shixun, @shixun.evaluate_script
    @shixun.shixun_info.update_column(:evaluate_script, script)
  end

  def index_up
    position = @challenge.position
    last_challenge = @challenge.last_challenge
    @challenge.update_attribute(:position, (position - 1))
    last_challenge.update_attribute(:position, last_challenge.position + 1)
    # 关卡位置被修改，需要修改脚本
    script = modify_shixun_script @shixun, @shixun.evaluate_script
    @shixun.shixun_info.update_column(:evaluate_script, script)
  end

  def destroy
    next_challenges = @shixun.challenges.where("position > #{@challenge.position}")
    next_challenges.update_all("position = position - 1")
    # Todo: 实训修改后,关卡需要重置
    # shixun_modify_status_without_publish(@shixun, 1)
    @challenge.destroy
    # 关卡位置被删除，需要修改脚本
    script = modify_shixun_script @shixun, @shixun.evaluate_script
    @shixun.shixun_info.update_column(:evaluate_script, script)
  end


  private

  def find_shixun
    @shixun = Shixun.find_by_identifier(params[:shixun_identifier])
  end

  # 通用接口
  def find_challenge
    @challenge = Challenge.find params[:id]
    @shixun = Shixun.find_by!(identifier: params[:shixun_identifier])
  end

  def challenge_params
    tip_exception("评测时间不能超过300秒") if params[:challenge][:exec_time].to_i > 300
    params.require(:challenge).permit(:subject, :task_pass, :difficulty, :score, :st, :modify_time, :test_set_average,
                                      :path, :exec_path, :show_type, :original_picture_path, :test_set_score,
                                      :expect_picture_path, :picture_path, :web_route, :answer, :exec_time)
  end

  def chooce_params
    params.require(:challenge_choose).permit(:subject, :answer,
                                             :standard_answer, :score, :difficult)
  end

  def update_allowed
    unless current_user.manager_of_shixun?(@shixun)
      raise Educoder::TipException.new(403, "..")
    end
  end

end
