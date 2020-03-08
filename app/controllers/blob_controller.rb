class BlobController < ApplicationController
  def new
    commit unless @repository.empty?
  end

  def create
    create_commit(Files::CreateService, success_path: after_create_path,
                  failure_view: :new,
                  failure_path: namespace_project_new_blob_path(@project.namespace, @project, @ref))
  end

end
