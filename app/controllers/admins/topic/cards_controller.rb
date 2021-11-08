class Admins::Topic::CardsController < Admins::Topic::BaseController
  before_action :find_card, only: [:edit, :update, :destroy]

  def index 
    q = ::Topic::Card.ransack(title_cont: params[:search])
    cards = q.result(distinct: true)
    @cards = paginate(cards)
  end

  def new 
    @card = ::Topic::Card.new
  end

  def create 
    @card = ::Topic::Card.new(card_params)
    if @card.save 
      redirect_to admins_topic_cards_path
      flash[:success] = "新增合作单位成功"
    else
      redirect_to admins_topic_cards_path
      flash[:danger] = "新增合作单位失败"
    end
  end

  def edit 
  end

  def update 
    @card.attributes = card_params
    if @card.save 
      redirect_to admins_topic_cards_path
      flash[:success] = "更新合作单位成功"
    else  
      redirect_to admins_topic_cards_path
      flash[:danger] = "更新合作单位失败"
    end
  end

  def destroy 
    if @card.destroy 
      redirect_to admins_topic_cards_path
      flash[:success] = "删除合作单位成功"
    else  
      redirect_to admins_topic_cards_path
      flash[:danger] = "删除合作单位失败"
    end
  end

  private 
  def find_card
    @card = ::Topic::Card.find_by_id(params[:id])
  end

  def card_params 
    params.require(:topic_card).permit(:title, :url, :order_index)
  end
end