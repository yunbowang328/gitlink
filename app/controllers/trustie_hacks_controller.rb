class TrustieHacksController < ApplicationController
  before_action :require_admin, :except => [:index, :entry]
  before_action :require_login, :except => [:index]
  before_action :find_hackathon
  before_action :find_hack, :except => [:create, :index, :edit_hackathon, :update_hackathon]

  def index
    ## 分页参数
    page  = params[:page]  || 1
    limit = params[:limit] || 16
    search = params[:search]
    hacks = @hackathon.trustie_hacks

    if search
      hacks = hacks.where("name like ?", "%#{search}%")
    end

    @hackathon_users_count = hacks.blank? ? 0 : hacks.sum(:hack_users_count)
    @hacks_count = hacks.count

    @hacks = hacks.page(page).per(limit)

  end

  def edit;end

  def create
    @hackathon.trustie_hacks.create!(name: params[:name], description: params[:description])
    render_ok
  end

  def update
    @hack.update_attributes(name: params[:name], description: params[:description])
    render_ok
  end

  def destroy
    @hack.destroy
    render_ok
  end

  def edit_hackathon
  end

  def update_hackathon
    @hackathon.update_attributes(name: params[:name], description: params[:description])
    render_ok
  end

  # 报名入口
  def entry
    if @hack.hack_users.exists?(user_id: current_user.id)
      render_error('已经报名，请勿重复操作')
    else
      @hack.hack_users.create(user_id: current_user.id)
      render_ok
    end
  end


  private

  def find_hackathon
    @hackathon = TrustieHackathon.first ||
        TrustieHackathon.create!(name: params[:name], description: params[:description])
  end

  def find_hack
    @hack = TrustieHack.find params[:id]
  end

end
