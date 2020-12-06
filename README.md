Trustie （确实）是一个以大众化协同开发、开放式资源共享、持续性可信评估为核心机理，面向高校创新实践的在线协作平台。

## 特性

- 软件创作与生产深度融合的软件开发环境体系结构 软件自由创作和工程生产的高效衔接，适于软件开发中群体智慧的有效汇聚。

- 构件化协同开发环境的可扩展运行框架多样化工具的集成和联动，形成了强动态扩展能力的平台框架。

- “互联网即资源库”的全新软件复用模式 成长式软件资源管理系统，实现了分散资源的知识融合、资源的可持续增长和有效复用。

## 部署


### 1. 安装依赖包

```bash
bundle install
```

### 2. 配置初始化文件
进入项目根目录执行一下命令：

```bash
cp config/configuration.yml.example config/configuration.yml
cp config/database.yml.example config/database.yml
touch config/redis.yml
touch config/elasticsearch.yml
```

### 3. 配置gitea服务(可选)
**如需要部署自己的gitea平台，请参考gitea官方平台：https://docs.gitea.io/zh-cn/install-from-binary/**

**因目前gitea平台api受限，暂时推荐从forge平台获取gitea部署文件进行部署：https://forgeplus.trustie.net/projects/6070/coders**

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

### 4. 安装redis环境
**请自行搜索各平台如何安装部署redis环境**


### 5. 创建数据库

```bash
rails db:create
```

### 6. 导入数据表结构

```bash
bundle exec rake sync_table_structure:import_csv
```

### 7. 执行migrate迁移文件
**开发环境为development， 生成环境为production**
```bash
rails db:migrate RAILS_ENV=development
```

### 8. 启动redis(此处已mac系统为例)
```bash
redis-server&
```

### 9. 启动sidekiq
**开发环境为development， 生成环境为production**
```bash
bundle exec sidekiq -C config/sidekiq.yml -e production -d
```

### 10. 启动rails服务
```bash
rails s
```

### 11. 浏览器访问
在浏览器中输入如下地址访问：
```bash
http://localhost:3000/
```


## 页面展示

- 代码库

![](docs/figs/code.png)


- 任务管理
![](docs/figs/issue_manage.png)

- 任务查看

![](docs/figs/issue_view.png)

- 任务指派

![](docs/figs/issue_assign2.png)

- 里程碑

![](docs/figs/milestone.png)

### API
- [API](api_document.md)

## 贡献代码

1. Fork 项目
2. 创建本地分支(git checkout -b my-new-feature)
3. 提交更改 (git commit -am 'Add some feature')
4. 推送到分支 (git push origin my-new-feature)
5. 向源项目的 **develop** 分支发起 Pull Request

## License
