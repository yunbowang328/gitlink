---


# API文档

## 基本介绍

### 开发API服务地址：

****


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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
curl -X POST \
-d "user_id=36408" \
-d "clone_addr=https://gitea.com/mx8090alex/golden.git" \
-d "name=golden_mirror1" \
-d "description=golden_mirror" \
-d "project_category_id=1" \
-d "project_language_id=2" \
http://localhost:3000/api/projects/migrate.json  | jq
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
```json
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
```bash
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
```json
{
  "status": 0,
  "message": "success"
}
```

---

#### 项目详情
```
GET /api/:owner/:repo
```
*示例*
```bash
curl -X GET http://localhost:3000/api/jasder/jasder_test  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |用户登录名  |
|repo             |是|string |项目标识identifier  |


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
```json
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

#### 项目详情(简版)
```
GET /api/:owner/:repo/simple
```
*示例*
```bash
curl -X GET http://localhost:3000/api/jasder/jasder_test/simple  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |用户登录名  |
|repo             |是|string |项目标识identifier  |


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
```json
{
  "identifier": "jasder_test",
  "name": "jasder的测试项目",
  "id": 4967,
  "type": 0,
  "author": {
    "login": "jasder",
    "name": "姓名",
    "image_url": "avatars/User/b"
  }
}
```
---

#### 编辑仓库信息
```
GET  /api/repositories/:id/edit.json
```
*示例*
```bash
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
```json
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
```bash
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
|default_branch     |否|string    |默认分支名称  |
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
{
  "id": 3290,
  "identifier": "newadm"
}
```
---

#### 获取代码目录列表
```
POST /api/:owner/:repo/repository/entries
```
*示例*
```bash
curl -X GET \
-d "ref=develop" \
http://localhost:3000//api/jasder/jasder_test/repository/entries  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |用户登录名  |
|repo             |是|string |项目标识identifier  |
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
```json
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
```bash
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
```json
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
```bash
curl -X GET http://localhost:3000/api/project_categories/group_list | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id             |int   |项目分类id |
|name           |string|项目分类名称|
|projects_count |int   |项目数量|


返回值
```json
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
```bash
curl -X GET http://localhost:3000/api/projects/group_type_list | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|project_type   |string|项目类型 |
|name           |string|项目类型名称|
|projects_count |int   |项目数量|


返回值
```json
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
```bash
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
```json
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

#### 推荐项目
```
GET api/projects/recommend
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/projects/recommend  | jq
```

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
```json
[
  {
    "id": 20,
    "repo_id": null,
    "identifier": "PNAekinmH",
    "name": "FNILL",
    "visits": 13567,
    "author": {
      "name": "王一达",
      "login": "wangyida",
      "image_url": "avatars/User/b"
    },
    "category": {
      "id": 8,
      "name": "其他"
    }
  },
  ...
]

```
---

#### 项目主页
```
GET api/:owner/:repo/about
```

*示例*
```bash
curl -X GET \
http://localhost:3000/api/:jason/forgeplus/about  | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |用户登录名  |
|repo             |是|string |项目标识identifier  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|identifier     |string|project's identifier|
|content     |string|主页内容|
|attachments     |array|附件|
|-- name         |string|用户名，也是用户标识|


返回值
```json
{
  "content": "",
  "identifier": "forgeplus",
  attachments: [

  ]
}

```
---

#### 修改项目主页内容
```
POST api/:owner/:repo/about
```

*示例*
```bash
curl -X POST \
-d "content=内容" \
-d "attachment_ids=[1, 2, 2]" \
http://localhost:3000/api/jasder/forgeplus/about  | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |用户登录名  |
|repo             |是|string |项目标识identifier  |
|content        |是|string |内容信息  |
|attachment_ids |是|array |附件id  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|identifier     |string|project's identifier|
|content     |string|主页内容|
|attachments     |array|附件|
|-- name         |string|用户名，也是用户标识|

返回值
```json
{
  "content": "",
  "identifier": "forgeplus",
  attachments: [

  ]
}

```
---

### 获取分支列表
```
GET /api/:owner/:repo/branches
```
*示例*
```bash
curl -X GET http://localhost:3000/api/jasder/jasder_test/branches | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |用户登录名  |
|repo             |是|string |项目标识identifier  |


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
```json
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
```bash
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
```json
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
GET /api/:owner/:repo/repository
```
*示例*
```bash
curl -X GET \
http://192.168.2.230:3000/api/jasder/forgeplus/repository | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |用户登录名  |
|repo             |是|string |项目标识identifier  |


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
```json
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
```bash
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
```json
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
GET  /api/:owner/:repo/commits/:sha
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/jasder/repo/commits/b0c4a4a1487d53acebf2addc544b29938cad12df.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner                |是|string |仓库拥有者  |
|repo                |是|string |仓库的identifier值  |
|sha               |否|string |git的ref或者是提交记录commit的sha标识  |


*返回参数说明: 请参考compare接口*


返回值
```
{
  "files_count": 6,
  "total_addition": 447,
  "total_deletion": 0,
  "commit": {
    "sha": "8f5faee0d3b3be1b8063e84da0c79dd75327b968",
    "message": "add some file\n* Add the tag list page to the release page\n* Apply suggestions from code review\n* Add the tags list view\n* Add the delete tag way on ui\n* Not delete tag and clear message when delete a release\n",
    "author": {
      "name": "Jasder",
      "email": "2053003901@@qq.com",
      "date": "2020-11-03T13:56:22+08:00"
    },
    "committer": {
      "name": "Jasder",
      "email": "2053003901@@qq.com",
      "date": "2020-11-03T13:56:22+08:00"
    },
    "timestamp": 1604382982,
    "time_from_now": "3天前"
  },
  "author": null,
  "committer": null,
  "parents": [
    {
      "sha": "c7f5b90725f30d8ad840a026773f9df92debc3af"
    },
  "files": [
    {
      "name": "build.go",
      "old_name": "build.go",
      "index": 1,
      "addition": 33,
      "deletion": 0,
      "type": 1,
      "isCreated": true,
      "isDeleted": false,
      "isBin": false,
      "isLFSFile": false,
      "isRenamed": false,
      "isSubmodule": false,
      "sections": [
        {
          "fileName": "build.go",
          "name": "",
          "lines": [
            {
              "leftIdx": 0,
              "rightIdx": 0,
              "type": 4,
              "content": "@@ -0,0 +1,33 @@",
              "sectionInfo": {
                "path": "build.go",
                "lastLeftIdx": 0,
                "lastRightIdx": 0,
                "leftIdx": 0,
                "rightIdx": 1,
                "leftHunkSize": 0,
                "rightHunkSize": 33
              }
            },
            {
              "leftIdx": 0,
              "rightIdx": 1,
              "type": 2,
              "content": "+// Copyright 2020 The Gitea Authors. All rights reserved.",
              "sectionInfo": null
            }
          ]
        }
      ]
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
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
```bash
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
```json
{
  "commit": {
    "sha": "7b70509105b587e71f5692b9e8ab70851e321f64",
    "message": "Delete 'test1_create_file11.rb'\n",
    "author": {
      "name": "18816895620",
      "email": "2456233122@qq.com",
      "date": "2020-01-08T07:57:34Z"``
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

### 获取pull request文件列表
```
GET /api/:owner/:repo/pulls/:id/files.json
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/Jason/test-txt/pulls/1/files.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo           |是|string |project's identifier |
|id             |是|int |pull request's id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|files_count        |int|文件更改的总数量|
|total_addition         |int|添加代码总行数|
|total_deletion        |int|删除代码总行数|
|files      |array||
|-- sha  |string|commit's sha value|
|-- name  |string|当前文件名|
|-- old_name |string| 修改之前的文件名称,与name相同的话，说明文件名未更改|
|-- addition  |int|文件添加的行数|
|-- deletion  |int|文件删除的行数|
|-- type  |int|文件类型， 1: 表示该文件只添加了内容，2: 表示该文件内容有修改， 3: 表示文件被删除或者改文件只删除了内容|
|-- isCreated  |boolean|当前文件是否为新增文件, true: 是， false: 否|
|-- isDeleted  |boolean|当前文件是否被删除， true: 是，false: 否|
|-- isBin  |boolean|当前文件是否为二进制文件，true: 是，false: 否|
|-- isLFSFile  |boolean|当前文件是否为LFS文件，true: 是，false: 否|
|-- isRenamed  |boolean|当前文件是否被重命名，true: 是，false: 否|
|-- sections  |array||
|---- fileName   |string|文件名称|
|---- lines  |array||
|------ leftIdx   |string|文件变动之前所在行数|
|------ rightIdx   |string|文件更改后所在行数|
|------ type   |string|文件变更类型，1: 新增，2: 修改， 3: 删除， 4: diff统计信息|
|------ content   |string|文件变更的内容|
|------ sectionInfo   |object||
|-------- path   |string|文件相对仓库的路径|
|-------- lastLeftIdx   |int||
|-------- lastRightIdx   |int||
|-------- leftHunkSize   |int|文件变更之前的行数|
|-------- rightHunkSize   |int|文件变更之后的行数(及当前页面编辑器显示的总行数)|
|-------- leftIdx   |int|文件变更之前所在行数|
|-------- rightIdx   |int|文件变更之后所在行数(即：页面编辑器开始显示的行数)|


返回值
```json
{
  "files_count": 6,
  "total_addition": 447,
  "total_deletion": 0,
  "files": [
    {
      "sha": "xefenisnii",
      "name": "文件.txt",
      "old_name": "文件.txt",
      "index": 6,
      "addition": 2,
      "deletion": 0,
      "type": 1,
      "isCreated": true,
      "isDeleted": false,
      "isBin": false,
      "isLFSFile": false,
      "isRenamed": false,
      "isSubmodule": false,
      "sections": [
        {
          "fileName": "文件.txt",
          "name": "",
          "lines": [
            {
              "leftIdx": 0,
              "rightIdx": 0,
              "type": 4,
              "content": "@@ -0,0 +1,2 @@",
              "sectionInfo": {
                "path": null,
                "lastLeftIdx": null,
                "lastRightIdx": null,
                "leftIdx": 0,
                "rightIdx": 0,
                "leftHunkSize": null,
                "rightHunkSize": null
              }
            },
            {
              "leftIdx": 0,
              "rightIdx": 1,
              "type": 2,
              "content": "+用例图一致性更新",
              "sectionInfo": null
            },
            {
              "leftIdx": 0,
              "rightIdx": 2,
              "type": 2,
              "content": "+工程文件直接上传会有文件缺失，现在压缩后上传",
              "sectionInfo": null
            }
          ]
        }
      ]
    }
  ]
}
```
---

### 获取pull request的commits列表
```
GET /api/:owner/:repo/pulls/:id/commits.json
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/Jason/repo/1/commits.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo           |是|string |project's identifier |
|id             |是|int |pull request's id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|commits_count        |int|commits总数量|
|commits      |array||
|-- author          |object|项目作者|
|---- login        |string|用户login|
|---- name         |string|用户姓名|
|---- image_url    |string|用户头像|
|-- committer          |object|commit提交用户|
|---- login        |string|用户login|
|---- name         |string|用户姓名|
|---- image_url    |string|用户头像|
|-- timestamp      |int|commit的unix时间戳|
|-- time_from_now|string|commit’s 提交时间距当前时间的时间值|
|-- message      |string|commit说明信息|
|-- sha          |string|commit’s sha值|

返回值
```json
{
  "commits_count": 1,
  "commits": [
    {
      "author": {
        "id": 36480,
        "login": "jasder",
        "name": "段甲生",
        "image_url": "avatars/User/b"
      },
      "committer": {
        "id": 36480,
        "login": "jasder",
        "name": "段甲生",
        "image_url": "avatars/User/b"
      },
      "timestamp": 1604382982,
      "time_from_now": "3小时前",
      "message": "add some file\n* Add the tag list page to the release page\n* Apply suggestions from code review\n* Add the tags list view\n* Add the delete tag way on ui\n* Not delete tag and clear message when delete a release\n",
      "sha": "8f5faee0d3b3be1b8063e84da0c79dd75327b968"
    }
  ]
}
```
---

### compare two commits
```
GET /api/:owner/:repo/compare/{base}...{head}.json
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/Jason/test-txt/compare/master...develop | jq

curl -X GET \
http://localhost:3000/api/ysfns/test-txt/compare/master...Jason/test-txt:develop
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo           |是|string |project's identifier |
|base             |是|string |pull request's id  |
|head             |是|string |pull request's id  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|commits_count        |int|commits总数量|
|commits      |array||
|-- author          |object|项目作者|
|---- login        |string|用户login|
|---- name         |string|用户姓名|
|---- image_url    |string|用户头像|
|-- committer          |object|commit提交用户|
|---- login        |string|用户login|
|---- name         |string|用户姓名|
|---- image_url    |string|用户头像|
|-- timestamp      |int|commit的unix时间戳|
|-- time_from_now|string|commit’s 提交时间距当前时间的时间值|
|-- message      |string|commit说明信息|
|-- sha          |string|commit’s sha值|
|diff      |object||
|-- files_count        |int|文件更改的总数量|
|-- total_addition         |int|添加代码总行数|
|-- total_deletion        |int|删除代码总行数|
|-- files      |Array||
|-- sha  |string|commit's sha |
|-- name  |string|当前文件名|
|-- old_name |string| 修改之前的文件名称,与name相同的话，说明文件名未更改|
|-- addition  |int|文件添加的行数|
|-- deletion  |int|文件删除的行数|
|-- type  |int|文件类型， 1: 表示该文件只添加了内容，2: 表示该文件内容有修改， 3: 表示文件被删除或者改文件只删除了内容|
|-- isCreated  |boolean|当前文件是否为新增文件, true: 是， false: 否|
|-- isDeleted  |boolean|当前文件是否被删除， true: 是，false: 否|
|-- isBin  |boolean|当前文件是否为二进制文件，true: 是，false: 否|
|-- isLFSFile  |boolean|当前文件是否为LFS文件，true: 是，false: 否|
|-- isRenamed  |boolean|当前文件是否被重命名，true: 是，false: 否|
|-- sections  |array||
|---- fileName   |string|文件名称|
|---- lines  |array||
|------ leftIdx   |string|文件变动之前所在行数|
|------ rightIdx   |string|文件更改后所在行数|
|------ type   |string|文件变更类型，1: 内容未改动，2: 添加， 3: 删除， 4: diff统计信息|
|------ content   |string|文件变更的内容|
|------ sectionInfo   |object||
|-------- path   |string|文件相对仓库的路径|
|-------- lastLeftIdx   |int||
|-------- lastRightIdx   |int||
|-------- leftHunkSize   |int|文件变更之前的行数|
|-------- rightHunkSize   |int|文件变更之后的行数(及当前页面编辑器显示的总行数)|
|-------- leftIdx   |int|文件变更之前所在行数|
|-------- rightIdx   |int|文件变更之后所在行数|

返回值
```json
{
  "commits_count": 1,
  "commits": [
    {
      "author": {
        "id": 36480,
        "login": "jasder",
        "name": "段甲生",
        "image_url": "avatars/User/b"
      },
      "committer": {
        "id": 36480,
        "login": "jasder",
        "name": "段甲生",
        "image_url": "avatars/User/b"
      },
      "timestamp": 1604382982,
      "time_from_now": "4小时前",
      "message": "add some file\n* Add the tag list page to the release page\n* Apply suggestions from code review\n* Add the tags list view\n* Add the delete tag way on ui\n* Not delete tag and clear message when delete a release\n",
      "sha": "8f5faee0d3b3be1b8063e84da0c79dd75327b968"
    }
  ],
  "diff": {
    "files_count": 6,
    "total_addition": 447,
    "total_deletion": 0,
    "files": [
      {
        "name": "build.go",
        "old_name": "build.go",
        "index": 1,
        "addition": 33,
        "deletion": 0,
        "type": 1,
        "isCreated": true,
        "isDeleted": false,
        "isBin": false,
        "isLFSFile": false,
        "isRenamed": false,
        "isSubmodule": false,
        "sections": [
          {
            "fileName": "build.go",
            "name": "",
            "lines": [
              {
                "leftIdx": 0,
                "rightIdx": 0,
                "type": 4,
                "content": "@@ -0,0 +1,33 @@",
                "sectionInfo": {
                  "path": "build.go",
                  "lastLeftIdx": 0,
                  "lastRightIdx": 0,
                  "leftIdx": 0,
                  "rightIdx": 1,
                  "leftHunkSize": 0,
                  "rightHunkSize": 33
                }
              },
              {
                "leftIdx": 0,
                "rightIdx": 1,
                "type": 2,
                "content": "+// Copyright 2020 The Gitea Authors. All rights reserved.",
                "sectionInfo": null
              }
            ]
          }
        ]
      }
    ]
  }
}
```
---

### 创建保护分支
```
POST /api/:owner/:repo/protected_branches
```
*示例*
```bash
curl -X POST \
-d 'branch_name=master' \
-d 'enable_push=true' \
-d 'enable_push_whitelist=true' \
-d 'enable_push_whitelist=["demo1", "demo1"]' \
-d 'enable_merge_whitelist=true' \
http://localhost:3000/api/trustie/truesite/protected_branches.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |项目拥有者登录名  |
|repo              |否|boolean |仓库名称  |
|branch_name       |是|string |保护分支名称  |
|enable_push             |否|boolean |是否启用推送, true: 启用; false: 不启用, 默认为false  |
|enable_push_whitelist   |否|boolean |是否启用白名单推送, true: 启用; false: 不启用, 默认为false, 该参数与enable_push参数为单选项，只能选择|
|push_whitelist_usernames        |否|array |推送白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_push_whitelist参数配合使用  |
|enable_merge_whitelist        |否|boolean |是否启用合并白名单, true: 启用, false: 不启用, 默认为false |
|merge_whitelist_usernames         |否|array |合并白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_merge_whitelist配合使用 |
|enable_status_check     |否|boolean |是否启用状态检查, true: 启用; false: 不启用, 默认为false |
|required_approvals     |否|int |所需的批准数， 默认为0 |
|enable_approvals_whitelist     |否|boolean |是否启用批准仅限列入白名单的用户或团队, true: 启用, false: 不启用, 默认为false |
|approvals_whitelist_usernames     |否|array |审查者白名单(即具有写操作的项目成员名称的数组), 该参数与enable_approvals_whitelist配合使用 |
|block_on_rejected_reviews     |否|boolean |是否启用拒绝审核阻止合并功能, true: 启用, false: 不启用, 默认为false |
|dismiss_stale_approvals     |否|boolean |是否启用取消过时的批准, true: 启用, false: 不启用, 默认为false |
|require_signed_commits     |否|boolean |是否需要签名提交, true: 是, false: 否, 默认为false |
|block_on_outdated_branch     |否|boolean |如果拉取请求已经过时，是否阻止合并, true: 是, false: 否, 默认为false |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|branch_name       |string |保护分支名称  |
|enable_push             |boolean |是否启用推送, true: 启用; false: 不启用, 默认为false  |
|enable_push_whitelist   |boolean |是否启用白名单推送, true: 启用; false: 不启用, 默认为false, 该参数与enable_push参数为单选项，只能选择|
|push_whitelist_usernames        |array |推送白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_push_whitelist参数配合使用  |
|enable_merge_whitelist        |boolean |是否启用合并白名单, true: 启用, false: 不启用, 默认为false |
|merge_whitelist_usernames         |array |合并白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_merge_whitelist配合使用 |
|enable_status_check     |boolean |是否启用状态检查, true: 启用; false: 不启用, 默认为false |
|required_approvals     |int |所需的批准数， 默认为0 |
|enable_approvals_whitelist     |boolean |是否启用批准仅限列入白名单的用户或团队, true: 启用, false: 不启用, 默认为false |
|approvals_whitelist_usernames     |array |审查者白名单(即具有写操作的项目成员名称的数组), 该参数与enable_approvals_whitelist配合使用 |
|block_on_rejected_reviews     |boolean |是否启用拒绝审核阻止合并功能, true: 启用, false: 不启用, 默认为false |
|dismiss_stale_approvals     |boolean |是否启用取消过时的批准, true: 启用, false: 不启用, 默认为false |
|require_signed_commits     |boolean |是否需要签名提交, true: 是, false: 否, 默认为false |
|block_on_outdated_branch     |boolean |如果拉取请求已经过时，是否阻止合并, true: 是, false: 否, 默认为false |
|created_at      |string|创建时间|
|updated_at      |string|更新时间|


返回值
```
{
  "branch_name": "develop",
  "enable_push": true,
  "required_approvals": 0,
  "enable_status_check": true,
  "enable_push_whitelist": true,
  "enable_merge_whitelist": true,
  "enable_approvals_whitelist": false,
  "dismiss_stale_approvals": false,
  "block_on_rejected_reviews": false,
  "block_on_outdated_branch": false,
  "require_signed_commits": false,
  "merge_whitelist_usernames": [
      "jasder"
  ],
  "push_whitelist_usernames": [
      "jasder"
  ],
  "approvals_whitelist_usernames": [],
  "created_at": "2020-12-02 17:40",
  "updated_at": "2020-12-03 11:29"
}
```
---

### 编辑保护分支参数
```
GET /api/:owner/:repo/protected_branches/:branch_name/edit
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/trustie/truesite/protected_branches/master/edit.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |项目拥有者登录名  |
|repo              |否|boolean |仓库名称  |
|branch_name       |是|string |保护分支名称  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|protected       |boolean |是否为保护分支, true: 是; false: 不是  |
|branch_name       |string |保护分支名称  |
|enable_push             |boolean |是否启用推送, true: 启用; false: 不启用, 默认为false  |
|enable_push_whitelist   |boolean |是否启用白名单推送, true: 启用; false: 不启用, 默认为false, 该参数与enable_push参数为单选项，只能选择|
|push_whitelist_usernames        |array |推送白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_push_whitelist参数配合使用  |
|enable_merge_whitelist        |boolean |是否启用合并白名单, true: 启用, false: 不启用, 默认为false |
|merge_whitelist_usernames         |array |合并白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_merge_whitelist配合使用 |
|enable_status_check     |boolean |是否启用状态检查, true: 启用; false: 不启用, 默认为false |
|required_approvals     |int |所需的批准数， 默认为0 |
|enable_approvals_whitelist     |boolean |是否启用批准仅限列入白名单的用户或团队, true: 启用, false: 不启用, 默认为false |
|approvals_whitelist_usernames    |array |审查者白名单(即具有写操作的项目成员名称的数组), 该参数与enable_approvals_whitelist配合使用 |
|block_on_rejected_reviews     |boolean |是否启用拒绝审核阻止合并功能, true: 启用, false: 不启用, 默认为false |
|dismiss_stale_approvals     |boolean |是否启用取消过时的批准, true: 启用, false: 不启用, 默认为false |
|require_signed_commits     |boolean |是否需要签名提交, true: 是, false: 否, 默认为false |
|block_on_outdated_branch     |boolean |如果拉取请求已经过时，是否阻止合并, true: 是, false: 否, 默认为false |
|created_at      |string|创建时间|
|updated_at      |string|更新时间|


返回值
```json
{
  "branch_name": "master",
  "protected": true,
  "protected_branch": {
    "branch_name": "master",
    "enable_push": false,
    "required_approvals": 0,
    "enable_status_check": true,
    "enable_push_whitelist": false,
    "enable_merge_whitelist": true,
    "enable_approvals_whitelist": false,
    "dismiss_stale_approvals": false,
    "block_on_rejected_reviews": false,
    "block_on_outdated_branch": false,
    "require_signed_commits": false,
    "merge_whitelist_usernames": [
        "jasder"
    ],
    "push_whitelist_usernames": [],
    "approvals_whitelist_usernames": [],
    "created_at": "2020-12-03 12:00",
    "updated_at": "2020-12-04 10:50"
  }
}
```
---

### 修改保护分支参数
```
PATCH /api/:owner/:repo/protected_branches/:branch_name
```
*示例*
```bash
curl -X PATCH \
-d 'branch_name=master' \
-d 'enable_push=true' \
-d 'enable_push_whitelist=true' \
-d 'enable_push_whitelist=["demo1", "demo1"]' \
-d 'enable_merge_whitelist=true' \
http://localhost:3000/api/trustie/truesite/protected_branches/master.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |项目拥有者登录名  |
|repo              |否|boolean |仓库名称  |
|branch_name       |是|string |保护分支名称  |
|enable_push             |否|boolean |是否启用推送, true: 启用; false: 不启用, 默认为false  |
|enable_push_whitelist   |否|boolean |是否启用白名单推送, true: 启用; false: 不启用, 默认为false, 该参数与enable_push参数为单选项，只能选择|
|push_whitelist_usernames        |否|array |推送白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_push_whitelist参数配合使用  |
|enable_merge_whitelist        |否|boolean |是否启用合并白名单, true: 启用, false: 不启用, 默认为false |
|merge_whitelist_usernames         |否|array |合并白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_merge_whitelist配合使用 |
|enable_status_check     |否|boolean |是否启用状态检查, true: 启用; false: 不启用, 默认为false |
|required_approvals     |否|int |所需的批准数， 默认为0 |
|enable_approvals_whitelist     |否|boolean |是否启用批准仅限列入白名单的用户或团队, true: 启用, false: 不启用, 默认为false |
|approvals_whitelist_usernames     |否|array |审查者白名单(即具有写操作的项目成员名称的数组), 该参数与enable_approvals_whitelist配合使用 |
|block_on_rejected_reviews     |否|boolean |是否启用拒绝审核阻止合并功能, true: 启用, false: 不启用, 默认为false |
|dismiss_stale_approvals     |否|boolean |是否启用取消过时的批准, true: 启用, false: 不启用, 默认为false |
|require_signed_commits     |否|boolean |是否需要签名提交, true: 是, false: 否, 默认为false |
|block_on_outdated_branch     |否|boolean |如果拉取请求已经过时，是否阻止合并, true: 是, false: 否, 默认为false |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|branch_name       |string |保护分支名称  |
|enable_push             |boolean |是否启用推送, true: 启用; false: 不启用, 默认为false  |
|enable_push_whitelist   |boolean |是否启用白名单推送, true: 启用; false: 不启用, 默认为false, 该参数与enable_push参数为单选项，只能选择|
|push_whitelist_usernames        |array |推送白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_push_whitelist参数配合使用  |
|enable_merge_whitelist        |boolean |是否启用合并白名单, true: 启用, false: 不启用, 默认为false |
|merge_whitelist_usernames         |array |合并白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_merge_whitelist配合使用 |
|enable_status_check     |boolean |是否启用状态检查, true: 启用; false: 不启用, 默认为false |
|required_approvals     |int |所需的批准数， 默认为0 |
|enable_approvals_whitelist     |boolean |是否启用批准仅限列入白名单的用户或团队, true: 启用, false: 不启用, 默认为false |
|approvals_whitelist_usernames     |array |审查者白名单(即具有写操作的项目成员名称的数组), 该参数与enable_approvals_whitelist配合使用 |
|block_on_rejected_reviews     |boolean |是否启用拒绝审核阻止合并功能, true: 启用, false: 不启用, 默认为false |
|dismiss_stale_approvals     |boolean |是否启用取消过时的批准, true: 启用, false: 不启用, 默认为false |
|require_signed_commits     |boolean |是否需要签名提交, true: 是, false: 否, 默认为false |
|block_on_outdated_branch     |boolean |如果拉取请求已经过时，是否阻止合并, true: 是, false: 否, 默认为false |
|created_at      |string|创建时间|
|updated_at      |string|更新时间|


返回值
```json
{
  "branch_name": "develop",
  "enable_push": true,
  "required_approvals": 0,
  "enable_status_check": true,
  "enable_push_whitelist": true,
  "enable_merge_whitelist": true,
  "enable_approvals_whitelist": false,
  "dismiss_stale_approvals": false,
  "block_on_rejected_reviews": false,
  "block_on_outdated_branch": false,
  "require_signed_commits": false,
  "merge_whitelist_usernames": [
      "jasder"
  ],
  "push_whitelist_usernames": [
      "jasder"
  ],
  "approvals_whitelist_usernames": [],
  "created_at": "2020-12-02 17:40",
  "updated_at": "2020-12-03 11:29"
}
```
---

### 删除保护分支
```
DELETE /api/:owner/:repo/protected_branches/:branch_name
```
*示例*
```bash
curl -X DELETE \
http://localhost:3000/api/trustie/truesite/protected_branches/master.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |项目拥有者登录名  |
|repo              |否|boolean |仓库名称  |
|branch_name       |是|string |保护分支名称  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status        |int|状态值，0: 请求成功; -1: 请求失败|
|message         |string|信息说明|

返回值
```json
{
  "status": 0,
  "message": "success"
}
```
---

### 获取保护分支列表
```
GET /api/:owner/:repo/protected_branches/
```
*示例*
```bash
curl -X GET \
-d "page=1" \
-d "limit=5" \
http://localhost:3000/api/trustie/truesite/protected_branches.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |项目拥有者登录名  |
|repo              |否|boolean |仓库名称  |
|page          |否|string |页数，第几页  |
|limit         |否|string |每页多少条数据，默认15条  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count       |int | 总记录数 |
|branch_name       |string |保护分支名称  |
|enable_push             |boolean |是否启用推送, true: 启用; false: 不启用, 默认为false  |
|enable_push_whitelist   |boolean |是否启用白名单推送, true: 启用; false: 不启用, 默认为false, 该参数与enable_push参数为单选项，只能选择|
|push_whitelist_usernames        |array |推送白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_push_whitelist参数配合使用  |
|enable_merge_whitelist        |boolean |是否启用合并白名单, true: 启用, false: 不启用, 默认为false |
|merge_whitelist_usernames         |array |合并白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_merge_whitelist配合使用 |
|enable_status_check     |boolean |是否启用状态检查, true: 启用; false: 不启用, 默认为false |
|required_approvals     |int |所需的批准数， 默认为0 |
|enable_approvals_whitelist     |boolean |是否启用批准仅限列入白名单的用户或团队, true: 启用, false: 不启用, 默认为false |
|approvals_whitelist_usernames     |array |审查者白名单(即具有写操作的项目成员名称的数组), 该参数与enable_approvals_whitelist配合使用 |
|block_on_rejected_reviews     |boolean |是否启用拒绝审核阻止合并功能, true: 启用, false: 不启用, 默认为false |
|dismiss_stale_approvals     |boolean |是否启用取消过时的批准, true: 启用, false: 不启用, 默认为false |
|require_signed_commits     |boolean |是否需要签名提交, true: 是, false: 否, 默认为false |
|block_on_outdated_branch     |boolean |如果拉取请求已经过时，是否阻止合并, true: 是, false: 否, 默认为false |
|created_at      |string|创建时间|
|updated_at      |string|更新时间|


返回值
```
{
  "total_count": 1,
  "protected_branches": [
    {
      "branch_name": "develop",
      "enable_push": true,
      "required_approvals": 0,
      "enable_status_check": true,
      "enable_push_whitelist": true,
      "enable_merge_whitelist": true,
      "enable_approvals_whitelist": false,
      "dismiss_stale_approvals": false,
      "block_on_rejected_reviews": false,
      "block_on_outdated_branch": false,
      "require_signed_commits": false,
      "merge_whitelist_usernames": [
          "jasder"
      ],
      "push_whitelist_usernames": [
          "jasder"
      ],
      "approvals_whitelist_usernames": [],
      "created_at": "2020-12-02 17:40",
      "updated_at": "2020-12-03 11:29"
    }
  ]
}
```
---

### 获取某个具体的保护分支
```
GET /api/:owner/:repo/protected_branches/:branch_name
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/trustie/truesite/protected_branches/master.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner             |是|string |项目拥有者登录名  |
|repo              |否|boolean |仓库名称  |
|branch_name       |是|string |保护分支名称  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|branch_name       |string |保护分支名称  |
|enable_push             |boolean |是否启用推送, true: 启用; false: 不启用, 默认为false  |
|enable_push_whitelist   |boolean |是否启用白名单推送, true: 启用; false: 不启用, 默认为false, 该参数与enable_push参数为单选项，只能选择|
|push_whitelist_usernames        |array |推送白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_push_whitelist参数配合使用  |
|enable_merge_whitelist        |boolean |是否启用合并白名单, true: 启用, false: 不启用, 默认为false |
|merge_whitelist_usernames         |array |合并白名单用户(即具有写操作的项目成员名称的数组), 该参数与enable_merge_whitelist配合使用 |
|enable_status_check     |boolean |是否启用状态检查, true: 启用; false: 不启用, 默认为false |
|required_approvals     |int |所需的批准数， 默认为0 |
|enable_approvals_whitelist     |boolean |是否启用批准仅限列入白名单的用户或团队, true: 启用, false: 不启用, 默认为false |
|approvals_whitelist_usernames     |array |审查者白名单(即具有写操作的项目成员名称的数组), 该参数与enable_approvals_whitelist配合使用 |
|block_on_rejected_reviews     |boolean |是否启用拒绝审核阻止合并功能, true: 启用, false: 不启用, 默认为false |
|dismiss_stale_approvals     |boolean |是否启用取消过时的批准, true: 启用, false: 不启用, 默认为false |
|require_signed_commits     |boolean |是否需要签名提交, true: 是, false: 否, 默认为false |
|block_on_outdated_branch     |boolean |如果拉取请求已经过时，是否阻止合并, true: 是, false: 否, 默认为false |
|created_at      |string|创建时间|
|updated_at      |string|更新时间|

返回值
```json
{
  "branch_name": "develop",
  "enable_push": true,
  "required_approvals": 0,
  "enable_status_check": true,
  "enable_push_whitelist": true,
  "enable_merge_whitelist": true,
  "enable_approvals_whitelist": false,
  "dismiss_stale_approvals": false,
  "block_on_rejected_reviews": false,
  "block_on_outdated_branch": false,
  "require_signed_commits": false,
  "merge_whitelist_usernames": [
      "jasder"
  ],
  "push_whitelist_usernames": [
      "jasder"
  ],
  "approvals_whitelist_usernames": [],
  "created_at": "2020-12-02 17:40",
  "updated_at": "2020-12-03 11:29"
}
```
---

#### 获取仓库README文件
```
GET api/:owner/:repo/readme
```
*示例*
```bash
curl -X GET http://localhost:3000/api/trusite/trusite/readme | jq
```

*请求参数说明:*

|参数名|类型|说明|
|-|-|-|
|owner |是|string |项目拥有者登录名  |
|repo  |否|boolean |仓库名称  |
|ref   |否|string |分支、tag或commit。默认: 仓库的默认分支(通常是master)|


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|name           |string|文件名称|
|path           |string|文件相对路径|
|type           |string|文件类型， file:文件|
|size           |int|文件大小 单位KB|
|content        |string|文件内容，base64加密|

返回值
```json
{
  "type": "file",
  "encoding": "base64",
  "size": 13544,
  "name": "README.md",
  "path": "README.md",
  "content": "Q2hpbmVzZSAmbmJzcDsgfCAmbmJzcDsgW0VuZ7i9yZWFkbWUvaW5kZXgucG5"
}
```
---

#### 获库仓库的语言百分占比
```
GET api/:owner/:repo/languages
```
*示例*
```bash
curl -X GET http://localhost:3000/api/jasder/trusite/languages | jq
```

*请求参数说明:*

|参数名|类型|说明|
|-|-|-|
|owner |是|string |项目拥有者登录名  |
|repo  |否|boolean |仓库名称  |


返回值
```json
{
  "JavaScript": "90.2%",
  "CSS": "6.1%",
  "Java": "2.9%",
  "HTML": "0.8%"
}
```
---




### DevOps相关api
---

#### 获取devops流程步骤
```
GET  /api/:owner/:repo/ci_authorize
```

*示例*
```bash
curl -X GET \
http://localhost:3000/api/jasder/forgeplus/ci_authorize.json  | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo       |是|string |project's identifier |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|step         |int|初始化devops流程步骤; 0: 标识未开启devops，1: 标识用户已填写了云服务器相关信息，但并未开启认证， 2: 标识用户已开启了CI服务端的认证|
|account       |string|你的云服务器帐号|
|ip         |string|你的云服务器帐号ip|
|secret         |string|你的云服务器登录密码|
|authenticate_url         |string|devops授权认证地址， 只有填写了服务器相关信息后才会有该地址|
|get_drone_token_url         |string|获取CI服务端token地址, 只有认证成功后才会有该地址|

返回值
```json
{
  "step": 0,
  "cloud_account": {
    "id": 1,
    "account": "xxx",
    "ip": "xxx.xxx.xxx.x",
    "secret": "11111",
    "authenticate_url": "http://localhost:3000/login",
    "get_drone_token_url": "http://localhost:3000/account"
  }
}
```
---

#### 初始化DevOps流程
```
POST  /api/:owner/:repo/cloud_accounts
```

*示例*
```bash
curl -X POST \
-d "account=xx" \
-d "secret=xxx" \
-d "ip_num=xx.xx.xx.xx" \
https://localhost:3000/api/jasder/forgeplus/cloud_accounts.json  | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo       |是|string |project's identifier |
|account          |是|string |云服务器ssh连接登录用户名  |
|secret       |是|string |云服务器ssh连接登录秘密 |
|ip_num        |否|string |云服务器公网IP |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status         |string|服务端返回状态，0: 表示请求成功， -1: 标识请求失败|
|message       |string|服务端返回信息说明|
|redirect_url         |string|重定向地址，请求成功后，需要调整到该地址进行认证|

返回值
```json
{
  "status": 0,
  "message": "success",
  "redirect_url": "http://192.168.2.59:3003/login/oauth/authorize?client_id=f0c58484-d0f7-46c0-9efd-de3e3218e723&redirect_uri=http://121.36.81.172:80/login&response_type=code"
}
```
---

#### devops用户认证授权
```
GET /api/users/ci/oauth_grant
```
*示例*
```bash
curl -X GET \
-d "password=123456" \
http://localhost:3000/api/users/ci/oauth_grant.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|password          |是|string |用户密码  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|0:成功， -1: 失败|

返回值
```json
{
  "status": 0,
  "message": "success"
}
```
---

#### 激活项目
```
POST /api/:owner/:repo/activate
```
*示例*
```bash
curl -X POST \
http://localhost:3000/api/jasder/forgeplus/activate.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo       |是|string |project's identifier |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|0:成功， -1: 失败|

返回值
```json
{
  "status": 0,
  "message": "success"
}
```
---

#### 取消激活项目
```
DELETE /api/:owner/:repo/deactivate
```
*示例*
```bash
curl -X POST \
http://localhost:3000/api/jasder/forgeplus/deactivate.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo       |是|string |project's identifier |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|0:成功， -1: 失败|

返回值
```json
{
  "status": 0,
  "message": "success"
}
```
---

#### 获取仓库的.trustie-pipeline.yml
```
GET /api/:owner/:repo/get_trustie_pipeline
```
*示例*
```bash
curl -X GET \
http://localhost:3000/api/jasder/forge/get_trustie_pipeline.json | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo       |是|string |project's identifier |
|ref             |否|string |分支名称、tag名称或是提交记录id，默认为master分支  |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|name           |string|文件夹或文件名称|
|path           |string|文件夹或文件相对路径|
|content        |string|文件内容，|

返回值
```json
{
  "name": ".trustie-pipeline.yml",
  "path": ".trustie-pipeline.yml",
  "sha": "548sfefsafef48sf485s4f",
  "content": "..jsaf"
}
```
---

#### 更新'.trustie-pipeline.yml'文件
```
PUT /api/:owner/:repo/update_trustie_pipeline
```
*示例*

```bash
curl -X GET \
http://localhost:3000/api/jasder/forge/update_trustie_pipeline.json?pipeline_id=1 | jq
```
*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo       |是|string |project's identifier |
|ref             |否|string |分支名称、tag名称或是提交记录id，默认为master分支  |
|filepath       |是|string |文件相对于仓库的路径(或修改后的文件路径) |
|from_path      |是|string |原文件相对于仓库的路径, 只有当需要修改原文件名称时，才需要该参数 |
|sha            |是|string |文件的sha标识值 |
|content        |是|string |内容  |
|message        |否|string |提交说明 |
|branch         |否|string |分支名称, branch和new_branch必须存在一个,且只能存在一个 |
|new_branch     |否|string |新的分支名称 |
|ci_language_id     |否|string |新的分支名称 |


*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status           |int|接口返回状态， 1: 请求成功， -1: 请求失败|
|message           |string|文件夹或文件相对路径|

```
{
  "status": 1,
  "message": ".trustie-pipeline.yml"
}
```
---

#### 获取语言列表
```
GET  /api/ci/languages
```

*示例*
```bash
curl -X GET http://localhost:3000/api/ci/languages.json | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|id值|
|name       |string|语言名称|
|content         |string|语言内容|
|cover_url         |string|语言的logo链接|

返回值
```json
[
  {
    "id": 114,
    "name": "C",
    "cover_url": null,
    "content": "kind: pipeline\n          name: default\n\n          platform:\n            os: linux\n            arch: arm64\n\n          steps:\n          - name: test\n           image: gcc\n           commands:\n           - ./configure\n           - make\n           - make test",
  }
]
```
---

#### 获取常用的6大语言
```
GET  /api/ci/languages/common
```

*示例*
```bash
curl -X GET http://localhost:3000/api/ci/languages/common.json | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|id值|
|name       |string|语言名称|
|content         |string|语言内容|
|cover_url         |string|语言的logo链接|

返回值
```json
[
  {
    "id": 114,
    "name": "C",
    "cover_url": null,
    "content": "kind: pipeline\n          name: default\n\n          platform:\n            os: linux\n            arch: arm64\n\n          steps:\n          - name: test\n           image: gcc\n           commands:\n           - ./configure\n           - make\n           - make test",
  }
]
```
---

#### 获取语言详情
```
GET  /api/ci/languages/:id
```

*示例*
```bash
curl -X GET http://localhost:3000/api/ci/languages/114.json | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|id          |是|int |language's id  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|id值|
|name       |string|语言名称|
|content         |string|语言内容|
|cover_url         |string|语言的logo链接|

返回值
```json
[
  {
    "id": 114,
    "name": "C",
    "cover_url": null,
    "content": "kind: pipeline\n          name: default\n\n          platform:\n            os: linux\n            arch: arm64\n\n          steps:\n          - name: test\n           image: gcc\n           commands:\n           - ./configure\n           - make\n           - make test",
  }
]
```
---

#### 获取构建列表
```
GET  /api/:owner/:repo/builds
```

*示例*
```bash
curl -X GET \
http://localhost:3000/api/Jason/forge/builds | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |项目拥有者  |
|repo          |是|string |项目identifier  |
|page          |否|string |页数，第几页  |
|limit         |否|string |每页多少条数据，默认20条  |
|search          |是|string |构建状态条件过滤; 值说明：pending: 准备中，failure: 构建失败，running: 运行中，error：构建失败(.trustie-pipeline.yml文件错误)，success: 构建成功，killed: 撤销构建  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|build's id|
|number       |string|build's number|
|status         |string|build's result|
|event         |string|build's event|

返回值
```json
[
  {
    "id": 1,
    "repo_id": 8,
    "trigger": "@hook",
    "number": 1,
    "status": "success",
    "event": "push",
    "action": "",
    "link": "",
    "timestamp": 0,
    "message": "更新 '.trustie-pipeline.yml'\n",
    "before": "5e7c6f7dfd5ce6cc6e287fcbc000dadd9992b324",
    "after": "5e52ce51a239f5c8dd0b489a8a71e94f976179b4",
    "ref": "refs/heads/master",
    "source_repo": "",
    "source": "master",
    "target": "master",
    "author_login": "jasder",
    "author_name": "jasder",
    "author_email": "email.com",
    "author_avatar": "",
    "sender": "jasder",
    "started": "2020-08-19 06:22",
    "finished": "2020-08-19 06:22",
    "created": "2020-08-19 06:22",
    "updated": "2020-08-19 06:22",
    "duration_time": 0,
    "version": 3
  }
]
```
---

#### 获取某条构建详情信息
```
GET  /api/:owner/:repo/builds/:build
```

*示例*
```bash
curl -X GET \
http://ocalhost:3000/api/jasder/forge/builds/1 | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|build          |是|int |build's number  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|build's id|
|status       |string|build's status|
|event         |string|build's event|

返回值
```json
{
  "id": 1,
  "repo_id": 8,
  "trigger": "@hook",
  "number": 1,
  "status": "success",
  "event": "push",
  "action": "",
  "link": "http://localhost:3000/jasder/forgeplus/compare/5e7c6f7dfd5ce6cc6e287fcbc000dadd9992b324...5e52ce51a239f5c8dd0b489a8a71e94f976179b4",
  "timestamp": 0,
  "message": "更新 '.trustie-pipeline.yml'\n",
  "before": "5e7c6f7dfd5ce6cc6e287fcbc000dadd9992b324",
  "after": "5e52ce51a239f5c8dd0b489a8a71e94f976179b4",
  "ref": "refs/heads/master",
  "source_repo": "",
  "source": "master",
  "target": "master",
  "author_login": "jasder",
  "author_name": "jasder",
  "author_email": "2053003901@qq.com",
  "author_avatar": "http://localhost:3000/user/avatar/jasder/-1",
  "sender": "jasder",
  "started": 1595317786,
  "finished": 1595318426,
  "created": 1595317786,
  "updated": 1595317786,
  "version": 3,
  "stages": [
    {
      "id": 1,
      "repo_id": 8,
      "build_id": 1,
      "number": 1,
      "name": "default",
      "kind": "pipeline",
      "type": "docker",
      "status": "success",
      "errignore": false,
      "exit_code": 0,
      "machine": "121.36.81.172",
      "os": "linux",
      "arch": "arm64",
      "started": 1595317786,
      "stopped": 1595318426,
      "created": 1595317786,
      "updated": 1595318426,
      "version": 4,
      "on_success": true,
      "on_failure": false,
      "steps": [
        {
          "id": 1,
          "step_id": 1,
          "number": 1,
          "name": "clone",
          "status": "success",
          "exit_code": 0,
          "started": 1595317786,
          "stopped": 1595318373,
          "version": 4
        },
        {
          "id": 2,
          "step_id": 1,
          "number": 2,
          "name": "test",
          "status": "success",
          "exit_code": 0,
          "started": 1595318373,
          "stopped": 1595318426,
          "version": 4
        }
      ]
    }
  ]
}
```
---

#### 重启构建/重新构建
```
POST  /api/:owner/:repo/builds/:build/restart
```

*示例*
```bash
curl -X POST \
http://localhost:3000/api/jasder/forgeplus/builds/1 | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|build          |是|int |build's number  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|build's id|
|status       |string|build's status|
|event         |string|build's event|

返回值
```json
{
  "id": 2,
  "repo_id": 8,
  "trigger": "jasder",
  "number": 2,
  "status": "pending",
  "event": "push",
  "action": "",
  "link": "http://localhost:3000/jasder/forgeplus/compare/5e7c6f7dfd5ce6cc6e287fcbc000dadd9992b324...5e52ce51a239f5c8dd0b489a8a71e94f976179b4",
  "timestamp": 0,
  "message": "更新 '.trustie-pipeline.yml'\n",
  "before": "5e7c6f7dfd5ce6cc6e287fcbc000dadd9992b324",
  "after": "5e52ce51a239f5c8dd0b489a8a71e94f976179b4",
  "ref": "refs/heads/master",
  "source_repo": "",
  "source": "master",
  "target": "master",
  "author_login": "jasder",
  "author_name": "jasder",
  "author_email": "2053003901@qq.com",
  "author_avatar": "http://localhost:3000/user/avatar/jasder/-1",
  "sender": "jasder",
  "started": 0,
  "finished": 0,
  "created": 1595321350,
  "updated": 1595321350,
  "version": 1
}
```
---

#### 关闭构建
```
DELETE  /api/:owner/:repo/builds/:build/stop
```

*示例*
```bash
curl -X DELETE \
http://localhost:3000/api/jaser/forge/builds/2 | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|build          |是|int |build's number  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|build's id|
|status       |string|build's status|
|event         |string|build's event|

返回值
```json
{
  "id": 2,
  "repo_id": 8,
  "trigger": "jasder",
  "number": 2,
  "status": "killed",
  "event": "push",
  "action": "",
  "link": "http://localhost:3000/jasder/forgeplus/compare/5e7c6f7dfd5ce6cc6e287fcbc000dadd9992b324...5e52ce51a239f5c8dd0b489a8a71e94f976179b4",
  "timestamp": 0,
  "message": "更新 '.trustie-pipeline.yml'\n",
  "before": "5e7c6f7dfd5ce6cc6e287fcbc000dadd9992b324",
  "after": "5e52ce51a239f5c8dd0b489a8a71e94f976179b4",
  "ref": "refs/heads/master",
  "source_repo": "",
  "source": "master",
  "target": "master",
  "author_login": "jasder",
  "author_name": "jasder",
  "author_email": "2053003901@qq.com",
  "author_avatar": "http://localhost:3000/user/avatar/jasder/-1",
  "sender": "jasder",
  "started": 1595321352,
  "finished": 1595321590,
  "created": 1595321350,
  "updated": 1595321352,
  "version": 3,
  "stages": [
    {
      "id": 2,
      "repo_id": 8,
      "build_id": 2,
      "number": 1,
      "name": "default",
      "kind": "pipeline",
      "type": "docker",
      "status": "killed",
      "errignore": false,
      "exit_code": 0,
      "machine": "121.36.81.172",
      "os": "linux",
      "arch": "arm64",
      "started": 1595321352,
      "stopped": 1595321590,
      "created": 1595321350,
      "updated": 1595321352,
      "version": 4,
      "on_success": true,
      "on_failure": false,
      "steps": [
        {
          "id": 3,
          "step_id": 2,
          "number": 1,
          "name": "clone",
          "status": "killed",
          "exit_code": 130,
          "started": 1595321353,
          "stopped": 1595321590,
          "version": 3
        },
        {
          "id": 4,
          "step_id": 2,
          "number": 2,
          "name": "test",
          "status": "skipped",
          "exit_code": 130,
          "started": 1595321590,
          "stopped": 1595321590,
          "version": 2
        }
      ]
    }
  ]
}
```
---

#### 获取某条构建的log信息
```
GET  /api/:owner/:repo/builds/:build/logs/:stage/:step
```

*示例*
```bash
curl -X GET \
http://localhost:3000/api/dev_ops/builds/2/logs/1/1 | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|build      |是|int |build's number  |
|stage          |是|int |build's stage number  |
|step          |是|int |build's step number  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|id         |int|build's id|
|status       |string|build's status|
|event         |string|build's event|

返回值
```json
[
  {
    "pos": 0,
    "out": "+ git fetch origin +refs/heads/master:\n",
    "time": 1
  },
  {
    "pos": 1,
    "out": "Initialized empty Git repository in /drone/src/.git/\n",
    "time": 1
  },
  {
    "pos": 2,
    "out": "warning: redirecting to https://testgitea2.trustie.net/jasder/forgeplus.git/\n",
    "time": 1
  },
  {
    "pos": 3,
    "out": "From http://testgitea2.trustie.net/jasder/forgeplus\n",
    "time": 493
  },
  {
    "pos": 4,
    "out": " * branch            master     -> FETCH_HEAD\n",
    "time": 493
  },
  {
    "pos": 5,
    "out": " * [new branch]      master     -> origin/master\n",
    "time": 493
  },
  {
    "pos": 6,
    "out": "+ git checkout 5e52ce51a239f5c8dd0b489a8a71e94f976179b4 -b master\n",
    "time": 493
  },
  {
    "pos": 7,
    "out": "Already on 'master'\n",
    "time": 496
  }
]
```
---

#### 获取CI服务器配置信息
```
GET  /api/users/ci/cloud_account
```

*示例*
```bash
curl -X GET \
http://localhost:3000/api/users/ci/cloud_account | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|step         |int|0: 未绑定；1: 未认证(已绑定)|
|ci_certification         |boolean|true: 已认证， false: 未认证|
|ip       |string|ci服务器ip|
|redirect_url         |string|认证地址|

返回值
```json
{
  "step": 0,
  "ci_certification": false,
  "cloud_account": {
    "ip": "xxx.xxx.xxx.x",
    "redirect_url": "http://localhost:3000/login",
  }
}
```
------

#### 绑定CI服务器-Trustie提供服务器

```
POST  /api/users/ci/cloud_account/trustie_bind
```

*示例*

```bash
curl -X POST \
-d "account=xx" \
https://localhost:3000/api/users/ci/cloud_account/trustie_bind.json  | jq
```

*请求参数说明:*

| 参数名  | 必选 | 类型   | 说明       |
| ------- | ---- | ------ | ---------- |
| account | 是   | string | 登录用户名 |

*返回参数说明:*

| 参数名       | 类型   | 说明                                    |
| ------------ | ------ | --------------------------------------- |
| step         | int    | 0: 未绑定；1: 未认证(已绑定)，2: 已认证 |
| ip           | string | ci服务器ip                              |
| redirect_url | string | 认证地址                                |

返回值

```json
{
  "step": 0,
  "cloud_account": {
    "ip": "xxx.xxx.xxx.x",
    "redirect_url": "http://localhost:3000/login"
  }
}
```

---

#### 绑定CI服务器
```
POST  /api/users/ci/cloud_account/bind
```

*示例*
```bash
curl -X POST \
-d "account=xx" \
-d "secret=xxx" \
-d "ip_num=xx.xx.xx.xx" \
https://localhost:3000/api/users/ci/cloud_account/bind.json  | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|account          |是|string |云服务器ssh连接登录用户名  |
|secret       |是|string |云服务器ssh连接登录秘密 |
|ip_num        |否|string |云服务器公网IP |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|step         |int|0: 未绑定；1: 未认证(已绑定)，2: 已认证|
|ip       |string|ci服务器ip|
|redirect_url         |string|认证地址|

返回值
```json
{
  "step": 0,
  "cloud_account": {
    "ip": "xxx.xxx.xxx.x",
    "redirect_url": "http://localhost:3000/login",
  }
}
```
------

#### 流水线查询

```
GET  /api/ci/pipelines/list?identifier={identifier}
```

*示例*

```bash
curl -X GET \
http://localhost:3000/api/ci/pipelines/list.json?identifier="xxx" | jq
```

*返回参数说明:*

| 参数名        | 类型   | 说明            |
| ------------- | ------ | --------------- |
| id            | int    | 流水线id        |
| pipeline_name | string | 流水线名称      |
| file_name     | string | 流水线文件名    |
| created_at    | string | 创建时间        |
| sync          | int    | 是否同步到gitea |

返回值

```json
{
    "pipelines": [
        {
            "id": 1,
            "pipeline_name": "2020-01-08 流水线",
            "file_name": ".trustie.pipeline.yaml",
            "created_at": "2021-01-08 04:16:24",
            "updated_at": "2021-01-08 04:16:24"
        }
    ]
}
```

---

#### 流水线新增

```
POST  /api/ci/pipelines
```

*示例*

```bash
curl --location --request POST 'http://localhost:3000/api/ci/pipelines' \
--header 'Content-Type: application/json' \
--data-raw ' {
            "pipeline_name": "流水线 2021-01-12",
            "file_name": ".trustie.pipeline.yaml",
            "identifier": "xxx"
}'
```

*请求参数说明:*

| 参数名        | 必选 | 类型   | 说明                                           |
| ------------- | ---- | ------ | ---------------------------------------------- |
| pipeline_name | 是   | string | 流水线名称                                     |
| file_name     | 是   | string | 文件名称（默认初始值：.trustie.pipeline.yaml） |
| identifier    | 是   | string | 项目identifier                                 |

*返回参数说明:*

| 参数名  | 类型   | 说明           |
| ------- | ------ | -------------- |
| status  | int    | 状态码 0成功   |
| message | string | 返回消息       |
| id      | int    | 新增流水线的id |

返回值

```json
{
    "status": 0,
    "message": "success",
    "id": 18
}
```

------

#### 流水线更新

修改流水线名称时调用。

```
PUT  /api/ci/pipelines/{id}
```

*示例*

```bash
curl --location --request PUT 'http://localhost:3000/api/ci/pipelines/3' \
--header 'Content-Type: application/json' \
--data-raw ' {
            "pipeline_name": "2020-01-11 流水线"
}'
```

*请求参数说明:*

| 参数名        | 必选 | 类型   | 说明       |
| ------------- | ---- | ------ | ---------- |
| id            | 是   | id     | 流水线id   |
| pipeline_name | 是   | string | 流水线名称 |

*返回参数说明:*

| 参数名  | 类型   | 说明         |
| ------- | ------ | ------------ |
| status  | int    | 状态码 0成功 |
| message | string | 返回消息     |

返回值

```json
{
    "status": 0,
    "message": "success"
}
```

------

#### 流水线删除

```
DELETE  /api/ci/pipelines/{id}
```

*示例*

```bash
curl -X DELETE \
https://localhost:3000/api/ci/pipelines/1  | jq
```

*请求参数说明:*

| 参数名 | 必选 | 类型 | 说明     |
| ------ | ---- | ---- | -------- |
| id     | 是   | int  | 流水线id |

*返回参数说明:*

| 参数名  | 类型   | 说明         |
| ------- | ------ | ------------ |
| status  | int    | 状态码 0成功 |
| message | string | 返回消息     |

返回值

```json
{
    "status": 0,
    "message": "success"
}
```

------

#### 流水线的阶段查询

```
GET  /api/ci/pipelines/{id}/stages
```

*示例*

```bash
curl --location --request GET 'http://localhost:3000/api/ci/pipelines/19/stages.json'
```

*请求参数说明:*

| 参数名 | 必选 | 类型 | 说明     |
| ------ | ---- | ---- | -------- |
| id     | 是   | int  | 流水线id |

*返回参数说明:*

| 参数名      | 类型   | 说明     |
| ----------- | ------ | -------- |
| stages      | arr    | 阶段数组 |
| stage_name  | string | 阶段名称 |
| stage_type  | string | 阶段类型 |
| pipeline_id | int    | 流水线id |
| show_index  | int    | 排序     |

返回值

```json
{
    "stages": [
        {
            "id": 37,
            "stage_name": "初始化",
            "stage_type": "init",
            "pipeline_id": 19,
            "show_index": 1,
            "created_at": "2021-01-12T15:18:00.000+08:00",
            "updated_at": "2021-01-12T15:18:00.000+08:00"
        },
        {
            "id": 38,
            "stage_name": "编译构建",
            "stage_type": "build",
            "pipeline_id": 19,
            "show_index": 2,
            "created_at": "2021-01-12T15:18:00.000+08:00",
            "updated_at": "2021-01-12T15:18:00.000+08:00"
        }
    ]
}
```

------

#### 确认阶段流水线完整内容查询

```
GET  /api/ci/pipelines/{id}/content?owner={owner}&repo={repo}
```

*示例*

```bash
curl -X GET \
http://localhost:3000/api/ci/pipelines/1/content.json?owner=xx&repo=xx | jq
```

*返回参数说明:*

| 参数名  | 类型   | 说明             |
| ------- | ------ | ---------------- |
| content | String | 流水线内容       |
| sync    | int    | 同步状态         |
| owner   | string | 用户登录名       |
| repo    | string | 项目的identifier |

返回值

```json
{
    "content": "#pipeline \nkind: pipeline\r\nname: maven项目-镜像仓库\r\n\r\nplatform:\r\n  os: linux\r\n  arch: arm64\nsteps:\n- name: Maven编译\r\n  image: arm64v8/maven\r\n  commands:\r\n    - mvn install\n- name: 编译镜像-推送到仓库\r\n  image: plugins/docker\r\n  settings:\r\n    username: moshenglv\r\n    password: RL9UB5P7Jtzukka\r\n    repo: docker.io/moshenglv/demo\r\n    tags: latest\n",
    "sync": 1,
    "sha":"xxxxx"
}
```

------

#### 流水线阶段新增

```
POST  /api/ci/pipelines/{id}/create_stage
```

*示例*

```bash
curl --location --request POST 'http://localhost:3000/api/ci/pipelines/19/create_stage.json' \
--header 'Content-Type: application/json' \
--data-raw '{
            "stage_name": "新阶段2",
            "show_index": 2
}'
```

*请求参数说明:*

| 参数名     | 必选 | 类型   | 说明     |
| ---------- | ---- | ------ | -------- |
| id         | 是   | int    | 流水线id |
| show_index | 是   | int    | 阶段排序 |
| stage_name | 是   | string | 阶段名称 |

*返回参数说明:*

| 参数名  | 类型   | 说明         |
| ------- | ------ | ------------ |
| status  | int    | 状态码 0成功 |
| message | string | 返回消息     |

返回值

```json
{
    "status": 0,
    "message": "success"
}
```

------

#### 流水线阶段更新

```
PUT  /api/ci/pipelines/{id}/{stage_id}/update_stage
```

*示例*

```bash
curl --location --request PUT 'http://localhost:3000/api/ci/pipelines/1/5/update_stage.json' \
--header 'Content-Type: application/json' \
--data-raw ' {
            "stage_name": "新阶段-更新"
}'
```

*请求参数说明:*

| 参数名     | 必选 | 类型   | 说明                             |
| ---------- | ---- | ------ | -------------------------------- |
| id         | 是   | int    | 流水线id                         |
| stage_name | 是   | string | 阶段名称（默认为 阶段名-模板名） |

*返回参数说明:*

| 参数名  | 类型   | 说明         |
| ------- | ------ | ------------ |
| status  | int    | 状态码 0成功 |
| message | string | 返回消息     |

返回值

```json
{
    "status": 0,
    "message": "success"
}
```

------

#### 流水线阶段删除

```
DELETE  /api/ci/pipelines/{id}/{stage_id}/delete_stage?show_index={index}
```

*示例*

```bash
curl --location --request DELETE 'http://localhost:3000/api/ci/pipelines/19/42/delete_stage.json?show_index=2' \
```

*请求参数说明:*

| 参数名     | 必选 | 类型 | 说明                   |
| ---------- | ---- | ---- | ---------------------- |
| id         | 是   | int  | 流水线id               |
| stage_id   | 是   | int  | 阶段id                 |
| show_index | 是   | int  | 被删除阶段的show_index |

*返回参数说明:*

| 参数名  | 类型   | 说明         |
| ------- | ------ | ------------ |
| status  | int    | 状态码 0成功 |
| message | string | 返回消息     |

返回值

```json
{
    "status": 0,
    "message": "success"
}
```

------

#### 流水线阶段步骤查询

```
GET  /api/ci/pipelines/{id}/{stage_id}/steps.json
```

*示例*

```bash
curl -X GET \
http://localhost:3000/api/ci/pipelines/1/2/steps.json | jq
```

*请求参数说明:*

| 参数名   | 必选 | 类型 | 说明     |
| -------- | ---- | ---- | -------- |
| id       | 是   | int  | 流水线id |
| stage_id | 是   | int  | 阶段id   |

*返回参数说明:*

| 参数名     | 类型   | 说明               |
| ---------- | ------ | ------------------ |
| id         | int    | 步骤id             |
| step_name  | string | 步骤名称           |
| stage_id   | int    | 所属阶段id         |
| show_index | int    | 显示顺序           |
| content    | String | 步骤内容           |
| template   | Object | 步骤对应的模板对象 |

返回值

```json
{
    "steps": [
        {
            "id": 1,
            "step_name": "编译构建-maven",
            "stage_id": 2,
            "show_index": 0,
            "content": "- name: Maven编译\r\n  image: arm64v8/maven\r\n",
            "created_at": "2021-01-11T09:57:17.000+08:00",
            "updated_at": "2021-01-11T09:57:17.000+08:00",
            "template": {
                "id": 3,
                "template_name": "maven",
                "stage_type": "build",
                "category": "java",
                "content": "- name: maven\r\n  image: maven:3-jdk-10\r\n",
                "created_at": "2021-01-11T17:28:34.000+08:00",
                "updated_at": "2021-01-11T17:28:36.000+08:00"
            }
        }
    ]
}
```

------

#### 流水线阶段步骤新增/更新

```
POST  /api/ci/pipelines/{id}/{stage_id}/stage_step
```

*示例*

```bash
curl --location --request POST 'http://localhost:3000/api/ci/pipelines/1/2/stage_step.json' \
--header 'Content-Type: application/json' \
--data-raw ' {"steps":[{
           "id":7,
            "step_name": "编译构建11-gradle",
            "show_index": 1,
            "content": "xxxxxxxxxxx",
            "template_id":2
}
]
 }'
```

*请求参数说明:*

| 参数名           | 必选 | 类型   | 说明                             |
| ---------------- | ---- | ------ | -------------------------------- |
| steps            | 是   | arr    | 需要更新step数组                 |
| id               | 是   | int    | 流水线id                         |
| stage_id         | 是   | int    | 阶段id                           |
| id（数组中的id） | 否   | int    | 步骤id（存在则更新，不存在新增） |
| step_name        | 是   | string | 阶段名称（阶段名-模板名）        |
| content          | 是   | string | 步骤内容                         |
| template_id      | 是   | int    | 模板id                           |

*返回参数说明:*

| 参数名  | 类型   | 说明         |
| ------- | ------ | ------------ |
| status  | int    | 状态码 0成功 |
| message | string | 返回消息     |

返回值

```json
{
    "status": 0,
    "message": "success"
}
```

------

#### 流水线阶段步骤删除

```
DELETE  /api/ci/pipelines/{id}/{stage_id}/{step_id}/delete_step
```

*示例*

```bash
curl -X DELETE \
https://localhost:3000/api/ci/pipelines/1/6/2/delete_stage.json  | jq
```

*请求参数说明:*

| 参数名   | 必选 | 类型 | 说明     |
| -------- | ---- | ---- | -------- |
| id       | 是   | int  | 流水线id |
| stage_id | 是   | int  | 阶段id   |
| step_id  | 是   | int  | 步骤id   |

*返回参数说明:*

| 参数名  | 类型   | 说明         |
| ------- | ------ | ------------ |
| status  | int    | 状态码 0成功 |
| message | string | 返回消息     |

返回值

```json
{
    "status": 0,
    "message": "success"
}
```

------

#### 阶段模板查询

```
GET  /api/ci/templates/templates_by_stage?stage_type={stage_type}
```

*示例*

```bash
curl -X GET \
http://localhost:3000/api/ci/templates/templates_by_stage.json?stage_type=build | jq
```

*请求参数说明:*

| 参数名     | 必选 | 类型   | 说明                                  |
| ---------- | ---- | ------ | ------------------------------------- |
| stage_type | 是   | string | 阶段类型：init/build/deploy/customize |

*返回参数说明:*

| 参数名        | 类型   | 说明             |
| ------------- | ------ | ---------------- |
| category      | string | 分类名称         |
| templates     | arr    | 分类下的模板列表 |
| id            | int    | 模板id           |
| template_name | string | 模板名称         |
| content       | String | 模板内容         |

返回值

```json
[
    {
        "category": "java",
        "templates": [
            {
                "id": 3,
                "template_name": "maven",
                "stage_type": "build",
                "category": "java",
                "content": "#maven",
                "created_at": "2021-01-11T17:28:34.000+08:00",
                "updated_at": "2021-01-11T17:28:36.000+08:00"
            },
            {
                "id": 4,
                "template_name": "gradle",
                "stage_type": "build",
                "category": "java",
                "content": "#gradle",
                "created_at": "2021-01-11T17:28:34.000+08:00",
                "updated_at": "2021-01-11T17:28:36.000+08:00"
            }
        ]
    },
    {
        "category": "c++",
        "templates": [
            {
                "id": 5,
                "template_name": "make",
                "stage_type": "build",
                "category": "c++",
                "content": "#make",
                "created_at": "2021-01-11T17:29:17.000+08:00",
                "updated_at": "2021-01-11T17:29:18.000+08:00"
            }
        ]
    }
]
```

------


#### 解除CI服务器绑定
```
DELETE  /api/users/ci/cloud_account/unbind
```

*示例*
```bash
curl -X DELETE \
http://localhost:3000/api/users/ci/cloud_account/unbind.json | jq
```

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|status       |int|状态码， 0: 成功，-1: 失败|
|message         |string|返回信息说明|

返回值
```json
{
  "status": 0,
  "message": "success"
}
```
---

### 项目列表
```
GET  /api/users/:login/projects
```

*示例*
```bash
curl -X GET \
-d "page=1" \
-d "limit=20" \
http://localhost:3000/api/users/Jason/projects.json | jq
```

*请求参数说明:*

|参数名|必选|类型|说明|
|-|-|-|-|
|page          |否|int |页数，第几页  |
|limit         |否|int |每页多少条数据，默认20条  |

*返回参数说明:*

|参数名|类型|说明|
|-|-|-|
|total_count     |int   |项目总条数 |
|id              |string   |项目id |
|name            |string|项目名称|
|description     |string|项目简介|
|open_devops     |boolean|激活状态，true: 激活； false：未激活|
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
```json
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
    }
  ]
}
```
---
