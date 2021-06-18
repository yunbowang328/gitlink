module Dcodes
  DCODES = %W(1 2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z)

  extend ActiveSupport::Concern

  def generate_dcode(field, num, pre='')
    code = DCODES.sample(num).join
    while self.class.exists?("#{field}": pre+code) do
      code = DCODES.sample(num).join
    end
    code
  end

  def init_project_invite_code
    while Project.where(invite_code: nil).size > 0 do 
      projects = Project.where(invite_code: nil).limit(1000)
      set_sql = ""
      projects.each do |p|
        set_sql += "WHEN #{p.id} THEN '#{DCODES.sample(6).join}' "
      end
      sql = "UPDATE projects SET invite_code = CASE id "+ set_sql+ "END WHERE id IN(#{projects.ids.join(",")})"
      Project.connection.execute(sql)
    end
    repeat_codes = Project.group(:invite_code).count.select{|k,v| v>1}
    Project.where(invite_code: repeat_code.keys).update_all(invite_code: nil)
  end

end