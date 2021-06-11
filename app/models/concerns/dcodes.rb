module Dcodes
  DCODES = %W(1 2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R ST UV W X Y Z)

  extend ActiveSupport::Concern

  def generate_dcode(field, num, pre='')
    code = DCODES.sample(num).join
    while self.class.exists?("#{field}": pre+code) do
      code = DCODES.sample(num).join
    end
    code
  end

  def init_project_invite_code
    total_count = Project.where(invite_code: nil).size
    limit = 100
    page = 1
    while page * limit > total_count do 
      bulk_arr = []
      (1..100).each do |_|
        bulk_arr < DCODES.sample(6).join
      end

    end
  end
end