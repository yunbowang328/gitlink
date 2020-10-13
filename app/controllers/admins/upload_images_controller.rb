class Admins::UploadImagesController < Admins::BaseController
  def create 
    @attachment = Attachment.new(:file => request.raw_post)
    @attachment.author = User.current
    @attachment.filename = params[:filename].presence || Redmine::Utils.random_hex(16)
    if @attachment.save
      @status = 1
    else
      @status = -1
    end
    respond_to do |format|
      format.js
    end
  end
end