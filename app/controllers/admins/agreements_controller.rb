class Admins::AgreementsController < Admins::BaseController
  def edit
    current_doc
  end

  def update
    current_doc.update!(agreement: params[:agreement])

    flash[:success] = '保存成功'
    redirect_to edit_admins_agreement_path
  end

  private

  def current_doc
    @doc ||= Help.first || Help.create
  end
end