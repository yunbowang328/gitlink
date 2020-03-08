class Admins::ItemAuthenticationsController < Admins::BaseController
  def index
    params[:status] ||= 'pending'
    params[:sort_direction] = params[:status] == 'pending' ? 'asc' : 'desc'

    applies = Admins::ApplyItemBankQuery.call(params.merge(type: "ItemBank"))

    @applies = paginate applies.preload(user: { user_extension: [:school, :department] })
  end

  def show
    @item = ItemBank.find current_apply.container_id
  end

  def agree
    ActiveRecord::Base.transaction do
      item = ItemBank.find current_apply.container_id
      current_apply.update!(status: 1)
      item.update!(public: 1)
    end
    render_success_js
  end

  def refuse
    current_apply.update!(status: 2)
    render_success_js
  end

  private

  def current_apply
    @_current_apply ||= ApplyAction.find(params[:id])
  end
end