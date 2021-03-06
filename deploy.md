
# 本地开发部署

## Depends Versions

* Ruby 2.4.5

* Rails ~> 5.2

* MySql ~> 5.6

* Redis 5+

* NodeJS > 13.0.0


## Steps

### 1. 克隆稳定版本仓库
```
git clone -b standalone https://git.trustie.net/jasder/forgeplus.git
```

### 2. 安装依赖包

```bash
bundle install
```

### 3. 配置初始化文件
进入项目根目录执行一下命令：

```bash
cp config/configuration.yml.example config/configuration.yml
cp config/database.yml.example config/database.yml
touch config/redis.yml
touch config/elasticsearch.yml
```

### 4. 配置数据库
数据库配置信息请查看/config/database.yml文件，
项目默认采用mysql数据库, 如需更改，请自行修改配置信息，
默认配置如下：

```bash
default: &default
  adapter: mysql2
  host: 127.0.0.1
  encoding: utf8
  username: root
  password: 123456
```

### 4. 配置gitea服务(可选)
**如需要部署自己的gitea平台，请参考gitea官方平台：https://docs.gitea.io/zh-cn/install-from-binary/**

**因目前gitea平台api受限，暂时推荐从forge平台获取gitea部署文件进行部署：https://forgeplus.trustie.net/projects/Trustie/gitea-binary**

#### 配置gitea服务步骤
1. 部署gitea服务，并注册root账户
2. 修改forge平台的 config/configuration.yml中的gitea服务指向地址，如：

```ruby
gitea:
  access_key_id: 'root'
  access_key_secret: 'password'
  domain: 'http://www.gitea.example.com'
  base_url: '/api/v1'
```

### 5. 安装redis环境
**请自行搜索各平台如何安装部署redis环境**


### 6. 创建数据库

```bash
rails db:create
```

### 7. 导入数据表结构

```bash
bundle exec rake sync_table_structure:import_csv
```

### 8. 执行migrate迁移文件
**开发环境为development， 生成环境为production**
```bash
rails db:migrate RAILS_ENV=development
```

### 9. clone前端代码
**将前端代码克隆到public/react目录下，目录结构应该是: public/react/build**
```bash
git clone -b standalone https://git.trustie.net/jasder/build.git
```

### 10. 启动redis(此处已mac系统为例)
```bash
redis-server&
```

### 11. 启动sidekiq
**开发环境为development， 生成环境为production**
```bash
bundle exec sidekiq -C config/sidekiq.yml -e production -d
```

### 12. 启动rails服务
```bash
rails s
```

### 13. 浏览器访问
在浏览器中输入如下地址访问：
```bash
http://localhost:3000/
```


---
