class HackUserLastestCodesController < ApplicationController
  before_action :require_login, except: [:listen_result]
  before_action :find_my_hack, only: [:show, :code_debug, :code_submit, :update_code, :sync_code, :add_notes,
                                      :listen_result, :result, :submit_records, :restore_initial_code]
  before_action :update_user_hack_status, only: [:code_debug, :code_submit]
  before_action :require_auth_identity, only: [:add_notes]
  before_action :require_manager_identity, only: [:show, :update_code, :restore_initial_code, :sync_code]
  skip_before_action :check_sign, only: [:listen_result]

  def show
    @my_hack.update_attribute(:submit_status, 0) if @my_hack.submit_status == 1
    @modify = @my_hack.modify_time.to_i < @hack.hack_codes.first.modify_time.to_i
  end

  def update_code
    @my_hack.update_attribute(:code, params[:code])
    render_ok
  end

  # 恢复初始代码
  def restore_initial_code
    @my_hack.update_attribute(:code, @hack.code)
  end

  # 同步代码
  def sync_code
    @my_hack.update_attributes(code: @hack.code, modify_time: Time.now)
  end

  # 调试代码
  def code_debug
    exec_mode = "debug"
    error_status = 501
    error_msg = "debug_error"
    oj_evaluate exec_mode, error_status, error_msg
    render_ok
  end

  # 提交
  def code_submit
    exec_mode = "submit"
    error_status = 502
    error_msg = "submit_error"
    oj_evaluate exec_mode, error_status, error_msg
    render_ok
  end

  # 提交结果显示
  def result
    if @my_hack.submit_status == 1
      render json: {status: 1, message: "正在评测中"}
    else
      @mode = params[:mode]
      @result =
          if @mode == "submit"
            @my_hack.hack_user_codes.last
          elsif @mode == "debug"
            @my_hack.hack_user_debug
          end
    end
  end

  # 提交记录
  def submit_records
    records = @my_hack.hack_user_codes
    @records_count = records.count
    @records = paginate records.created_order

  end

  # 提交记录详情
  def record_detail
    @hack_user = HackUserCode.find params[:id]
    set = HackSet.find_by(id: @hack_user.error_test_set_id)
    @pass_set_count = set ? set.position - 1 : 0
    @set_count = @hack_user.hack.hack_sets.count
    @my_hack = @hack_user.hack_user_lastest_code
  end

  # 接收中间件返回结果接口
  # 调试模式： status： 0 表示评测无错误，其他 表示错误（如编译出错，执行出错，超时等）
  def listen_result
    logger.info("###########listen_result：#{params}")
    begin
      ojEvaResult = JSON.parse(params[:ojEvaResult])
      testCase = ojEvaResult['testCase']
      # 只有编译出错时，才正则匹配错误行数
      error_line=
          if ojEvaResult['status'] == "4" || ojEvaResult['status'] == "5"
            regular_match_error_line ojEvaResult['outPut'], @my_hack.hack.language
          end
      # debug 与submit 公用的参数

      ds_params = {input: testCase['input'], output: testCase['output'], hack_id: @hack.id,
                   code: ojEvaResult['codeFileContent'], user_id: @my_hack.user_id, error_line: error_line,
                   status: ojEvaResult['status'], error_msg: ojEvaResult['outPut'],
                   execute_time: ojEvaResult['executeTime'], execute_memory: ojEvaResult['executeMem']}
      ActiveRecord::Base.transaction do
        # debug模式与submit模式
        if ojEvaResult['execMode'] == "debug"
          save_debug_data ds_params
        elsif ojEvaResult['execMode'] == "submit"
          save_submit_data ds_params.merge(expected_output: testCase['expectedOutput'],
                                           error_test_set_id: ojEvaResult['failCaseNum'])
        end
        # 评测完成后，还原评测中的状态
        @my_hack.update_attribute(:submit_status, 0)
      end
      render_ok
    rescue Exception => e
      logger.error("#########listen_result: #{e.message}")
    end

  end

  def add_notes
    @my_hack.update_attribute(:notes, params[:notes])
    render_ok
  end

  private
  def find_my_hack
    @my_hack = HackUserLastestCode.find_by(identifier: params[:identifier])
    @hack = @my_hack.hack
  end

  def oj_evaluate exec_mode, error_status, error_msg
    request_url = "#{edu_setting('cloud_bridge')}/bridge/ojs/evaluate"
    test_sets =
        if exec_mode == "submit"
          @hack.hack_sets.map{|set| {input: set.input, output: set.output, caseId: set.id}}
        else
          [{input: params[:input]}]
        end
    testCases = Base64.encode64(test_sets.to_json)
    #codeFileContent = Base64.urlsafe_encode64(@my_hack.code)
    debug_params = {execMode: exec_mode,
                    tpiID: @my_hack.identifier,
                    testCases: testCases,
                    platform: @my_hack.language,
                    codeFileContent: @my_hack.code,
                    timeLimit: @hack.time_limit,
                    sec_key: Time.now.to_i}
    interface_json_post request_url, debug_params, error_status, error_msg
    # 每次评测提交数增加
    @hack.increment!(:submit_num)
  end

  # 正则错误行数
  def regular_match_error_line content, language
    content =  Base64.decode64(content).force_encoding("utf-8")
    logger.info("######content: #{content}")
    case language
    when 'Java'
      content.scan(/.java.\d+/).map{|s| s.match(/\d+/)[0].to_i}.min
    when 'C', 'C++'
      content.scan(/\d:\d+:/).map{|s| s.match(/\d+/)[0].to_i}.min
    when 'Python'
      content.scan(/line \d+/).map{|s| s.match(/\d+/)[0].to_i}.min
    end
  end

  # 存储debug数据
  def save_debug_data debug_params
    if @my_hack.hack_user_debug.present?
      @my_hack.hack_user_debug.update_attributes!(debug_params)
    else
      debug = HackUserDebug.new(debug_params)
      debug.hack_user_lastest_code_id = @my_hack.id
      debug.save!
    end
  end

  # 存储submit数据
  def save_submit_data submit_params
    # 通关
    if submit_params[:status] == "0"
      # 编程题已经发布，且之前未通关奖励积分
      @hack.increment!(:pass_num)
      if @hack.status == 1 && !@my_hack.passed?
        reward_attrs = { container_id: @hack.id, container_type: 'Hack', score: @hack.score }
        RewardGradeService.call(@my_hack.user, reward_attrs)
        RewardExperienceService.call(@my_hack.user, reward_attrs)
        # 评测完成更新通过数
        @my_hack.update_attributes(passed: true, passed_time: Time.now)
      end
    end
    # 创建用户评测记录
    logger.info("###########submit_params:#{submit_params}")
    query_index = @my_hack.hack_user_codes.count +1
    @my_hack.hack_user_codes.create!(submit_params.merge(query_index: query_index))
  end

  # 调试或提交改变状态
  def update_user_hack_status
    @my_hack.update_attribute(:submit_status, 1)
  end

  # 只有自己才能改动代码
  def require_identity
    if @my_hack.user_id != current_user.id
      tip_exception(403, "..")
    end
  end

  # 老师、自己、管理可以查看他人的编程题
  def require_manager_identity
    unless current_user.certification_teacher? || admin_or_business? || @my_hack.user_id == current_user.id
      tip_exception(403, "..")
    end
  end

  # 只有自己才能评测
  def require_auth_identity
    unless @my_hack.user_id == current_user.id
      tip_exception(403, "..")
    end
  end

end
