class Admins::CarouselsController < Admins::BaseController
  before_action :convert_file!, only: [:create]

  helper_method :current_laboratory

  def index
    @images = current_laboratory.portal_images.order(position: :asc)
  end

  def create
    position = current_laboratory.portal_images.count + 1

    ActiveRecord::Base.transaction do
      image = current_laboratory.portal_images.create!(create_params.merge(position: position))

      file_path = Util::FileManage.disk_filename('PortalImage', image.id)
      File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
      Util.write_file(@file, file_path)
    end

    flash[:success] = '保存成功'
    redirect_to admins_laboratory_carousels_path(current_laboratory)
  end

  def update
    current_image.update!(update_params)
    render_ok
  end

  def destroy
    ActiveRecord::Base.transaction do
      current_image.destroy!
      # 前移
      current_laboratory.portal_images.where('position > ?', current_image.position)
        .update_all('position = position - 1')

      file_path = Util::FileManage.disk_filename('PortalImage', current_image.id)
      File.delete(file_path) if File.exist?(file_path)
    end
    render_delete_success
  end

  def drag
    move  = current_laboratory.portal_images.find_by(id: params[:move_id])
    after = current_laboratory.portal_images.find_by(id: params[:after_id])

    Admins::DragPortalImageService.call(current_laboratory, move, after)
    render_ok
  rescue Admins::DragPortalImageService::Error => e
    render_error(e.message)
  end

  private

  def current_laboratory
    @_current_laboratory ||= Laboratory.find(params[:laboratory_id])
  end

  def current_image
    @_current_image ||= current_laboratory.portal_images.find(params[:id])
  end

  def create_params
    params.require(:portal_image).permit(:name, :link)
  end

  def update_params
    params.permit(:name, :link, :status)
  end

  def convert_file!
    max_size = 10 * 1024 * 1024 # 10M
    file = params.dig('portal_image', 'image')
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
