json.partial! "commons/success"
json.data do
  json.id  @category_id
  json.name @category_name
  json.total_count @total_count
  json.publish_count @publish_count
  json.unpublish_count @unpublish_count
  json.course_is_public @course.is_public?
  json.files do
    json.array! @attachments do |attachment|
      json.is_history_file attachment.attachment_histories.count > 0 #是否有历史文件
      json.partial! "attachments/attachment", attachment: attachment
      json.author do
        json.partial! "users/user_simple", user: attachment.author
      end
      # json.partial! "files/course_groups", attachment_group_settings: attachment.attachment_group_settings
      if @course_second_category_id.to_i == 0
        json.category_name attachment.course_second_category&.name
      end
    end
  end
end
