json.branch_name @branch['name']
json.protected @branch['protected']
json.protected_branch do
  if @protected_branch
    json.partial! @protected_branch, as: :protected_branch
  else
    json.nil!
  end
end
