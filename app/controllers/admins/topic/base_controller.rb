class Admins::Topic::BaseController < Admins::BaseController
  
  protected
  def save_image_file(file, topic)
    return unless file.present? && file.is_a?(ActionDispatch::Http::UploadedFile)

    file_path = Util::FileManage.source_disk_filename(topic, 'image')
    File.delete(file_path) if File.exist?(file_path) # 删除之前的文件
    Util.write_file(file, file_path)
  end
end