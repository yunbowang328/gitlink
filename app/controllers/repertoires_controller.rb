class RepertoiresController < ApplicationController
  def index
    render_ok(repertoires: Repertoire.select(:id, :name).order(:created_at).as_json)
  end
end