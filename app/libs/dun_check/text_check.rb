class DunCheck::TextCheck
    
  # include DunCheck::PublicParams
  #text_params = {
  #   content: "ccc", #内容
  #   ip: "xxx", #用户ip
  #   account: "xxx", #登录login
  #   nickname: "xxx", #用户姓名
  #   title: "xxx", #帖子的标题
  # }

  #检测结果，0：通过，1：嫌疑，2：不通过
  # include ActionView::Helpers::LoopTextsHelper

  require 'uri'
  require 'net/http'
  
  def initialize(text_params)                                                                                                                                      
    @text_params = text_params 
  end 

  def call
    new_text_params = @text_params
    text_long_array = []
    check_content = new_text_params[:content]
    format_text(check_content,text_long_array)
    (1..text_long_array.size).each do |i|
      new_text_params.merge!(content: text_long_array[i-1])
      check_result = check_text(new_text_params)
      if check_result[:status].to_i == -1
        return check_result
        break
      else
        if i == text_long_array.size
          return check_result
        else
          next
        end
      end
    end
  end

  def check_text(text_params)
    begin
      dun_params = check_dun_params(text_params)
      
      # api_url = Redmine::Configuration['dun']['text_api']
      api_url = EduSetting.get("dun_text_api")
      uri = URI.parse(api_url)

      http = Net::HTTP.new(uri.hostname, uri.port)
      if api_url.include?("https://")
        http.use_ssl = true
      end
      dun_params_str = URI.encode_www_form(dun_params)
      header = {'content-type':'application/x-www-form-urlencoded'}
      response = http.post(uri.path, dun_params_str, header)
      response_body = eval(response.body)
      Rails.logger.info("======response========#{response_body}")
      
      if response_body[:code].to_i == 200 
        response_body_result = response_body[:result]
        response_body_labels = response_body_result[:labels].present? ? response_body_result[:labels][0] : []
        extra_params = {
          action: response_body_result[:action], 
          taskId: response_body_result[:taskId],
          infos: response_body_labels.present? ? sub_lables[:"#{response_body_labels[:subLabels][0][:subLabel]}"] : ""
        }
        render_status = response_body_result[:action].to_i == 0 ? 1 : -1
        tip_status(render_status, response_body[:msg], extra_params)
      else
        tip_status(-1, response_body[:msg])
      end
    rescue Exception => ex
      Rails.logger.info "*** transaction abored!"
      Rails.logger.info "*** errors: #{ex.message}"
      tip_status(-1, "检测失败")
  end

  end

  private

  def check_dun_params(text_params)
    dun_public_params = DunCheck::PublicParams.new("text")
    rand_data_id = random_dataId
    check_params = {
      dataId: rand_data_id,
      version: "v3.1",
      callback: rand_data_id
    }.merge(text_params)

    check_params.merge!(dun_public_params.call)
    dun_params = dun_public_params.generate_sign(check_params)
    return dun_params
  end

  def format_text(text_long, text_long_array)
    slice_content = text_long.slice(0..4998)
    last_slice_content =  text_long.slice(4999..-1)
    text_long_array.push(slice_content)
    if last_slice_content.present?
      if last_slice_content.length > 4999
        format_text(last_slice_content, text_long_array)
      else
        text_long_array.push(last_slice_content)
      end
    end
  end

  def random_dataId
    Digest::MD5.hexdigest(rand(100000000).to_s)
  end 

  def check_labels
    # 100：色情，200：广告，260：广告法，300：暴恐，400：违禁，500：涉政，600：谩骂，700：灌水
    %w(100 200 260 300 400 500 600 700).join(",")
  end

  def tip_status(status, message, msg_params={})
    return {status: status, message: message, extra_params: msg_params}
  end

  def sub_lables
    {
      "100001": "色情其他",
      "100002":	"色情传播",
      "100003":	"色情性器官",
      "100004":	"色情挑逗",
      "100005":	"色情低俗段子",
      "100006":	"色情性行为",
      "100007":	"色情舆情事件",
      "100008":	"色情交友类",
      "200009":	"商业推广",
      "200010":	"广告法",
      "200011":	"刷量行为",
      "200012":	"广告其他",
      "260052":	"广告法-涉医疗用语（非药品禁止宣传药效）",
      "260053":	"广告法-迷信用语",
      "260054":	"广告法-需要凭证（可以写但需要凭证证明）",
      "260055":	"广告法-限时性用语（可以写但必须有具体时间）",
      "260056":	"广告法-涉嫌诱导消费者",
      "260057":	"广告法-涉嫌欺诈消费者",
      "260058":	"广告法-法律风险较高",
      "260059":	"广告法-极限词（用语绝对化）",
      "300016":	"暴恐其他",
      "400017":	"违禁其他",
      "400021":	"违禁网监要求",
      "500013":	"涉政其他",
      "500014":	"敏感专项",
      "500015":	"严格涉政",
      "500039":	"时事报道",
      "500040":	"领导人相关",
      "500041":	"英雄烈士相关",
      "500042":	"邪教迷信",
      "500043":	"落马官员相关",
      "500044":	"热点舆情",
      "500045":	"涉政综合",
      "600018":	"谩骂其他",
      "700019":	"灌水其他",
      "900020":	"其他",
    }
  end
end
