class Admins::FilesController < Admins::BaseController
  before_action :convert_file!, only: [:create]

  def create
    File.delete(file_path) if File.exist?(file_path) # 删除之前的文件

    Util.write_file(@file, file_path)

    render_ok(
      source_id: params[:source_id],
      source_type: params[:source_type].to_s,
      suffix: params[:suffix].presence,
      url: file_url
    )
  rescue StandardError => ex
    logger_error(ex)
    render_error('上传失败')
  end

  private

  def convert_file!
    max_size = 10 * 1024 * 1024 # 10M
    if params[:file].class == ActionDispatch::Http::UploadedFile
      @file = params[:file]
      render_error('请上传文件') if @file.size.zero?
      render_error('文件大小超过限制') if @file.size > max_size
    else
      file = params[:file].to_s.strip
      return render_error('请上传正确的图片') if file.blank?
      @file = Util.convert_base64_image(file, max_size: max_size)
    end
  rescue Base64ImageConverter::Error => ex
    render_error(ex.message)
  end

  def file_path
    @_file_path ||= begin
      case params[:source_type].to_s
      when 'Shixun' then
        Util::FileManage.disk_filename('Shixun', params[:source_id], params[:suffix].presence)
      else
        Util::FileManage.disk_filename(params[:source_type].to_s, params[:source_id].to_s, params[:suffix].presence)
      end
    end
  end

  def file_url
    Util::FileManage.disk_file_url(params[:source_type].to_s, params[:source_id].to_s, params[:suffix].presence)
  end
end