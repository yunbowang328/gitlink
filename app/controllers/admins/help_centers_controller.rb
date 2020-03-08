class Admins::HelpCentersController < Admins::BaseController
  def edit
    current_doc
  end

  def update
    current_doc.update!(help_center: params[:help_center])

    flash[:success] = '保存成功'
    redirect_to edit_admins_help_center_path
  end

  private

  def current_doc
    @doc ||= Help.first || Help.create
  end
end