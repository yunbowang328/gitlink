json.attachment_histories do
  json.array! attachment_histories, partial: 'attachment_histories/attachment_history', as: :attachment
end