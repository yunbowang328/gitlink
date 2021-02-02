# Repositories

## 仓库详情
仓库详情

> 示例:

```shell
curl -X GET http://localhost:3000/api/jasder/jasder_test.json
```

```javascript
await octokit.request('GET /api/jasder/jasder_test.json')
```

### HTTP 请求
`GET /api/:owner/:repo`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int   |id |
|name           |string|项目名称|
|identifier     |string|项目标识|
|is_public      |boolean|项目是否公开， true:公开，false:私有|
|description    |string|项目简介|
|repo_id        |int|仓库id|
|repo_identifier|string|仓库标识|


> 返回的JSON示例:

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


## 仓库详情(简版)
仓库详情

> 示例:

```shell
curl -X GET http://localhost:3000/api/jasder/jasder_test/simple.json
```

```javascript
await octokit.request('GET /api/jasder/jasder_test/simple.json')
```

### HTTP 请求
`GET /api/:owner/:repo/simple`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id             |int   |id |
|name           |string|项目名称|
|identifier     |string|项目标识|
|is_public      |boolean|项目是否公开， true:公开，false:私有|
|description    |string|项目简介|
|repo_id        |int|仓库id|
|repo_identifier|string|仓库标识|


> 返回的JSON示例:

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


## 编辑仓库信息
编辑仓库信息

> 示例:

```shell
curl -X GET http://localhost:3000/api/jasder/jasder_test/edit.json
```

```javascript
await octokit.request('GET /api/jasder/jasder_test/edit.json')
```

### HTTP 请求
`GET /api/:owner/:repo/edit.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|identifier           |string   |仓库标识 |
|project_id           |int|项目id|
|project_name         |string|项目名称|
|project_identifier   |string|项目标识|
|project_description  |string|项目简介|
|project_category_id  |int|项目类别id|
|project_language_id  |int|项目语言id|
|private              |boolean|项目是否私有, true：为私有，false: 公开  |


> 返回的JSON示例:

```json
{
  "identifier": "project",
  "project_id": 3263,
  "project_name": "项目",
  "project_identifier": "project identifier",
  "project_description": "project description",
  "project_category_id": 1,
  "project_language_id": 2,
  "private": false
}
```


## 修改仓库信息
修改仓库信息

> 示例:

```shell
curl -X PATCH \
-d "name=hnfl_demo" \
-d "description=my first project" \
-d "project_category_id=1" \
-d "project_language_id=2" \
-d "private=true" \
http://localhost:3000/api/jasder/jasder_test.json
```

```javascript
await octokit.request('PATCH /api/jasder/jasder_test.json')
```

### HTTP 请求
`PATCH /api/:owner/:repo`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|id                 |是 | |int    |项目id  |
|name               |否 | |string |项目名称  |
|description        |否 | |string |项目描述  |
|project_category_id|否 | |int    |项目类别id  |
|project_language_id|否 | |int    |项目语言id  |
|default_branch     |否 | |string    |默认分支名称  |
|private            |否 | |boolean|项目是否私有, true：为私有，false: 公开，默认为公开  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id                 |int|id |
|identifier         |string|项目标识|
|name               |string|项目名称|
|description        |string|项目简介|
|project_category_id|int|项目类别id|
|project_language_id|int|项目语言id|
|private            |否|boolean|项目是否私有, true：为私有，false: 公开，默认为公开  |


> 返回的JSON示例:

```json
{
  "id": 3263,
  "identifier": "project identifier",
  "name": "project name",
  "description": "project description",
  "project_category_id": 1,
  "project_language_id": 2,
  "is_public": true
}
```


## 删除仓库
删除仓库

> 示例:

```shell
curl -X DELETE http://localhost:3000/api/jasder/jasder_test.json
```

```javascript
await octokit.request('DELETE /api/jasder/jasder_test.json')
```

### HTTP 请求
`PATCH /api/:owner/:repo`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |


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
<aside class="warning">
  只有平台管理员和项目管理员才能删除仓库.
</aside>


## 添加仓库成员
仓库中添加成员操作

> 示例:

```shell
curl -X POST \
-d "user_id=12" \
http://localhost:3000/api/jasder/jasder_test/collaborators.json
```

```javascript
await octokit.request('POST /api/jasder/jasder_test/collaborators.json')
```

### HTTP 请求
`POST /api/:owner/:repo/collaborators.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|user_id       |是|int | |用户id  |


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
<aside class="warning">
  只有平台管理员和项目管理员才能添加仓库成员.
</aside>


## 删除仓库成员
仓库中删除成员操作

> 示例:

```shell
curl -X DELETE \
-d "user_id=12" \
http://localhost:3000/api/jasder/jasder_test/collaborators.json
```

```javascript
await octokit.request('DELETE /api/jasder/jasder_test/collaborators.json')
```

### HTTP 请求
`DELETE /api/:owner/:repo/collaborators.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|user_id       |是|int | |用户id  |

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
<aside class="warning">
  只有平台管理员和项目管理员才能删除仓库成员.
</aside>


## 更改仓库成员角色(权限)
更改仓库成员角色

> 示例:

```shell
curl -X PUT \
-d "user_id=12" \
-d "role=Developer" \
http://localhost:3000/api/jasder/jasder_test/change_role.json
```

```javascript
await octokit.request('PUT /api/jasder/jasder_test/change_role.json')
```

### HTTP 请求
`PUT /api/:owner/:repo/change_role.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|user_id       |是|int | |用户id  |
|role          |是|string | |取值范围："Manager", "Developer", "Reporter"；分别为项目管理人员(拥有所有操作权限)、项目开发人员(只拥有读写权限)、项目报告人员(只拥有读权限)  |


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
<aside class="warning">
  只有平台管理员和项目管理员才能更改仓库成员角色.
</aside>


## 获取仓库成员列表
获取仓库成员列表

> 示例:

```shell
curl -X GET \
-d "page=1" \
-d "limit=5" \
http://localhost:3000/api/jasder/jasder_test/collaborators.json
```

```javascript
await octokit.request('GET /api/jasder/jasder_test/collaborators.json')
```

### HTTP 请求
`GET /api/:owner/:repo/collaborators.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|page          |否| |string |页数，第几页  |
|limit         |否| |string |每页多少条数据，默认15条  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|total_count       |int   |返回记录总条数 |
|members           |array|项目成员信息|
|-- id             |int|用户id|
|-- name           |string|用户名称|
|-- login          |string|用户登录名/标识|
|-- image_url      |string|用户头像|
|-- is_owner       |boolean|是否是项目的拥有者，true:是， false:不是|
|-- role           |string|该用户在项目中的角色， Manager: 管理员(拥有操作权限); Developer:开发人员(只拥有读写权限)； Reporter:报告人员(只拥有读权限)|


> 返回的JSON示例:

```json
{
  "total_count": 2,
  "members": [
    {
      "id": 36401,
      "name": "name",
      "login": "login",
      "image_url": "avatars/User/b",
      "is_owner": true,
      "role": "Manager"
    },
    {
      "id": 36399,
      "name": "name",
      "login": "login",
      "image_url": "avatars/User/b",
      "is_owner": false,
      "role": "Developer"
    }
  ]
}
```
<aside class="success">
  Success Data.
</aside>


## 获取仓库代码目录
获取仓库代码目录

> 示例:

```shell
curl -X GET \
-d "ref=develop" \
http://localhost:3000//api/jasder/jasder_test/entries.json
```

```javascript
await octokit.request('GET /api/jasder/jasder_test/entries.json')
```

### HTTP 请求
`GET /api/:owner/:repo/entries.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|ref             |否| | string |分支名称、tag名称或是提交记录id，默认为master分支  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|last_commit            |object   |
|-- commit             |object   |
|id             |int   |id |
|name           |string|文件夹或文件名称|
|path           |string|文件夹或文件相对路径|
|type           |string|文件类型， file:文件，dir：文件目录
|size           |int|文件夹或文件大小 单位B
|content        |string|文件内容
|target         |string|标签


> 返回的JSON示例:

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
        "time_from_now": "1年前",
        "created_at_unix": null
      }
    }
  ]
}
```
<aside class="success">
  Success Data.
</aside>


## 获取仓库代码子目录或者文件
获取仓库代码子目录或者文件

> 示例:

```shell
curl -X GET \
-d "ref=master" \
-d "filepath=file" \
http://localhost:3000//api/jasder/jasder_test/sub_entries.json
```

```javascript
await octokit.request('GET /api/jasder/jasder_test/sub_entries.json')
```

### HTTP 请求
`GET /api/:owner/:repo/sub_entries.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|filepath        |是|string |文件夹、文件的相对路径  |
|ref             |否| | string |分支名称、tag名称或是提交记录id，默认为master分支  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
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


> 返回的JSON示例:

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
  }
]
```
<aside class="success">
  Success Data.
</aside>
