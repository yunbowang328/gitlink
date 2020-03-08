class Admins::AuthSchoolsController < Admins::BaseController

  def index
    schools = School.where(ec_auth: 1).includes(:users).order("updated_at desc")
    @params_page = params[:page] || 1
    @schools = paginate schools
  end

  def destroy
    ActiveRecord::Base.transaction do
      school = School.where(id: params[:id]).first
      school.destroy
      render_success_js
    end
  end

  # 工程认证单位列表搜索学校
  def search_school
    @schools = School.where("ec_auth != 1 and name like '%#{params[:name]}%'").limit(10)
  end

  # 添加认证学校
  def add_school
    all_schools = School.all
    all_schools.where(id: params[:school_id]).update_all(ec_auth: 1)
    schools = all_schools.where(ec_auth: 1).order("updated_at desc")
    @params_page = params[:page] || 1
    @schools = paginate schools
  end

  # 搜索用户
  def search_manager
    school = School.find_by(id: params[:school_id])
    user_ids = school&.ec_school_users&.pluck(:user_id)
    @users = User.where.not(id: user_ids).where("concat(lastname, firstname) like ?", "%#{params[:name].strip.to_s}%").limit(10)
  end

  # 添加认证学校管理员
  def add_manager
    ActiveRecord::Base.transaction do
      user_ids = params[:user_id]
      @school_id = params[:school_id]
      user_ids.each do |id|
        EcSchoolUser.create(user_id: id, school_id: @school_id)
      end
      @school_users = User.where(id: user_ids)
    end
  end

  # 删除学校管理员
  def remove_manager
    ActiveRecord::Base.transaction do
      manager = EcSchoolUser.where(school_id: params[:school_id], user_id: params[:user_id]).first
      manager&.destroy
    end
  end

end