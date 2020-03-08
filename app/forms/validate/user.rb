module Validate
  class User
    include ActiveModel::Model

    attr_accessor :nickname, :lastname

    validates :nickname, presence: true, length: { maximum: 10, too_long: "不能超过10个字符" }
    validates :lastname, presence: true
  end
end
