class Helps::FaqsController < ApplicationController
  skip_before_action :check_sign, :user_setup

  def index
    faqs = Faq.select_without_id
    render json: faqs.as_json(:except => [:id])
  end
end
