
json.count @count
json.shixuns @shixuns, partial: 'users/shixuns/shared/shixun', as: :shixun, locals: { user: observed_user }
