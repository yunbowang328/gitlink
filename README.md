
# 本地开发部署步骤

#### 1. 安装依赖包

```bash
bundle install
```

#### 2. 配置初始化文件
进入项目根目录执行一下命令：

```bash
cp config/configuration.yml.example config/configuration.yml
cp config/database.yml.example config/database.yml
touch config/redis.yml
touch config/elasticsearch.yml
```

#### 3. 创建数据库

```bash
rails db:create
```

#### 4. 导入数据表结构

```bash
bundle exec rake sync_table_structure:import_csv
```

#### 5. 执行migrate迁移文件
```bash
rails db:migrate RAILS_ENV=development
```

#### 6. 启动rails服务
```bash
rails s
```

#### 7. 浏览器访问
在浏览器中输入如下地址访问：
```bash
http://localhost:3000/projects
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
-|-|-
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
-|-|-
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
-|-|-|-
|page          |否|int |页数，第几页  |
|limit         |否|int |每页多少条数据，默认15条  |
|search        |否|string |用户名、登录名匹配搜索  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|name   |否|string   |类别名称  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|name   |否|string   |类别名称  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|name   |否|string   |gitignore名称  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|name   |否|string   |开源许可证名称  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
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
-|-|-
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
-d "user_id=36401" \
-d "clone_addr=https://gitea.com/mx8090alex/golden.git" \
-d "name=golden" \
-d "description=golden" \
-d "repository_name=golden" \
-d "project_category_id=1" \
-d "project_language_id=2" \
http://localhost:3000/api/projects/migrate  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
-|-|-|-
|user_id            |是|int    |用户id或者组织id  |
|name               |是|string |项目名称  |
|clone_addr         |是|string |镜像项目clone地址  |
|description        |否|string |项目描述  |
|repository_name    |是|string |仓库名称, 只含有数字、字母、下划线不能以下划线开头和结尾，且唯一  |
|project_category_id|是|int    |项目类别id  |
|project_language_id|是|int    |项目语言id  |
|private            |否|boolean|项目是否私有, true：为私有，false: 非私有，默认为公开  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id            |是|int    |项目id  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-
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
-|-|-|-
|id                 |是|int    |项目id  |
|name               |否|string |项目名称  |
|description        |否|string |项目描述  |
|project_category_id|否|int    |项目类别id  |
|project_language_id|否|int    |项目语言id  |
|private            |否|boolean|项目是否私有, true：为私有，false: 公开，默认为公开  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id                 |是|int    |项目id  |

*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id            |是|int    |项目id  |
|user_id       |是|int |用户id  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id            |是|int    |项目id  |
|user_id       |是|int |用户id  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id            |是|int    |项目id  |
|user_id       |是|int |用户id  |
|role          |是|string |取值范围："Manager", "Developer", "Reporter"；分别为项目管理人员(拥有所有操作权限)、项目开发人员(只拥有读写权限)、项目报告人员(只拥有读权限)  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id            |是|int    |项目id  |
|page          |否|string |页数，第几页  |
|limit         |否|string |每页多少条数据，默认15条  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|project_id        |是|int    |项目id  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id           |是|int |项目id  |
|ref             |否|string |分支名称、tag名称或是提交记录id，默认为master分支  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
|id             |int   |id |
|name           |string|文件夹或文件名称|
|path           |string|文件夹或文件相对路径|
|type           |string|文件类型， file:文件，dir：文件目录|
|size           |int|文件夹或文件大小 单位B|
|content        |string|文件内容，|
|target         |string|标签|

返回值
```
[
  {
    "name": "Manual",
    "path": "Manual",
    "sha": "c2f18765235076b4c835b3e31262b3ee65176a75",
    "type": "file",
    "size": 12579,
    "content": null,
    "target": null,
    "commit": null
  },
  {
    "name": "README",
    "path": "README",
    "sha": "91a29176828eba5c5598f5d4a95458e861f271ec",
    "type": "file",
    "size": 1767,
    "content": null,
    "target": null,
    "commit": null
  },
  {
    "name": "base",
    "path": "base",
    "sha": "7adbe5698e02dba062216333d5e1d16b36ae1cbd",
    "type": "dir",
    "size": 0,
    "content": null,
    "target": null,
    "commit": null
  }
]
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
-|-|-|-
|id              |是|int |项目id  |
|filepath        |是|string |文件夹、文件的相对路径  |
|ref             |否|string |分支名称、tag名称或是提交记录id，默认为master分支  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-
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
-|-|-
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
-|-|-|-
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
-|-|-
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
GET /api/projects/:identifier/branches
```
*示例*
```
curl -X GET http://localhost:3000/api/projects/mirror_demo/branches | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
-|-|-|-
|identifier               |是|string |项目标识  |


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

### 获取版本列表
```
GET  /api/repositories/:id/tags
```
*示例*
```
curl -X GET http://localhost:3000/api/repositories/124/tags.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
-|-|-|-
|id               |是|int |项目id  |


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
-|-|-|-
|id             |是|string |项目id  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id                |是|int |项目id  |
|sha               |否|string |分支名称、提交记录的sha标识，默认为master分支  |
|page              |否|int |页数， 默认为1  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id   |是  |int |项目id   |

*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id   |是  |int |项目id   |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id   |是  |int |项目id   |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id          |是|int |项目id  |
|page        |否|string |页数，第几页  |
|limit       |否|string |每页多少条数据，默认15条  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id          |是|int |项目id  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id          |是|int |项目id  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id   |是  |int |项目id   |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id          |是|int |项目id  |
|page        |否|string |页数，第几页  |
|limit       |否|string |每页多少条数据，默认15条  |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
|id             |是|string |项目id  |
|filepath       |是|string |文件相对于仓库的路径 |
|content        |否|string |内容  |
|message        |否|string |提交说明 |
|branch         |否|string |分支名称, branch和new_branch必须存在一个 |
|new_branch     |否|string |新的分支名称 |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
-|-|-|-
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
-|-|-
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
-|-|-|-
|id          |是|int |项目id  |
|filepath       |是|string |文件相对于仓库的路径 |
|message        |否|string |提交说明 |
|branch         |否|string |分支名称, 默认为master分支|
|new_branch     |否|string |新的分支名称 |


*返回参数说明:*

|参数名|类型|说明|
-|-|-
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
