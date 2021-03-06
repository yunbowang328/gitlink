# Projects

## 申请加入项目
申请加入项目

> 示例:

```shell
curl -X POST http://localhost:3000/api/applied_projects.json
```

```javascript
await octokit.request('POST /api/appliedr_projects.json')
```

### HTTP 请求
`POST /api/applied_projects.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|applied_project.code     |是| |string |邀请码  |
|applied_project.role     |否| |string |项目权限，reporter: 报告者, developer: 开发者，manager：管理员  |

> 请求的JSON示例

```json
{
  "applied_project": {
    "code": "1una34",
    "role": "developer"
  }
}
```

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int      |申请id |
|status         |string   |申请状态，canceled:取消,common:正在申请, accept:已接受,refuse:已拒绝|
|time_ago       |string   |项目申请创建的时间 |
|project.id     |int      |申请项目的id |
|project.identifier     |string      |申请项目的标识 |
|project.name     |string      |申请项目的名称 |
|project.description     |string      |申请项目的描述 |
|project.is_public     |bool      |申请项目是否公开 |
|project.owner.id     |bool      |申请项目拥有者id |
|project.owner.type     |string      |申请项目拥有者类型 |
|project.owner.name     |string      |申请项目拥有者昵称 |
|project.owner.login     |string      |申请项目拥有者标识 |
|project.owner.image_url     |string      |申请项目拥有者头像 |
|user.id     |int      |申请创建者的id |
|user.type     |string      |申请创建者的类型 |
|user.name     |string      |申请创建者的名称 |
|user.login     |string      |申请创建者的标识 |
|user.image_url     |string      |申请创建者头像 |
> 返回的JSON示例:

```json
{
    "project": {
        "id": 74,
        "identifier": "hehuisssjssjjsjs",
        "name": "hehuisssjssjjsjs",
        "description": "wwww",
        "is_public": false,
        "owner": {
            "id": 10,
            "type": "User",
            "name": "testforge1",
            "login": "testforge1",
            "image_url": "system/lets/letter_avatars/2/T/19_237_174/120.png"
        }
    },
    "user": {
        "id": 6,
        "type": "User",
        "name": "何慧",
        "login": "yystopf",
        "image_url": "images/avatars/User/6?t=1622513134"
    },
    "id": 7,
    "status": "common",
    "created_at": "2021-06-09 16:41",
    "time_ago": "1分钟前"
}
```

## 获取项目列表
获取项目列表，也可以更加相关条件过滤搜素

> 示例:

```shell
curl -X GET \
-d "page=1" \
-d "limit=5" \
http://localhost:3000/api/projects  | jq
```

```javascript
await octokit.request('GET /api/projects')
```

### HTTP 请求
`GET api/projects`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
page          | false | 1 | string | 页数，第几页
limit         | false | 15 | string | 每页多少条数据，默认15条
sort_by       | false |  | string | 排序类型, 取值：updated_on、created_on、forked_count、praises_count; updated_on: 更新时间排序，created_on: 创建时间排序，forked_count: fork数据排序，praises_count: 点赞数量排序，默认为updated_on更新时间排序
sort_direction| false |  | string | 排序方式,取值为: desc、asc; desc: 降序排序， asc: 升序排序， 默认为：desc
search        | false |  | string | 按照项目名称搜索
category_id   | false |  | int    | 项目类别id
language_id   | false |  | int    | 项目语言id
project_type  | false |  | string | 项目类型， 取值为：common、mirror; common:开源托管项目, mirror:开源镜像项目


### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
total_count     | int   | 项目总条数
id              | string | 项目id
name            | string | 项目名称
description     | string | 项目简介
visits          | int | 流量数
forked_count    | int | 被fork的数量
praises_count   | int | star数量
is_public       | boolean | 是否公开， true:公开，false:未公开
mirror_url      | string | 镜像url
last_update_time| int | 最后更新时间，为UNIX格式的时间戳
author          | object | 项目创建者
-- name         | string | 用户名，也是用户标识
category        | object | 项目类别
-- id           | int | 项目类型id
-- name         | string | 项目类型名称
language        | object | 项目语言
-- id           | int | 项目语言id
-- name         | string | 项目语言名称


> 返回的JSON示例:

```json
{
  "total_count": 3096,
  "projects": [
    {
      "id": 1400794,
      "repo_id": 1402452,
      "identifier": "cscw_2021_sponsor",
      "name": "Sponsor机制下的开源贡献",
      "description": "CSCW 2021 sponsor机制研究",
      "visits": 5,
      "praises_count": 0,
      "forked_count": 0,
      "is_public": true,
      "mirror_url": null,
      "type": 0,
      "last_update_time": 1611971671,
      "time_ago": "2天前",
      "forked_from_project_id": null,
      "open_devops": false,
      "platform": "forge",
      "author": {
        "name": "张迅晖",
        "login": "Nigel",
        "image_url": "images/avatars/User/3675?t=1611832880"
      },
      "category": {
        "id": 13,
        "name": "云计算和大数据"
      },
      "language": {
        "id": 34,
        "name": "Python3.6"
      }
    }
  ]
}
```
<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>


## 推荐项目
获取推荐项目列表

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/projects/recommend  | jq
```

```javascript
await octokit.request('GET /api/projects/recommend.json')
```

### HTTP 请求
`GET api/projects/recommend`


### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
total_count     |int   |项目总条数
id              |string   |项目id
name            |string|项目名称
description     |string|项目简介
visits          |int|流量数
forked_count    |int|被fork的数量
praises_count   |int|star数量
is_public       |boolean|是否公开， true:公开，false:未公开
mirror_url      |string|镜像url
last_update_time|int|最后更新时间，为UNIX格式的时间戳
author          |object|项目创建者
-- name         |string|用户名，也是用户标识
category        |object|项目类别
-- id           |int|项目类型id
-- name         |string|项目类型名称
language        |object|项目语言
-- id           |int|项目语言id
-- name         |string|项目语言名称


> 返回的JSON示例:

```json
[
  {
    "id": 20,
    "repo_id": 2,
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
  }
]
```
<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>


## 项目导航
获取项目导航信息

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/yystopf/ceshi/menu_list  | jq
```

```javascript
await octokit.request('GET /api/yystopf/ceshi/menu_list')
```

### HTTP 请求
`GET api/:owner/:repo/menu_list`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
owner             |是| |string |用户登录名
repo             |是| |string |项目标识identifier

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
menu_name     |string|导航名称， home:主页,code:代码库,issues:易修,pulls:合并请求,devops:工作流,versions:里程碑,activity:动态,setting:仓库设置


> 返回的JSON示例:

```json
[
    {
        "menu_name": "home"
    },
    {
        "menu_name": "code"
    },
    {
        "menu_name": "pulls"
    },
    {
        "menu_name": "activity"
    }
]
```


## 项目主页
获取项目主页信息

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/jasder/forgeplus/about  | jq
```

```javascript
await octokit.request('GET /api/jasder/forgeplus/about')
```

### HTTP 请求
`GET api/:owner/:repo/about`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
owner             |是| |string |用户登录名
repo             |是| |string |项目标识identifier

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
identifier     |string|project's identifier
content     |string|主页内容
attachments     |array|附件


> 返回的JSON示例:

```json
{
  "content": "",
  "identifier": "forgeplus",
  attachments: []
}
```
<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## 项目模块信息
项目模块信息

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/yystopf/ceshi/project_units.json
```

```javascript
await octokit.request('GET /api/yystopf/ceshi/project_units')
```

### HTTP 请求
`GET /api/yystopf/ceshi/project_units`

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|type          |string|模块名称 |

> 返回的JSON示例:

```json
[
    {
        "type": "code"
    },
    {
        "type": "pulls"
    },
    {
        "type": "issues"
    }
]
```

## 更改项目模块展示
更改项目模块展示

> 示例:

```shell
curl -X POST \
-H  "accept: application/json" \
-H  "Content-Type: application/json" \
-d "{ \"unit_typs\": [\"code\", \"pulls\"]}" \
http://localhost:3000/api/yystopf/ceshi/project_units.json
```

```javascript
await octokit.request('POST /api/yystopf/ceshi/project_units')
```

### HTTP 请求
`POST /api/yystopf/ceshi/project_units`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|unit_types |是| |array    | 项目模块内容， 支持以下参数:code:代码库,issues:易修,pulls:合并请求,devops:工作流,versions:里程碑 |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|status          |int|返回状态， 0: 表示操作成功 |
|message         |string|返回信息说明|

> 返回的JSON示例:

```json
{
    "status": 0,
    "message": "success"
}
```

## 创建项目
创建项目

> 示例:

```shell
curl -X POST \
-d "user_id=36401" \
-d "name=hnfl_demo" \
-d "description=my first project" \
-d "repository_name=hnfl_demo" \
-d "project_category_id=1" \
-d "project_language_id=2" \
-d "ignore_id=2" \
-d "license_id=1" \
http://localhost:3000/api/projects.json
```

```javascript
await octokit.request('GET /api/projects.json')
```

### HTTP 请求
`POST api/projects`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|user_id            |是| |int    |用户id或者组织id  |
|name               |是| |string |项目名称  |
|description        |是| |string |项目描述  |
|repository_name    |是| |string |仓库名称, 只含有数字、字母、下划线不能以下划线开头和结尾，且唯一  |
|project_category_id|是| |int    |项目类别id  |
|project_language_id|是| |int    |项目语言id  |
|ignore_id          |否| |int    |gitignore相关id  |
|license_id         |否| |int    |开源许可证id  |
|private            |否| |boolean|项目是否私有, true：为私有，false: 公开，默认为公开  |

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int   |id |
|name           |string|项目名称|


> 返回的JSON示例:

```json
{
  "id": 3240,
  "name": "好项目"
}
```


## 创建镜像项目
创建镜像项目

> 示例:

```shell
curl -X POST \
-d "user_id=36408" \
-d "clone_addr=https://gitea.com/mx8090alex/golden.git" \
-d "name=golden_mirror1" \
-d "description=golden_mirror" \
-d "project_category_id=1" \
-d "project_language_id=2" \
http://localhost:3000/api/projects/migrate.json
```

```javascript
await octokit.request('GET /api/projects/migrate.json')
```

### HTTP 请求
`POST api/projects/migrate.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|user_id            |是| |int    |用户id或者组织id  |
|name               |是| |string |项目名称  |
|clone_addr         |是| |string |镜像项目clone地址  |
|description        |否| |string |项目描述  |
|repository_name    |是| |string |仓库名称, 只含有数字、字母、下划线不能以下划线开头和结尾，且唯一  |
|project_category_id|是| |int    |项目类别id  |
|project_language_id|是| |int    |项目语言id  |
|is_mirror          |否| |boolean|是否设置为镜像， true：是， false：否，默认为否  |
|auth_username      |否| |string|镜像源仓库的登录用户名  |
|auth_password      |否| |string|镜像源仓库的登录秘密  |
|private            |否| |boolean|项目是否私有, true：为私有，false: 非私有，默认为公开  |

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int   |id |
|name           |string|项目名称|


> 返回的JSON示例:

```json
{
  "id": 3241,
  "name": "这是一个镜像项目"
}
```


## 同步镜像
手动同步镜像

> 示例:

```shell
curl -X POST http://localhost:3000/api/repositories/1244/sync_mirror.json
```

```javascript
await octokit.request('POST /api/repositories/1244/sync_mirror.json')
```

### HTTP 请求
`POST api/repositories/:id/sync_mirror.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|id            |是| |int    |仓库id  |


### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|status            |int   |状态码， 0:标识请求成功 |
|message           |string|服务端返回的信息说明|


> 返回的JSON示例:

```json
{
  "status": 0,
  "message": "success"
}
```


## Fork项目
fork项目

> 示例:

```shell
curl -X POST http://localhost:3000/api/jasder/forgeplus/forks.json
```

```javascript
await octokit.request('POST /api/jaser/jasder_test/forks.json')
```

### HTTP 请求
`POST api/:owner/:repo/forks.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int   |项目id |
|identifier     |string|项目标识|


> 返回的JSON示例:

```json
{
  "id": 3290,
  "identifier": "newadm"
}
```

## 用户管理的组织列表
用户管理的组织列表

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/ceshi1/ceshi_repo1/applied_transfer_projects/organizations.json  | jq
```

```javascript
await octokit.request('GET /api/:owner/:repo/applied_transfer_projects/organizations')
```

### HTTP 请求
`GET api/:owner/:repo/applied_transfer_projects/organizations`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
owner             |是| |string |用户登录名
repo             |是| |string |项目标识identifier

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
name     |string|组织标识
nickname |string|组织名称
description|string|组织描述
avatar_url|string｜组织头像


> 返回的JSON示例:

```json
{
    "total_count": 3,
    "organizations": [
        {
            "id": 9,
            "name": "ceshi_org",
            "nickname": "测试组织",
            "description": "测试组织",
            "avatar_url": "images/avatars/Organization/9?t=1612706073"
        },
        {
            "id": 51,
            "name": "ceshi",
            "nickname": "测试组织哈哈哈",
            "description": "23212312",
            "avatar_url": "images/avatars/Organization/51?t=1618800723"
        },
        {
            "id": 52,
            "name": "ceshi1",
            "nickname": "身份卡手动阀",
            "description": "1231手动阀是的",
            "avatar_url": "images/avatars/Organization/52?t=1618805056"
        }
    ]
}
```

## 迁移项目
迁移项目，edit接口is_transfering为true表示正在迁移

> 示例:

```shell
curl -X POST http://localhost:3000/api/ceshi1/ceshi_repo1/applied_transfer_projects.json
```

```javascript
await octokit.request('POST /api/:owner/:repo/applied_transfer_projects.json')
```

### HTTP 请求
`POST /api/:owner/:repo/applied_transfer_projects.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner     |是| |string |用户登录名  |
|repo      |是| |string |项目标识identifier  |
|owner_name|是| |string |迁移对象标识  |

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int      |项目id |
|status         |string   |项目迁移状态，canceled:取消,common:正在迁移, accept:已接受,refuse:已拒绝|
|time_ago       |string   |项目迁移创建的时间 |
|project.id     |int      |迁移项目的id |
|project.identifier     |string      |迁移项目的标识 |
|project.name     |string      |迁移项目的名称 |
|project.description     |string      |迁移项目的描述 |
|project.is_public     |bool      |迁移项目是否公开 |
|project.owner.id     |bool      |迁移项目拥有者id |
|project.owner.type     |string      |迁移项目拥有者类型 |
|project.owner.name     |string      |迁移项目拥有者昵称 |
|project.owner.login     |string      |迁移项目拥有者标识 |
|project.owner.image_url     |string      |迁移项目拥有者头像 |
|user.id     |int      |迁移创建者的id |
|user.type     |string      |迁移创建者的类型 |
|user.name     |string      |迁移创建者的名称 |
|user.login     |string      |迁移创建者的标识 |
|user.image_url     |string      |迁移创建者头像 |
|owner.id     |int      |迁移接受者的id |
|owner.type     |string      |迁移接受者的类型 |
|owner.name     |string      |迁移接受者的名称 |
|owner.login     |string      |迁移接受者的标识 |
|owner.image_url     |string      |迁移接受者头像 |
> 返回的JSON示例:

```json
{
    "project": {
        "id": 86,
        "identifier": "ceshi_repo1",
        "name": "测试项目啊1",
        "description": "二十多",
        "is_public": true,
        "owner": {
            "id": 52,
            "type": "Organization",
            "name": "身份卡手动阀",
            "login": "ceshi1",
            "image_url": "images/avatars/Organization/52?t=1618805056"
        }
    },
    "user": {
        "id": 6,
        "type": "User",
        "name": "yystopf",
        "login": "yystopf",
        "image_url": "system/lets/letter_avatars/2/Y/241_125_89/120.png"
    },
    "owner": {
        "id": 9,
        "type": "Organization",
        "name": "测试组织",
        "login": "ceshi_org",
        "image_url": "images/avatars/Organization/9?t=1612706073"
    },
    "id": 4,
    "status": "common",
    "created_at": "2021-04-26 09:54",
    "time_ago": "1分钟前"
}
```

## 取消迁移项目
迁移项目，edit接口is_transfering为true表示正在迁移

> 示例:

```shell
curl -X POST http://localhost:3000/api/ceshi1/ceshi_repo1/applied_transfer_projects/cancel.json
```

```javascript
await octokit.request('POST /api/:owner/:repo/applied_transfer_projects/cancel.json')
```

### HTTP 请求
`POST /api/:owner/:repo/applied_transfer_projects/cancel.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner     |是| |string |用户登录名  |
|repo      |是| |string |项目标识identifier  |

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int      |迁移id |
|status         |string   |迁移状态，canceled:取消,common:正在迁移, accept:已接受,refuse:已拒绝|
|time_ago       |string   |迁移创建的时间 |
|project.id     |int      |迁移项目的id |
|project.identifier     |string      |迁移项目的标识 |
|project.name     |string      |迁移项目的名称 |
|project.description     |string      |迁移项目的描述 |
|project.is_public     |bool      |迁移项目是否公开 |
|project.owner.id     |bool      |迁移项目拥有者id |
|project.owner.type     |string      |迁移项目拥有者类型 |
|project.owner.name     |string      |迁移项目拥有者昵称 |
|project.owner.login     |string      |迁移项目拥有者标识 |
|project.owner.image_url     |string      |迁移项目拥有者头像 |
|user.id     |int      |迁移创建者的id |
|user.type     |string      |迁移创建者的类型 |
|user.name     |string      |迁移创建者的名称 |
|user.login     |string      |迁移创建者的标识 |
|user.image_url     |string      |迁移创建者头像 |
|owner.id     |int      |迁移接受者的id |
|owner.type     |string      |迁移接受者的类型 |
|owner.name     |string      |迁移接受者的名称 |
|owner.login     |string      |迁移接受者的标识 |
|owner.image_url     |string      |迁移接受者头像 |
> 返回的JSON示例:

```json
{
    "project": {
        "id": 86,
        "identifier": "ceshi_repo1",
        "name": "测试项目啊1",
        "description": "二十多",
        "is_public": true,
        "owner": {
            "id": 52,
            "type": "Organization",
            "name": "身份卡手动阀",
            "login": "ceshi1",
            "image_url": "images/avatars/Organization/52?t=1618805056"
        }
    },
    "user": {
        "id": 6,
        "type": "User",
        "name": "yystopf",
        "login": "yystopf",
        "image_url": "system/lets/letter_avatars/2/Y/241_125_89/120.png"
    },
    "owner": {
        "id": 9,
        "type": "Organization",
        "name": "测试组织",
        "login": "ceshi_org",
        "image_url": "images/avatars/Organization/9?t=1612706073"
    },
    "id": 4,
    "status": "common",
    "created_at": "2021-04-26 09:54",
    "time_ago": "1分钟前"
}
```