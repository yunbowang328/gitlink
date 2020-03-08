class Admins::SalesmansController < Admins::BaseController
  before_action :set_salesman, except: [:index, :batch_add]

  def index
    @salesmans = Salesman.all
  end

  def destroy
    @salesman.destroy!
  end

  # 批量增加销售人员
  def batch_add
    salesman_user_ids = Salesman.where(id: params[:user_ids]).pluck(:user_id)
    user_ids = params[:user_ids] - salesman_user_ids
    user_ids.each do |user_id|
      user = User.find_by(id: user_id)
      next if user.blank?
      Salesman.create!(user_id: user.id, name: user.real_name)
    end
    render_ok
  end

  private
  def set_salesman
    @salesman = Salesman.find params[:id]
  end

end