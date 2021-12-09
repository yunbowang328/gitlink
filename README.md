# GitLink - CCF开源创新服务平台

GitLink（确实开源）是中国计算机学会（CCF）官方指定的开源创新服务平台，旨在以“为开源创新服务”为使命，以“成为开源创新的汇聚地”为愿景，秉承“创新、开放、协作、共享”的价值观，致力于为大规模开源开放协同创新助力赋能，打造创新成果孵化和新工科人才培养的开源创新生态！

<center>
<img src="https://code.gitlink.org.cn/young/forgeplus/raw/branch/standalone/docs/figs/gitlink.png?raw=true" width=80% />
</center>
    
## 特色功能

- **分布式协作开发**：基于Git打造分布式代码托管环境，提供免费公、私有代码仓库，支持在线文件编辑、代码分支管理、协作贡献统计、代码仓库复刻（Fork）、贡献合并请求（PR）、群智贡献审阅等功能，让您的项目在这里健康、快速的成长！

- **一站式过程管理**：提供易修（Issue）、里程碑、通知提醒、标签归档等多样化任务管理工具，支持各类开发任务的发布、指派与跟踪，同时提供在线Wiki文档、组织多粒度管理等功能，为您搭建一站式的项目过程管理环境，让您的团队协作更高效、过程更透明！

- **高效流水线运维**：融合DevOps思想，提供轻量级的工作流引擎（Engine），打通编码、测试、构建、部署等开发运维环节；支持自定义配置、代码静态扫描、构建自动触发、容器镜像托管等功能，同时支持接入第三方运维工具，让您的代码更加快速、可靠地形成高质量的产品！

- **多层次代码分析**：提供软件软代码和芯片RTL代码的溯源分析、文件级和组件级许可证识别及风险分析、输入性开源漏洞检测和加固建议，支持分析结果的多层次可视化展示，帮助您实施有效开源治理，厘清代码引用链，发现并消除漏洞感染链，为安全合规的开源引用保驾护航！

- **多维度用户画像**：实时采集和分析平台中的各类开源资源数据，搭建多维度用户画像评估系统，提供开发活动统计、贡献度日历、用户能力建模、角色与专业定位分析等功能，让您在个人主页展示开发动态与创新能力！

## 第三方组件


## 部署流程


### 依赖库

* Ruby 2.4.5

* Rails ~> 5.2

* MySql ~> 5.6

* Redis 5+

* imagemagick

### 步骤

（1）克隆稳定版本
```
git clone -b standalone https://git.trustie.net/jasder/forgeplus.git
```

（2）安装依赖包
```bash
cd forgeplus && bundle install
```

（3）配置初始化文件：进入项目根目录执行以下命令
```bash
cp config/configuration.yml.example config/configuration.yml
cp config/database.yml.example config/database.yml
touch config/redis.yml
touch config/elasticsearch.yml
```

（4）配置数据库：数据库配置信息请查看/config/database.yml文件，项目默认采用mysql数据库, 如需更改，请自行修改配置信息，默认配置如下
```bash
default: &default
  adapter: mysql2
  host: 127.0.0.1
  encoding: utf8
  username: root
  password: 123456
```

（5）配置gitea服务(可选)：如需要部署自己的gitea平台，请参考[gitea官方平台文档](https://docs.gitea.io/zh-cn/install-from-binary/)。因目前gitea平台api受限，暂时推荐从forge平台获取[gitea部署文件](https://forgeplus.trustie.net/projects/Trustie/gitea-binary)进行部署

- 配置gitea服务步骤：
1）部署gitea服务，并注册root账户
2）修改forge平台的 config/configuration.yml中的gitea服务指向地址，如：

```ruby
gitea:
  access_key_id: 'root'
  access_key_secret: 'password'
  domain: 'http://www.gitea.example.com'
  base_url: '/api/v1'
```

（6）安装redis环境：请自行搜索各平台如何安装部署redis环境

（7）安装imagemagick插件：
- Mac OS X
```bash
 brew install imagemagick ghostscript
```

- Linux
```bash
sudo apt-get install -y imagemagick
```

（8）创建数据库：开发环境为development， 生成环境为production
```bash
rails db:create  RAILS_ENV=development
```

（9）导入数据表结构

```bash
bundle exec rake sync_table_structure:import_csv
```

（10）执行migrate迁移文件：开发环境为development， 生成环境为production
```bash
rails db:migrate RAILS_ENV=development
```

（11）clone前端代码：将前端代码克隆到public/react目录下，目录结构应该是: public/react/build
```bash
git clone -b standalone https://git.trustie.net/jasder/build.git
```

（12）启动redis(此处以macOS系统为例)
```bash
redis-server&
```

（13）启动sidekiq：开发环境为development， 生成环境为production
```bash
bundle exec sidekiq -C config/sidekiq.yml -e production -d
```

（14）启动rails服务
```bash
rails s
```

（15）浏览器访问：在浏览器中输入如下地址访问
```bash
http://localhost:3000/
```

（16）其他说明：通过页面注册以第一个用户为平台管理员用户


## 页面展示

- 项目列表

<center>
<img src="https://code.gitlink.org.cn/young/forgeplus/raw/branch/standalone/docs/figs/project_list.png?raw=true" width=50% />
</center>
        
- 代码仓库
            
<center>
<img src="https://code.gitlink.org.cn/young/forgeplus/raw/branch/standalone/docs/figs/repo.png?raw=true" width=50% />
</center>
                    
- 任务管理
            
<center>
<img src="https://code.gitlink.org.cn/young/forgeplus/raw/branch/standalone/docs/figs/issues.png?raw=true" width=50% />
</center>
                    
- 合并请求
            
<center>
<img src="https://code.gitlink.org.cn/young/forgeplus/raw/branch/standalone/docs/figs/PR.png?raw=true" width=50% />
</center>
                  
- 引擎配置
            
<center>
<img src="https://code.gitlink.org.cn/young/forgeplus/raw/branch/standalone/docs/figs/engine.png?raw=true" width=50% />
</center>


## 贡献代码

我们期待您向GitLink提交贡献！在您贡献时，请遵循以下流程：

1. Fork 项目
2. 创建本地分支(git checkout -b my-new-feature)
3. 提交更改 (git commit -am 'Add some feature')
4. 推送到分支 (git push origin my-new-feature)
5. 向源项目的 **develop** 分支发起 Pull Request

#### 指导文档
- [API文档](https://www.gitlink.org.cn/docs/api)
- [Git常用命令](https://git-scm.com/)

## 许可证协议
