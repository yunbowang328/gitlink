class SponsorTiersController < ApplicationController
  before_action :set_sponsor_tier, only: [:show, :edit, :update, :destroy]
  before_action :check_sponsor, only: [:show]
  before_action :require_login, only: [:create, :update, :destroy]

  # GET /sponsor_tiers
  # GET /sponsor_tiers.json
  def index
    # @sponsor_tiers = SponsorTier.all
    user = User.find_by_login(params[:login])
    @sponsor_tiers = user.sponsor_tier
  end

  # GET /sponsor_tiers/1
  # GET /sponsor_tiers/1.json
  def show

  end

  # POST /sponsor_tiers
  # POST /sponsor_tiers.json
  def create
    # print("------------\n", sponsor_tier_params, "\n------------\n")
    @check_sponsorship = nil
    @sponsor_tier = SponsorTier.new(sponsor_tier_params)
    respond_to do |format|
      if @sponsor_tier.user_id == User.current.id && @sponsor_tier.save
        format.html { redirect_to @sponsor_tier, notice: 'Sponsor tier was successfully created.' }
        format.json { render :show, status: :created, location: @sponsor_tier }
        # render json: {status: 1, message: '创建成功' }
      else
        format.html { render :new }
        format.json { render json: @sponsor_tier.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sponsor_tiers/1
  # PATCH/PUT /sponsor_tiers/1.json
  def update
    @check_sponsorship = nil
    old_value = old_value_to_hash(@sponsor_tier, params)
    respond_to do |format|
      if User.current.id == @sponsor_tier.user_id && @sponsor_tier.update(sponsor_tier_update_params)
        user_trace_update_log(old_value)
        format.html { redirect_to @sponsor_tier, notice: 'Sponsor tier was successfully updated.' }
        format.json { render :show, status: :ok, location: @sponsor_tier }
        # render json: {status: 1, message: '修改成功' }
      else
        format.html { render :edit }
        format.json { render json: @sponsor_tier.errors, status: :unprocessable_entity }
        # format.json { render status: :unprocessable_entity }
        # render json: {status: -1, message: '修改失败' }
      end
    end
  end

  # DELETE /sponsor_tiers/1
  # DELETE /sponsor_tiers/1.json
  def destroy
    if User.current.id == @sponsor_tier.user_id
      @sponsor_tier.destroy
      respond_to do |format|
        format.html { redirect_to sponsor_tiers_url, notice: 'Sponsor tier was successfully destroyed.' }
        format.json { head :no_content }
      end
    else
      format.json { render json: @sponsor_tier.errors, status: :unprocessable_entity }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def check_sponsor
      @check_sponsorship = Sponsorship.where("sponsor_id=? AND developer_id=?", current_user.id, @sponsor_tier.user.id)
    end

    def set_sponsor_tier
      @sponsor_tier = SponsorTier.find(params[:id])
    end

    def sponsor_tier_update_params
      params.require(:sponsor_tier).permit(:tier, :description)
    end

    # Only allow a list of trusted parameters through.
    def sponsor_tier_params
      params.require(:sponsor_tier).permit(:tier, :user_id, :description)
    end
end
