#coding=utf-8
#
require 'net/http'
require 'uri'

class ReviewService
  @review_server_url = EduSetting.get('review_server_url')


  def self.logger
    @logger ||= Logger.new(File.join(Rails.root, "log", "review.log"), 'daily')
  end

  def self.root_url
    @review_server_url.presence || 'http://10.9.79.221:80'
  end

  def self.postForm(action, map)
    Rails.logger.info("##################------action: #{action}")
    Rails.logger.info("##################------action: #{map}")
    begin
      uri = URI.parse("#{root_url}/api/v1/#{action}")

      Rails.logger.info "请求url: #{uri}"
      Rails.logger.info "参数: "
      map.each do |k, v|
        Rails.logger.info "#{k}=>#{v}"
      end

      res = Net::HTTP.post_form uri, map
      body = res.body
      Rails.logger.info("返回: #{body}")
      content = JSON.parse(body)
      content
    rescue => e
      Rails.logger.error("post #{action}: exception #{e.message}")
    end
  end

  def self.postJson(action, params)
    begin
      uri = URI.parse("#{root_url}/api/v1/#{action}")
      https = Net::HTTP.new(uri.host, uri.port)
      https.use_ssl = root_url.start_with?('https')
      req = Net::HTTP::Post.new(uri.path, initheader = {'Content-Type' => 'application/x-www-form-urlencoded;charset=utf-8'})
      req.body = params.to_json
      res = https.request(req)
      body = res.body
      logger.info("--uri_exec: .....res is #{body}")
      content = JSON.parse(body)
      raise content["msg"] if content["code"] != 0

      content["data"]
    rescue Exception => e
      logger.error("--uri_exec: exception #{e.message}")
    end
  end


  class CheckResponse
    attr_accessor :status, :msg, :query_id

    def initialize(status, msg, query_id)
      @status = status
      @msg = msg
      @query_id = query_id
    end
  end

  #查重
  # 参数说明
  # user_list [
  #   {
  #   user_id: 1,
  #   code_info: [
  #     {
  #         "path": "src/step1/HelloWorld.java",
  #         "content: "ADAGWDSSAS22",
  #         "passed_time": "2016-01-08 00:00:00"
  #     },
  #   ]
  #   },
  # ]
  #
  # 返回说明
  #
  # {
  #   code: 0, 0 成功，其他失败
  #   msg: '', //失败时的错误消息
  #   query_id: '123123123', //本次查重的查询号
  # }
  #
  #
  def self.check(user_list = [], language='java')
    File.open("/tmp/check_codes_#{Time.now}.json", 'w+') do |f|
      f.write(user_list.to_json)
    end

    data = postForm('check_codes', {user_data: user_list.to_json, language: language})
    if data.nil?
      return CheckResponse.new(-1, "系统调用出错", "")
    end
    Rails.logger.info("@@@@@@@@@@@@@@@@------------#{data}")
    CheckResponse.new(data["status"], data["msg"], data["query_id"])
  end


  class QueryResultResponse
    UserList = Struct.new(:user_id, :target_user_id, :origin_path, :target_path, :rate)
    attr_accessor :status, :msg, :user_lists

    def initialize(status, msg, user_lists)
      @status, @msg, @user_lists = status, msg, []

      if user_lists.present?
        user_lists.each do |info|
          user = find_by_user_id_and_origin_path(info["user_id"], info["path"]["origin"])
          if !user.present?
            add_user_list(info)
          elsif user.rate < info["rate"]
            set_user_list(user, info)
          end
        end
      end
    end

    def set_user_list(user, obj)
      user.user_id = obj["user_id"]
      user.target_user_id = obj["target_user_id"]
      user.origin_path = obj["path"]["origin"]
      user.target_path = obj["path"]["target"]
      user.rate = obj["rate"]
    end

    def add_user_list(obj)
      user_list = UserList.new
      set_user_list(user_list, obj)
      @user_lists << user_list
    end

    def find_by_user_id_and_origin_path(user_id, origin_path)
      self.user_lists.each do |user|
        return user if user.user_id == user_id and user.origin_path == origin_path
      end
      nil
    end

  end


  class QueryDetailResultResponse
    CodeInfo = Struct.new(:origin_path, :target_path, :origin_content, :target_content, :target_user_id, :rate)


    attr_accessor :status, :msg, :code_info

    def initialize(status, msg, code_info)
      @status, @msg, @code_info = status, msg, []

      if code_info.present?
        code_info.each do |code|
          info = find_by_path(code["path"]["origin"])
          if !info.present?
            add_code_info(code)
          elsif info.rate < code["rate"]
            set_code_info(info, code)
          end
        end
      end
    end

    def set_code_info(info, obj)
      info.origin_path = obj["path"]["origin"]
      info.target_path = obj["path"]["target"]
      info.origin_content = obj["content"]["origin"]
      info.target_content = obj["content"]["target"]
      info.target_user_id = obj["target_user_id"]
      info.rate = obj["rate"]
    end

    def add_code_info(obj)
      info = CodeInfo.new
      set_code_info(info, obj)
      @code_info << info
    end

    def find_by_path(path)
      self.code_info.each do |code_info|
        return code_info if code_info.origin_path == path
      end
      nil
    end
  end


  #查询查重的结果
  #
  # 输入参数
  # query_id 待查询的ID
  # user_id 传入则查详情
  #
  # 文档参考 https://www.showdoc.cc/127895880302646?page_id=1271144663669096
  #
  def self.query_result(opt = {})
    unless opt[:query_id].present?
      logger.error "query_id没有传"
      return
    end

    if opt[:user_id].present?
      data = postForm('check_info', query_id: opt[:query_id], user_id: opt[:user_id])
      if data.nil?
        return QueryDetailResultResponse.new(-1, "系统调用出错", [])
      end

      response = QueryDetailResultResponse.new(data['status'], data['msg'], data["code_info"])
      return response

    else
      data = postForm('check_lists', query_id: opt[:query_id])
      if data.nil?
        return CheckResponse.new(-1, "系统调用出错", "")
      end

      response = QueryResultResponse.new(data['status'], data['msg'], data["user_lists"])
      return response

    end
  end

end