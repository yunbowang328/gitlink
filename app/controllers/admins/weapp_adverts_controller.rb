class Admins::WeappAdvertsController < Admins::BaseController
  before_action :convert_file!, only: [:create]
  def index
    @adverts = WeappSettings::Advert.all
  end

  def create
    position = WeappSettings::Advert.count + 1

    ActiveRecord::Base.transaction do
      advert = WeappSettings::Advert.create!(create_params.merge(position: position))

      file_path = Util::FileManage.source_disk_filename(advert)
      File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
      Util.write_file(@file, file_path)
    end

    flash[:success] = '保存成功'
    redirect_to admins_weapp_adverts_path
  end

  def update
    current_advert.update!(update_params)
    render_ok
  end

  def destroy
    ActiveRecord::Base.transaction do
      current_advert.destroy!
      # 前移
      WeappSettings::Advert.where('position > ?', current_advert.position)
        .update_all('position = position - 1')

      file_path = Util::FileManage.source_disk_filename(current_advert)
      File.delete(file_path) if File.exist?(file_path)
    end
    render_delete_success
  end

  def drag
    move  = WeappSettings::Advert.find_by(id: params[:move_id])
    after = WeappSettings::Advert.find_by(id: params[:after_id])

    Admins::DragWeappAdvertService.call(move, after)
    render_ok
  rescue ApplicationService::Error => e
    render_error(e.message)
  end

  private

  def current_advert
    @_current_advert ||= WeappSettings::Advert.find(params[:id])
  end

  def create_params
    params.require(:weapp_settings_advert).permit(:link)
  end

  def update_params
    params.permit(:link, :online)
  end

  def convert_file!
    max_size = 10 * 1024 * 1024 # 10M
    file = params.dig('weapp_settings_advert', 'image')
    if file.class == ActionDispatch::Http::UploadedFile
      @file = file
      render_error('请上传文件') if @file.size.zero?
      render_error('文件大小超过限制') if @file.size > max_size
    else
      file = file.to_s.strip
      return render_error('请上传正确的图片') if file.blank?
      @file = Util.convert_base64_image(file, max_size: max_size)
    end
  rescue Base64ImageConverter::Error => ex
    render_error(ex.message)
  end
end