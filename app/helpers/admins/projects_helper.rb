module Admins::ProjectsHelper

  def link_to_project(project)
    owner = project.owner

    if owner.is_a?(User)
      link_to(project.owner&.real_name, "/users/#{project&.owner&.login}", target: '_blank')
    elsif owner.is_a?(Organization)
      link_to(project.owner&.real_name, "/organize/#{project&.owner&.login}", target: '_blank')
    else
      ""
    end
  end
end