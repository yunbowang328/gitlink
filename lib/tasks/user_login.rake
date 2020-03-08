namespace :user do
  task :update_login => :environment do
    begin
      user_count = ENV['args'].split(",")[0].to_i # 更新的用户数
      status = ENV['args'].split(",")[1] # 测试用户类型
      base_login = ENV['args'].split(",")[2] #  基本的用户参数

      users = User.where(:is_test => status).limit(user_count)
      users.each_with_index do |user, i|
        puts i

        no = sprintf("%04d", i)
        login = "#{base_login}#{no}"
        puts no
        puts login

        sql1 = "update users set login='#{login}' where id=#{user.id}"
        sql2 = "update users set lastname='#{login}' where id=#{user.id}"
        sql3 = "update users set nickname='#{login}' where id=#{user.id}"
        ActiveRecord::Base.connection.execute(sql1)
        ActiveRecord::Base.connection.execute(sql2)
        ActiveRecord::Base.connection.execute(sql3)
      end
    rescue Exception => e
      Rails.logger.error(e.message)
    end
  end
end