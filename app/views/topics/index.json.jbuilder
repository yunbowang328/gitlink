json.partial! "commons/success"
json.total_count @topics.total_count 
json.topics do 
  if params[:group_size].present?
    json.array! @topics.to_a.each_slice(params[:group_size].to_i).to_a.each do |group|
      json.array! group.each do |topic|
        case topic.type 
        when "Topic::ActivityForum"
          json.partial! "activity_forum", locals: {activity_forum: topic}
        when "Topic::Banner"
          json.partial! "banner", locals: {banner: topic}
        when "Topic::Card"
          json.partial! "card", locals: {card: topic}
        when "Topic::Cooperator"
          json.partial! "cooperator", locals: {cooperator: topic}
        when "Topic::ExcellentProject"
          json.partial! "excellent_project", locals: {excellent_project: topic}
        when "Topic::ExperienceForum"
          json.partial! "experience_forum", locals: {experience_forum: topic}
        when "Topic::PinnedForum"
          json.partial! "pinned_forum", locals: {pinned_forum: topic}
        else
          json.nil!
        end
      end
    end
  else
    json.array! @topics.each do |topic|
      case topic.type 
      when "Topic::ActivityForum"
        json.partial! "activity_forum", locals: {activity_forum: topic}
      when "Topic::Banner"
        json.partial! "banner", locals: {banner: topic}
      when "Topic::Card"
        json.partial! "card", locals: {card: topic}
      when "Topic::Cooperator"
        json.partial! "cooperator", locals: {cooperator: topic}
      when "Topic::ExcellentProject"
        json.partial! "excellent_project", locals: {excellent_project: topic}
      when "Topic::ExperienceForum"
        json.partial! "experience_forum", locals: {experience_forum: topic}
      when "Topic::PinnedForum"
        json.partial! "pinned_forum", locals: {pinned_forum: topic}
      else
        json.nil!
      end
    end
  end
end