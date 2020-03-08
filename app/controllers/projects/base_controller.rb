class Projects::BaseController < ApplicationController
  include PaginateHelper

  before_action :require_login, :check_auth
end
