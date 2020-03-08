class Admins::LaboratoryShixunsController < Admins::BaseController
  helper_method :current_laboratory, :current_laboratory_shixun

  def index
    laboratory_shixuns = Admins::LaboratoryShixunQuery.call(current_laboratory, params)
    @laboratory_shixuns = paginate laboratory_shixuns.includes(shixun: %i[tag_repertoires user])
  end

  def create
    shixun_ids = Array.wrap(params[:shixun_ids])
    shixun_ids = Shixun.where(id: shixun_ids).pluck(:id)
    exist_shixun_id = current_laboratory.laboratory_shixuns.where(shixun_id: shixun_ids).pluck(:shixun_id)

    LaboratoryShixun.bulk_insert(*%i[shixun_id laboratory_id created_at updated_at]) do |worker|
      (shixun_ids - exist_shixun_id).each do |shixun_id|
        worker.add(shixun_id: shixun_id, laboratory_id: current_laboratory.id)
      end
    end
    render_ok
  end

  def destroy
    return render_js_error('不能删除自建实训', type: :notify) if current_laboratory_shixun.ownership?
    current_laboratory_shixun.destroy!

    render_delete_success
  end

  def homepage
    current_laboratory_shixun.update!(homepage: true)
    render_ok
  end

  def cancel_homepage
    current_laboratory_shixun.update!(homepage: false)
    render_ok
  end

  private

  def current_laboratory
    @_current_laboratory ||= Laboratory.find(params[:laboratory_id])
  end

  def current_laboratory_shixun
    @_current_laboratory_shixun ||= current_laboratory.laboratory_shixuns.find(params[:id])
  end
end