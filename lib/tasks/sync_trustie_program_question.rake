desc "同步trustie的编程作业"

namespace :sync_program do
  DCODES = %W(2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z)
  task data: :environment do
    ProgramBank.where(homework_type: 2).each do |program|
      unless Hack.where(name: program.name).exists?
        strip_des = strip_html(program.description, 5000)
        description = strip_des.present? ? strip_des : program.name
        hack_params = {name: program.name[0..59], description: description, difficult: 1, open_or_not: 1, score: 200, status:0, time_limit: 3, sub_discipline_id: program.oj_sub_discipline_id}
        puts "language::::#{program.language}"
        puts "program_bank::::#{program.id}"
        hack = Hack.new(hack_params)
        hack.user_id = 1
        hack.identifier = generate_identifier Hack, 8
        ActiveRecord::Base.transaction do
          hack.save!
          # 创建测试集与代码
          position = 1
          ProgramBankTest.where(homework_bank_id: program.id).each do |test_set|
            if !test_set.input.blank? && !test_set.output.blank? && !hack.hack_sets.where(input: test_set.input).exists? && test_set.input.length <= 1000 && test_set.output.length <= 1000
              hack.hack_sets.create!(input: test_set.input, output: test_set.output, position: position)
              position += 1
            end
          end
          # 新建知识点
          hack_code_params = {code: program.standard_code.blank? ? nil : Base64.encode64(program.standard_code), language: program.oj_language}
          hack_codes = hack.hack_codes.new(hack_code_params)
          hack_codes.modify_time = Time.now
          hack_codes.save!
          new_item_params = {name: program.name, sub_discipline_id: program.oj_sub_discipline_id, container: hack, item_type: 'PROGRAM', public: 0, difficulty: 1, user_id: 1}
          ItemBank.create!(new_item_params)
        end
        puts hack.id
      end
    end
  end

  # 随机生成字符
  def generate_identifier(container, num)
    code = DCODES.sample(num).join
    if container == User
      while container.exists?(login: code) do
        code = DCODES.sample(num).join
      end
    else
      while container.exists?(identifier: code) do
        code = DCODES.sample(num).join
      end
    end
    code
  end

  def strip_html(text, len=0, endss="...")
    ss = ""
    if !text.nil? && text.length>0
      ss=text.gsub(/<\/?.*?>/, '').strip
      ss = ss.gsub(/&nbsp;*/, '')
      ss = ss.gsub(/\r\n/,'')  #新增
      ss = ss.gsub(/\n/,'')  #新增
      if len > 0 && ss.length > len
        ss = ss[0, len-4] + endss
      elsif len > 0 && ss.length <= len
        ss = ss
        #ss = truncate(ss, :length => len)
      end
    end
    ss
  end
end