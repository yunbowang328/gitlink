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

## 仓库详情(新版)
仓库详情

> 示例:

```shell
curl -X GET http://localhost:3000/api/yystopf/ceshi/detail.json
```

```javascript
await octokit.request('GET /api/yystopf/ceshi/detail.json')
```

### HTTP 请求
`GET /api/:owner/:repo/detail`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|content                          |string   |仓库简介   |
|website                          |string   |仓库网址   |
|readme                           |string   |readme文件｜
|identifier                       |string   |项目标识   |
|name                             |string   |项目名称   |
|issues_count                     |int      |项目issue数量|
|pull_requests_count              |int      |项目合并请求数量|
|project_identifier               |int      |项目标识|
|praises_count                    |int      |项目点赞数量|
|forked_count                     |int      |项目复刻数量|
|watchers_count                   |int      |项目关注数量|
|versions_count                   |int      |项目里程碑数量|
|version_releases_count           |int      |项目发行版数量|
|version_releasesed_count         |int      |项目发行版已发行数量|
|permission                       |string   |项目权限|
|mirror_url                       |string   |镜像地址|
|mirror                           |bool     |是否为镜像项目|
|type                             |int      |项目类型 0 普通项目 1 普通镜像项目 2 同步镜像项目|
|open_devops                      |int      |是否开启devops|
|watched                          |bool     |是否关注|
|praised                          |bool     |是否点赞|
|status                           |int      |项目状态|
|forked_from_project_id           |int      |fork项目id|
|fork_info                        |object   |fork项目信息|
|size                             |string   |仓库大小|
|ssh_url                          |string   |项目ssh地址|
|clone_url                        |string   |项目克隆地址|
|default_branch                   |string   |仓库默认分支|
|empty                            |bool     |仓库是否为空|
|full_name                        |string   |仓库全称|
|private                          |bool     |仓库是否为私有项目|
|license_name                     |string   |许可证名称|
|release_versions.list.name       |string   |项目issue数量|
|release_versions.list.tag_name   |string   |发行版标签名称|
|release_versions.list.created_at |string   |发行版创建时间|
|release_versions.total_count  |int         |发行版数量|
|branches.list.name            |string      |分支名称|
|branches.total_count          |int         |分支数量|
|tags.list.name                |string      |标签名称|
|tags.total_count              |int         |标签数量|
|contributors.list.contributions|int        |贡献数量|
|contributors.list.login       |string      |贡献者登录名|
|contributors.list.name        |string      |贡献者用户名称|
|contributors.list.image_url   |string      |贡献者头像|
|languages                     |object      |项目语言占比|

> 返回的JSON示例:

```json
{
    "content": "仓库简介",
    "website": "仓库网址",
    "readme": {
        "type": "file",
        "encoding": "base64",
        "size": 9,
        "name": "README.md",
        "path": "README.md",
        "content": "# ceshi\n\n",
        "sha": ""
    },
    "identifier": "ceshi",
    "name": "测试项目",
    "project_id": 2,
    "repo_id": 2,
    "issues_count": 0,
    "pull_requests_count": 0,
    "project_identifier": "ceshi",
    "praises_count": 0,
    "forked_count": 0,
    "watchers_count": 0,
    "versions_count": 0,
    "version_releases_count": 0,
    "version_releasesed_count": 0,
    "permission": "Reporter",
    "mirror_url": null,
    "mirror": false,
    "type": 0,
    "open_devops": false,
    "watched": false,
    "praised": false,
    "status": 1,
    "forked_from_project_id": 1,
    "fork_info": {
        "fork_form_name": "测试项目",
        "fork_project_user_login": "ceshi_org",
        "fork_project_identifier": "ceshi",
        "fork_project_user_name": "ceshi_org"
    },
    "size": "25.0 KB",
    "ssh_url": "virus@localhost:yystopf/ceshi.git",
    "clone_url": "http://localhost:10080/yystopf/ceshi.git",
    "default_branch": "master",
    "empty": false,
    "full_name": "yystopf/ceshi",
    "private": false,
    "license_name": "gnu-javamail-exception",
    "release_versions": {
        "list": [
            {
                "id": 2,
                "name": "vvvv",
                "tag_name": "v1.1",
                "created_at": "2019-07-18 10:16"
            }
        ],
        "total_count": 1
    },
    "branches": {
        "list": [
            {
                "name": "master"
            }
        ],
        "total_count": 1
    },
    "tags": {
        "list": [
            {
                "name": "v1.1"
            },
            {
                "name": "v1.0"
            }
        ],
        "total_count": 2
    },
    "contributors": {
        "list": [
            {
                "contributions": 1,
                "gid": 2,
                "login": "yystopf",
                "type": "User",
                "name": "yystopf",
                "image_url": "avatars/User/b"
            }
        ],
        "total_count": 1
    },
    "languages": {
        "HTML": "50.9%",
        "Ruby": "25.6%",
        "JavaScript": "21.4%",
        "CSS": "1.3%",
        "CoffeeScript": "0.7%",
        "Shell": "0.1%"
    }
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

## 获取仓库所有文件
获取仓库所有文件

> 示例:

```shell
curl -X GET \
-d "ref=develop" \
http://localhost:3000/api/yystopf/ceshi/files.json
```

```javascript
await octokit.request('GET /api/yystopf/ceshi/files.json')
```

### HTTP 请求
`GET /api/:owner/:repo/files`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner    |是|      |string |用户登录名  |
|repo     |是|      |string |项目标识identifier  |
|search   |否|      |string |文件搜索关键词  |
|ref      |是|      |string |分支名，默认为仓库默认分支  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|name     |string       |文件名称|
|path     |string       |文件路径|
|sha      |string       |文件标识|
|type     |string       |文件类型|
|size     |int          |文件大小|
|url      |string       |文件地址|


> 返回的JSON示例:

```json
[
    {
        "name": ".gitignore",
        "path": ".gitignore",
        "sha": "f83922d01ae60f6e637a1a2b9f08871b4f87dfc8",
        "type": "file",
        "size": 63,
        "url": "http://localhost:10080/api/v1/repos/yystopf/ceshi/contents/.gitignore?ref=master",
        "html_url": "http://localhost:10080/yystopf/ceshi/src/branch/master/.gitignore"
    },
    {
        "name": "LICENSE",
        "path": "LICENSE",
        "sha": "8f3b9ab0d08afd3a624d822e3971a2f42b3bc2b9",
        "type": "file",
        "size": 341,
        "url": "http://localhost:10080/api/v1/repos/yystopf/ceshi/contents/LICENSE?ref=master",
        "html_url": "http://localhost:10080/yystopf/ceshi/src/branch/master/LICENSE"
    },
    {
        "name": "README.md",
        "path": "README.md",
        "sha": "1bc8a60ac6ddc876ebc4b60fc68991435bfad93e",
        "type": "file",
        "size": 9,
        "url": "http://localhost:10080/api/v1/repos/yystopf/ceshi/contents/README.md?ref=master",
        "html_url": "http://localhost:10080/yystopf/ceshi/src/branch/master/README.md"
    }
]
```


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

## 获取仓库webhooks列表
获取仓库webhooks列表

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/yystopf/ceshi/webhooks.json
```

```javascript
await octokit.request('GET /api/yystopf/ceshi/webhooks.json')
```

### HTTP 请求
`GET /api/:owner/:repo/webhooks.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id                 |int   |id |
|url                |string|地址|
|http_method        |string|请求方式|
|is_active          |bool  |是否激活|
|type               |string|类型|
|last_status        |string|最后一次推送的状态|
|create_time        |string|创建时间|


> 返回的JSON示例:

```json
{
    "total_count": 4,
    "webhooks": [
        {
            "id": 2,
            "url": "https://oapi.dingtalk.com/robot/send?access_token=7e1e19d0eddb6a5e33c5c2c4e66f4c88f9437184b9ed2c2653194c6374c7d513",
            "http_method": "",
            "is_active": true,
            "type": "dingtalk",
            "last_status": "succeed",
            "create_time": "2021-07-12 10:50:07"
        },
        {
            "id": 3,
            "url": "http://localhost:3000",
            "http_method": "GET",
            "is_active": true,
            "type": "gitea",
            "last_status": "succeed",
            "create_time": "2021-07-26 10:03:45"
        },
        {
            "id": 4,
            "url": "http://localhost:10081",
            "http_method": "POST",
            "is_active": true,
            "type": "gitea",
            "last_status": "waiting",
            "create_time": "2021-07-26 16:56:53"
        },
        {
            "id": 5,
            "url": "http://localhost:3001",
            "http_method": "POST",
            "is_active": true,
            "type": "gitea",
            "last_status": "fail",
            "create_time": "2021-07-26 16:58:23"
        }
    ]
}
```
<aside class="success">
  Success Data.
</aside>
