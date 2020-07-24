class SponsorTiersController < ApplicationController
  before_action :set_sponsor_tier, only: [:show, :edit, :update, :destroy]

  # GET /sponsor_tiers
  # GET /sponsor_tiers.json
  def index
    @sponsor_tiers = SponsorTier.all
  end

  # GET /sponsor_tiers/1
  # GET /sponsor_tiers/1.json
  def show
  end

  # GET /sponsor_tiers/new
  def new
    @sponsor_tier = SponsorTier.new
  end

  # GET /sponsor_tiers/1/edit
  def edit
  end

  # POST /sponsor_tiers
  # POST /sponsor_tiers.json
  def create
    @sponsor_tier = SponsorTier.new(sponsor_tier_params)

    respond_to do |format|
      if @sponsor_tier.save
        format.html { redirect_to @sponsor_tier, notice: 'Sponsor tier was successfully created.' }
        format.json { render :show, status: :created, location: @sponsor_tier }
      else
        format.html { render :new }
        format.json { render json: @sponsor_tier.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sponsor_tiers/1
  # PATCH/PUT /sponsor_tiers/1.json
  def update
    respond_to do |format|
      if @sponsor_tier.update(sponsor_tier_params)
        format.html { redirect_to @sponsor_tier, notice: 'Sponsor tier was successfully updated.' }
        format.json { render :show, status: :ok, location: @sponsor_tier }
      else
        format.html { render :edit }
        format.json { render json: @sponsor_tier.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sponsor_tiers/1
  # DELETE /sponsor_tiers/1.json
  def destroy
    @sponsor_tier.destroy
    respond_to do |format|
      format.html { redirect_to sponsor_tiers_url, notice: 'Sponsor tier was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sponsor_tier
      @sponsor_tier = SponsorTier.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def sponsor_tier_params
      params.require(:sponsor_tier).permit(:tier)
    end
end
