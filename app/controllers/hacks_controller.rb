class HacksController < ApplicationController
  before_action :require_login, except: [:index]
  before_action :find_hack, only: [:edit, :update, :publish, :start, :update_set, :delete_set, :destroy, :cancel_publish]
  before_action :require_teacher_identity, only: [:create]
  before_action :require_auth_identity, only: [:update, :edit, :publish, :update_set, :delete_set, :destroy, :cancel_publish]


  # 开启编程，如果第一次开启，创建一条记录，如果已经开启过的话，直接返回标识即可
  def start
    # 未发布的编程题，只能作者、或管理员访问
    start_hack_auth
    user_hack = @hack.hack_user_lastest_codes.where(user_id: current_user.id).first
    logger.info("#user_hack: #{user_hack}")
    identifier =
        if user_hack.present?
          logger.info("#####user_hack_id:#{user_hack.id}")
          user_hack.identifier
        else
          user_identifier = generate_identifier HackUserLastestCode, 12
          user_code = {user_id: current_user.id, code: @hack.code, modify_time: Time.now,
                       identifier: user_identifier, language: @hack.language}
          @hack.hack_user_lastest_codes.create!(user_code)
          user_identifier
        end
    render_ok(identifier: identifier)
  end

  # 首页
  def index
    # 筛选过滤与排序
    params_filter_or_order
    # 我解决的编程题数
    user_codes = HackUserLastestCode.joins(:hack).mine_hack(current_user).passed
    @simple_count = user_codes.where(hacks: {difficult: 1}).count
    @medium_count = user_codes.where(hacks: {difficult: 2}).count
    @diff_count = user_codes.where(hacks: {difficult: 3}).count
    @pass_count = @simple_count + @medium_count + @diff_count

    @hacks_count = @hacks.count("hacks.id")
    @hacks = paginate @hacks
  end

  def create
    begin
      logger.info("##########{hack_params}")
      tip_exception("一次只能增加50个测试集") if hack_sets_params.size > 50
      tip_exception("一次只能增加50个知识点") if params[:tags].size > 50
      hack = Hack.new(hack_params)
      hack.user_id = current_user.id
      hack.identifier = generate_identifier Hack, 8
      tag_params = params[:tags].map{|tag| {tag_discipline_id: tag}}
      ActiveRecord::Base.transaction do
        hack.save!
        # 创建测试集与代码
        hack.hack_sets.create!(hack_sets_params)
        # 新建知识点
        hack.tag_discipline_containers.create!(tag_params) if tag_params.present?
        hack_codes = hack.hack_codes.new(hack_code_params)
        hack_codes.modify_time = Time.now
        hack_codes.save!
        new_item_params = item_params.merge(container: hack, item_type: 'PROGRAM', difficulty: params[:hack][:difficult], user_id: current_user.id)
        ItemBank.create!(new_item_params)
      end
      render_ok({identifier: hack.identifier})
    rescue => e
      logger.error("########create_hack_error: #{e.message}")
      render_error("创建失败: #{e.message}")
    end
  end

  def update
    begin
      # 知识点
      tag_discipline_ids = @hack.tag_discipline_containers.pluck(:tag_discipline_id)
      new_tag_ids = params[:tags].to_a - tag_discipline_ids
      tag_params = new_tag_ids.map{|tag| {tag_discipline_id: tag}}
      ActiveRecord::Base.transaction do
        @hack.update_attributes!(hack_params)
        set_ids = @hack.hack_sets.pluck(:id)
        # 更新
        param_update_sets params[:update_hack_sets], set_ids
        # 新建
        @hack.hack_sets.create!(hack_sets_params)
        # 更新代码
        code_params = params[:hack_codes][:code] != @hack.code ? hack_code_params.merge(modify_time: Time.now) : hack_code_params
        @hack.hack_codes.first.update_attributes!(code_params)
        @hack.tag_discipline_containers.create!(tag_params) if tag_params
        @hack.tag_discipline_containers.where.not(tag_discipline_id: params[:tags]).destroy_all

        # 更新题库相关记录
        if @hack.item_bank.present?
          update_item_params = item_params.merge({difficulty: params[:hack][:difficult]})
          @hack.item_bank.update!(update_item_params)
        end
      end
      render_ok
    rescue Exception => e
      logger.error("####update_hack_error: #{e.message}")
      render_error("更新失败: #{e.message}")
    end
  end

  # 更新测试集接口
  def update_set
    set = @hack.hack_sets.find_by(id: params[:id])
    set.update_attributes!(hack_set_params)
    render_ok
  end

  # 单独删除测试集
  def delete_set
    set = @hack.hack_sets.find_by(id: params[:id])
    set.destroy!
    render_ok
  end

  # 发布功能
  def publish
    @hack.update_attribute(:status, 1)
    base_attrs = {
        trigger_user_id: current_user.id, viewed: 0, tiding_type: 'System', user_id: @hack.user_id,
        parent_container_type: "HackPublish", extra: @hack.identifier
    }
    @hack.tidings.create!(base_attrs)
    render_ok
  end

  # 取消发布
  def cancel_publish
    @hack.update_attribute(:status, 0)
    base_attrs = {
        trigger_user_id: current_user.id, viewed: 0, tiding_type: 'System', user_id: @hack.user_id,
        parent_container_type: "HackUnPublish", extra: @hack.identifier
    }
    @hack.tidings.create!(base_attrs)
    render_ok
  end

  # 发布列表
  def unpulished_list
    limit = params[:limit] || 16
    page = params[:page] || 1
    hacks = Hack.where(user_id: current_user.id, status: 0)
    @hacks_count = hacks.count
    @hacks = hacks.includes(:hack_sets).page(page).per(limit)
  end

  def edit;
  end

  def new;
  end

  def destroy
    begin
      base_attrs = {
          user_id: @hack.user_id, viewed: 0, tiding_type: 'System', trigger_user_id: current_user.id,
          parent_container_type: "HackDelete", extra: "#{@hack.name}"
      }
      @hack.tidings.create!(base_attrs)
      @hack.destroy
      render_ok
    rescue => e
      logger.error("####hack_delete_error: #{e.message}")
      render_error("删除失败")
    end

  end

  private

  # 实名认证老师，管理员与运营人员权限
  def require_teacher_identity
    unless current_user.certification_teacher? || admin_or_business?
      tip_exception(403, "..")
    end
  end

  # 只有自己，或者管理员才能更新
  def require_auth_identity
    unless @hack.user_id == current_user.id || admin_or_business?
      tip_exception(403, "..")
    end
  end

  def find_hack
    @hack = Hack.find_by_identifier(params[:identifier])
  end

  def hack_params
    params.require(:hack).permit(:name, :description, :difficult, :open_or_not, :time_limit, :score, :sub_discipline_id)
  end

  def item_params
    params.require(:hack).permit(:name, :sub_discipline_id)
  end

  def hack_sets_params
    params.permit(hack_sets: [:input, :output, :position])[:hack_sets]
  end

  def hack_set_params
    params.require(:hack_set).permit(:id, :input, :output, :position)
  end

  def hack_code_params
    params.require(:hack_codes).permit(:code, :language)
  end

  def publish_params
    params.require(:hack).permit(:difficult, :category, :open_or_not, :time_limit, :score)
  end

  def param_update_sets sets, all_sets_id
    delete_set_ids = all_sets_id - sets.map {|set| set[:id]}
    @hack.hack_sets.where(id: delete_set_ids).destroy_all
    logger.info("#######sets:#{sets}")
    sets.each do |set|
      logger.info("###set[:id]： #{set[:id]}")
      logger.info("###all_sets： #{all_sets_id.include?(set[:id])}")
      if all_sets_id.include?(set[:id])
        update_attrs = {input: set[:input], output: set[:output], position: set[:position]}
        @hack.hack_sets.find_by!(id: set[:id]).update_attributes!(update_attrs)
      end
    end
  end

  def params_filter_or_order
    # 如果有来源，就不管发布公开私有
    select_sql = "hacks.*, if(hacks.hack_user_lastest_codes_count=0, 0, hacks.pass_num/hacks.hack_user_lastest_codes_count) passed_rate"
    if params[:come_from]
      hacks = Hack.select(select_sql).mine(current_user.id)
    else
      # 全部包括已经发布的，和我的未发布的
      if current_user.admin_or_business?
        hacks = Hack.select(select_sql)
      else
        hacks = Hack.select(select_sql).published.opening.or(Hack.select(select_sql).unpublish.mine(current_user.id))
      end
    end
    # 搜索
    if params[:search]
      hacks = hacks.where("name like ?", "%#{params[:search]}%")
    end
    # 难度
    if params[:difficult]
      hacks = hacks.where(difficult: params[:difficult])
    end
    # 状态
    if params[:status]
      user_hacks = HackUserLastestCode.where(user_id: current_user.id)
      if params[:status].to_i == -1
        if user_hacks.present?
          hacks = hacks.where.not(id: user_hacks.pluck(:hack_id))
        end
      else
        hacks = hacks.joins(:hack_user_lastest_codes).where(hack_user_lastest_codes: {status: params[:status]})
      end
    end
    # 分类
    if params[:category]
      hacks = hacks.where(category: params[:category])
    end

    # 语言
    if params[:language]
      hacks = hacks.joins(:hack_codes).where(hack_codes: {language: params[:language]})
    end

    # 排序
    sort_by = params[:sort_by] || "hack_user_lastest_codes_count"
    sort_direction = params[:sort_direction] || "desc"
    @hacks = hacks.order("#{sort_by} #{sort_direction}")
  end

  def start_hack_auth
    return true if @hack.status == 1
    require_auth_identity
  end


end
