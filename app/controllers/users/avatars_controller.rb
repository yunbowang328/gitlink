class Users::AvatarsController < Users::BaseAccountController
  before_action :private_user_resources!
  before_action :convert_base64_image!, only: [:update]

  def update
    Util.write_file(@image, avatar_path)

    # 首次上传头像
    RewardGradeService.call(observed_user, container_id: observed_user.id, container_type: 'Avatar', score: 100)

    render_ok(avatar_url: avatar_url)
  rescue StandardError => ex
    logger_error(ex)
    render_error('修改失败')
  end

  private

  def convert_base64_image!
    max_size = EduSetting.get('upload_avatar_max_size')
    @image = Util.convert_base64_image(params[:image].to_s.strip, max_size: max_size)
  rescue Base64ImageConverter::Error => ex
    render_error(ex.message)
  end

  def avatar_path
    ApplicationController.helpers.disk_filename(observed_user.class, observed_user.id)
  end

  def avatar_url
    ApplicationController.helpers.url_to_avatar(observed_user).to_s + "?#{Time.now.to_i}"
  end
end
