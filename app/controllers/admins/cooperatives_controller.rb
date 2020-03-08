class Admins::CooperativesController < Admins::BaseController
  before_action :convert_file!, only: [:create]

  def index
    @data = { 'alliance_coop' => [], 'com_coop' => [], 'edu_coop' => [] }
    @data = @data.merge CooImg.all.group_by(&:img_type)
  end

  def create
    position = CooImg.where(img_type: create_params[:img_type]).count + 1

    ActiveRecord::Base.transaction do
      coo = CooImg.create!(create_params.merge(position: position))

      file_path = Util::FileManage.disk_filename('CooImg', coo.id)
      File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
      Util.write_file(@file, file_path)

      coo.update!(url_states: Util::FileManage.disk_file_url('CooImg', coo.id))
    end

    flash[:success] = '保存成功'
    redirect_to admins_cooperatives_path
  end

  def update
    current_coo.update!(src_states: params[:url])
    render_ok
  end

  def destroy
    ActiveRecord::Base.transaction do
      current_coo.destroy!
      # 前移
      CooImg.where(img_type: current_coo.img_type).where('position > ?', current_coo.position)
        .update_all('position = position - 1')

      file_path = Util::FileManage.disk_filename('CooImg', current_coo.id)
      File.delete(file_path) if File.exist?(file_path)
    end
    render_delete_success
  end

  def drag
    move  = CooImg.find_by(id: params[:move_id])
    after = CooImg.find_by(id: params[:after_id])

    Admins::DragCooperativeService.call(move, after)
    render_ok
  rescue Admins::DragCooperativeService::Error => e
    render_error(e.message)
  end

  def replace_image_url
    current_coo.update!(url_states: Util::FileManage.disk_file_url('CooImg', current_coo.id))
    render_ok
  end

  private

  def current_coo
    @_current_coo ||= CooImg.find(params[:id])
  end

  def create_params
    params.require(:coo_img).permit(:img_type, :src_states)
  end

  def convert_file!
    max_size = 10 * 1024 * 1024 # 10M
    file = params.dig('coo_img', 'image')
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