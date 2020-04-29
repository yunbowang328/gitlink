#coding=utf-8
#
#  文件上传
class AttachmentsController < ApplicationController
  before_action :require_login, :check_auth, except: [:show]
  before_action :find_file, only: %i[show destroy]
  before_action :attachment_candown, only: [:show]
  skip_before_action :check_sign, only: [:show, :create]

  include ApplicationHelper

  def show
    # 1. 优先跳到cdn
    # 2. 如果没有cdn，send_file
    if @file.cloud_url.present?
      update_downloads(@file)
      redirect_to @file.cloud_url and return
    end

    type_attachment = params[:disposition] || "attachment"
    if type_attachment == "inline"
      send_file absolute_path(local_path(@file)),filename: @file.title, disposition: 'inline',type: 'application/pdf'
    elsif type_attachment == "MP4"
      send_file_with_range absolute_path(local_path(@file)), disposition: 'inline', type: "video/mp4", range: true
    else
      send_file(absolute_path(local_path(@file)), filename: @file.title,stream:false, type: @file.content_type.presence || 'application/octet-stream')
    end
    update_downloads(@file)
  end

  def create
    # 1. 本地存储
    # 2. 上传到云
    begin
      upload_file = params["file"] || params["#{params[:file_param_name]}"]# 这里的file_param_name是为了方便其他插件名称
      uid_logger("#########################file_params####{params["#{params[:file_param_name]}"]}")
      raise "未上传文件" unless upload_file

      folder = edu_setting('attachment_folder')
      raise "存储目录未定义" unless folder.present?

      month_folder = current_month_folder
      save_path = File.join(folder, month_folder)

      ext = file_ext(upload_file.original_filename)

      local_path, digest = file_save_to_local(save_path, upload_file.tempfile, ext)

      content_type = upload_file.content_type.presence || 'application/octet-stream'

      # remote_path = file_save_to_ucloud(local_path[folder.size, local_path.size], local_path, content_type)
      remote_path = nil # TODO 暂时本地上传，待域名配置后方可上传至云端

      logger.info "local_path: #{local_path}"
      logger.info "remote_path: #{remote_path}"


      disk_filename = local_path[save_path.size + 1, local_path.size]
      #存数据库
      #
      @attachment = Attachment.where(disk_filename: disk_filename,
                                     author_id: current_user.id,
                                     cloud_url: remote_path).first
      if @attachment.blank?
        @attachment = Attachment.new
        @attachment.filename = upload_file.original_filename
        @attachment.disk_filename = local_path[save_path.size + 1, local_path.size]
        @attachment.filesize = upload_file.tempfile.size
        @attachment.content_type = content_type
        @attachment.digest = digest
        @attachment.author_id = current_user.id
        @attachment.disk_directory = month_folder
        @attachment.cloud_url = remote_path
        @attachment.save!
      else
        logger.info "文件已存在，id = #{@attachment.id}, filename = #{@attachment.filename}"
      end

      render_json
    rescue => e
      uid_logger_error(e.message)
      tip_exception(e.message)
    end
  end

  def destroy
    begin
      @file_path = absolute_path(local_path(@file))
      #return normal_status(403, "") unless @file.author == current_user
      @file.destroy!

      delete_file(@file_path)
      normal_status("删除成功")
    rescue Exception => e
      uid_logger_error(e.message)
      tip_exception(e.message)
      raise ActiveRecord::Rollback
    end
  end

  private
  def find_file
    @file =
      if params[:type] == 'history'
        AttachmentHistory.find params[:id]
      else
        Attachment.find params[:id]
      end
  end

  def delete_file(file_path)
    File.delete(file_path) if File.exist?(file_path)
  end

  def current_month_folder
    date = Time.now
    "#{date.year}/#{date.month.to_s.rjust(2, '0')}"
  end

  def file_ext(file_name)
    ext = ''
    exts = file_name.split(".")
    if exts.size > 1
      ext = ".#{exts.last}"
    end
    ext
  end

  def file_save_to_local(save_path, temp_file, ext)
    unless Dir.exists?(save_path)
      FileUtils.mkdir_p(save_path) ##不成功这里会抛异常
    end

    digest = md5_file(temp_file)
    digest = "#{digest}_#{(Time.now.to_f * 1000).to_i}"
    local_file_path = File.join(save_path, digest) + ext
    save_temp_file(temp_file, local_file_path)

    [local_file_path, digest]
  end

  def save_temp_file(temp_file, save_file_path)
    File.open(save_file_path, 'wb') do |f|
      temp_file.rewind
      while (buffer = temp_file.read(8192))
        f.write(buffer)
      end
    end
  end

  def md5_file(temp_file)
    md5 = Digest::MD5.new
    temp_file.rewind
    while (buffer = temp_file.read(8192))
      md5.update(buffer)
    end
    md5.hexdigest
  end

  def file_save_to_ucloud(path, file, content_type)
    ufile = Educoder::Ufile.new(
        ucloud_public_key: edu_setting('public_key'),
        ucloud_private_key: edu_setting('private_key'),
        ucloud_public_read: true,
        ucloud_public_bucket: edu_setting('public_bucket'),
        ucloud_public_bucket_host: edu_setting('public_bucket_host'),
        ucloud_public_cdn_host: edu_setting('public_cdn_host'),
    )
    File.open(file) do |f|
      ufile.put(path, f, 'Content-Type' => content_type)
    end
    edu_setting('public_cdn_host') + "/" + path
  end

  def attachment_candown
    unless current_user.admin? || current_user.business?
      candown = true
      unless params[:type] == 'history'
        if @file.container && current_user.logged?
          if @file.container.is_a?(Issue)
            course = @file.container.project
            candown = course.member?(current_user)
          elsif @file.container.is_a?(Journal)
            course = @file.container.issue.project
            candown = course.member?(current_user)
          else
            course = nil
          end
          tip_exception(403, "您没有权限进入") if course.present? && !candown
          tip_exception(403, "您没有权限进入") if @file.container.is_a?(ApplyUserAuthentication)
        end
      end
    end
  end

  def send_file_with_range(path, options = {})
    logger.info("########request.headers: #{request.headers}")
    logger.info("########request.headers: #{File.exist?(path)}")

    if File.exist?(path)
      size = File.size(path)
      logger.info("########request.headers: #{request.headers}")
      if !request.headers["Range"]
        status_code = 200 # 200 OK
        offset = 0
        length = File.size(path)
      else
        status_code = 206 # 206 Partial Content
        bytes = Rack::Utils.byte_ranges(request.headers, size)[0]
        offset = bytes.begin
        length = bytes.end - bytes.begin
      end
      response.header["Accept-Ranges"] = "bytes"
      response.header["Content-Range"] = "bytes #{bytes.begin}-#{bytes.end}/#{size}" if bytes
      response.header["status"] = status_code

      send_data IO.binread(path, length, offset), options
    else
      raise ActionController::MissingFile, "Cannot read file #{path}."
    end
  end

end
