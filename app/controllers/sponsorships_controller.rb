class SponsorshipsController < ApplicationController
  before_action :set_sponsorship, only: [:show, :edit, :update, :destroy]
  # before_action :require_login, except: [:index, :stopped, :sponsored, :sponsoring, :stopped_sponsored, :stopped_sponsoring]
  before_action :require_login, only: [:create, :edit, :update, :destroy]
  skip_after_action :user_trace_log, only: [:update]
  
  # GET /sponsorships
  # GET /sponsorships.json
  def index
    @sponsorships = Sponsorship.all
  end

  def stopped
    @stopped_sponsorships = StoppedSponsorship.all
  end

  def sponsored
    if User.current.id == Integer(params[:id])
      @sponsorships = Sponsorship.where("developer_id=?", params[:id])
    else
      @sponsorships = Sponsorship.where("developer_id=? AND visible=1", params[:id])
    end
    sort = params[:sort_by] || "created_at"
    sort_direction = params[:sort_direction] || "desc"
    @sponsorships = @sponsorships.reorder("#{sort} #{sort_direction}")
    @total = @sponsorships.length
    @sponsorships = kaminari_paginate(@sponsorships)
  end

  def sponsoring
    if User.current.id == Integer(params[:id])
      @sponsorships = Sponsorship.where("sponsor_id=?", params[:id])
    else
      @sponsorships = Sponsorship.where("sponsor_id=? AND visible=1", params[:id])
    end
    sort = params[:sort_by] || "created_at"
    sort_direction = params[:sort_direction] || "desc"
    @sponsorships = @sponsorships.reorder("#{sort} #{sort_direction}")
    @total = @sponsorships.length
    @sponsorships = kaminari_paginate(@sponsorships)
  end

  def stopped_sponsored
    if User.current.id == Integer(params[:id])
      @stopped_sponsorships = StoppedSponsorship.where("developer_id=?", params[:id])
    else
      @stopped_sponsorships = StoppedSponsorship.where("developer_id=? AND visible=1", params[:id])
    end
    sort = params[:sort_by] || "created_at"
    sort_direction = params[:sort_direction] || "desc"
    @stopped_sponsorships = @stopped_sponsorships.reorder("#{sort} #{sort_direction}")
    @total = @stopped_sponsorships.length
    @stopped_sponsorships = kaminari_paginate(@stopped_sponsorships)
  end

  def stopped_sponsoring
    if User.current.id == Integer(params[:id])
      @stopped_sponsorships = StoppedSponsorship.where("sponsor_id=?", params[:id])
    else
      @stopped_sponsorships = StoppedSponsorship.where("sponsor_id=? AND visible=1", params[:id])
    end
    sort = params[:sort_by] || "created_at"
    sort_direction = params[:sort_direction] || "desc"
    @stopped_sponsorships = @stopped_sponsorships.reorder("#{sort} #{sort_direction}")
    @total = @stopped_sponsorships.length
    @stopped_sponsorships = kaminari_paginate(@stopped_sponsorships)
  end

  # GET /sponsorships/1
  # GET /sponsorships/1.json
  def show
  end

  # POST /sponsorships
  # POST /sponsorships.json
  def create
    sponsor_id = User.current.id
    check_sponsorship = Sponsorship.where("sponsor_id=? AND developer_id=?", sponsor_id, params[:developer_id])

    @sponsorship = Sponsorship.new(sponsorship_params.merge({sponsor_id: sponsor_id}))

    unless check_sponsorship.length.zero?
      return render json: {status: -1, message: '您已经赞助了TA' }
    end

    if @sponsorship.pay && @sponsorship.save
      if params[:single] && @sponsorship.stop
        return render json: { status: 1, message: '赞助成功' }
      elsif !params[:single]
        User.current.update(sponsor_num: User.current.sponsor_num+1)
        @sponsorship.developer.update(sponsored_num: @sponsorship.developer.sponsored_num + 1)
        return render json: { status: 1, message: '赞助成功' }
      else
        return render json: { status: -1, message: '赞助失败' }
      end
    end
    # return render_result message: '赞助成功' if @sponsorship.save
    # respond_to do |format|
    #   if check_sponsorship.length.zero? && @sponsorship.save
    #     format.html { redirect_to @sponsorship, notice: 'Sponsorship was successfully created.' }
    #     format.json { render :show, status: :created, location: @sponsorship }
    #     # render_result status=0, message="赞助成功"
    #   else
    #     format.html { render :new }
    #     format.json { render json: @sponsorship.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /sponsorships/1
  # PATCH/PUT /sponsorships/1.json
  def update
    # respond_to do |format|
    #   if @sponsorship.update(sponsorship_params)
    #     format.html { redirect_to @sponsorship, notice: 'Sponsorship was successfully updated.' }
    #     format.json { render :show, status: :ok, location: @sponsorship }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @sponsorship.errors, status: :unprocessable_entity }
    #   end
    # end

    if @sponsorship.sponsor.id != current_user.id
      return render json: {status: 401, message: '没有权限' }
    end
    old_value = old_value_to_hash(@sponsorship, params)

    if @sponsorship.update(sponsorship_params)
      user_trace_update_log(old_value)
      render json: {status: 1, message: '修改成功' }
    else
      render json: {status: -1, message: '修改失败' }
    end
  end

  # DELETE /sponsorships/1
  # DELETE /sponsorships/1.json
  def destroy
    # @sponsorship.destroy
    # respond_to do |format|
    #   format.html { redirect_to sponsorships_url, notice: 'Sponsorship was successfully destroyed.' }
    #   format.json { head :no_content }
    # end
    developer = @sponsorship.developer
    sponsor = @sponsorship.sponsor
    if (User.current.id == developer.id || User.current.id == sponsor.id) && developer.update(sponsored_num: developer.sponsored_num-1) && sponsor.update(sponsor_num: sponsor.sponsor_num-1) && @sponsorship.stop
      render json: {status: 1, message: "终止成功"}
    else
      render json: {status: -1, message: "失败"}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sponsorship
      @sponsorship = Sponsorship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def sponsorship_params
      params.require(:sponsorship).permit(:amount, :visible, :sponsor_id, :developer_id, :single, :page, :limit, :sort_by, :search)
    end
end
