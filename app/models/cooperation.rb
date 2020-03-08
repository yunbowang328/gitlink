class Cooperation < ApplicationRecord
  def user_type_text
    case user_type.to_i
    when 1 then '高校合作'
    when 2 then '企业合作'
    when 3 then '实训投稿'
    end
  end
end