json.count @count
json.project_packages do
  json.array! @packages.each do |package|
    json.extract! package, :id, :title, :content, :category_name, :status,
                  :visit_count, :bidding_users_count, :min_price, :max_price

    json.category_id package.project_package_category_id

    json.updated_at package.display_updated_at
    json.deadline_at package.display_deadline_at
    json.published_at package.display_published_at
  end
end