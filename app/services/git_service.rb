#coding=utf-8
#
# 文档在 https://www.showdoc.cc/127895880302646?page_id=1077512172693249
#
require 'faraday'

class GitService

  class << self

    ['add_repository', 'fork_repository', 'delete_repository', 'file_tree', 'update_file', 'file_content', 'commits',
     'add_tree', 'delete_file', 'update_file_base64'].each do |method|
      define_method method do |params|
        post(method, params)
      end
    end

    def make_new_multipar_file(full_file_path)
      Faraday::FilePart.new(full_file_path, 'application/octet-stream')
    end

    #上传二进制文件
    #参数构造形式
    # {a: 'a', file: make_new_multipar_file('1.txt') }
    def update_file_binary(params)
      post_form('update_file', params)
    end

    private

    def root_url
      new_git_address = EduSetting.get('git_address_domain')
      raise 'error: new_git_address not configuration' unless new_git_address.present?
      new_git_address
    end

    def logger
      Rails.logger
    end

    def post_form(action,params)
      conn = Faraday.new(root_url) do |f|
        f.request :multipart
        f.request :url_encoded
        f.adapter :net_http
      end

      resp = conn.post("/api/#{action}", params)

      body = resp.body
      parse_return(body)
    end

    def post(action, params)
      uri = URI.parse("#{root_url}/api/#{action}")
      https = Net::HTTP.new(uri.host, uri.port)
      https.use_ssl = root_url.start_with?('https')
      req = Net::HTTP::Post.new(uri.path, initheader = {'Content-Type' => 'text/plain;charset=utf-8'})
      req.body = params.to_json
      res = https.request(req)
      body = res.body

      parse_return(body)
    end

    def parse_return(body)
      #logger.info("--uri_exec: .....res is #{body}")

      content = JSON.parse(body)
      if content["code"] != 0
        logger.error("repository error: #{content['msg']}")
        raise("版本库异常")
      end
      #raise content["msg"] if content["code"] != 0

      content["data"]
    end
  end

end
