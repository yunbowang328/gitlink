module Admins::SubjectsHelper
  def display_subject_status(subject)
    style =
      case subject.public
      when 0 then 'text-secondary'
      when 1 then 'text-warning'
      when 2 then 'text-success'
      end

    status =
        if subject.public == 2
          "publiced"
        elsif subject.public == 1
          "pending"
        elsif subject.status == 2
          "processed"
        else
          "editing"
        end
    raw content_tag(:span, t("subject.public.#{status}"), class: style)
  end
end