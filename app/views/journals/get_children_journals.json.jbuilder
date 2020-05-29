json.partial! "commons/success"
json.limit @limit
json.journals_count @journals_size
json.issue_journals do
  json.array! @children_journals do |journal|
    json.partial! "journals/journal_item", journal: journal
  end
end