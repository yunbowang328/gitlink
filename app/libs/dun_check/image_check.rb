class DunCheck::ImageCheck
    
  #检测结果，0：通过，1：嫌疑，2：不通过
  # include ActionView::Helpers::LoopTextsHelper

  require 'uri'
  require 'net/http'
  
  def initialize(image_params)                                                                                                                                      
    @image_params = image_params 
  end 

  def call
    begin
      Rails.logger.info("==========@image_params===========#{@image_params}")
      dun_params = check_dun_params(@image_params)
      
      api_url = EduSetting.get("dun_image_api")

      uri = URI.parse(api_url)

      http = Net::HTTP.new(uri.hostname, uri.port)
      if api_url.include?("https://")
        http.use_ssl = true
      end
      dun_params_str = URI.encode_www_form(dun_params)
     
      header = {'content-type':'application/x-www-form-urlencoded'}
      response = http.post(uri.path, dun_params_str, header)
      
      response_body = JSON.parse(response.body)
      if response_body["code"].to_i == 200 
        response_body_result = response_body["antispam"]
        response_lables = response_body_result[0]["labels"]
        return_sub_lable = ""
        if response_lables.present?
          return_sub_lable = get_sub_labels(response_lables)
        end
        render_status = response_body_result[0]["action"].to_i == 0 ? 1 : -1
        tip_status(render_status, return_sub_lable.present? ? "图片含有: #{return_sub_lable}" : response_body["msg"] )
      else
        tip_status(-1, response_body["msg"])
      end
    rescue Exception => ex
      Rails.logger.info "*** transaction abored!"
      Rails.logger.info "*** errors: #{ex.message}"
      tip_status(-1, "检测失败")
    end

  end

  private

  def check_dun_params(image_params)
    
    dun_public_params = DunCheck::PublicParams.new("image")
    check_params = {
      version: "v4",
      images: image_params.to_json
    }
    check_params.merge!(dun_public_params.call)
    dun_params = dun_public_params.generate_sign(check_params)
    
    return dun_params
  end

  def tip_status(status, message, msg_params={})
    return {status: status, message: message, extra_params: msg_params}
  end

  def get_sub_labels(labels)
    _sub_labels = []
    labels.each do |label|
      error_label = label["subLabels"].present? ? label["subLabels"][0]["subLabel"] : ""
      if error_label.present?
        _sub_labels.push(sub_lables[:"#{error_label.to_s}"])
      end
    end
    return _sub_labels.present? ? _sub_labels.join(",") : ""
  end

  def sub_lables
    {
      "10000": "色情",
      "10001": "女下体",
      "10002": "女胸",
      "10003": "男下体",
      "10004": "性行为",
      "10005": "臀部",
      "10006": "口交",
      "10007": "卡通色情",
      "10008": "色情人物",
      "10009": "儿童色情",
      "11000": "性感低俗",
      "11001": "亲吻",
      "11002": "腿部特写",
      "11003": "非漏点赤膊",
      "11004": "胸部",
      "100001": "色情文字-色情其他",
      "100002":	"色情文字-色情传播",
      "100003":	"色情文字-色情性器官",
      "100004":	"色情文字-色情挑逗",
      "100005":	"色情文字-色情低俗段子",
      "100006":	"色情文字-色情性行为",
      "100007":	"色情文字-色情舆情事件",
      "100008":	"色情文字-色情交友类",
      "20000":	"广告",
      "20001":	"广告带文字",
      "200009":	"广告文字-商业推广",
      "200010":	"广告文字-广告法",
      "200011":	"刷量行为",
      "200012":	"广告其他",
      "260052":	"广告文字-广告法-涉医疗用语",
      "260053":	"广告文字-广告法-迷信用语",
      "260054":	"广告文字-广告法-需要凭证",
      "260055":	"广告文字-广告法-限时性用语",
      "260056":	"广告文字-广告法-涉嫌诱导消费者",
      "260057":	"广告文字-广告法-涉嫌欺诈消费者",
      "260058":	"广告文字-广告法-法律风险较高",
      "260059":	"广告文字-广告法-极限词",
      "21000":	"二维码",
      "30000":	"暴恐",
      "30001":	"暴恐图集",
      "30002":	"暴恐旗帜",
      "30003":	"暴恐人物",
      "30004":	"暴恐标识",
      "30005":	"暴恐场景",
      "300016":	"暴恐文字-暴恐其他",
      "40000":	"违禁",
      "40001":	"违禁图集",
      "40002":	"违禁品",
      "40003":	"特殊标识",
      "40004":	"血腥模型",
      "40005":	"公职服饰",
      "40006":	"不文明",
      "40007":	"违禁人物",
      "40008":	"违禁场景",
      "40009":	"火焰",
      "40010":	"骷髅",
      "40011":	"货币",
      "40012":	"毒品",
      "400017":	"违禁文字-违禁其他",
      "600018":	"违禁文字-谩骂其他",
      "50000":	"涉政",
      "50001":	"涉政图集",
      "50002":	"中国地图",
      "50003":	"涉政人物",
      "50004":	"涉政旗帜",
      "50005":	"涉政标识",
      "50006":	"涉政场景",
      "500013":	"涉政文字-涉政其他",
      "500014":	"涉政文字-敏感专项",
      "500015":	"涉政文字-严格涉政",
      "500039":	"涉政文字-时事报道",
      "500040":	"涉政文字-领导人相关",
      "500041":	"涉政文字-英雄烈士相关",
      "500042":	"涉政文字-邪教迷信",
      "500043":	"涉政文字-落马官员相关",
      "500044":	"涉政文字-热点舆情",
      "500045":	"涉政文字-涉政综合",
      "90000":	"其他",
      "90002":	"自定义用户名单",
      "90003":	"自定义IP名单",
      "900020":	"文字违规-其他"
    }
  end
end
