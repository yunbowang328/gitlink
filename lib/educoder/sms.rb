#coding=utf-8

require 'net/https'
require 'uri'

module  Educoder
  module Sms
    def self.send(opt={})
      Rails.logger.info "#{opt[:mobile]} - #{opt[:code]}"
      begin
        o = sendYunpian(opt[:mobile], opt[:code], opt[:send_type], opt[:name], opt[:user_name], opt[:result])
        if o["code"] != 0
          Rails.logger.error "发送短信出错: #{o['code']}--#{o['msg']}"
        end
        return o["code"]
      rescue => e
        Rails.logger.error "发送短信出错: #{e}"
        return false
      end
    end

    def self.notify_admin(opt)
      opt[:name]   = '管理员'
      opt[:mobile] = ENV['NOTIFY_ADMIN_PHONE'] || EduSetting.get('notify_admin_phone') || '18711085785'
      send(opt)
    end

    def self.sendYunpian(mobile, code, send_type, name, user_name, result)
      #修改为您的apikey.可在官网（http://www.yunpian.com)登录后用户中心首页看到
      apikey = EduSetting.get('sms_apikey')
      #指定模板发送接口HTTP地址
      send_tpl_sms_uri = URI.parse('https://sms.yunpian.com/v2/sms/single_send.json')

      params = {}
      params['apikey'] = apikey
      params['mobile'] = mobile
      params['text'] = ""
      if send_type.nil?
        params['text'] = "【Edu实训】" + code + "（手机验证码），有效期为10分钟。如非本人操作，请忽略。"
      elsif send_type == 'competition_start'
        params['text'] = "【Edu实训】亲爱的#{user_name}，你参与的#{name}将于#{result}开始，请及时参赛"
      elsif send_type == "teacher_register"
        params['mobile'] = EduSetting.get('teacher_register_phone') || '17680641960'
        params['text'] = "【Edu实训】亲爱的#{user_name}，有新的老师#{name}注册啦，请尽快处理"
      elsif send_type == 'subject_authorization' || send_type == 'shixun_authorization'
        params['text'] = "【Edu实训】亲爱的#{user_name}，您提交的#{name}#{send_type=='subject_authorization'?'实训路径':'实训'}发布申请#{result}，请登录平台查看详情"
      elsif send_type == 'authentication_pro' || send_type == 'authentication'|| send_type == 'trial_authorization' || send_type == 'project_info'
        params['text'] = "【Edu实训】亲爱的#{user_name}，您提交的#{send_type == 'authentication_pro'?'职业认证':(send_type == 'authentication'? '实名认证' : (send_type == 'project_info'?'加入申请':'试用申请' ))}#{result}，请登录平台查看详情"
      elsif send_type == "apply_pro_certification" || send_type == "apply_auth"
        params['text'] = "【Edu实训】亲爱的#{name}，有新的#{send_type == 'apply_pro_certification'?'职业':'实名'}认证申请，请尽快处理"
      elsif send_type == "publish_subject" ||send_type == "publish_shixun"|| send_type == "user_apply_auth" || send_type == "discuss"
        params['mobile'] = EduSetting.get('subject_shixun_notify_phone') || '18711011226' if send_type == "publish_subject" || send_type == "publish_shixun"
        params['text'] = "【Edu实训】亲爱的#{name}，有新的#{send_type == 'publish_subject'?'实训路径':(send_type == 'publish_shixun' ? '实训' : (send_type == 'discuss' ? '实训评论':'试用'))}申请发布，请尽快处理"
      elsif send_type == 'join_course_multi_role'
        params['text'] = "【Edu实训】亲爱的#{user_name}，您的课堂#{name}有助教或者教师申请加入，请尽快审核"
      elsif send_type == 'applied_project_info'
        params['text'] = "【Edu实训】亲爱的#{user_name}，您的项目#{name}有成员申请加入，请尽快审核"
      end

      http = Net::HTTP.new(send_tpl_sms_uri.host, send_tpl_sms_uri.port)
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      http.use_ssl = true
      begin
        request = Net::HTTP::Post.new(send_tpl_sms_uri.request_uri)
        request.set_form_data(params)
        request['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
        response = http.start { |http| http.request(request) }
        ActiveSupport::JSON.decode(response.body)
      rescue =>err
        Rails.logger.error("#############sendYunpian_error: #{err.message}")
        return nil
      end
    end
  end
end