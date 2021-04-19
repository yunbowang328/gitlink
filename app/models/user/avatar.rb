require 'letter_avatar/has_avatar'
require 'chinese_pinyin'

class User
  module Avatar
    extend ActiveSupport::Concern
    include LetterAvatar::HasAvatar

    def username
      self.lastname.blank? ? self.login :  Pinyin.t(self.lastname)
    end

    def get_letter_avatar_url(size = :lg)
      avatar_path(size).split('public/')&.last
    end

    def avatar_path(size)
      LetterAvatar.generate self.username, avatar_size(size)
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
