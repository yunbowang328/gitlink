class Admins::ImportUsersController < Admins::BaseController
  def create
    return render_error('请上传正确的文件') if params[:file].blank? || !params[:file].is_a?(ActionDispatch::Http::UploadedFile)

    result = Admins::ImportUserService.call(params[:file].to_io)
    render_ok(result)
  rescue Admins::ImportUserService::Error => ex
    render_error(ex)
  end
end