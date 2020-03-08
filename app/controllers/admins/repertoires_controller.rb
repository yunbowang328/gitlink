class Admins::RepertoiresController < Admins::BaseController

  def index
    @repertoires = Repertoire.all
  end

  def edit
    @repertoire = current_repertoire
  end

  def update
    Rails.logger.info("#################--------")
    if params[:repertoire] && params[:repertoire][:name].present?
      name = params[:repertoire][:name].to_s.strip
      current_repertoire.update_attributes!(name: name)
    end
    @repertoires = Repertoire.all
  end

  def create
    name = params[:name].to_s.strip
    return render_error('名称重复') if Repertoire.where(name: name).exists?
    Repertoire.create!(name: name)
    render_ok
  end

  def destroy
    @repertoire_id = params[:id]
    current_repertoire.destroy!
  end

  private
  def current_repertoire
    @_current_repertoire = Repertoire.find params[:id]
  end
end