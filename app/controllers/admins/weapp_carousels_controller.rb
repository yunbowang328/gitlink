class Admins::WeappCarouselsController < Admins::BaseController
  before_action :convert_file!, only: [:create]

  def index
    @carousels = WeappSettings::Carousel.all
  end

  def create
    position = WeappSettings::Carousel.count + 1

    ActiveRecord::Base.transaction do
      carousel = WeappSettings::Carousel.create!(create_params.merge(position: position))

      file_path = Util::FileManage.source_disk_filename(carousel)
      File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
      Util.write_file(@file, file_path)
    end

    flash[:success] = '保存成功'
    redirect_to admins_weapp_carousels_path
  end

  def update
    current_carousel.update!(update_params)
    render_ok
  end

  def destroy
    ActiveRecord::Base.transaction do
      current_carousel.destroy!
      # 前移
      WeappSettings::Carousel.where('position > ?', current_carousel.position)
        .update_all('position = position - 1')

      file_path = Util::FileManage.source_disk_filename(current_carousel)
      File.delete(file_path) if File.exist?(file_path)
    end
    render_delete_success
  end

  def drag
    move  = WeappSettings::Carousel.find_by(id: params[:move_id])
    after = WeappSettings::Carousel.find_by(id: params[:after_id])

    Admins::DragWeappCarouselService.call(move, after)
    render_ok
  rescue ApplicationService::Error => e
    render_error(e.message)
  end

  private

  def current_carousel
    @_current_carousel ||= WeappSettings::Carousel.find(params[:id])
  end

  def create_params
    params.require(:weapp_settings_carousel).permit(:link)
  end

  def update_params
    params.permit(:link, :online)
  end

  def convert_file!
    max_size = 10 * 1024 * 1024 # 10M
    file = params.dig('weapp_settings_carousel', 'image')
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