class Users::AuthAttachmentsController < Users::BaseAccountController
  before_action :private_user_resources!
  before_action :convert_image!, only: [:create]

  def create
    image_temp_path = auth_image_path + 'temp' # 上传文件保存至临时文件，提交申请时再移到正常目录

    File.delete(image_temp_path) if File.exist?(image_temp_path) # 删除之前的临时文件

    Util.write_file(@image, image_temp_path)

    render_ok
  rescue StandardError => ex
    logger_error(ex)
    render_error('上传失败')
  end

  private

  def convert_image!
    max_size = EduSetting.get('upload_avatar_max_size') || 10 * 1024 * 1024 # 10M
    if params[:image].class == ActionDispatch::Http::UploadedFile
      @image = params[:image]
      render_error('请上传文件') if @image.size.zero?
      render_error('文件大小超过限制') if @image.size > max_size
    else
      image = params[:image].to_s.strip
      return render_error('请上传正确的图片') if image.blank?
      @image = Util.convert_base64_image(image, max_size: max_size)
    end
  rescue Base64ImageConverter::Error => ex
    render_error(ex.message)
  end

  def auth_image_path
    url_method = params[:type] == 'professional' ? :disk_professional_auth_filename : :disk_real_name_auth_filename
    ApplicationController.helpers.send(url_method, observed_user.id)
  end
end