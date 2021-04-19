require 'letter_avatar/has_avatar'

class User
  module Avatar
    extend ActiveSupport::Concern
    include LetterAvatar::HasAvatar

    def name
      lastname.blank? ? login : Pinyin.t(lastname)
    end

    def letter_avatar_url(size = :lg)
      avatar_url(avatar_size(size))
    end

    # 返回头像尺寸
    # xs: 22px
    # sm: 32px
    # md: 48px
    # lg: 120px
    def avatar_size(size)
      case size
      when :xs then 22
      when :sm then 32
      when :md then 48
      when :lg then 120
      else size
      end
    end

  end
end
