# add test user
namespace :sync do
  task :add_user => :environment do
    DCODES = %W(2 3 4 5 6 7 8 9 a b c f e f g h i j k l m n o p q r s t u v w x y z)
    user_count = ENV['args'].split(",")[0].to_i # 用户数
    rand_chart = ENV['args'].split(",")[1] # 手机号或者邮箱等前面的随机数

    puts rand_chart
    puts user_count

    (1..user_count).each do |i|
      puts i

      no = sprintf("%04d", i)
      phone = "#{rand_chart}160731#{no}"
      mail = "#{rand_chart}#{no}@gitlink.org.cn"
      code = generate_identifier User, 8
      login = "m" + code


      l = "赵,钱,孙,李,周,吴,郑,王,冯,陈,褚,卫,蒋,沈,韩,杨,朱,秦,尤,许,何,吕,施,张,孔,曹,严,华,金,魏,陶,姜,黄".split(",")
      f = "爱童,安妮,若婷,安煜,博,雷,梅,静,士红,大龙,冰波,慧娟,梅,婧婧,军,淋,真,维,涛,程程,
        谷南,慕儿,夏岚,友儿,小萱,紫青,妙菱,冬寒,曼柔,语蝶,青筠,夜安,觅海,问安,晓槐,雅山,访云,翠容,寒凡,晓绿,以菱,
        冬云,含玉,访枫,含卉,夜白,冷安,灵竹,醉薇,元珊,幻波,盼夏,元瑶,迎曼,水云,访琴,谷波,乐之,笑白,之山,妙海,紫霜,
        平夏,凌旋,孤丝,怜寒,向萍,凡松,青丝,翠安,如天,凌雪,绮菱,代云,南莲,寻南,春文,香薇,冬灵,凌珍,采绿,天春,沛文,
        紫槐,幻柏,采文,春梅,雪旋,盼海,映梦,安雁,映容,凝阳,访风,天亦,平绿,盼香,觅风,小霜,雪萍,半雪,山柳,谷雪,靖易,
        白薇,梦菡,飞绿,如波,又晴,友易,香菱,冬亦,问,妙春,海冬,半安,平春,幼柏,秋灵,凝芙,念烟,白山,从灵,尔芙,迎蓉,
        念寒,翠绿,翠芙,靖儿,妙柏,千凝,小珍,天巧,妙旋,雪枫,夏菡,元绿,痴灵,绮琴,雨双,听枫,觅荷,凡之,晓凡,雅彤,香薇,
        孤风,从安,绮彤,之玉,雨珍,幻丝,代梅,香波,青亦,元菱,海瑶,飞槐,听露,梦岚,幻竹,新冬,盼翠,谷云".split(",")

      lastname = l[rand(l.length)].strip + f[rand(f.length)].strip

      edit_params = {
          login: login,
          admin: false,
          type: User,
          phone: phone,
          lastname: lastname,
          mail: mail,
          authentication: 1,
          professional_certification: 1,
          profile_completed: true,
          is_test: true
      }
      user = User.create!(edit_params)
      user.password = "edu12345678"
      user.save!
      UserExtension.create!(user_id: user.id, school_id: 117)
      puts i
    end
  end

  task :password => :environment do

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

end