class Callbacks::BaseController < ActionController::Base
  include RenderHelper

  skip_before_action :verify_authenticity_token
end