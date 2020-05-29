json.partial! "commons/success"
json.limit @limit
json.journals_count @journals_size
json.journals_total_count @jounals_total
json.issue_journals do
  json.array! @journals do |journal|
    json.partial! "journals/journal_item", journal: journal
  end
end