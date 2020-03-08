class Admins::AboutsController < Admins::BaseController
  def edit
    current_doc
  end

  def update
    current_doc.update!(about_us: params[:about_us])

    flash[:success] = '保存成功'
    redirect_to edit_admins_about_path
  end

  private

  def current_doc
    @doc ||= Help.first || Help.create
  end
end