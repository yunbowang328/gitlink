class DunCheck::PublicParams
  def initialize(type)                                                                                                                                      
    @type = type 
  end 

  def call
   
    public_params = {
      secretId: Redmine::Configuration['dun']['secretId'], 
      businessId: Redmine::Configuration['dun']["#{@type}_businessId"],
      timestamp: DateTime.current.strftime('%Q').to_i,
      nonce: rand(10 ** 11).to_i
    }
    return public_params
  end

  def generate_sign(params)
    secretkey = Redmine::Configuration['dun']['secretKey']
    sort_params = params.sort.to_h 
    sign_str = ""
    sort_params.each do |k,v|
      sign_str += "#{k.to_s}#{v.to_s}"
    end
    sign_str += secretkey
    md5_sign = Digest::MD5.hexdigest(sign_str.to_s.force_encoding("UTF-8"))
    return sort_params.merge!(signature: md5_sign)
  end

end


