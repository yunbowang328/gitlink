module Dcodes
  DCODES = %W(1 2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z)

  extend ActiveSupport::Concern

  def generate_dcode(field, num, pre='')
    code = DCODES.sample(num).join
    while self.class.exists?("#{field}": pre+code) do
      code = DCODES.sample(num).join
    end
    code
  end
end