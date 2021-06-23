require 'oauth2'

class ApplicationController < ActionController::Base
	include CodeExample
	include RenderExpand
	include RenderHelper
	include ControllerRescueHandler
	include LaboratoryHelper
	include GitHelper
	include LoggerHelper
	include LoginHelper
	include RegisterHelper

	protect_from_forgery prepend: true, unless: -> { request.format.json? }

	before_action :check_sign
	before_action :user_setup
	#before_action :check_account

	# TODO
	# check sql query time
	before_action do
    if request.subdomain === 'testforgeplus' || request.subdomain === "profiler"
      Rack::MiniProfiler.authorize_request
    end
  end

	DCODES = %W(2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z)
	OPENKEY = "79e33abd4b6588941ab7622aed1e67e8"

	helper_method :current_user, :base_url

	# 所有请求必须合法签名
	def check_sign
		# if !Rails.env.development?
		# 	Rails.logger.info("66666  #{params}")
		# 	# suffix = request.url.split(".").last.split("?").first
		# 	# suffix_arr = ["xls", "xlsx", "pdf", "zip"] # excel文件先注释
		# 	# unless suffix_arr.include?(suffix)
		# 		if params[:client_key].present?
		# 			randomcode = params[:randomcode]
		# 			# tip_exception(501, "请求不合理") unless (Time.now.to_i - randomcode.to_i).between?(0,5)
		#
		# 			sign = Digest::MD5.hexdigest("#{OPENKEY}#{randomcode}")
		# 			Rails.logger.info("2222  #{sign}")
		# 			tip_exception(501, "请求不合理") if sign != params[:client_key]
		# 		else
		# 			tip_exception(501, "请求不合理")
		# 		end
		# 	# end
		# end
	end

	# 全局配置参数
	# 返回name对应的value
	def edu_setting(name)
		EduSetting.get(name)
	end

	# 平台身份权限判断（学生用户无权限）
	def identity_auth
		ue = current_user.user_extension
		tip_exception(403, "..") unless current_user.admin_or_business? || ue.teacher? || ue.professional?
	end

	# 平台已认证身份判断（已认证的老师和专业人士）
	def certi_identity_auth
		ue = current_user.user_extension
		tip_exception(403, "..") unless current_user.admin_or_business? ||
																									(current_user.professional_certification && (ue.teacher? || ue.professional?))
	end

	def shixun_marker
		unless current_user.is_shixun_marker? || current_user.admin_or_business?
			tip_exception(403, "..")
		end
	end

	# 实训的访问权限
	def shixun_access_allowed
		if !current_user.shixun_permission(@shixun)
			tip_exception(403, "..")
		end
	end

	def admin_or_business?
		User.current.admin? || User.current.business?
	end

	# 访问课堂时没权限直接弹加入课堂的弹框 ：409
	def user_course_identity
		@user_course_identity = current_user.course_identity(@course)
		if @user_course_identity > Course::STUDENT && @course.is_public == 0
			tip_exception(401, "..") unless User.current.logged?
			check_account
			tip_exception(@course.excellent ? 410 : 409, "您没有权限进入")
		end
		if @user_course_identity > Course::CREATOR && @user_course_identity <= Course::STUDENT && @course.tea_id != current_user.id
			# 实名认证和职业认证的身份判断
			tip_exception(411, "你的实名认证和职业认证审核未通过") if @course.authentication &&
				@course.professional_certification && (!current_user.authentication && !current_user.professional_certification)
			tip_exception(411, "你的实名认证审核未通过") if @course.authentication && !current_user.authentication
			tip_exception(411, "你的职业认证审核未通过") if @course.professional_certification && !current_user.professional_certification
		end
		uid_logger("###############user_course_identity:#{@user_course_identity}")
	end

	# 题库的访问权限
	def bank_visit_auth
		tip_exception(-2,"未通过职业认证") if current_user.is_teacher? && !current_user.certification_teacher? && !current_user.admin_or_business? && @bank.user_id != current_user.id && @bank.is_public
		tip_exception(403, "无权限") unless @bank.user_id == current_user.id || current_user.admin_or_business? ||
			(current_user.certification_teacher? && @bank.is_public)
	end


	# 判断用户的邮箱或者手机是否可用
	# params[:type] 1: 注册；2：忘记密码；3：绑定
	def  check_mail_and_phone_valid login, type
		unless login =~ /^[a-zA-Z0-9]+([._\\]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/ || login =~ /^1\d{10}$/ ||
					 login =~ /^[a-zA-Z0-9]+([._\\]*[a-zA-Z0-9])$/
			tip_exception(-2, "请输入正确的手机号或邮箱")
		end
		# 考虑到安全参数问题，多一次查询，去掉Union
		user = User.where(phone: login).first ||  User.where(mail: login).first
		if type.to_i == 1 && !user.nil?
			tip_exception(-2, "该手机号码或邮箱已被注册")
		elsif type.to_i == 2 && user.nil?
			tip_exception(-2, "该手机号码或邮箱未注册")
		elsif type.to_i == 3 && user.present?
			tip_exception(-2, "该手机号码或邮箱已绑定")
		end
		sucess_status
	end

	# 发送及记录激活码
	# 发送验证码：type 1：注册手机验证码 2：找回密码手机验证码 3：找回密码邮箱验证码 4：绑定手机 5：绑定邮箱
	# 6：手机验证码登录 7：邮箱验证码登录 8：邮箱注册验证码 9：验证手机号有效
	def check_verification_code(code, send_type, value)
		case send_type
		when 1, 2, 4, 9
			# 手机类型的发送
			sigle_para = {phone: value}
			status = Educoder::Sms.send(mobile: value, code: code)
			tip_exception(-2, code_msg(status)) if status != 0
		when 8, 3, 5
			# 邮箱类型的发送
			sigle_para = {email: value}
			# 60s内不能重复发送
			send_email_limit_cache_key = "send_email_60_second_limit:#{value}"
			tip_exception(-1, '请勿频繁操作') if Rails.cache.exist?(send_email_limit_cache_key)

			# 短时间内不能大量发送
			send_email_control = LimitForbidControl::SendEmailCode.new(value)
			tip_exception(-1, '邮件发送太频繁，请稍后再试') if send_email_control.forbid?
			begin
				UserMailer.register_email(value, code).deliver_now

				Rails.cache.write(send_email_limit_cache_key, 1, expires_in: 1.minute)
				send_email_control.increment!
				# Mailer.run.email_register(code, value)
			rescue Exception => e
				logger_error(e)
				tip_exception(-2,"邮件发送失败，请稍后重试")
			end
		end
		ver_params = {code_type: send_type, code: code}.merge(sigle_para)
		VerificationCode.create!(ver_params)
	end

	def code_msg status
		case status
		when 0
			"验证码已经发送到您的手机，请注意查收"
		when 8
			"同一手机号30秒内重复提交相同的内容"
		when 9
			"同一手机号5分钟内重复提交相同的内容超过3次"
		when 22
			"1小时内同一手机号发送次数超过限制"
		when 33
			"验证码发送次数超过频率"
		when 43
			"一天内同一手机号发送次数超过限制"
		when 53
			"手机号接收超过频率限制"
		end
	end

	def find_course
		return normal_status(2, '缺少course_id参数！') if params[:course_id].blank?
		@course = Course.find(params[:course_id])
		tip_exception(404, "") if @course.is_delete == 1 && !current_user.admin_or_business?
	rescue Exception => e
		tip_exception(e.message)
	end

	def course_manager
		return normal_status(403, '只有课堂管理员才有权限') if @user_course_identity > Course::CREATOR
	end

	def find_board
		return normal_status(2, "缺少board_id参数") if params[:board_id].blank?
		@board = Board.find(params[:board_id])
	rescue Exception => e
		uid_logger_error(e.message)
		tip_exception(e.message)
	end

	def validate_type(object_type)
		normal_status(2, "参数") if params.has_key?(:sort_type) && !SORT_TYPE.include?(params[:sort_type].strip)
	end

	def set_pagination
		@page  		 = params[:page] || 1
		@page_size = params[:page_size] || 15
	end

	# 课堂教师权限
	def teacher_allowed
		logger.info("#####identity: #{current_user.course_identity(@course)}")
		unless current_user.course_identity(@course) < Course::STUDENT
			normal_status(403, "")
		end
	end

	# 课堂教师、课堂管理员、超级管理员的权限(不包含助教)
	def teacher_or_admin_allowed
		unless current_user.course_identity(@course) < Course::ASSISTANT_PROFESSOR
			normal_status(403, "")
		end
	end

	def require_admin
		normal_status(403, "") unless User.current.admin?
	end

	def require_business
		normal_status(403, "") unless admin_or_business?
	end

	# 前端会捕捉401,弹登录弹框
	# 未授权的捕捉407，弹试用申请弹框
	def require_login
		#6.13 -hs

		tip_exception(401, "请登录后再操作") unless User.current.logged?
	end

	# 异常提醒
	def tip_exception(status = -1, message)
		raise Educoder::TipException.new(status, message)
	end

	def missing_template
		tip_exception(404, "...")
	end

	# 弹框提醒
	def tip_show_exception(status = -2, message)
		raise Educoder::TipException.new(status, message)
	end

	def normal_status(status = 0, message)
		case status
		when 403
			message = "您没有权限进行该操作"
		when 404
			message = "您访问的页面不存在或已被删除"
		end
		render :json => { status: status, message: message }
	end

	# 资料是否完善
	def check_account
		if !current_user.profile_completed?
			#info_url = '/account/profile'
			tip_exception(402, nil)
		end
	end

	# 系统全局认证(暂时隐藏试用申请的判断)
	def check_auth
		# day_cer = UserDayCertification.find_by(user_id: current_user.id)
		# # 如果注册超过24小时则需要完善资料及授权
		# if (Time.now.to_i - day_cer.try(:created_at).to_i) > 86400
		# 	if !current_user.profile_completed?
		# 		info_url = '/account/profile'
		# 		tip_exception(402, info_url)
		# 	elsif current_user.certification != 1
		# 		if current_user.apply_actions.exists?(container_type: 'TrialAuthorization', status: 0)
		# 			tip_exception(408, "您的试用申请正在审核中，请耐心等待")
		# 		end
		# 		tip_exception(407, "系统未授权")
		# 	end
		# end


		# if current_user.certification != 1 && current_user.apply_actions.exists?(container_type: 'TrialAuthorization', status: 0)
		# 	tip_exception(408, "您的试用申请正在审核中，请耐心等待")
		# elsif (Time.now.to_i - day_cer.try(:created_at).to_i) < 86400
		# 	if !current_user.profile_completed?
		# 		info_url = '/account/profile'
		# 		tip_exception(402, info_url)
		# 	elsif current_user.certification != 1
		# 		day_cer = UserDayCertification.find_by(user_id: current_user.id)
		# 		tip_exception(407, "系统未授权") unless (Time.now.to_i - day_cer.try(:created_at).to_i) < 86400
		# 	end
		# end
	end

	def user_setup
		# # reacct静态资源加载不需要走这一步
		#return if params[:controller] == "main"
		# Find the current user
		#Rails.logger.info("current_laboratory is #{current_laboratory} domain is #{request.subdomain}")
		User.current = find_current_user
		uid_logger("user_setup: " + (User.current.logged? ? "#{User.current.try(:login)} (id=#{User.current.try(:id)})" : "anonymous"))

		# 开放课程通过链接访问的用户
		if !User.current.logged? && !params[:chinaoocTimestamp].blank? && !params[:websiteName].blank? && !params[:chinaoocKey].blank?
			content = "#{OPENKEY}#{params[:websiteName]}#{params[:chinaoocTimestamp]}"

			if Digest::MD5.hexdigest(content) == params[:chinaoocKey]
				user = open_class_user
				if user
					start_user_session(user)
					set_autologin_cookie(user)
				end
				User.current = user
			end
		end

		# if !User.current.logged? && Rails.env.development?
		# 	User.current = User.find 1
		# end


		# 测试版前端需求
		logger.info("subdomain:#{request.subdomain}")
		if request.subdomain != "www"
			if params[:debug] == 'teacher' #todo 为了测试,记得讲debug删除
				User.current = User.find 81403
			elsif params[:debug] == 'student'
				User.current = User.find 8686
			elsif params[:debug] == 'admin'
				logger.info "@@@@@@@@@@@@@@@@@@@@@@ debug mode....."
				user =  User.find 36480
				User.current = user
				cookies.signed[:user_id] = user.id
			end
		end
		# User.current = User.find 81403
	end

	# Returns the current user or nil if no user is logged in
	# and starts a session if needed
	def find_current_user
		uid_logger("user setup start: session[:user_id] is #{session[:user_id]}")
		uid_logger("0000000000000user setup start: default_yun_session is #{default_yun_session}, session[:current_user_id] is #{session[:"#{default_yun_session}"]}")
		current_domain_session = session[:"#{default_yun_session}"]
		if current_domain_session
			# existing session
			User.current = (User.active.find(current_domain_session) rescue nil)
		elsif autologin_user = try_to_autologin
			autologin_user
		elsif params[:format] == 'atom' && params[:key] && request.get? && accept_rss_auth?
			# RSS key authentication does not start a session
			User.find_by_rss_key(params[:key])
		end
	end

	def try_to_autologin
		if cookies[autologin_cookie_name]
			# auto-login feature starts a new session
			user = nil
			Rails.logger.info("111111111111111111#{default_yun_session}, session is #{session[:"#{default_yun_session}"]} ")
			user = User.try_to_autologin(cookies[autologin_cookie_name], autologin_cookie_name)
			# start_user_session(user) if user # TODO 解决sso退出不同步的问题
			user
		end
	end

	def api_request?
		%w(xml json).include? params[:format]
	end

	def current_user
		User.current
	end

	## 默认输出json
	def render_json
		respond_to do |format|
      format.json
    end
	end

	## 输出错误信息
	def error_status(message = nil)
		@status = -1
		@message = message
	end

	# 实训等对应的仓库地址
	def repo_ip_url(repo_path)
		"#{edu_setting('git_address_ip')}/#{repo_path}"
	end

	def repo_url(repo_path)
		"#{edu_setting('git_address_domain')}/#{repo_path}"
	end

	# 通关后，把最后一次成功的代码存到数据库
	# type 0 创始内容， 1 最新内容
	# def game_passed_code(path, myshixun, game_id)
	# 	# 如果代码窗口是隐藏的，则不用保存代码
	# 	return if myshixun.shixun.hide_code || myshixun.shixun.vnc
	# 	file_content = git_fle_content myshixun.repo_path, path
	# 	#unless file_content.present?
	# 	#	raise("获取文件代码异常")
	# 	#end
	# 	logger.info("#######game_id:#{game_id}, file_content:#{file_content}")
	# 	game_code = GameCode.where(:game_id => game_id, :path => path).first
	# 	if game_code.nil?
	# 		GameCode.create!(:game_id => game_id, :new_code => file_content, :path => path)
	# 	else
	# 		game_code.update_attributes!(:new_code => file_content)
	# 	end
  # end

	# Post请求
	def uri_post(uri, params)
		begin
			uid_logger_dubug("--uri_exec: params is #{params}, url is #{uri}")
			uri = URI.parse(URI.encode(uri.strip))
			res = Net::HTTP.post_form(uri, params).body
			uid_logger_dubug("--uri_exec: .....res is #{res}")
			JSON.parse(res)
		rescue Exception => e
			uid_logger_error("--uri_exec: exception #{e.message}")
			raise Educoder::TipException.new("实训平台繁忙（繁忙等级：84）")
		end
	end

	#　处理返回非０就报错的请求
	def interface_post(uri, params, status, message)
		begin
			uid_logger_dubug("--uri_exec: params is #{params}, url is #{uri}")
			uri = URI.parse(URI.encode(uri.strip))
			res = Net::HTTP.post_form(uri, params).body
			uid_logger_dubug("--uri_exec: .....res is #{res}")
			res = JSON.parse(res)
			if (res && res['code'] != 0)
				tip_exception(status, message)
			else
				res
			end
		rescue Exception => e
			uid_logger("--uri_exec: exception #{e.message}")
			raise Educoder::TipException.new(message)
		end
	end

	# json格式请求
	def interface_json_post(uri, params, status, message)
		begin
			uid_logger_dubug("--uri_exec: params is #{params}, url is #{uri}")
			uri = URI.parse(URI.encode(uri.strip))
			res = Net::HTTP.start(uri.host, uri.port) do |http|
				req = Net::HTTP::Post.new(uri)
				req['Content-Type'] = 'application/json'
				req.body = params.to_json
				http.request(req)
			end
			uid_logger_dubug("--uri_exec: .....res is #{res.body}")
			res = JSON.parse(res.body)
			if (res && res['code'] != 0)
				tip_exception(status, message)
			else
				res
			end
		rescue Exception => e
			uid_logger("--uri_exec: exception #{e.message}")
			raise Educoder::TipException.new("服务器繁忙")
		end
	end


	# 适用与已经用url_safe编码后，回调字符串形式
	def tran_base64_decode64(str)
		s_size = str.size % 4
		if s_size != 0
			str += "=" * (4 - s_size)
		end
		if str.blank?
			str
		else
			Base64.decode64(str.tr("-_", "+/")).force_encoding("utf-8")
		end
	end

	def sucess_status(message = 'success')
		render :json => { status: 1, message: message }
	end

	# 随机生成字符
	def generate_identifier(container, num, pre='')
		code = DCODES.sample(num).join
		if container == User
			while container.exists?(login: pre+code) do
				code = DCODES.sample(num).join
			end
		else
			while container.exists?(identifier: code) do
				code = DCODES.sample(num).join
			end
		end
		code
	end


	# 实训主类别列表，自带描述
	def shixun_main_type
		list = []
		mirrors = MirrorRepository.select([:id, :type_name, :description, :name]).published_main_mirror
		mirrors.try(:each) do |mirror|
			list << {id: mirror.id, type_name: mirror.type_name, description: mirror.try(:description), mirror_name: mirror.name}
		end
		list
	end

	# 小类别列表
	def shixun_small_type
		list = []
		mirrors = MirrorRepository.select([:id, :type_name, :description, :name]).published_small_mirror
		mirrors.try(:each) do |mirror|
			list << {id: mirror.id, type_name: mirror.type_name, description: mirror.description, mirror_name: mirror.name}
		end
		list
	end

	def container_limit(mirror_repositories)
		container = []
		mirror_repositories.each do |mr|
			if mr.name.present?
				container << {:image => mr.name, :cpuLimit => mr.cpu_limit, :memoryLimit =>  "#{mr.memory_limit}M", :type => mr.try(:main_type) == "1" ? "main" : "sub"}
			end
		end
		container.to_json
	end

	# 实训中间层pod配置
	def shixun_container_limit shixun
		container = []
		shixun.shixun_service_configs.each do |config|
			mirror = config.mirror_repository
			if mirror.name.present?
				# 资源限制没有就传默认值。
				cpu_limit = config.cpu_limit.presence || 1
				cpu_request = config.lower_cpu_limit.presence || 0.1
				memory_limit = config.memory_limit.presence || 1024
				request_limit = config.request_limit.presence || 10
				resource_limit = config.resource_limit.presence || 10000
				container << {:image => mirror.name,
											:cpuLimit => cpu_limit,
											:cpuRequest => cpu_request,
											:memoryLimit => "#{memory_limit}M",
											:memoryRequest => "#{request_limit}M",
											:resourceLimit => "#{resource_limit}K",
											:type => mirror.try(:main_type) == "1" ? "main" : "sub"}
			end
		end
		container.to_json
	end

	# 毕设任务列表的赛选
	def course_work(task, **option)
		logger.info("#############{option}")
		course = task.course
		work_list = task.graduation_works.includes(user: [:user_extension])
		# 教师评阅搜索 0: 未评， 1 已评
		if option[:teacher_comment]
			graduation_work_ids = GraduationWorkScore.where(graduation_work_id: work_list.map(&:id)).pluck(:graduation_work_id)
			if option[:teacher_comment].zero?
				work_list  = work_list.where.not(id: graduation_work_ids)
			elsif option[:teacher_comment] == 1
				work_list = work_list.where(id: graduation_work_ids).where.not(work_status: 0)
			end
		end

		# 作品状态 0： 未提交， 1 按时提交， 2 延迟提交
		if option[:task_status]
			work_list = work_list.where(work_status: option[:task_status])
		end

		# 分班情况
		if option[:course_group]
			group_user_ids = course.course_members.where(course_group_id: option[:course_group]).pluck(:user_id)
			# 有分组只可能是老师身份查看列表
			work_list = work_list.where(user_id: group_user_ids)
		end

		# 只看我的交叉评阅
		if option[:cross_comment]
			graduation_work_id = task.graduation_work_comment_assignations.where(:user_id => current_user.id)
															 .pluck(:graduation_work_id).uniq if task.graduation_work_comment_assignations
			work_list = work_list.where(id: graduation_work_id)
		end

		# 输入姓名和学号搜索
		# TODO user_extension 如果修改 请调整
		if option[:search]
			work_list = work_list.joins(user: :user_extension).where("concat(lastname, firstname) like ?
                         or student_id like ?", "%#{option[:search]}%", "%#{option[:search]}%")
		end

		# 排序
		rorder = option[:order] || "updated_at"
		b_order = option[:b_order] || "desc"
		if rorder == "created_at" || rorder == "work_score"
			work_list = work_list.order("graduation_works.#{rorder} #{b_order}")
		elsif rorder == "student_id"
			work_list = work_list.joins(user: :user_extension).order("user_extensions.#{rorder} #{b_order}")
		end
		work_list
	end

	def strip_html(text, len=0, endss="...")
		ss = ""
		if !text.nil? && text.length>0
			ss=text.gsub(/<\/?.*?>/, '').strip
			ss = ss.gsub(/&nbsp;*/, '')
			ss = ss.gsub(/\r\n/,'')  #新增
			ss = ss.gsub(/\n/,'')  #新增
			if len > 0 && ss.length > len
				ss = ss[0, len] + endss
			elsif len > 0 && ss.length <= len
				ss = ss
				#ss = truncate(ss, :length => len)
			end
		end
		ss
	end

	# Returns a string that can be used as filename value in Content-Disposition header
	def filename_for_content_disposition(name)
		request.env['HTTP_USER_AGENT'] =~ %r{MSIE|Trident|Edge} ? ERB::Util.url_encode(name) : name
	end

	def format_time(time)
		time.blank? ? '' : time.strftime("%Y-%m-%d %H:%M")
	end

	# 获取Oauth Client
	def get_client(site)
		client_id = Rails.configuration.educoder['client_id']
		client_secret = Rails.configuration.educoder['client_secret']

		OAuth2::Client.new(client_id, client_secret, site: site)
	end

	def paginate(relation)
		limit = params[:limit] || params[:per_page]
		limit  = (limit.to_i.zero? || limit.to_i > 20) ? 20 : limit.to_i
		page   = params[:page].to_i.zero? ? 1 : params[:page].to_i
		offset = (page - 1) * limit

		if relation.is_a?(Array)
			relation[offset, limit]
		else
			relation.limit(limit).offset(offset)
		end
	end

	def kaminari_paginate(relation)
		limit = params[:limit] || params[:per_page]
		limit = (limit.to_i.zero? || limit.to_i > 15) ? 15 : limit.to_i
		page  = params[:page].to_i.zero? ? 1 : params[:page].to_i

		relation.page(page).per(limit)
	end

	def kaminari_array_paginate(relation)
		limit = params[:limit] || params[:per_page]
		limit = (limit.to_i.zero? || limit.to_i > 15) ? 15 : limit.to_i
		page  = params[:page].to_i.zero? ? 1 : params[:page].to_i

		Kaminari.paginate_array(relation).page(page).per(limit)
	end

	def strf_time(time)
		time.blank? ? '' : time.strftime("%Y-%m-%d %H:%M:%S")
	end

	def strf_date(date)
		date.blank? ? '' : date.to_date.strftime("%Y-%m-%d")
	end

	def logger_error(error)
		Rails.logger.error(error.message)
		error.backtrace.each { |msg| Rails.logger.error(msg) }
	end

	def find_user
		@user = User.find_by_login params[:login]
    render_not_found("未找到’#{params[:login]}’相关的用户") unless @user
	end

	def find_user_with_id
		@user = User.find_by_id params[:user_id]
    # render_not_found("未找到’#{params[:login]}’相关的用户") unless @user
		render_error("未找到相关的用户") unless @user
	end

	def find_repository
		@repo = @user.repositories.find_by_identifier params[:repo_identifier]
    render_not_found("未找到’#{params[:repo_identifier]}’相关的项目") unless @repo
	end

	def find_repository_by_id
		@repo = Repository.find params[:id]
	end

	def find_project
		project_id = params[:project_id] ? params[:project_id] : params[:id]
		project = Project.where(identifier: project_id)
		if project.exists?
			@project = project.first
		else
			@project = Project.find project_id
		end

		render_not_found("未找到’#{project}’相关的项目") unless @project
	end

	def find_project_with_id
		@project = Project.find(params[:project_id] || params[:id])
	rescue Exception => e
		logger_error(e.message)
		tip_exception(e.message)
	end

	def render_response(interactor)
		interactor.success? ? render_ok : render_error(interactor.error)
	end

	# projects
	def load_project
    namespace = params[:owner]
    id = params[:repo] || params[:id]

    @project, @owner = Project.find_with_namespace(namespace, id)

    if @project and current_user.can_read_project?(@project)
			logger.info "###########： has project and can read project"
			@project
    elsif @project && current_user.is_a?(AnonymousUser)
			logger.info "###########：This is AnonymousUser"
			@project = nil if !@project.is_public?
			render_forbidden and return
    else
			logger.info "###########：project not found"
      @project = nil
      render_not_found and return
    end
    @project
	end

	def load_repository
		@repository ||= load_project&.repository
	end

	def base_url
		Rails.application.config_for(:configuration)['platform_url'] || request.base_url
	end

  private
	def object_not_found
		uid_logger("Missing template or cant't find record, responding with 404")
		render json: {message: "您访问的页面不存在或已被删除", status: 404}
		false
	end

	def tip_show(exception)
		uid_logger("Tip show status is #{exception.status}, message is #{exception.message}")
		render json: exception.tip_json
	end

	def render_parameter_missing
		render json: { status: -1, message: '参数缺失' }
	end

	def set_export_cookies
		cookies[:fileDownload] = true
	end

	# 149课程的评审用户数据创建（包含创建课堂学生）
	def open_class_user
		user = User.find_by(login: "OpenClassUser")
		unless user
			ActiveRecord::Base.transaction do
				user_params = {status: 1, login: "OpenClassUser", lastname: "开放课程",
											 nickname: "开放课程", professional_certification: 1, certification: 1, grade: 0,
											 password: "12345678", phone: "11122223333", profile_completed: 1}
				user = User.create!(user_params)

				UserExtension.create!(user_id: user.id, gender: 0, school_id: 3396, :identity => 1, :student_id => "openclassuser") # 3396

				subject = Subject.find_by(id: 149)
				if subject
					subject.courses.each do |course|
						CourseMember.create!(course_id: course.id, role: 3, user_id: user.id) if !course.course_members.exists?(user_id: user.id)
					end
				end
			end
		end
		user
	end

	# 记录热门搜索关键字
	def record_search_keyword
		keyword = params[:keyword].to_s.strip
		return if keyword.blank? || keyword.size <= 1
		return unless HotSearchKeyword.available?

		HotSearchKeyword.add(keyword)
	end

end
