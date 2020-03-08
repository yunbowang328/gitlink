class Admins::PartnersController < Admins::BaseController
  def index
    default_sort('created_at', 'desc')

    partners = Admins::PartnerQuery.call(params)
    @partners = paginate(partners.preload(:school))
  end

  def create
    params[:school_ids] = Array.wrap(params[:school_ids])

    school_ids = School.where(id: params[:school_ids]).pluck(:id)
    exist_school_ids = Partner.where(school_id: school_ids).pluck(:school_id)

    Partner.bulk_insert(*%i[school_id created_at updated_at]) do |worker|
      (school_ids - exist_school_ids).each do |school_id|
        worker.add(school_id: school_id)
      end
    end

    render_ok
  end

  def destroy
    Partner.find(params[:id]).destroy!

    render_delete_success
  end
end