class Admins::ContactUsController < Admins::BaseController
  def edit
    @cooperations = Cooperation.all.group(:user_type)
    @help = Help.first
  end

  def update
    cooperation = Cooperation.find(params[:id])
    cooperation.update!(update_cooperation_params)

    flash[:success] = '保存成功'
    redirect_to edit_admins_contact_us_path
  end

  def update_address
    help = Help.first || Help.create
    help.update!(status: params.dig('help', 'status'))

    flash[:success] = '保存成功'
    redirect_to edit_admins_contact_us_path
  end

  private

  def update_cooperation_params
    params.require(:cooperation).permit(:name, :qq, :mail)
  end
end