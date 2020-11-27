class Projects::BaseController < ApplicationController
  include PaginateHelper

  before_action :load_project
  before_action :load_repository

end
