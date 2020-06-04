
# 本地开发部署步骤

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


---


# API文档

## 基本介绍

### 开发API服务地址：

**https://testgitea.trustie.net/**


响应状态说明:

|字段|类型|说明|
|-|-|-|
|status  |int |响应状态码，0:请求成功，-1: 请求失败|
|message |string   |响应说明 |


### API接口
---

#### 用户注册(通过其他平台)
```
POST accounts/remote_register
```
*示例*
```
curl -X POST \
-d "email=2456233122@qq.com" \
-d "password=djs_D_00001" \
-d "username=16895620" \
-d "platform=forge" \
http://localhost:3000/api/accounts/remote_register  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|email    |是|string   |邮箱  |
|username |是|string   |登录名 |
|password |是|string   |秘密  |
|platform |否|string   |用户来源的相关平台，取值范围['educoder', 'trustie', 'forge'], 默认值为forge  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|user|json object |返回数据|
|-- id            |int   |用户id |
|-- token         |string|用户token|


返回值
```
{
  "status": 0,
  "message": "success",
  "user": {
    "id": 36400,
    "token": "8c87a80d9cfacc92fcb2451845104f35119eda96"
  }
}
```
---

#### 获取当前登录用户信息
```
GET api/users/me
```
*示例*
```
curl -X GET http://localhost:3000/api/users/me  | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|user_id       |int   |用户id |
|username      |string|用户名称|
|admin         |boolean|是否为管理用户|
|login         |string|登录名|
|image_url     |string|用户头像|


返回值
```
{
  "username": "18816895620",
  "login": "18816895620",
  "user_id": 36401,
  "image_url": "avatars/User/b",
  "admin": false
}
```
---

#### 用户列表(带搜索功能)
```
GET api/users/list
```
*示例*
```
curl -X GET \
-d "limit=10" \
-d "search=18816895620"
http://localhost:3000/api/users/list  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|page          |否|int |页数，第几页  |
|limit         |否|int |每页多少条数据，默认15条  |
|search        |否|string |用户名、登录名匹配搜索  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count    |int   |总用户条数 |
|users          |array| |
|-- username    |string|用户全名|
|-- login       |string|用户登录名|
|-- user_id     |int|用户id|
|-- image_url   |string|用户头像|

返回值
```
{
  "total_count": 1,
  "users": [
    {
      "username": "18816895620",
      "login": "18816895620",
      "user_id": 36401,
      "image_url": "avatars/User/b"
    }
  ]
}
```
---

#### 获取项目类别列表(可根据名称搜素)
```
GET api/project_categories
```
*示例*
```
curl -X GET \
-d "name=大数据" \
http://localhost:3000/api/project_categories/  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|name   |否|string   |类别名称  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|project_categories|array |返回数据|
|-- id             |int   |类别id |
|-- name           |string|类别名称|


返回值
```
{
  "project_categories": [
    {
      "id": 1,
      "name": "大数据"
    }
  ]
}
```
---

#### 获取项目语言列表(可根据名称搜素)
```
GET api/project_languages
```
*示例*
```
curl -X GET \
-d "name=Ruby" \
http://localhost:3000/api/project_languages/  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|name   |否|string   |类别名称  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|project_languages|array |返回数据|
|-- id             |int   |语言id |
|-- name           |string|语言名称|


返回值
```
{
  "project_languages": [
    {
      "id": 1,
      "name": "Ruby"
    }
  ]
}
```
---

#### 获取.gitignore模板列表(可根据名称搜素)
```
GET api/ignores
```
*示例*
```
curl -X GET \
-d "name=Ada" \
http://localhost:3000/api/ignores/  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|name   |否|string   |gitignore名称  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|ignores|array |返回数据|
|-- id             |int   |id |
|-- name           |string|gitignore名称|


返回值
```
{
  "ignores": [
    {
      "id": 1,
      "name": "Ada"
    }
  ]
}
```
---

#### 获取开源许可证列表(可根据名称搜素)
```
GET api/licenses
```
*示例*
```
curl -X GET \
-d "name=AFL" \
http://localhost:3000/api/licenses/  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|name   |否|string   |开源许可证名称  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|licenses|array |返回数据|
|-- id             |int   |id |
|-- name           |string|开源许可证名称|


返回值
```
{
  "licenses": [
    {
      "id": 57,
      "name": "AFL-1.2"
    },
    {
      "id": 76,
      "name": "AFL-3.0"
    },
    {
      "id": 214,
      "name": "AFL-1.1"
    },
    {
      "id": 326,
      "name": "AFL-2.1"
    },
    {
      "id": 350,
      "name": "AFL-2.0"
    }
  ]
}
```
---

#### 创建项目
```
POST api/projects
```
*示例*
```
curl -X POST \
-d "user_id=36401" \
-d "name=hnfl_demo" \
-d "description=my first project" \
-d "repository_name=hnfl_demo" \
-d "project_category_id=1" \
-d "project_language_id=2" \
-d "ignore_id=2" \
-d "license_id=1" \
http://localhost:3000/api/projects/  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|user_id            |是|int    |用户id或者组织id  |
|name               |是|string |项目名称  |
|description        |是|string |项目描述  |
|repository_name    |是|string |仓库名称, 只含有数字、字母、下划线不能以下划线开头和结尾，且唯一  |
|project_category_id|是|int    |项目类别id  |
|project_language_id|是|int    |项目语言id  |
|ignore_id          |否|int    |gitignore相关id  |
|license_id         |否|int    |开源许可证id  |
|private            |否|boolean|项目是否私有, true：为私有，false: 公开，默认为公开  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id             |int   |id |
|name           |string|项目名称|


返回值
```
{
  "id": 3240,
  "name": "好项目"
}
```
---

#### 新建镜像项目
```
POST api/projects/migrate
```
*示例*
```
curl -X POST \
-d "user_id=36408" \
-d "clone_addr=https://gitea.com/mx8090alex/golden.git" \
-d "name=golden_mirror1" \
-d "description=golden_mirror" \
-d "repository_name=golden_mirror1" \
-d "project_category_id=1" \
-d "project_language_id=2" \
http://localhost:3000/api/projects/migrate.json?debug=admin  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|user_id            |是|int    |用户id或者组织id  |
|name               |是|string |项目名称  |
|clone_addr         |是|string |镜像项目clone地址  |
|description        |否|string |项目描述  |
|repository_name    |是|string |仓库名称, 只含有数字、字母、下划线不能以下划线开头和结尾，且唯一  |
|project_category_id|是|int    |项目类别id  |
|project_language_id|是|int    |项目语言id  |
|is_mirror          |否|boolean|是否设置为镜像， true：是， false：否，默认为否  |
|auth_username      |否|string|镜像源仓库的登录用户名  |
|auth_password      |否|string|镜像源仓库的登录秘密  |
|private            |否|boolean|项目是否私有, true：为私有，false: 非私有，默认为公开  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id             |int   |id |
|name           |string|项目名称|


返回值
```
{
  "id": 3263,
  "name": "ni项目"
}
```

---
#### 手动同步镜像
```
POST api/repositories/:id/sync_mirror
```
*示例*
```
curl -X POST http://localhost:3000/api/repositories/1244/sync_mirror  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id            |是|int    |仓库id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status            |int   |状态码， 0:标识请求成功 |
|message           |string|服务端返回的信息说明|


返回值
```
{
  "status": 0,
  "message": "success"
}
```

---

#### 项目详情
```
GET api/projects/:id
```
*示例*
```
curl -X GET http://localhost:3000/api/projects/3263  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id            |是|int    |项目id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id             |int   |id |
|name           |string|项目名称|
|identifier     |string|项目标识|
|is_public      |boolean|项目是否公开， true:公开，false:私有|
|description    |string|项目简介|
|repo_id        |int|仓库id|
|repo_identifier|string|仓库标识|


返回值
```
{
  "name": "ni项目",
  "identifier": "mirror_demo",
  "is_public": true,
  "description": "my first project mirror_demo",
  "repo_id": 75073,
  "repo_identifier": "mirror_demo"
}
```
---

#### 编辑仓库信息
```
GET  /api/repositories/:id/edit.json
```
*示例*
```
curl -X GET http://localhost:3000/api/repositories/:id/edit.json | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|identifier           |string   |仓库标识 |
|project_id           |int|项目id|
|project_name         |string|项目名称|
|project_identifier   |string|项目标识|
|project_description  |string|项目简介|
|project_category_id  |int|项目类别id|
|project_language_id  |int|项目语言id|
|private              |boolean|项目是否私有, true：为私有，false: 公开  |


返回值
```
{
  "identifier": "mirror_demo",
  "project_id": 3263,
  "project_name": "ni项目",
  "project_identifier": "mirror_demo",
  "project_description": "my first project mirror_demo",
  "project_category_id": 1,
  "project_language_id": 2,
  "private": false
}
```
---

#### 修改项目信息
```
PATCH api/projects/:id
```
*示例*
```
curl -X PATCH \
-d "name=hnfl_demo" \
-d "description=my first project" \
-d "project_category_id=1" \
-d "project_language_id=2" \
-d "private=true" \
http://localhost:3000/api/projects/3263.json  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id                 |是|int    |项目id  |
|name               |否|string |项目名称  |
|description        |否|string |项目描述  |
|project_category_id|否|int    |项目类别id  |
|project_language_id|否|int    |项目语言id  |
|private            |否|boolean|项目是否私有, true：为私有，false: 公开，默认为公开  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id                 |int|id |
|identifier         |string|项目标识|
|name               |string|项目名称|
|description        |string|项目简介|
|project_category_id|int|项目类别id|
|project_language_id|int|项目语言id|
|private            |否|boolean|项目是否私有, true：为私有，false: 公开，默认为公开  |


返回值
```
{
  "id": 3263,
  "identifier": "mirror_demo",
  "name": "hnfl_demo",
  "description": "my first project",
  "project_category_id": 1,
  "project_language_id": 2,
  "is_public": true
}
```
---

#### 删除项目
```
DELETE api/projects/:id
```
*示例*
```
curl -X DELETE http://localhost:3000/api/projects/3263.json  | jq
```

注：只有超级管理员和项目拥有者才能删除仓库

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id                 |是|int    |项目id  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status          |int|返回状态， 0: 表示操作成功 |
|message         |string|返回信息说明|


返回值
```
{
  "status": 0,
  "message": "success"
}
```
---

#### 项目添加成员
```
POST api/projects/:id/members
```
*示例*
```
curl -X POST \
-d "user_id=36406" \
http://localhost:3000/api/projects/3297/members  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id            |是|int    |项目id  |
|user_id       |是|int |用户id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status            |int   |0:添加成功， -1: 添加失败， 1: 表示已经是项目成员 |
|message           |string|返回信息说明|


返回值
```
{
  "status": 0,
  "message": "success"
}
```
---

#### 项目删除成员
```
DELETE api/projects/:id/members/remove
```
*示例*
```
curl -X DELETE \
-d "user_id=36400" \
http://localhost:3000/api/projects/3263/members/remove  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id            |是|int    |项目id  |
|user_id       |是|int |用户id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status         |int   |0:移除成功， -1: 移除失败， 1: 表示还不是项目成员 |
|message        |string|返回信息说明|


返回值
```
{
  "status": 0,
  "message": "success"
}
```
---

#### 更改项目成员角色/权限
```
PUT api/projects/:id/members/change_role
```
*示例*
```
curl -X PUT \
-d "user_id=36400" \
-d "role=Developer" \
http://localhost:3000/api/projects/3263/members/change_role  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id            |是|int    |项目id  |
|user_id       |是|int |用户id  |
|role          |是|string |取值范围："Manager", "Developer", "Reporter"；分别为项目管理人员(拥有所有操作权限)、项目开发人员(只拥有读写权限)、项目报告人员(只拥有读权限)  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status         |int   |0:角色更改成功， -1: 更改失败失败， 1: 表示还不是项目成员 |
|message        |string|返回信息说明|


返回值
```
{
  "status": 0,
  "message": "success"
}
```
---


#### 项目成员列表
```
GET api/projects/:id/members
```
*示例*
```
curl -X GET \
-d "page=1" \
-d "limit=5" \
http://localhost:3000/api/projects/3263/members  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id            |是|int    |项目id  |
|page          |否|string |页数，第几页  |
|limit         |否|string |每页多少条数据，默认15条  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count       |int   |返回记录总条数 |
|members           |array|项目成员信息|
|-- id             |int|用户id|
|-- name           |string|用户名称|
|-- login          |string|用户登录名/标识|
|-- image_url      |string|用户头像|
|-- is_owner       |boolean|是否是项目的拥有者，true:是， false:不是|
|-- role           |string|该用户在项目中的角色， Manager: 管理员(拥有操作权限); Developer:开发人员(只拥有读写权限)； Reporter:报告人员(只拥有读权限)|


返回值
```
{
  "total_count": 2,
  "members": [
    {
      "id": 36401,
      "name": "18816895620",
      "login": "18816895620",
      "image_url": "avatars/User/b",
      "is_owner": true,
      "role": "Manager"
    },
    {
      "id": 36399,
      "name": "18816365620",
      "login": "18816365620",
      "image_url": "avatars/User/b",
      "is_owner": false,
      "role": "Developer"
    }
  ]
}
```
---

#### Fork项目
```
POST /api/projects/:project_id/forks
```
*示例*
```
curl -X POST http://localhost:3000/api/projects/3297/forks  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|project_id        |是|int    |项目id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id             |int   |项目id |
|identifier     |string|项目标识|


返回值
```
{
  "id": 3290,
  "identifier": "newadm"
}
```
---

#### 获取代码目录列表
```
POST /api/repositories/:id/entries.json
```
*示例*
```
curl -X GET \
-d "ref=develop" \
http://localhost:3000//api/repositories/3687/entries.json  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id           |是|int |项目id  |
|ref             |否|string |分支名称、tag名称或是提交记录id，默认为master分支  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|last_commit            |object   | |
|-- commit             |object   | |
|id             |int   |id |
|name           |string|文件夹或文件名称|
|path           |string|文件夹或文件相对路径|
|type           |string|文件类型， file:文件，dir：文件目录|
|size           |int|文件夹或文件大小 单位B|
|content        |string|文件内容，|
|target         |string|标签|

返回值
```
{
  "last_commit": {
    "commit": {
      "sha": "3f2de4f78d2d7050486535082cd11cdfc9f3679e",
      "url": "http://localhost:3003//api/repositories/api-cloud-platform/commits/3f2de4f78d2d7050486535082cd11cdfc9f3679e",
      "message": "update README.md.",
      "author": {
        "name": "Gitee",
        "email": "noreply@gitee.com",
        "date": "2020-03-02T20:23:18+08:00"
      },
      "committer": {
        "name": "Gitee",
        "email": "noreply@gitee.com",
        "date": "2020-03-02T20:23:18+08:00"
      },
      "timestamp": 1583151798,
      "time_from_now": "3个月前"
    },
    "author": null,
    "committer": null
  },
  "entries": [
    {
      "name": "ace-gate",
      "path": "ace-gate",
      "sha": "c83f85fc63b14edcd6fc502eee9996f5a9993eca",
      "type": "dir",
      "size": 0,
      "content": null,
      "target": null,
      "commit": {
        "message": "v2.9 升级alibaba组件release版本\n",
        "sha": "6117eaab86f71115f42f2a46ff1683015cda798d",
        "created_at": "1970-01-01 08:00",
        "time_from_now": "51年前",
        "created_at_unix": null
      }
    },
    {
      "name": "ace-sidecar",
      "path": "ace-sidecar",
      "sha": "38e41d7810876b464f8f1adcbf998e1b04f710a7",
      "type": "dir",
      "size": 0,
      "content": null,
      "target": null,
      "commit": {
        "message": "[Feature] 升级spring 版本&consul注册中心\n",
        "sha": "c0a5dde35cfc87f7dbaf676aac397b184ba0e55b",
        "created_at": "1970-01-01 08:00",
        "time_from_now": "51年前",
        "created_at_unix": null
      }
    },
    ...
  ]
}
```
---

#### 获取子目录代码列表/编辑某个具体的文件
```
GET /api/repositories/:id/sub_entries
```
*示例*
```
curl -X GET \
-d "ref=master" \
-d "filepath=test1_create_file.rb" \
http://localhost:3000/api/repositories/87/sub_entries.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id              |是|int |项目id  |
|filepath        |是|string |文件夹、文件的相对路径  |
|ref             |否|string |分支名称、tag名称或是提交记录id，默认为master分支  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id             |int   |id |
|name           |string|文件夹或文件名称|
|path           |string|文件夹或文件相对路径|
|type           |string|文件类型， file:文件，dir：文件目录|
|size           |int|文件夹或文件大小 单位KB|
|content        |string|文件内容，|
|target         |string|标签|
|url            |string|文件访问链接,带分支|
|html_url       |string|文件访问链接，未标识分支|
|git_url        |string|文件夹或文件的git仓库访问链接|
|download_url   |string|文件下载、文件内容访问链接|

返回值
```
[
  {
    "name": "build.rc",
    "path": "lib/build.rc",
    "type": "",
    "size": 1268,
    "content": null,
    "target": null,
    "url": "http://localhost:3003/api/v1/repos/18816895620/mirror_demo/contents/lib/build.rc?ref=master",
    "html_url": "http://localhost:3003/18816895620/mirror_demo/src/branch/master/lib/build.rc",
    "git_url": "http://localhost:3003/api/v1/repos/18816895620/mirror_demo/git/blobs/191fcf1a63b3777e2977fcede7dd5309efdd70fe",
    "download_url": null
  },
  {
    "name": "cfg.rc",
    "path": "lib/cfg.rc",
    "type": "file",
    "size": 107,
    "content": null,
    "target": null,
    "url": "http://localhost:3003/api/v1/repos/18816895620/mirror_demo/contents/lib/cfg.rc?ref=master",
    "html_url": "http://localhost:3003/18816895620/mirror_demo/src/branch/master/lib/cfg.rc",
    "git_url": "http://localhost:3003/api/v1/repos/18816895620/mirror_demo/git/blobs/0b91ba0ed1c00e130c77bb9058af3787fea986a0",
    "download_url": "http://localhost:3003/18816895620/mirror_demo/raw/branch/master/lib/cfg.rc"
  },
  {
    "name": "fn",
    "path": "lib/fn",
    "type": "dir",
    "size": 0,
    "content": null,
    "target": null,
    "url": "http://localhost:3003/api/v1/repos/18816895620/mirror_demo/contents/lib/fn?ref=master",
    "html_url": "http://localhost:3003/18816895620/mirror_demo/src/branch/master/lib/fn",
    "git_url": "http://localhost:3003/api/v1/repos/18816895620/mirror_demo/git/blobs/e33bd45949ef8f804471d0b6b2c59728eb445989",
    "download_url": null
  }
]
```
---

#### 项目类别列表(用于项目列表左侧导航中的项目类别列表)
```
GET api/project_categories/group_list
```
*示例*
```
curl -X GET http://localhost:3000/api/project_categories/group_list | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id             |int   |项目分类id |
|name           |string|项目分类名称|
|projects_count |int   |项目数量|


返回值
```
[
  {
    "id": 1,
    "name": "大数据",
    "projects_count": 30
  },
  {
    "id": 2,
    "name": "机器学习",
    "projects_count": 1
  },
  {
    "id": 3,
    "name": "深度学习",
    "projects_count": 1
  }
]
```
---

#### 项目类型列表(用于项目列表左侧导航上方中的项目类型列表)
```
GET api/projects/group_type_list
```
*示例*
```
curl -X GET http://localhost:3000/api/projects/group_type_list | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|project_type   |string|项目类型 |
|name           |string|项目类型名称|
|projects_count |int   |项目数量|


返回值
```
[
  {
    "project_type": "common",
    "name": "开源托管项目",
    "projects_count": 2106
  },
  {
    "project_type": "mirror",
    "name": "开源镜像项目",
    "projects_count": 1
  }
]
```
---

#### 项目列表
```
GET api/projects
```
*示例*
```
curl -X GET \
-d "page=1" \
-d "limit=5" \
http://localhost:3000/api/projects  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|page          |否|string |页数，第几页  |
|limit         |否|string |每页多少条数据，默认15条  |
|sort_by       |否|string |排序类型, 取值：updated_on \| created_on \| forked_count \| praises_count, updated_on: 更新时间排序，created_on: 创建时间排序，forked_count: fork数据排序，praises_count: 点赞数量排序，默认为updated_on更新时间排序  |
|sort_direction|否|string |排序方式,取值为: desc \| asc; desc: 降序排序， asc: 升序排序， 默认为：desc  |
|search        |否|string |按照项目名称搜索  |
|category_id   |否|int    |项目类别id  |
|language_id   |否|int    |项目语言id  |
|project_type  |否|string |项目类型， 取值为：common \| mirror; common:开源托管项目, mirror:开源镜像项目  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count     |int   |项目总条数 |
|id              |string   |项目id |
|name            |string|项目名称|
|description     |string|项目简介|
|visits          |int|流量数|
|forked_count    |int|被fork的数量|
|praises_count   |int|star数量|
|is_public       |boolean|是否公开， true:公开，false:未公开|
|mirror_url      |string|镜像url|
|last_update_time|int|最后更新时间，为UNIX格式的时间戳|
|author          |object|项目创建者|
|-- name         |string|用户名，也是用户标识|
|category        |object|项目类别|
|-- id           |int|项目类型id|
|-- name         |string|项目类型名称|
|language        |object|项目语言|
|-- id           |int|项目语言id|
|-- name         |string|项目语言名称|


返回值
```
{
  "total_count": 3096,
  "projects": [
    {
      "id": 1,
      "name": "hnfl_demo1",
      "description": "my first project",
      "visits": 0,
      "praises_count": 0,
      "forked_count": 0,
      "is_public": true,
      "mirror_url": null,
      "last_update_time": 1577697461,
      "author": {
        "name": "18816895620",
        "image_url": "avatars/User/b"
      },
      "category": {
        "id": 1,
        "name": "大数据"
      },
      "language": {
        "id": 2,
        "name": "C"
      }
    },
    {
      "id": 2,
      "name": "hnfl_demo",
      "description": "my first project",
      "visits": 0,
      "praises_count": 0,
      "forked_count": 0,
      "is_public": true,
      "mirror_url": null,
      "last_update_time": 1577697403,
      "author": {
        "name": "18816895620",
        "image_url": "avatars/User/b"
      },
      "category": {
        "id": 1,
        "name": "大数据"
      },
      "language": {
        "id": 2,
        "name": "C"
      }
    },
    {
      "id": 3,
      "name": "统计局",
      "description": "my first project",
      "visits": 0,
      "praises_count": 0,
      "forked_count": 0,
      "is_public": true,
      "mirror_url": null,
      "last_update_time": 1577415173,
      "author": {
        "name": "18816895620",
        "image_url": "avatars/User/b"
      },
      "category": {
        "id": 1,
        "name": "大数据"
      },
      "language": {
        "id": 2,
        "name": "C"
      }
    },
    {
      "id": 5,
      "name": "开源同名",
      "description": "my first project",
      "visits": 0,
      "praises_count": 0,
      "forked_count": 0,
      "is_public": false,
      "mirror_url": "https://gitea.com/CasperVector/slew.git",
      "last_update_time": 1577346228,
      "author": {
        "name": "18816895620",
        "image_url": "avatars/User/b"
      },
      "category": {
        "id": 1,
        "name": "大数据"
      },
      "language": {
        "id": 2,
        "name": "C"
      }
    },
    {
      "id": 7,
      "name": "开源支持",
      "description": "my first project",
      "visits": 0,
      "praises_count": 0,
      "forked_count": 0,
      "is_public": true,
      "mirror_url": null,
      "last_update_time": 1577341572,
      "author": {
        "name": "18816895620",
        "image_url": "avatars/User/b"
      },
      "category": {
        "id": 1,
        "name": "大数据"
      },
      "language": {
        "id": 2,
        "name": "C"
      }
    }
  ]
}
```
---

### 获取分支列表
```
GET /api/projects/:id/branches
```
*示例*
```
curl -X GET http://localhost:3000/api/projects/4797/branches | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id               |是|id |项目id |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|name            |string|分支名称|
|user_can_push   |boolean|用户是否可push|
|user_can_merge  |boolean|用户是否客merge|
|protected       |boolean|是否为保护分支|
|http_url        |boolean|http链接|
|zip_url         |boolean|zip包下载链接|
|tar_url         |boolean|tar.gz下载链接|
|last_commit     |object|最后提交记录|
|-- id           |string|提交记录id|
|-- message      |string|提交的说明信息|
|-- timestamp    |int|提交时间，为UNIX时间戳|
|-- time_from_now|string|转换后的时间|
|author          |object|提交用户|
|-- login        |string|用户名称|
|-- image_url    |string|用户头像|


返回值
```
[
  {
    "name": "develop",
    "user_can_push": true,
    "user_can_merge": true,
    "protected": false,
    "http_url": "http://localhost:3003/18816895620/mirror_demo.git",
    "zip_url": "http://localhost:3003/18816895620/mirror_demo/develop.zip",
    "tar_url": "http://localhost:3003/18816895620/mirror_demo/develop.tar.gz",
    "last_commit": {
      "id": "735674d6696bddbafa993db9c67b40c41246c77f",
      "message": "FIX test branch content\n",
      "timestamp": 1577694074,
      "time_from_now": "1天前"
    },
    "author": {
      "login": "18816895620",
      "image_url": "avatars/User/b"
    }
  },
  {
    "name": "master",
    "user_can_push": true,
    "user_can_merge": true,
    "protected": false,
    "http_url": "http://localhost:3003/18816895620/mirror_demo.git",
    "zip_url": "http://localhost:3003/18816895620/mirror_demo/master.zip",
    "tar_url": "http://localhost:3003/18816895620/mirror_demo/master.tar.gz",
    "last_commit": {
      "id": "19ac3bc45f62cc87a94b8ecce61101d8fd2dafd2",
      "message": "合并pull request测试\n\n该功能很不错，感谢你的建议\n",
      "timestamp": 1577244567,
      "time_from_now": "6天前"
    },
    "author": {
      "login": "18816895620",
      "image_url": "avatars/User/b"
    }
  }
]
```
---

### 获取代码库标签列表
```
GET  /api/repositories/:id/tags
```
*示例*
```
curl -X GET \
-d "limit=20" \
-d "page=1" \
http://localhost:3000/api/repositories/5836/tags.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id          |是|int |仓库id  |
|page        |否|string |页数，第几页  |
|limit       |否|string |每页多少条数据，默认20条  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
|name            |string|分支名称|
|user_can_push   |boolean|用户是否可push|
|user_can_merge  |boolean|用户是否客merge|
|protected       |boolean|是否为保护分支|
|http_url        |boolean|http链接|
|zip_url         |boolean|zip包下载链接|
|tar_url         |boolean|tar.gz下载链接|
|last_commit     |object|最后提交记录|
|-- id           |string|提交记录id|
|-- message      |string|提交的说明信息|
|-- timestamp    |int|提交时间，为UNIX时间戳|
|-- time_from_now|string|转换后的时间|
|author          |object|提交用户|
|-- login        |string|用户名称|
|-- image_url    |string|用户头像|


返回值
```
[
  {
    "name": "develop",
    "user_can_push": true,
    "user_can_merge": true,
    "protected": false,
    "http_url": "http://localhost:3003/18816895620/mirror_demo.git",
    "zip_url": "http://localhost:3003/18816895620/mirror_demo/develop.zip",
    "tar_url": "http://localhost:3003/18816895620/mirror_demo/develop.tar.gz",
    "last_commit": {
      "id": "735674d6696bddbafa993db9c67b40c41246c77f",
      "message": "FIX test branch content\n",
      "timestamp": 1577694074,
      "time_from_now": "1天前"
    },
    "author": {
      "login": "18816895620",
      "image_url": "avatars/User/b"
    }
  },
  {
    "name": "master",
    "user_can_push": true,
    "user_can_merge": true,
    "protected": false,
    "http_url": "http://localhost:3003/18816895620/mirror_demo.git",
    "zip_url": "http://localhost:3003/18816895620/mirror_demo/master.zip",
    "tar_url": "http://localhost:3003/18816895620/mirror_demo/master.tar.gz",
    "last_commit": {
      "id": "19ac3bc45f62cc87a94b8ecce61101d8fd2dafd2",
      "message": "合并pull request测试\n\n该功能很不错，感谢你的建议\n",
      "timestamp": 1577244567,
      "time_from_now": "6天前"
    },
    "author": {
      "login": "18816895620",
      "image_url": "avatars/User/b"
    }
  }
]
```
---

## 仓库详情
```
GET /api/repositories/:id
```
*示例*
```
curl -X GET \
http://localhost:3000/api/repositories/23.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id             |是|string |项目id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|identifier      |string|仓库标识|
|project_id      |int|项目id|
|project_identifier|string|项目标识|
|praises_count   |int|点赞数量|
|forked_count    |int|fork数量|
|watchers_count  |int|关注数量|
|branches_count  |int|分支数量|
|commits_count   |int|总提交记录数量|
|issues_count    |int|总提交记录数量|
|pull_requests_count   |int|总提交记录数量|
|praised         |boolean|当前登录用户是否已点赞，true:已点赞，fasle:未点赞， 用户未登录状态为null|
|watched         |boolean|当前登录用户是否已关注，true:已关注，fasle:未关注， 用户未登录状态为null|
|permission      |string|当前登录用户对该仓库的操作权限, Manager:管理员，可以在线编辑文件、在线新建文件、可以设置仓库的基本信息; Developer:开发人员，可在线编辑文件、在线新建文件、不能设置仓库信息; Reporter: 报告人员，只能查看信息，不能设置仓库信息、不能在线编辑文件、不能在线新建文件；用户未登录时也会返回Reporter, 说明也只有读取文件的权限 |
|size            |int|仓库文件大小，单位：KB|
|type            |int|项目类型; 2: 表示是一个镜像(具备同步功能), 1: 普通镜像项目(不具同步功能), 0: 普通托管项目, 3: fork项目|
|mirror_status   |int|该字段在type字段为2(一个镜像)时才会出现; 0: 表示同步镜像成功；1: 表示正在同步镜像；2: 同步失败|
|mirror_url      |string|镜像地址, 只有通过镜像过来的项目才会有这个地址|
|ssh_url         |string|仓库ssh地址|
|clone_url       |string|仓库克隆地址|
|empty           |boolean|仓库是否为空，true: 空仓库；false: 非空仓库|
|private         |boolean|仓库是否私有，true: 私有仓库；fasle: 非私有的|
|default_branch  |string|仓库默认分支|
|full_name       |string|仓库全名(带用户名)|
|author          |object|提交用户|
|-- login        |string|用户login|
|-- name         |string|用户姓名|
|-- image_url    |string|用户头像|


返回值
```
{
  "identifier": "mirror_demo",
  "project_id": 3263,
  "project_identifier": "mirror_demo",
  "praises_count": 1,
  "forked_count": 0,
  "watchers_count": 1,
  "branches_count": 6,
  "commits_count": 107,
  "issues_count": 0,
  "pull_requests_count": 0,
  "permission": "Manager",
  "mirror_url": "https://gitea.com/CasperVector/slew.git",
  "watched": true,
  "praised": true,
  "size": 446,
  "ssh_url": "jasder@localhost:18816895620/mirror_demo.git",
  "clone_url": "http://localhost:3003/18816895620/mirror_demo.git",
  "default_branch": "master",
  "empty": false,
  "full_name": "18816895620/mirror_demo",
  "mirror": false,
  "private": false,
  "author": {
    "login": "18816895620",
    "name": "美女",
    "image_url": "avatars/User/b"
  }
}
```
---

## 获取提交记录列表
```
GET  /api/repositories/:id/commits
```
*示例*
```
curl -X GET \
-d "sha=develop" \
-d "page=1" \
http://localhost:3000/api/repositories/89/commits.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id                |是|int |项目id  |
|sha               |否|string |分支名称、提交记录的sha标识，默认为master分支  |
|page              |否|int |页数， 默认为1  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count|int|总记录条数|
|commits    |array|提交记录的数组|
|-- sha     |string|提交记录sha标识|
|-- message      |string|提交的备注说明|
|-- timestamp    |int|提交UNIX时间戳|
|-- time_from_now|string|提交距离当前的时间|
|author          |object|提交用户|
|-- login        |string|用户名称|
|-- image_url    |string|用户头像|


返回值
```
{
  "total_count": 63,
  "commits": [
    {
      "sha": "19ac3bc45f62cc87a94b8ecce61101d8fd2dafd2",
      "message": "合并pull request测试",
      "timestamp": 1577244567,
      "time_from_now": "7天前",
      "author": {
        "name": "18816895620",
        "image_url": "avatars/User/b"
      }
    },
    {
      "sha": "2b33c5f55214db41879936312ee43611406c4dbd",
      "message": "FIX .",
      "timestamp": 1577244474,
      "time_from_now": "7天前",
      "author": {
        "name": "18816895620",
        "image_url": "avatars/User/b"
      }
    }
  ]
}
```
---

## 获取某个提交记录(包含diff)
```
GET  /api/repositories/:id/commits/:sha
```
*示例*
```
curl -X GET \
http://localhost:3000/api/repositories/5845/commits/b0c4a4a1487d53acebf2addc544b29938cad12df.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id                |是|int |仓库repository的id  |
|sha               |否|string |git的ref或者是提交记录commit的sha标识  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|additions  |int|该commit下所有文件增加的总行数|
|deletions    |int|该commit下所有文件删除的总行数|
|sha     |string|提交记录sha标识|
|url     |string|该commit的api访问地址|
|commit      |object| |
|-- author    |object| commit的作者用户|
|---- login        |string|提交commit的用户名称|
|---- email    |string|提交commit的用户邮箱|
|---- date    |string|提交commit的时间|
|-- committer    |object|提交者用户信息|
|---- login        |string|committer的用户名称|
|---- email    |string|committer的用户邮箱|
|---- date    |string|committer的时间|
|-- message    |string|提交信息|
|-- tree    |object| |
|---- sha    |string| tree结构的sha标识|
|author      |object|forge平台的提交用户信息|
|-- id           |int|用户id|
|-- login        |string|用户登录名|
|-- name        |string|用户名称|
|-- image_url    |string|用户头像|
|committer      |object|forge平台的committer用户信息|
|-- id           |int|用户id|
|-- login        |string|用户登录名|
|-- name        |string|用户名称|
|-- image_url    |string|用户头像|
|parents      |array|父节点|
|-- sha    |int|commit父节点的sha标识|
|-- url    |string|commit父节点api访问地址|
|author          |object|提交用户|
|-- login        |string|用户名称|
|-- image_url    |string|用户头像|
|files          |array|文件数组|
|-- Name    |string|文件名称|
|-- OldName    |string|旧文件名称|
|-- Addition    |string|增加的行数|
|-- Deletion    |string|删除的行数|
|-- Type    |string|1: 表示是新增加的文件，2:表示是修改的文件， 3: 表示该文件已经被删除|
|-- IsCreated    |boolean|是否为新添加的文件，true：是； false：否|
|-- IsDeleted    |boolean|是否为删除的文件，true：是；false：否|
|-- IsRenamed    |boolean|是否为重命名的文件，true：是，false：否|
|-- IsBin    |boolean|是否为二进制文件，true：是，false：否|
|-- IsLFSFile    |boolean|是否git lfs操作的大文件，true：是，false：否|
|-- IsSubmodule    |boolean|收否为子模块，true：是；false：否|
|-- Sections    |array| |
|---- Name    |string|文件名称|
|------ Lines    |array|行数|
|-------- LeftIdx    |int|分列视图时用，左侧开始行号， 0:表示没有行号|
|-------- RightIdx    |int|分列视图时用，右侧开始行号|
|-------- Type    |int|1: 表示未做修改的源代码，2: 表示增加的代码，3: 表示删除的代码，4: 统计说明，如：@@ -0,0 +1,11 @@|
|-------- Content    |string|一行的文件内容|
|-------- Comments    |string|评论信息|
|-------- SectionInfo    |string|用户头像|
|---------- Path    |string|文件路径|
|---------- LastLeftIdx    |string| |
|---------- LastRightIdx    |string| |
|---------- LeftIdx    |string| |
|---------- RightIdx    |string| |
|---------- LeftHunkSize    |string| |
|---------- RightHunkSize   |string| |


返回值
```
{
  "additions": 243,
  "deletions": 32,
  "sha": "c6c17ad47d6dbe4369d559847197b37b4090a46e",
  "url": "http://localhost:3000/api/repositories/5845/commits/c6c17ad47d6dbe4369d559847197b37b4090a46e.json",
  "commit": {
    "author": {
      "name": "GitHub",
      "email": "noreply@github.com",
      "date": "2020-05-20T20:15:27+08:00"
    },
    "committer": {
      "name": "GitHub",
      "email": "noreply@github.com",
      "date": "2020-05-20T20:15:27+08:00"
    }
  },
  "author": null,
  "committer": null,
  "parents": [
    {
      "sha": "c8b8cfd85e375ad376833d04b9ca499bf9da355b",
      "url": "http://localhost:3003//api/repositories/intelligent-test-platform/commits/c8b8cfd85e375ad376833d04b9ca499bf9da355b"
    },
    {
      "sha": "b0c4a4a1487d53acebf2addc544b29938cad12df",
      "url": "http://localhost:3003//api/repositories/intelligent-test-platform/commits/b0c4a4a1487d53acebf2addc544b29938cad12df"
    }
  ],
  "files": [
    {
      "Name": "Dockerfile",
      "OldName": "Dockerfile",
      "Index": 1,
      "Addition": 11,
      "Deletion": 0,
      "Type": 1,
      "IsCreated": true,
      "IsDeleted": false,
      "IsBin": false,
      "IsLFSFile": false,
      "IsRenamed": false,
      "IsSubmodule": false,
      "Sections": [
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": "@@ -0,0 +1,11 @@",
              "Comments": null,
              "SectionInfo": {
                "Path": "Dockerfile",
                "LastLeftIdx": 0,
                "LastRightIdx": 0,
                "LeftIdx": 0,
                "RightIdx": 1,
                "LeftHunkSize": 0,
                "RightHunkSize": 11
              }
            },
            {
              "LeftIdx": 0,
              "RightIdx": 1,
              "Type": 2,
              "Content": "+FROM adoptopenjdk/maven-openjdk8:latest",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 2,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 3,
              "Type": 2,
              "Content": "+ADD ./target/markov-demo-0.0.1-SNAPSHOT.jar /usr/local/markov-demo-0.0.1-SNAPSHOT.jar",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 4,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 5,
              "Type": 2,
              "Content": "+# Add docker-compose-wait tool -------------------",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 6,
              "Type": 2,
              "Content": "+ENV WAIT_VERSION 2.7.2",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 7,
              "Type": 2,
              "Content": "+ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 8,
              "Type": 2,
              "Content": "+RUN chmod +x /wait",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 9,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 10,
              "Type": 2,
              "Content": "+EXPOSE 8080",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 11,
              "Type": 2,
              "Content": "+ENTRYPOINT [ \"java\", \"-jar\", \"/usr/local/markov-demo-0.0.1-SNAPSHOT.jar\" ]",
              "Comments": null,
              "SectionInfo": null
            }
          ]
        }
      ],
      "IsIncomplete": false
    },
    {
      "Name": "docker-compose.yml",
      "OldName": "docker-compose.yml",
      "Index": 2,
      "Addition": 42,
      "Deletion": 0,
      "Type": 1,
      "IsCreated": true,
      "IsDeleted": false,
      "IsBin": false,
      "IsLFSFile": false,
      "IsRenamed": false,
      "IsSubmodule": false,
      "Sections": [
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": "@@ -0,0 +1,42 @@",
              "Comments": null,
              "SectionInfo": {
                "Path": "docker-compose.yml",
                "LastLeftIdx": 0,
                "LastRightIdx": 0,
                "LeftIdx": 0,
                "RightIdx": 1,
                "LeftHunkSize": 0,
                "RightHunkSize": 42
              }
            },
            {
              "LeftIdx": 0,
              "RightIdx": 1,
              "Type": 2,
              "Content": "+version: '3.6'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 2,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 3,
              "Type": 2,
              "Content": "+services:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 4,
              "Type": 2,
              "Content": "+  web:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 5,
              "Type": 2,
              "Content": "+    build: .",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 6,
              "Type": 2,
              "Content": "+    command: sh -c \"/wait && java -jar /usr/local/markov-demo-0.0.1-SNAPSHOT.jar\"",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 7,
              "Type": 2,
              "Content": "+    environment:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 8,
              "Type": 2,
              "Content": "+      - WAIT_HOSTS=container-mysql:3306",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 9,
              "Type": 2,
              "Content": "+      - WAIT_HOSTS_TIMEOUT=300",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 10,
              "Type": 2,
              "Content": "+      - WAIT_SLEEP_INTERVAL=30",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 11,
              "Type": 2,
              "Content": "+      - WAIT_HOST_CONNECT_TIMEOUT=30",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 12,
              "Type": 2,
              "Content": "+      - spring.datasource.url=jdbc:mysql://container-mysql:3306/markov_demo?useUnicode=true&characterEncoding=utf-8",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 13,
              "Type": 2,
              "Content": "+    depends_on:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 14,
              "Type": 2,
              "Content": "+      - container-mysql",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 15,
              "Type": 2,
              "Content": "+    ports:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 16,
              "Type": 2,
              "Content": "+      - '8080:8080'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 17,
              "Type": 2,
              "Content": "+    expose:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 18,
              "Type": 2,
              "Content": "+      - '8080'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 19,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 20,
              "Type": 2,
              "Content": "+  container-mysql:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 21,
              "Type": 2,
              "Content": "+    image: mysql:5.7",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 22,
              "Type": 2,
              "Content": "+    restart: always",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 23,
              "Type": 2,
              "Content": "+    environment:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 24,
              "Type": 2,
              "Content": "+      MYSQL_DATABASE: 'markov_demo'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 25,
              "Type": 2,
              "Content": "+      # So you don't have to use root, but you can if you like",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 26,
              "Type": 2,
              "Content": "+      MYSQL_USER: 'root'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 27,
              "Type": 2,
              "Content": "+      # You can use whatever password you like",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 28,
              "Type": 2,
              "Content": "+      MYSQL_PASSWORD: '123'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 29,
              "Type": 2,
              "Content": "+      # Password for root access",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 30,
              "Type": 2,
              "Content": "+      MYSQL_ROOT_PASSWORD: '123'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 31,
              "Type": 2,
              "Content": "+    ports:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 32,
              "Type": 2,
              "Content": "+      # <Port exposed> : < MySQL Port running inside container>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 33,
              "Type": 2,
              "Content": "+      - '3306:3306'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 34,
              "Type": 2,
              "Content": "+    expose:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 35,
              "Type": 2,
              "Content": "+      # Opens port 3306 on the container",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 36,
              "Type": 2,
              "Content": "+      - '3306'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 37,
              "Type": 2,
              "Content": "+      # Where our data will be persisted",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 38,
              "Type": 2,
              "Content": "+    volumes:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 39,
              "Type": 2,
              "Content": "+      - my-db:/tmp/mysql",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 40,
              "Type": 2,
              "Content": "+# Names our volume",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 41,
              "Type": 2,
              "Content": "+volumes:",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 42,
              "Type": 2,
              "Content": "+  my-db: {}",
              "Comments": null,
              "SectionInfo": null
            }
          ]
        }
      ],
      "IsIncomplete": false
    },
    {
      "Name": "pom.xml",
      "OldName": "pom.xml",
      "Index": 3,
      "Addition": 5,
      "Deletion": 0,
      "Type": 2,
      "IsCreated": false,
      "IsDeleted": false,
      "IsBin": false,
      "IsLFSFile": false,
      "IsRenamed": false,
      "IsSubmodule": false,
      "Sections": [
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": "@@ -26,6 +26,11 @@",
              "Comments": null,
              "SectionInfo": {
                "Path": "pom.xml",
                "LastLeftIdx": 0,
                "LastRightIdx": 0,
                "LeftIdx": 26,
                "RightIdx": 26,
                "LeftHunkSize": 6,
                "RightHunkSize": 11
              }
            },
            {
              "LeftIdx": 26,
              "RightIdx": 26,
              "Type": 1,
              "Content": " \t\t\t<artifactId>mybatis-spring-boot-starter</artifactId>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 27,
              "RightIdx": 27,
              "Type": 1,
              "Content": " \t\t\t<version>2.1.2</version>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 28,
              "RightIdx": 28,
              "Type": 1,
              "Content": " \t\t</dependency>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 29,
              "Type": 2,
              "Content": "+\t\t<dependency>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 30,
              "Type": 2,
              "Content": "+\t\t\t<groupId>org.flywaydb</groupId>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 31,
              "Type": 2,
              "Content": "+\t\t\t<artifactId>flyway-core</artifactId>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 32,
              "Type": 2,
              "Content": "+\t\t\t<version>6.4.2</version>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 33,
              "Type": 2,
              "Content": "+\t\t</dependency>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 29,
              "RightIdx": 34,
              "Type": 1,
              "Content": " ",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 30,
              "RightIdx": 35,
              "Type": 1,
              "Content": " \t\t<dependency>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 31,
              "RightIdx": 36,
              "Type": 1,
              "Content": " \t\t\t<groupId>mysql</groupId>",
              "Comments": null,
              "SectionInfo": null
            }
          ]
        },
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": " ",
              "Comments": null,
              "SectionInfo": {
                "Path": "pom.xml",
                "LastLeftIdx": 31,
                "LastRightIdx": 36,
                "LeftIdx": 103,
                "RightIdx": 108,
                "LeftHunkSize": 0,
                "RightHunkSize": 0
              }
            }
          ]
        }
      ],
      "IsIncomplete": false
    },
    {
      "Name": "src/main/resources/application.properties",
      "OldName": "src/main/resources/application.properties",
      "Index": 4,
      "Addition": 5,
      "Deletion": 4,
      "Type": 2,
      "IsCreated": false,
      "IsDeleted": false,
      "IsBin": false,
      "IsLFSFile": false,
      "IsRenamed": false,
      "IsSubmodule": false,
      "Sections": [
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": "@@ -1,10 +1,11 @@",
              "Comments": null,
              "SectionInfo": {
                "Path": "src/main/resources/application.properties",
                "LastLeftIdx": 0,
                "LastRightIdx": 0,
                "LeftIdx": 1,
                "RightIdx": 1,
                "LeftHunkSize": 10,
                "RightHunkSize": 11
              }
            },
            {
              "LeftIdx": 1,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 1,
              "Type": 2,
              "Content": "+# Database configuration",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 2,
              "RightIdx": 2,
              "Type": 1,
              "Content": " spring.datasource.driver-class-name = com.mysql.cj.jdbc.Driver",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 3,
              "RightIdx": 3,
              "Type": 1,
              "Content": " spring.datasource.url = jdbc:mysql://127.0.0.1:3306/markov_demo?useUnicode=true&characterEncoding=utf-8",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 4,
              "RightIdx": 4,
              "Type": 1,
              "Content": " spring.datasource.username = root",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 5,
              "RightIdx": 5,
              "Type": 1,
              "Content": " spring.datasource.password = 123",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 6,
              "RightIdx": 6,
              "Type": 1,
              "Content": " ",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 7,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 8,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 9,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-mybatis.mapper-locations= classpath:mapping/*Mapper.xml",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 7,
              "Type": 2,
              "Content": "+mybatis.mapper-locations=classpath:mapping/*Mapper.xml",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 10,
              "RightIdx": 8,
              "Type": 1,
              "Content": " mybatis.type-aliases-package=com.alibaba.markovdemo.entity",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 9,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 10,
              "Type": 2,
              "Content": "+spring.flyway.default-schema=markov_demo",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 11,
              "Type": 2,
              "Content": "+spring.flyway.locations=classpath:db/migration",
              "Comments": null,
              "SectionInfo": null
            }
          ]
        }
      ],
      "IsIncomplete": false
    },
    {
      "Name": "src/main/resources/db/migration/V1__init_ddl.sql",
      "OldName": "src/main/resources/db/migration/V1__init_ddl.sql",
      "Index": 5,
      "Addition": 179,
      "Deletion": 0,
      "Type": 1,
      "IsCreated": true,
      "IsDeleted": false,
      "IsBin": false,
      "IsLFSFile": false,
      "IsRenamed": false,
      "IsSubmodule": false,
      "Sections": [
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": "@@ -0,0 +1,179 @@",
              "Comments": null,
              "SectionInfo": {
                "Path": "src/main/resources/db/migration/V1__init_ddl.sql",
                "LastLeftIdx": 0,
                "LastRightIdx": 0,
                "LeftIdx": 0,
                "RightIdx": 1,
                "LeftHunkSize": 0,
                "RightHunkSize": 179
              }
            },
            {
              "LeftIdx": 0,
              "RightIdx": 1,
              "Type": 2,
              "Content": "+create database if not exists markov_demo;",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 2,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 3,
              "Type": 2,
              "Content": "+use markov_demo;",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 4,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 5,
              "Type": 2,
              "Content": "+CREATE TABLE `got_testcase` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 6,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 7,
              "Type": 2,
              "Content": "+  `scenario_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT 'scenario id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 8,
              "Type": 2,
              "Content": "+  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 9,
              "Type": 2,
              "Content": "+  `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 10,
              "Type": 2,
              "Content": "+  `name` longtext COMMENT 'name',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 11,
              "Type": 2,
              "Content": "+  `description` longtext COMMENT 'description',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 12,
              "Type": 2,
              "Content": "+  `long_description` longtext COMMENT '详细描述',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 13,
              "Type": 2,
              "Content": "+  `content` longtext COMMENT '存储case的阶段数据，比如数据准备阶段，数据执行阶段',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 14,
              "Type": 2,
              "Content": "+  `case_group` varchar(100) DEFAULT NULL COMMENT 'case分组',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 15,
              "Type": 2,
              "Content": "+  `is_deleted` int(11) DEFAULT '0' COMMENT '用例是否被删除。0-没有删除；1-已删除，此类case不会展示到页面上',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 16,
              "Type": 2,
              "Content": "+  `case_template` text COMMENT '用例模板 java/c++',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 17,
              "Type": 2,
              "Content": "+  `features` text COMMENT '业务特征',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 18,
              "Type": 2,
              "Content": "+  `is_visible` int DEFAULT '0' COMMENT '是否可见用例',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 19,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 20,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='testcase';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 21,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 22,
              "Type": 2,
              "Content": "+CREATE TABLE `got_pipeline` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 23,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键（id）',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 24,
              "Type": 2,
              "Content": "+  `pipeline` longtext COMMENT 'pipeline的json配置',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 25,
              "Type": 2,
              "Content": "+  `extend` text COMMENT '扩展字段',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 26,
              "Type": 2,
              "Content": "+  `tag` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '流程定义/自定义\\n',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 27,
              "Type": 2,
              "Content": "+  `scenario_id` bigint(20) unsigned DEFAULT NULL COMMENT '场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 28,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 29,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='存储流程执行的pipeline配置文件';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 30,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 31,
              "Type": 2,
              "Content": "+CREATE TABLE `got_scenario` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 32,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 33,
              "Type": 2,
              "Content": "+  `name` varchar(100) DEFAULT NULL COMMENT 'name',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 34,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 35,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='测试场景表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 36,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 37,
              "Type": 2,
              "Content": "+CREATE TABLE `got_envs` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 38,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 39,
              "Type": 2,
              "Content": "+  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 40,
              "Type": 2,
              "Content": "+  `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 41,
              "Type": 2,
              "Content": "+  `host_ip` varchar(20)  DEFAULT NULL COMMENT 'host_ip',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 42,
              "Type": 2,
              "Content": "+  `status` varchar(20) DEFAULT NULL COMMENT '状态',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 43,
              "Type": 2,
              "Content": "+  `name` varchar(200) DEFAULT NULL COMMENT '环境名称',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 44,
              "Type": 2,
              "Content": "+  `env_detail` text COMMENT '环境详情',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 45,
              "Type": 2,
              "Content": "+  `scenario_id` bigint(20) unsigned DEFAULT NULL COMMENT '场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 46,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 47,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=6928 DEFAULT CHARSET=utf8 COMMENT='环境列表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 48,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 49,
              "Type": 2,
              "Content": "+CREATE TABLE `pipeline_ui` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 50,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 51,
              "Type": 2,
              "Content": "+  `scenario_id` bigint(20) unsigned DEFAULT NULL COMMENT '场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 52,
              "Type": 2,
              "Content": "+  `content` text COMMENT 'pipeline_ui的jsonString\\n',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 53,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 54,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='pipeline_ui表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 55,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 56,
              "Type": 2,
              "Content": "+CREATE TABLE `got_datasource` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 57,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键/场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 58,
              "Type": 2,
              "Content": "+  `content` longtext COMMENT '数据源内容',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 59,
              "Type": 2,
              "Content": "+  `scenario_id` bigint(20) unsigned DEFAULT NULL COMMENT '场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 60,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`),",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 61,
              "Type": 2,
              "Content": "+  KEY `idx_scenario_id` (`scenario_id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 62,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='测试数据源表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 63,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 64,
              "Type": 2,
              "Content": "+CREATE TABLE `got_menu` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 65,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 66,
              "Type": 2,
              "Content": "+  `content` text COMMENT 'menu的jsonString\\n',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 67,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 68,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='menu表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 69,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 70,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 71,
              "Type": 2,
              "Content": "+insert into got_menu values(0, \"{    \\\"buinfo\\\": {        \\\"buid\\\": 1,        \\\"appSecneMap\\\": {            \\\"1\\\": \\\"1\\\"        },        \\\"menu\\\": [{            \\\"businessId\\\": 1,            \\\"businessName\\\": \\\"markov-demo\\\",            \\\"appMenuList\\\": [{                \\\"appName\\\": \\\"测试模块\\\",                \\\"appId\\\": 1,                \\\"scenarioMenuList\\\": [{                    \\\"isMember\\\": true,                    \\\"scenarioId\\\": 1,                    \\\"scenarioName\\\": \\\"场景1\\\"                },{                    \\\"isMember\\\": true,                    \\\"scenarioId\\\": 2,                    \\\"scenarioName\\\": \\\"场景2\\\"                }]            }]        }, ],        \\\"buName\\\": \\\"markov-demo\\\"    }}\");",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 72,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 73,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 74,
              "Type": 2,
              "Content": "+CREATE TABLE `got_reports` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 75,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 76,
              "Type": 2,
              "Content": "+  `gmt_create` datetime NOT NULL COMMENT '创建时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 77,
              "Type": 2,
              "Content": "+  `gmt_modified` datetime NOT NULL COMMENT '修改时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 78,
              "Type": 2,
              "Content": "+  `user` text COMMENT '执行用户',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 79,
              "Type": 2,
              "Content": "+  `report_name` text COMMENT '报告名称',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 80,
              "Type": 2,
              "Content": "+  `status` varchar(100) DEFAULT NULL COMMENT '执行状态',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 81,
              "Type": 2,
              "Content": "+  `message` text COMMENT '信息',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 82,
              "Type": 2,
              "Content": "+  `app_id` bigint(20) unsigned DEFAULT NULL COMMENT 'appid',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 83,
              "Type": 2,
              "Content": "+  `scenario_id` bigint(20) unsigned DEFAULT NULL COMMENT '场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 84,
              "Type": 2,
              "Content": "+  `run_type` text COMMENT '执行方式',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 85,
              "Type": 2,
              "Content": "+  `exec_id` text COMMENT '批次id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 86,
              "Type": 2,
              "Content": "+  `analysis` text COMMENT '分析报告',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 87,
              "Type": 2,
              "Content": "+  `task_id` text COMMENT 'zk任务id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 88,
              "Type": 2,
              "Content": "+  `zk_info` longtext COMMENT 'zk信息',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 89,
              "Type": 2,
              "Content": "+  `accuracy_report_id` bigint(20) unsigned DEFAULT NULL COMMENT '精准测试报告id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 90,
              "Type": 2,
              "Content": "+  `case_num` int(10) unsigned DEFAULT '0' COMMENT '回归用例数',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 91,
              "Type": 2,
              "Content": "+  `image_name` text COMMENT '回归的镜像版本',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 92,
              "Type": 2,
              "Content": "+  `branch_name` text COMMENT '执行用例的分支',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 93,
              "Type": 2,
              "Content": "+  `git_branch` text COMMENT '测试源码的分支',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 94,
              "Type": 2,
              "Content": "+  `git_commit` text COMMENT '测试源码的commit版本',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 95,
              "Type": 2,
              "Content": "+  `cc_cov_rate` text COMMENT '增量代码覆盖率',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 96,
              "Type": 2,
              "Content": "+  `is_visible` int DEFAULT '0' COMMENT '是否可见报告',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 97,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`),",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 98,
              "Type": 2,
              "Content": "+  KEY `idx_scenarioid` (`scenario_id`),",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 99,
              "Type": 2,
              "Content": "+  KEY `idx_appid` (`app_id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 100,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=7858 DEFAULT CHARSET=utf8mb4 COMMENT='回归测试报告表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 101,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 102,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 103,
              "Type": 2,
              "Content": "+CREATE TABLE `got_testcase_snaps` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 104,
              "Type": 2,
              "Content": "+  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 105,
              "Type": 2,
              "Content": "+  `gmt_create` datetime NOT NULL COMMENT '创建时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 106,
              "Type": 2,
              "Content": "+  `gmt_modified` datetime NOT NULL COMMENT '修改时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 107,
              "Type": 2,
              "Content": "+  `scenario_id` bigint(20) unsigned DEFAULT NULL COMMENT '场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 108,
              "Type": 2,
              "Content": "+  `app_id` bigint(20) unsigned DEFAULT NULL COMMENT 'appid',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 109,
              "Type": 2,
              "Content": "+  `name` varchar(100) DEFAULT NULL COMMENT '用例名',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 110,
              "Type": 2,
              "Content": "+  `description` text COMMENT '描述',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 111,
              "Type": 2,
              "Content": "+  `long_description` longtext COMMENT '详情',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 112,
              "Type": 2,
              "Content": "+  `content` longtext COMMENT '输入，输出，期望，数据准备',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 113,
              "Type": 2,
              "Content": "+  `status` varchar(100) DEFAULT NULL COMMENT '用例执行状态',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 114,
              "Type": 2,
              "Content": "+  `testreport_id` bigint(20) unsigned NOT NULL COMMENT '归属的报告id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 115,
              "Type": 2,
              "Content": "+  `testcase_id` bigint(20) unsigned NOT NULL COMMENT '归属的用例id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 116,
              "Type": 2,
              "Content": "+  `case_group` varchar(100) DEFAULT NULL COMMENT '测试用例分组',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 117,
              "Type": 2,
              "Content": "+  `tag` varchar(100) DEFAULT NULL COMMENT 'case标签，可有有多个值',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 118,
              "Type": 2,
              "Content": "+  `version` varchar(100) DEFAULT NULL COMMENT 'case版本号',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 119,
              "Type": 2,
              "Content": "+  `run_time` bigint(20) unsigned DEFAULT NULL COMMENT '执行时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 120,
              "Type": 2,
              "Content": "+  `run_time_str` text COMMENT '执行时间标准化',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 121,
              "Type": 2,
              "Content": "+  `retry_num` bigint(20) unsigned DEFAULT NULL COMMENT '重试次数',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 122,
              "Type": 2,
              "Content": "+  `constancy` text COMMENT '稳定性',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 123,
              "Type": 2,
              "Content": "+  `env_name` text COMMENT '环境名',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 124,
              "Type": 2,
              "Content": "+  `conflict_desc` text COMMENT '冲突用例描述',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 125,
              "Type": 2,
              "Content": "+  `is_parallel` tinyint(1) DEFAULT NULL COMMENT '是否串行',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 126,
              "Type": 2,
              "Content": "+  `trouble_shoot_box` longtext COMMENT '智能归因',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 127,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`),",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 128,
              "Type": 2,
              "Content": "+  KEY `idx_caseid` (`testcase_id`),",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 129,
              "Type": 2,
              "Content": "+  KEY `idx_reportid` (`testreport_id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 130,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=303953 DEFAULT CHARSET=utf8mb4 COMMENT='测试报告用例集快照'",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 131,
              "Type": 2,
              "Content": "+;",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 132,
              "Type": 2,
              "Content": "+CREATE TABLE `got_features_pool` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 133,
              "Type": 2,
              "Content": "+    `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 134,
              "Type": 2,
              "Content": "+    `gmt_create` datetime NOT NULL COMMENT '创建时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 135,
              "Type": 2,
              "Content": "+    `gmt_modified` datetime NOT NULL COMMENT '修改时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 136,
              "Type": 2,
              "Content": "+    `scenario_id` bigint unsigned NULL COMMENT 'scenario_id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 137,
              "Type": 2,
              "Content": "+    `app_id` bigint unsigned NULL COMMENT 'app_id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 138,
              "Type": 2,
              "Content": "+    `features` text NULL COMMENT '特征集',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 139,
              "Type": 2,
              "Content": "+    PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 140,
              "Type": 2,
              "Content": "+) DEFAULT CHARACTER SET=utf8mb4 COMMENT='特征池';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 141,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 142,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 143,
              "Type": 2,
              "Content": "+CREATE TABLE `got_case_generate_task` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 144,
              "Type": 2,
              "Content": "+  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 145,
              "Type": 2,
              "Content": "+  `gmt_create` datetime NOT NULL COMMENT '创建时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 146,
              "Type": 2,
              "Content": "+  `gmt_modified` datetime NOT NULL COMMENT '修改时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 147,
              "Type": 2,
              "Content": "+  `creator` text COMMENT '任务创建者',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 148,
              "Type": 2,
              "Content": "+  `seed_case_list` text COMMENT '种子用例id列表，以”,“分隔',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 149,
              "Type": 2,
              "Content": "+  `scenario_id` bigint unsigned DEFAULT NULL COMMENT '场景id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 150,
              "Type": 2,
              "Content": "+  `env_info` text COMMENT '测试环境信息',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 151,
              "Type": 2,
              "Content": "+  `feature_conf` longtext COMMENT '任务相关配置，jsonObject',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 152,
              "Type": 2,
              "Content": "+  `task_name` text COMMENT '任务名',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 153,
              "Type": 2,
              "Content": "+  `task_snap` longtext COMMENT '任务生成信息',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 154,
              "Type": 2,
              "Content": "+  `task_result` longtext COMMENT '最终生成用例',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 155,
              "Type": 2,
              "Content": "+  `task_status` text COMMENT 'crate 、executing、success or fail ',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 156,
              "Type": 2,
              "Content": "+  `gene_bank_snap` longtext COMMENT 'json格式gene bank',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 157,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 158,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用例智能生成任务记录表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 159,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 160,
              "Type": 2,
              "Content": "+CREATE TABLE `got_case_accuracy` (",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 161,
              "Type": 2,
              "Content": "+  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 162,
              "Type": 2,
              "Content": "+  `gmt_create` datetime NOT NULL COMMENT '创建时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 163,
              "Type": 2,
              "Content": "+  `gmt_modified` datetime NOT NULL COMMENT '修改时间',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 164,
              "Type": 2,
              "Content": "+  `case_id` bigint unsigned DEFAULT NULL COMMENT 'case id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 165,
              "Type": 2,
              "Content": "+  `exe_id` bigint unsigned DEFAULT NULL COMMENT '回归执行id',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 166,
              "Type": 2,
              "Content": "+  `cov_line` longtext COMMENT 'case覆盖的代码行，json格式',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 167,
              "Type": 2,
              "Content": "+  `collect_type` text COMMENT 'single : 单case收集；total：任务整体收集',",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 168,
              "Type": 2,
              "Content": "+  PRIMARY KEY (`id`),",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 169,
              "Type": 2,
              "Content": "+  KEY `idx_caseid` (`case_id`),",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 170,
              "Type": 2,
              "Content": "+  KEY `idx_exe_id` (`exe_id`)",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 171,
              "Type": 2,
              "Content": "+) ENGINE=InnoDB AUTO_INCREMENT=16001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='case精准数据覆盖数据记录表';",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 172,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 173,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 174,
              "Type": 2,
              "Content": "+INSERT INTO `got_testcase` (`gmt_create`,`gmt_modified`,`scenario_id`,`name`,`description`,`long_description`,`content`,`case_group`,`is_deleted`,`case_template`,`is_visible`) VALUES ('2020-04-28 19:12:55','2020-04-28 19:12:55',1,'case名','用例智能生成-种子用例','种子用例','{\\\"prepareData\\\":[{\\\"Tair\\\":[{\\\"dsName\\\":\\\"table.markovtair.test\\\",\\\"data\\\":[{\\\"key\\\":\\\"testkey\\\",\\\"value\\\":\\\"testvalue\\\",\\\"property\\\":\\\"\\\"}]}]}],\\\"caseRunStage\\\":[{\\\"group_name\\\":\\\"ERPC校验（第一组）\\\",\\\"data\\\":[{\\\"input\\\":\\\"{\\\\n  \\\\\\\"ad_id\\\\\\\": \\\\\\\"222\\\\\\\",\\\\n  \\\\\\\"search_key\\\\\\\": \\\\\\\"key1\\\\\\\",\\\\n  \\\\\\\"match_level\\\\\\\": 2,\\\\n  \\\\\\\"user_type\\\\\\\": \\\\\\\"type1\\\\\\\",\\\\n  \\\\\\\"top_num\\\\\\\": 10,\\\\n  \\\\\\\"use_feature\\\\\\\": false,\\\\n  \\\\\\\"other1\\\\\\\": \\\\\\\"1\\\\\\\",\\\\n  \\\\\\\"other2\\\\\\\": \\\\\\\"0\\\\\\\"\\\\n}\\\",\\\"expect\\\":\\\"{\\\\n  \\\\\\\"result\\\\\\\": \\\\\\\"1\\\\\\\" \\\\n}\\\",\\\"actual\\\":\\\"null\\\"}]}]}','test',0,'c++',0);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 175,
              "Type": 2,
              "Content": "+INSERT INTO `got_testcase` (`gmt_create`,`gmt_modified`,`scenario_id`,`name`,`description`,`long_description`,`content`,`case_group`,`is_deleted`,`case_template`,`is_visible`) VALUES ('2020-04-28 19:12:55','2020-04-28 19:12:55',1,'case名','用例智能推荐用例1','普通用例','{\\\"prepareData\\\":[{\\\"Tair\\\":[{\\\"dsName\\\":\\\"table.markovtair.test\\\",\\\"data\\\":[{\\\"key\\\":\\\"testkey\\\",\\\"value\\\":\\\"testvalue\\\",\\\"property\\\":\\\"\\\"}]}],\\\"Imock\\\":[{\\\"dsName\\\":\\\"erpc_merger_inner\\\",\\\"data\\\":[{\\\"key\\\":\\\"key1\\\",\\\"value\\\":\\\"value1\\\",\\\"property\\\":\\\"\\\"},{\\\"key\\\":\\\"key2\\\",\\\"value\\\":\\\"value2\\\",\\\"property\\\":\\\"\\\"}],\\\"restartFlag\\\":\\\"0\\\"}]}],\\\"caseRunStage\\\":[{\\\"group_name\\\":\\\"ERPC校验（第一组）\\\",\\\"data\\\":[{\\\"input\\\":\\\"{\\\\n  \\\\\\\"param_manager\\\\\\\": {\\\\n    \\\\\\\"expand_param\\\\\\\": {\\\\n      \\\\\\\"key_value_list\\\\\\\": [\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature1\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"true\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature2\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"3,8;4,16\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature3\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"1\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature4\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"one_phase_model_searching,200,166,1\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature5\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"false\\\\\\\"\\\\n        }\\\\n      ]\\\\n    }\\\\n  }\\\\n}\\\",\\\"expect\\\":\\\"{\\\\n  \\\\\\\"result\\\\\\\": \\\\\\\"1\\\\\\\"\\\\n}\\\",\\\"actual\\\":\\\"null\\\"}]}]}','猜你喜欢',0,'c++',0);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 176,
              "Type": 2,
              "Content": "+INSERT INTO `got_testcase` (`gmt_create`,`gmt_modified`,`scenario_id`,`name`,`description`,`long_description`,`content`,`case_group`,`is_deleted`,`case_template`,`is_visible`) VALUES ('2020-04-28 19:12:55','2020-04-28 19:12:55',1,'case名','用例智能推荐用例2','普通用例','{\\\"prepareData\\\":[{\\\"Tair\\\":[{\\\"dsName\\\":\\\"table.markovtair.test\\\",\\\"data\\\":[{\\\"key\\\":\\\"testkey\\\",\\\"value\\\":\\\"testvalue\\\",\\\"property\\\":\\\"\\\"}]}],\\\"Imock\\\":[{\\\"dsName\\\":\\\"erpc_merger_inner\\\",\\\"data\\\":[{\\\"key\\\":\\\"key1\\\",\\\"value\\\":\\\"confict-value\\\",\\\"property\\\":\\\"\\\"},{\\\"key\\\":\\\"key2\\\",\\\"value\\\":\\\"value2\\\",\\\"property\\\":\\\"\\\"}]}]}],\\\"caseRunStage\\\":[{\\\"group_name\\\":\\\"ERPC校验（第一组）\\\",\\\"data\\\":[{\\\"input\\\":\\\"{\\\\n  \\\\\\\"param_manager\\\\\\\": {\\\\n    \\\\\\\"expand_param\\\\\\\": {\\\\n      \\\\\\\"key_value_list\\\\\\\": [\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature1\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"true\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature2\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"3,8;4,16\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature3\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"1\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature4\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"one_phase_model_searching,200,166,1\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature5\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"false\\\\\\\"\\\\n        }\\\\n      ]\\\\n    }\\\\n  }\\\\n}\\\",\\\"expect\\\":\\\"{\\\\n  \\\\\\\"result\\\\\\\": \\\\\\\"1\\\\\\\"\\\\n}\\\"}]}]}','购物车',0,'c++',0);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 177,
              "Type": 2,
              "Content": "+INSERT INTO `got_testcase` (`gmt_create`,`gmt_modified`,`scenario_id`,`name`,`description`,`long_description`,`content`,`case_group`,`is_deleted`,`case_template`,`is_visible`) VALUES ('2020-04-28 19:12:55','2020-04-28 19:12:55',1,'case名','用例智能推荐用例3','普通用例','{\\\"prepareData\\\":[{\\\"Tair\\\":[{\\\"dsName\\\":\\\"table.markovtair.test\\\",\\\"data\\\":[{\\\"key\\\":\\\"testkey\\\",\\\"value\\\":\\\"testvalue\\\",\\\"property\\\":\\\"\\\"}]}],\\\"Imock\\\":[{\\\"dsName\\\":\\\"erpc_merger_inner\\\",\\\"data\\\":[{\\\"key\\\":\\\"key1\\\",\\\"value\\\":\\\"value1\\\",\\\"property\\\":\\\"\\\"},{\\\"key\\\":\\\"key3\\\",\\\"value\\\":\\\"value3\\\",\\\"property\\\":\\\"\\\"}]}]}],\\\"caseRunStage\\\":[{\\\"group_name\\\":\\\"ERPC校验（第一组）\\\",\\\"data\\\":[{\\\"input\\\":\\\"{\\\\n  \\\\\\\"param_manager\\\\\\\": {\\\\n    \\\\\\\"expand_param\\\\\\\": {\\\\n      \\\\\\\"key_value_list\\\\\\\": [\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature1\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"true\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature2\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"3,8;4,16\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature3\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"1\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature4\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"one_phase_model_searching,200,166,1\\\\\\\"\\\\n        },\\\\n        {\\\\n          \\\\\\\"key\\\\\\\": \\\\\\\"feature5\\\\\\\",\\\\n          \\\\\\\"value\\\\\\\": \\\\\\\"false\\\\\\\"\\\\n        }\\\\n      ]\\\\n    }\\\\n  }\\\\n}\\\",\\\"expect\\\":\\\"{\\\\n  \\\\\\\"result\\\\\\\": \\\\\\\"1\\\\\\\"\\\\n}\\\"}]}]}','直播',0,'c++',0);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 178,
              "Type": 2,
              "Content": "+",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 179,
              "Type": 2,
              "Content": "+INSERT INTO `got_envs` (`gmt_create`,`gmt_modified`,`scenario_id`,`name`,`status`,`host_ip`,`env_detail`) VALUES ('2020-04-28 19:12:55','2020-04-28 19:12:55',1,'初始测试环境','SUCCESS','11.167.254.210','123');",
              "Comments": null,
              "SectionInfo": null
            }
          ]
        }
      ],
      "IsIncomplete": false
    },
    {
      "Name": "src/main/resources/static/index.html",
      "OldName": "src/main/resources/static/index.html",
      "Index": 6,
      "Addition": 1,
      "Deletion": 1,
      "Type": 2,
      "IsCreated": false,
      "IsDeleted": false,
      "IsBin": false,
      "IsLFSFile": false,
      "IsRenamed": false,
      "IsSubmodule": false,
      "Sections": [
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": "@@ -24,7 +24,7 @@",
              "Comments": null,
              "SectionInfo": {
                "Path": "src/main/resources/static/index.html",
                "LastLeftIdx": 0,
                "LastRightIdx": 0,
                "LeftIdx": 24,
                "RightIdx": 24,
                "LeftHunkSize": 7,
                "RightHunkSize": 7
              }
            },
            {
              "LeftIdx": 24,
              "RightIdx": 24,
              "Type": 1,
              "Content": "   <!--<script src=\"js/sqi-cdn/numeral.min.js\" type=\"text/javascript\"></script>-->",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 25,
              "RightIdx": 25,
              "Type": 1,
              "Content": "   <script src=\"js/sqi-cdn/require.min.js\" type=\"text/javascript\"></script>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 26,
              "RightIdx": 26,
              "Type": 1,
              "Content": "   <!--<script id=\"xwtongji\" src=\"//xuanwu.alibaba-inc.com/xw/resources/home/tongji.js\" data=\"markov\" charset=\"utf-8\"></script>-->",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 27,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-  <meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\" />",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 0,
              "RightIdx": 27,
              "Type": 2,
              "Content": "+  <!--  <meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\" />-->",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 28,
              "RightIdx": 28,
              "Type": 1,
              "Content": " ",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 29,
              "RightIdx": 29,
              "Type": 1,
              "Content": " </head>",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 30,
              "RightIdx": 30,
              "Type": 1,
              "Content": " <body>",
              "Comments": null,
              "SectionInfo": null
            }
          ]
        },
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": " ",
              "Comments": null,
              "SectionInfo": {
                "Path": "src/main/resources/static/index.html",
                "LastLeftIdx": 30,
                "LastRightIdx": 30,
                "LeftIdx": 43,
                "RightIdx": 43,
                "LeftHunkSize": 0,
                "RightHunkSize": 0
              }
            }
          ]
        }
      ],
      "IsIncomplete": false
    },
    {
      "Name": "src/test/java/com/alibaba/markovdemo/MarkovDemoApplicationTests.java",
      "OldName": "src/test/java/com/alibaba/markovdemo/MarkovDemoApplicationTests.java",
      "Index": 7,
      "Addition": 0,
      "Deletion": 27,
      "Type": 2,
      "IsCreated": false,
      "IsDeleted": false,
      "IsBin": false,
      "IsLFSFile": false,
      "IsRenamed": false,
      "IsSubmodule": false,
      "Sections": [
        {
          "Name": "",
          "Lines": [
            {
              "LeftIdx": 0,
              "RightIdx": 0,
              "Type": 4,
              "Content": "@@ -32,36 +32,9 @@ class MarkovDemoApplicationTests {",
              "Comments": null,
              "SectionInfo": {
                "Path": "src/test/java/com/alibaba/markovdemo/MarkovDemoApplicationTests.java",
                "LastLeftIdx": 0,
                "LastRightIdx": 0,
                "LeftIdx": 32,
                "RightIdx": 32,
                "LeftHunkSize": 36,
                "RightHunkSize": 9
              }
            },
            {
              "LeftIdx": 32,
              "RightIdx": 32,
              "Type": 1,
              "Content": " \t\treturn df2.format(date1);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 33,
              "RightIdx": 33,
              "Type": 1,
              "Content": " \t}",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 34,
              "RightIdx": 34,
              "Type": 1,
              "Content": " ",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 35,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 36,
              "RightIdx": 35,
              "Type": 1,
              "Content": " \t@Test",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 37,
              "RightIdx": 36,
              "Type": 1,
              "Content": " \tvoid wordTest () throws IOException {",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 38,
              "RightIdx": 37,
              "Type": 1,
              "Content": " ",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 39,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\t// FileInputStream fis = new FileInputStream(\"199801.txt\");",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 40,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\t// FileOutputStream fos = new FileOutputStream(\"dic.txt\");",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 41,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\t// ImportCorpus readF = new ImportCorpus(fis, fos);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 42,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\t// readF.readDic();",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 43,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\t// System.out.println(\"µ¼Èë½áÊø\");",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 44,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 45,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tString filename = \"dic.txt\";",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 46,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tHashMap hm = new HashMap();",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 47,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tHashMap len = new HashMap();",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 48,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tGenerateDictionary genDic = new GenerateDictionary();",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 49,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tSegmentation seg;",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 50,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 51,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tgenDic.genHashDic(filename, hm, len);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 52,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 53,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tInputStreamReader reader = new InputStreamReader(System.in);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 54,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tBufferedReader br = new BufferedReader(reader);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 55,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tString data = \"\";",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 56,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tdata = br.readLine();",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 57,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 58,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tseg = new Segmentation(hm, len);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 59,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 60,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tString FmmTarget = seg.Fmm(data);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 61,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tString BmmTarget = seg.Bmm(data);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 62,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 63,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tSystem.out.println(\"FmmTarget: \" + FmmTarget);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 64,
              "RightIdx": 0,
              "Type": 3,
              "Content": "-\t\tSystem.out.println(\"BmmTarget: \" + BmmTarget);",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 65,
              "RightIdx": 38,
              "Type": 1,
              "Content": " \t}",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 66,
              "RightIdx": 39,
              "Type": 1,
              "Content": " ",
              "Comments": null,
              "SectionInfo": null
            },
            {
              "LeftIdx": 67,
              "RightIdx": 40,
              "Type": 1,
              "Content": " }",
              "Comments": null,
              "SectionInfo": null
            }
          ]
        }
      ],
      "IsIncomplete": false
    }
  ]
}
```
---

### 点赞
```
POST /api/projects/:id/praise_tread/like
```
*示例*
```
curl -X POST http://localhost:3000/api/projects/3263/praise_tread/like | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id   |是  |int |项目id   |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|0:点赞成功，-1:操作失败，2:表示已经点过赞了|


返回值
```
{
    "status": 0,
    "message": "success"
}
```
---

### 取消点赞
```
DELETE /api/projects/:id/praise_tread/unlike
```
*示例*
```
curl -X DELETE http://localhost:3000/api/projects/3263/praise_tread/unlike | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id   |是  |int |项目id   |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|0:点赞成功，-1:操作失败，2:表示还未点赞|


返回值
```
{
  "status": 0,
  "message": "success"
}
```
---

### 用户是否点过赞
```
GET /api/projects/:id/praise_tread/check_like
```
*示例*
```
curl -X GET http://localhost:3000/api/projects/3263/praise_tread/check_like | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id   |是  |int |项目id   |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|1:已点过赞，0:未点过赞, -1:请求操作失败|


返回值
```
{
  "status": 0,
  "message": "success"
}
```
---

### 项目的点赞者列表
```
GET /api/projects/:id/praise_tread
```
*示例*
```
curl -X GET \
-d "page=1" \
-d "limit=5" \
http://localhost:3000/api/projects/3263/praise_tread | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id          |是|int |项目id  |
|page        |否|string |页数，第几页  |
|limit       |否|string |每页多少条数据，默认15条  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count           |int|总条数|
|praises           |array|点赞数据|
|-- name           |string|用户名称|
|-- login           |string|用户标识/登录名(login)|
|-- image_url       |string|用户头像|



返回值
```
{
  "total_count": 1,
  "praises": [
    {
      "name": "18816895620",
      "login": "18816895620",
      "image_url": "avatars/User/b"
    }
  ]
}
```
---

### 关注(项目)
```
POST /api/projects/:id/watchers/follow
```
*示例*
```
curl -X POST http://localhost:3000/api/projects/3263/watchers/follow | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id          |是|int |项目id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|0:点赞成功，-1:操作失败，2:表示已经点过赞了|


返回值
```
{
    "status": 0,
    "message": "响应成功"
}
```
---

### 取消关注
```
DELETE /api/projects/:id/watchers/unfollow
```
*示例*
```
curl -X DELETE http://localhost:3000//api/projects/3263/watchers/unfollow | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id          |是|int |项目id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|0:点赞成功，-1:操作失败，2:表示还未点赞|


返回值
```
{
  "status": 0,
  "message": "响应成功"
}
```
---

### 用户是否关注过项目
```
GET /api/projects/:id/watchers/check_watch
```
*示例*
```
curl -X GET http://localhost:3000/api/projects/3263/watchers/check_watch | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id   |是  |int |项目id   |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|1:已关注，0:未关注, -1:请求操作失败|


返回值
```
{
  "status": 0,
  "message": "success"
}
```
---

### 项目的关注者列表
```
GET /api/projects/:id/watchers
```
*示例*
```
curl -X GET \
-d "page=1" \
-d "limit=5" \
http://localhost:3000//api/projects/3263/watchers | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id          |是|int |项目id  |
|page        |否|string |页数，第几页  |
|limit       |否|string |每页多少条数据，默认15条  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count           |int|总条数|
|watchers           |array|关注数据|
|-- name           |string|用户名称|
|-- login           |string|用户标识/登录名(login)|
|-- image_url       |string|用户头像|


返回值
```
{
  "total_count": 1,
  "watchers": [
    {
      "name": "18816895620",
      "login": "18816895620",
      "image_url": "avatars/User/b"
    }
  ]
}
```
---

### 仓库新建文件
```
POST /api/repositories/:id/create_file
```
*示例*
```
curl -X POST \
-d 'filepath=test1_create_file1.rb' \
-d 'branch=master' \
-d 'content=提交的内容' \
-d 'message=test commit ' \
http://localhost:3000/api/18816895620/mirror_demo/contents.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id             |是|string |项目id  |
|filepath       |是|string |文件相对于仓库的路径 |
|content        |否|string |内容  |
|message        |否|string |提交说明 |
|branch         |否|string |分支名称, branch和new_branch必须存在一个 |
|new_branch     |否|string |新的分支名称 |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|name        |string|文件名|
|sha         |string|提交文件的sha值|
|size        |int|文件大小， 单位：B|
|content     |string|base64编码后的文件内容|
|encoding    |string|编码方式|
|commit      |object||
|-- message  |string|提交备注说明信息|
|-- committer|object||
|---- name   |string|用户名|
|---- email  |string|用户邮箱|
|---- date   |string|文件创建时间|



返回值
```
{
  "name": "test1_create_file12.rb",
  "sha": "7b70509105b587e71f5692b9e8ab70851e321f64",
  "size": 12,
  "content": "Wm5ObWMyRmtaZz09",
  "encoding": "base64",
  "commit": {
    "message": "good luck\n",
    "author": {
      "name": "18816895620",
      "email": "2456233122@qq.com",
      "date": "2020-01-07T03:31:20Z"
    },
    "committer": {
      "name": "18816895620",
      "email": "2456233122@qq.com",
      "date": "2020-01-07T03:31:20Z"
    }
  }
}
```
---

### 更新仓库中的文件
```
PUT /api/repositories/:id/update_file.json
```
*示例*
```
curl -X PUT \
-d 'filepath=text1.rb' \
-d 'branch=master' \
-d 'content=ruby code' \
-d 'message=更改提交信息' \
-d 'from_path=text.rb' \
-d "sha=57426eb21e4ceabdf4b206f022077e0040" \
http://localhost:3000/api/repositories/3938/update_file.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id             |是|int |项目id  |
|filepath       |是|string |文件相对于仓库的路径(或修改后的文件路径) |
|from_path      |是|string |原文件相对于仓库的路径, 只有当需要修改原文件名称时，才需要该参数 |
|sha            |是|string |文件的sha标识值 |
|content        |是|string |内容  |
|message        |否|string |提交说明 |
|branch         |否|string |分支名称, branch和new_branch必须存在一个,且只能存在一个 |
|new_branch     |否|string |新的分支名称 |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|name        |string|文件名|
|sha         |string|提交文件的sha值|
|size        |int|文件大小， 单位：B|
|content     |string|base64编码后的文件内容|
|encoding    |string|编码方式|
|commit      |object||
|-- message  |string|提交备注说明信息|
|-- committer|object||
|---- name   |string|用户名|
|---- email  |string|用户邮箱|
|---- date   |string|文件创建时间|


返回值
```
{
  "name": "test1_create_file6.rb",
  "sha": "57426eb21e4ceabdf4b206f022257e08077e0040",
  "size": 16,
  "content": "5o+Q5Lqk55qE5YaF5a65MQ==",
  "encoding": "base64",
  "commit": {
    "message": "更改提交信息\n",
    "author": {
      "name": "18816895620",
      "email": "2456233122@qq.com",
      "date": "2020-01-08T07:05:15Z"
    },
    "committer": {
      "name": "18816895620",
      "email": "2456233122@qq.com",
      "date": "2020-01-08T07:05:15Z"
    }
  }
}
```
---

### 删除仓库中的文件
```
DELETE /api/repositories/:id/delete_file
```
*示例*
```
curl -X DELETE \
-d 'filepath=test1_create_file12.rb' \
-d 'test delete file' \
-d 'sha=7b70509105b587e71f5692b9e8ab70851e321f64' \
http://localhost:3000/api//api/repositories/3868/delete_file | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id          |是|int |项目id  |
|filepath       |是|string |文件相对于仓库的路径 |
|message        |否|string |提交说明 |
|branch         |否|string |分支名称, 默认为master分支|
|new_branch     |否|string |新的分支名称 |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|sha         |string|提交文件的sha值|
|commit      |object||
|-- message  |string|提交备注说明信息|
|-- committer|object||
|---- name   |string|用户名|
|---- email  |string|用户邮箱|
|---- date   |string|文件创建时间|


返回值
```
{
  "commit": {
    "sha": "7b70509105b587e71f5692b9e8ab70851e321f64",
    "message": "Delete 'test1_create_file11.rb'\n",
    "author": {
      "name": "18816895620",
      "email": "2456233122@qq.com",
      "date": "2020-01-08T07:57:34Z"
    },
    "committer": {
      "name": "18816895620",
      "email": "2456233122@qq.com",
      "date": "2020-01-08T07:57:34Z"
    }
  }
}
```
---
