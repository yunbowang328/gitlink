user = observed_user

json.count @count
json.project_packages do
  json.array! @packages.each do |package|
    json.extract! package, :id, :title, :status, :min_price, :max_price, :visit_count, :bidding_users_count

    is_creator = user.id == package.creator_id
    json.type is_creator ? 'manage' : 'bidden'
    json.category_id package.project_package_category_id
    json.category_name package.category_name

    unless is_creator
      json.bidden_status @bidding_status_map[package.id]
    end

    json.deadline_at package.display_deadline_at
    json.published_at package.display_published_at

    json.operation do
      can_manage = current_user&.id == observed_user.id || current_user&.admin_or_business?
      json.can_edit can_manage && package.editable?
      json.can_delete can_manage && package.deletable?
    end
  end
end