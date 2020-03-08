class ProjectPackageCategoriesController < ApplicationController
  def index
    categories = ProjectPackageCategory.cached_data
    render_ok(count: categories.size, categories: categories)
  end
end