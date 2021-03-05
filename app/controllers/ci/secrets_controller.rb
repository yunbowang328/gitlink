class Ci::SecretsController < Ci::BaseController

  before_action :load_repo

  # 参数列表
  def index
    result = Ci::Drone::API.new(@ci_user.user_hash, ci_drone_url, params[:owner], params[:repo], nil).secrets
    @secrets = result
  end

  #新增、更新参数
  def create
    options = {
        name: params[:name],
        data: params[:data]
    }
    id = params[:id]
    if id
      result = Ci::Drone::API.new(@ci_user.user_hash, ci_drone_url, params[:owner], params[:repo], options).update_secret
      if result["id"]
        render_ok
      else
        render_error(result["message"])
      end
    else
      result = Ci::Drone::API.new(@ci_user.user_hash, ci_drone_url, params[:owner], params[:repo], options).create_secret
      if result["id"]
        render_ok
      else
        render_error(result["message"])
      end
    end
  end

  #删除参数
  def destroy
    name = params[:name]
    if !name.blank?
      Ci::Drone::API.new(@ci_user.user_hash, ci_drone_url, params[:owner], params[:repo], {name: name}).delete_secret
      render_ok
    else
      render_error("参数名不能为空")
    end
  rescue Exception => ex
    render_ok
  end

  def ci_drone_url
    ci_user = Ci::CloudAccount.find_by(account: params[:owner])
    ci_user&.drone_url
  end

end