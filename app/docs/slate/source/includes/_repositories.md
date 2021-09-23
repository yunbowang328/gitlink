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

## 获取仓库README文件
获取仓库README文件

> 示例:

```shell
curl -X GET \
-d "ref=master" \
-d "filepath=lib" \
http://localhost:3000/api/yystopf/csfjkkj/readme.json
```

```javascript
await octokit.request('GET /api/yystopf/csfjkkj/readme.json')
```

### HTTP 请求
`GET /api/:owner/:repo/readme.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|ref             |否| | string |分支名称、tag名称或是提交记录id，默认为默认分支  |
|filepath        |否| | string |子目录名称，默认为空 |

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|type           |string|文件类型， file:文件，dir：文件目录
|encoding       |string   |编码 |
|size           |int|文件夹或文件大小 单位B
|name           |string|文件夹或文件名称|
|path           |string|文件夹或文件相对路径|
|content        |string|文件内容
|sha            |string|文件commitid


> 返回的JSON示例:

```json
{
    "type": "file",
    "encoding": "base64",
    "size": 24,
    "name": "README.md",
    "path": "lib/README.md",
    "content": "ZGZhc2RhZGpmIGRrZnNsCgpzZGZkZnMK",
    "sha": "860962cd21c60b1a9e07d723080c87c32c18d44a"
}
```
<aside class="success">
  Success Data.
</aside>

## 获取仓库贡献者
获取仓库贡献者

> 示例:

```shell
curl -X GET \
-d "ref=master" \
-d "filepath=lib" \
http://localhost:3000/api/yystopf/csfjkkj/contributors.json
```

```javascript
await octokit.request('GET /api/yystopf/csfjkkj/contributors.json')
```

### HTTP 请求
`GET /api/:owner/:repo/contributors.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|ref             |否| | string |分支名称、tag名称或是提交记录id，默认为整个仓库  |
|filepath        |否| | string |子目录名称，默认为空 |

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|total_count    |integer|贡献者数量|
|contributions  |integer|贡献数量|
|login          |string |用户登录名 |
|type           |string|用户类型 |
|name           |string|用户昵称|
|image_url      |string|用户头像|


> 返回的JSON示例:

```json
{
    "contributors": [
        {
            "contributions": 5,
            "login": "testforge2",
            "type": "User",
            "name": "testforge2",
            "image_url": "system/lets/letter_avatars/2/T/236_177_85/120.png"
        },
        {
            "contributions": 79,
            "login": "yystopf",
            "type": "User",
            "name": "yystopf",
            "image_url": "system/lets/letter_avatars/2/Y/241_125_89/120.png"
        }
    ],
    "total_count": 2
}
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

## 获取仓库单个webhook
获取仓库单个webhook

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/yystopf/ceshi/webhooks/3/edit.json
```

```javascript
await octokit.request('GET /api/yystopf/ceshi/webhooks/3/edit.json')
```

### HTTP 请求
`GET /api/:owner/:repo/webhooks/:id/edit.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|id               |是||integer|webhook ID|


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id                 |int   |id |
|url                |string|地址|
|content_type       |string|POST Content Type|
|http_method        |string|请求方式|
|secret|            |string|密钥|
|is_active          |bool  |是否激活|
|type               |string|类型|
|last_status        |string|最后一次推送的状态, waiting 等待,fail 失败,succeed 成功|
|branch_filter      |string|分支过滤|
|events             |string|触发条件|
|create_time        |string|创建时间|


参数| 含义|
--------- | ------- | ------- | 
|create|创建分支或标签|
|delete|分支或标签删除|
|fork|仓库被fork|
|push|git仓库推送|
|issue|易修已打开、已关闭、已重新打开或编辑|
|issue_assign|易修被指派|
|issue_label|易修标签被更新或删除|
|issue_milestone|易修被收入里程碑|
|issue_comment|易修评论|
|pull_request|合并请求|
|pull_request_assign|合并请求被指派|
|pull_request_label|合并请求被贴上标签|
|pull_request_milestone|合并请求被记录于里程碑中|
|pull_request_comment|合并请求被评论|
|pull_request_review_approved|合并请求被批准|
|pull_request_review_rejected|合并请求被拒绝|
|pull_request_review_comment|合并请求被提出审查意见|
|pull_request_sync|合并请求被同步|
|repository|创建或删除仓库|
|release|版本发布|


> 返回的JSON示例:

```json
{
    "id": 3,
    "http_method": "GET",
    "content_type": "form",
    "url": "http://localhost:3000",
    "secret": "123456",
    "last_status": "succeed",
    "is_active": true,
    "type": "gitea",
    "create_time": "2021-07-26 10:03:45",
    "branch_filter": "*",
    "events": [
        "create",
        "delete",
        "fork",
        "issues",
        "issue_assign",
        "issue_label",
        "issue_milestone",
        "issue_comment",
        "push",
        "pull_request",
        "pull_request_assign",
        "pull_request_label",
        "pull_request_milestone",
        "pull_request_comment",
        "pull_request_review",
        "pull_request_sync",
        "repository",
        "release"
    ]
}
```
<aside class="success">
  Success Data.
</aside>

## 添加仓库webhook
添加仓库webhook

> 示例:

```shell
curl -X POST \
http://localhost:3000/api/yystopf/ceshi/webhooks.json
```

```javascript
await octokit.request('POST /api/yystopf/ceshi/webhooks.json')
```

### HTTP 请求
`POST /api/:owner/:repo/webhooks.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner                |是| | string |用户登录名  |
|repo                 |是| | string |项目标识identifier  |
|webhook.url          |是| | string |目标url  |
|webhook.type         |否| | string |类型|
|webhook.http_method  |是| | string | http方法, POST和GET |
|webhook.content_type |是| | string | POST Content Type |
|webhook.secret       |否| | string |密钥文本|
|webhook.active       |是| | bool | 是否激活|
|webhook.branch_filter|否| |string|分支过滤|
|webhook.events       |否| |array|触发事件|

触发事件字段说明 

参数| 含义|
--------- | ------- | ------- | 
|create|创建分支或标签|
|delete|分支或标签删除|
|fork|仓库被fork|
|push|git仓库推送|
|issue|易修已打开、已关闭、已重新打开或编辑|
|issue_assign|易修被指派|
|issue_label|易修标签被更新或删除|
|issue_milestone|易修被收入里程碑|
|issue_comment|易修评论|
|pull_request|合并请求|
|pull_request_assign|合并请求被指派|
|pull_request_label|合并请求被贴上标签|
|pull_request_milestone|合并请求被记录于里程碑中|
|pull_request_comment|合并请求被评论|
|pull_request_review_approved|合并请求被批准|
|pull_request_review_rejected|合并请求被拒绝|
|pull_request_review_comment|合并请求被提出审查意见|
|pull_request_sync|合并请求被同步|
|repository|创建或删除仓库|
|release|版本发布|


> 请求的JSON示例:

```json
{
    "active": true, 
    "content_type": "json",
    "http_method": "GET",
    "secret": "123456",
    "url": "http://localhost:10000",
    "branch_filter": "*",
    "events": ["push"]
}
```

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id                 |int   |id |
|url                |string|地址|
|content_type       |string|POST Content Type|
|is_active          |bool  |是否激活|
|type               |string|类型|
|events             | array|触发事件 |
|create_time        |string|创建时间|


> 返回的JSON示例:

```json
{
    "id": 18,
    "type": "gitea",
    "content_type": "json",
    "url": "http://localhost:10000",
    "events": [
        "push"
    ],
    "active": true,
    "create_time": "2021-07-26 18:53:43"
}
```
<aside class="success">
  Success Data.
</aside>

## 更新仓库webhook
更新仓库webhook

> 示例:

```shell
curl -X PATCH \
http://localhost:3000/api/yystopf/ceshi/webhooks/7.json
```

```javascript
await octokit.request('PATCH /api/yystopf/ceshi/webhooks/7.json')
```

### HTTP 请求
`PATCH /api/:owner/:repo/webhooks/:id.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner                |是| | string |用户登录名  |
|repo                 |是| | string |项目标识identifier  |
|id                   |是| | string |webhook id  |
|webhook.url          |是| | string |目标url  |
|webhook.type         |否| | string |类型|
|webhook.http_method  |是| | string | http方法, POST和GET |
|webhook.content_type |是| | string | POST Content Type |
|webhook.secret       |否| | string |密钥文本|
|webhook.active       |是| | bool | 是否激活|
|webhook.branch_filter|否| |string|分支过滤|
|webhook.events       |否| |array|触发事件|

触发事件字段说明 

参数| 含义|
--------- | ------- | ------- | 
|create|创建分支或标签|
|delete|分支或标签删除|
|fork|仓库被fork|
|push|git仓库推送|
|issue|易修已打开、已关闭、已重新打开或编辑|
|issue_assign|易修被指派|
|issue_label|易修标签被更新或删除|
|issue_milestone|易修被收入里程碑|
|issue_comment|易修评论|
|pull_request|合并请求|
|pull_request_assign|合并请求被指派|
|pull_request_label|合并请求被贴上标签|
|pull_request_milestone|合并请求被记录于里程碑中|
|pull_request_comment|合并请求被评论|
|pull_request_review_approved|合并请求被批准|
|pull_request_review_rejected|合并请求被拒绝|
|pull_request_review_comment|合并请求被提出审查意见|
|pull_request_sync|合并请求被同步|
|repository|创建或删除仓库|
|release|版本发布|


> 请求的JSON示例:

```json
{
    "active": true, 
    "content_type": "json",
    "http_method": "GET",
    "secret": "123456",
    "url": "http://localhost:10000",
    "branch_filter": "*",
    "events": ["push"]
}
```

### 返回字段说明:

> 返回的JSON示例:

```json
{
    "status": 0,
    "message": "success"
}
```
<aside class="success">
  Success Data.
</aside>


## 删除仓库webhook
删除仓库webhook

> 示例:

```shell
curl -X DELETE \
http://localhost:3000/api/yystopf/ceshi/webhooks/7.json
```

```javascript
await octokit.request('DELETE /api/yystopf/ceshi/webhooks/7.json')
```

### HTTP 请求
`DELETE /api/:owner/:repo/webhooks/:id.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner                |是| | string |用户登录名  |
|repo                 |是| | string |项目标识identifier  |
|id                   |是| | string |webhook id  |

### 返回字段说明:

> 返回的JSON示例:

```json
{
    "status": 0,
    "message": "success"
}
```
<aside class="success">
  Success Data.
</aside>

## 获取仓库webhook的历史推送列表
获取仓库webhook的历史推送列表

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/yystopf/ceshi/webhooks/3/tasks.json
```

```javascript
await octokit.request('GET /api/yystopf/ceshi/webhooks/3/tasks.json')
```

### HTTP 请求
`GET /api/:owner/:repo/webhooks/:id/tasks.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|id             |是| |integer |webhook ID|  

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|id                 |int   |id |
|uuid               |string|推送uuid|
|type               |string|类型|
|is_succeed         |bool|是否推送成功|
|is_delivered       |bool|是否完成推送|
|payload_content    |json|请求主体内容|
|request_content    |json|请求内容，头部等等|
|reponse_content    |json|响应内容，状态，头部，主体等等|
|delivered_time        |string|推送时间|


> 返回的JSON示例:

```json
{
  "total_count": 6,
  "tasks": [
    {
      "id": 20,
      "type": "gitea",
      "uuid": "99aa2c23-6884-4c44-9020-5469320aa408",
      "is_succeed": true,
      "is_delivered": true,
      "payload_content": {
          "secret": "123456",
          "ref": "refs/heads/master",
          "before": "feb48e31362787a7620b53d4df3c4effddbb6f0b",
          "after": "feb48e31362787a7620b53d4df3c4effddbb6f0b",
          "compare_url": "",
          "commits": [
              {
                  "id": "feb48e31362787a7620b53d4df3c4effddbb6f0b",
                  "message": "fix\n",
                  "url": "http://localhost:10081/yystopf/ceshi/commit/feb48e31362787a7620b53d4df3c4effddbb6f0b",
                  "author": {
                      "name": "viletyy",
                      "email": "yystopf@163.com",
                      "username": "root"
                  },
                  "committer": {
                      "name": "viletyy",
                      "email": "yystopf@163.com",
                      "username": "root"
                  },
                  "verification": {
                      "verified": false,
                      "reason": "gpg.error.not_signed_commit",
                      "signature": "",
                      "signer": null,
                      "payload": ""
                  },
                  "timestamp": "2021-07-26T13:52:13+08:00",
                  "added": null,
                  "removed": null,
                  "modified": null
              }
          ],
          "head_commit": null,
          "repository": {
              "id": 2,
              "owner": {
                  "id": 3,
                  "login": "yystopf",
                  "full_name": "",
                  "email": "yystopf@forge.com",
                  "avatar_url": "http://localhost:10081/user/avatar/yystopf/-1",
                  "language": "zh-CN",
                  "is_admin": true,
                  "last_login": "2021-07-21T18:38:21+08:00",
                  "created": "2021-06-03T14:50:25+08:00",
                  "username": "yystopf"
              },
              "name": "ceshi",
              "full_name": "yystopf/ceshi",
              "description": "",
              "empty": false,
              "private": false,
              "fork": false,
              "template": false,
              "parent": null,
              "mirror": false,
              "size": 3846,
              "html_url": "http://localhost:10081/yystopf/ceshi",
              "ssh_url": "virus@localhost:10081:yystopf/ceshi.git",
              "clone_url": "http://localhost:10081/yystopf/ceshi.git",
              "original_url": "",
              "website": "",
              "stars_count": 0,
              "forks_count": 1,
              "watchers_count": 1,
              "open_issues_count": 0,
              "open_pr_counter": 0,
              "release_counter": 0,
              "default_branch": "master",
              "archived": false,
              "created_at": "2021-06-03T15:15:30+08:00",
              "updated_at": "2021-07-26T13:52:16+08:00",
              "permissions": {
                  "admin": false,
                  "push": false,
                  "pull": false
              },
              "has_issues": true,
              "internal_tracker": {
                  "enable_time_tracker": true,
                  "allow_only_contributors_to_track_time": true,
                  "enable_issue_dependencies": true
              },
              "has_wiki": true,
              "has_pull_requests": true,
              "ignore_whitespace_conflicts": false,
              "allow_merge_commits": true,
              "allow_rebase": true,
              "allow_rebase_explicit": true,
              "allow_squash_merge": true,
              "avatar_url": "",
              "internal": false
          },
          "pusher": {
              "id": 0,
              "login": "yystopf",
              "full_name": "",
              "email": "yystopf@forge.com",
              "avatar_url": "http://localhost:10081/user/avatar/yystopf/-1",
              "language": "",
              "is_admin": false,
              "last_login": "0001-01-01T00:00:00Z",
              "created": "2021-06-03T14:50:25+08:00",
              "username": "yystopf"
          },
          "sender": {
              "id": 0,
              "login": "yystopf",
              "full_name": "",
              "email": "yystopf@forge.com",
              "avatar_url": "http://localhost:10081/user/avatar/yystopf/-1",
              "language": "",
              "is_admin": false,
              "last_login": "0001-01-01T00:00:00Z",
              "created": "2021-06-03T14:50:25+08:00",
              "username": "yystopf"
          }
      },
      "request_content": {
          "headers": {
              "X-GitHub-Delivery": "99aa2c23-6884-4c44-9020-5469320aa408",
              "X-GitHub-Event": "push",
              "X-Gitea-Delivery": "99aa2c23-6884-4c44-9020-5469320aa408",
              "X-Gitea-Event": "push",
              "X-Gitea-Signature": "34a01edcd952ff6410ff6ebc946471161bde74aff86171f21621d2c2c4130f66",
              "X-Gogs-Delivery": "99aa2c23-6884-4c44-9020-5469320aa408",
              "X-Gogs-Event": "push",
              "X-Gogs-Signature": "34a01edcd952ff6410ff6ebc946471161bde74aff86171f21621d2c2c4130f66"
          }
      },
      "response_content": {
          "status": 200,
          "headers": {
              "Cache-Control": "no-store, must-revalidate, private, max-age=0",
              "Content-Length": "2556",
              "Content-Type": "text/html; charset=utf-8",
              "Referrer-Policy": "strict-origin-when-cross-origin",
              "Set-Cookie": "__profilin=p%3Dt; path=/; HttpOnly",
              "Vary": "Origin",
              "X-Content-Type-Options": "nosniff",
              "X-Download-Options": "noopen",
              "X-Frame-Options": "SAMEORIGIN",
              "X-Miniprofiler-Ids": "9ynvpncz5xm0rpgorb5y,hgggd9mv6lr4a9drcrlr,j7zqlx2vy5aji2vtgoba,f1ktsmh3jxvq0z2hf612,mih3dvgvlqhi3zy8lf2x,5k1qbkvbnru8mye9cest,tj6ern8w6awqf2zsimbr,9isaehvubivd52wo5p9v,1rzfhtq1nhuwbgy9p76g,z0xzidzyywna0y7a69m0,hzoklky92ycjqt42gi0s,y0ai7y0t28mcn8x0py2x,322il7nadinp51mw2r5m,m6dukftfsh6tjcxzp1gq,667wlqbytfwbrirnmma1,jcehj3dl8lkw8gk510cr",
              "X-Miniprofiler-Original-Cache-Control": "max-age=0, private, must-revalidate",
              "X-Permitted-Cross-Domain-Policies": "none",
              "X-Request-Id": "08bff080-bbb5-4183-b845-81de3d47120a",
              "X-Runtime": "0.394766",
              "X-Xss-Protection": "1; mode=block"
          },
          "body": "<!doctype html><html lang=\"zh-CN\" class=\"notranslate translated-ltr\" translate=\"no\"><head><meta charset=\"utf-8\"><meta name=\"”Keywords”\" content=\"”trustie,trustieforge,forge,确实让创建更美好,协同开发平台″\"><meta name=\"”Keywords”\" content=\"”TrustieOpenSourceProject″\"><meta name=\"”Keywords”\" content=\"”issue,bug,tracker,软件工程,课程实践″\"><meta name=\"”Description”\" content=\"”持续构建协同、共享、可信的软件创建生态开源创作与软件生产相结合，支持大规模群体开展软件协同创新活动”\"><meta name=\"theme-color\" content=\"#000000\"><link rel=\"manifest\" href=\"/react/build//manifest.json\"><link rel=\"stylesheet\" href=\"/react/build/css/iconfont.css\"><link rel=\"stylesheet\" href=\"/react/build/css/edu-purge.css\"><link rel=\"stylesheet\" href=\"/react/build/css/editormd.min.css\"><link rel=\"stylesheet\" href=\"/react/build/css/merge.css\"><link href=\"/react/build/static/css/main.07f7e90c.chunk.css\" rel=\"stylesheet\"></head><body><div id=\"md_div\" style=\"display:none\"></div><div id=\"root\" class=\"page -layout-v -fit widthunit\"></div><div id=\"picture_display\" style=\"display:none\"></div><script src=\"/react/build/js/jquery-1.8.3.min.js\"></script><script src=\"/react/build/js/js_min_all.js\"></script><script src=\"/react/build/js/codemirror/codemirror.js\"></script><script src=\"/react/build/js/editormd/editormd.min.js\"></script><script src=\"/react/build/js/codemirror/merge/merge.js\"></script><script src=\"/react/build/./static/js/runtime~main.3d644966.js\"></script><script src=\"/react/build/./static/js/main.e46872e3.chunk.js\"></script><script async type=\"text/javascript\" id=\"mini-profiler\" src=\"/mini-profiler-resources/includes.js?v=67dd1c2571ced7fc74ae7f1813e47bdf\" data-version=\"67dd1c2571ced7fc74ae7f1813e47bdf\" data-path=\"/mini-profiler-resources/\" data-current-id=\"9ynvpncz5xm0rpgorb5y\" data-ids=\"9ynvpncz5xm0rpgorb5y,hgggd9mv6lr4a9drcrlr,j7zqlx2vy5aji2vtgoba,f1ktsmh3jxvq0z2hf612,mih3dvgvlqhi3zy8lf2x,5k1qbkvbnru8mye9cest,tj6ern8w6awqf2zsimbr,9isaehvubivd52wo5p9v,1rzfhtq1nhuwbgy9p76g,z0xzidzyywna0y7a69m0,hzoklky92ycjqt42gi0s,y0ai7y0t28mcn8x0py2x,322il7nadinp51mw2r5m,m6dukftfsh6tjcxzp1gq,667wlqbytfwbrirnmma1,jcehj3dl8lkw8gk510cr\" data-horizontal-position=\"left\" data-vertical-position=\"top\" data-trivial=\"false\" data-children=\"false\" data-max-traces=\"20\" data-controls=\"false\" data-total-sql-count=\"false\" data-authorized=\"true\" data-toggle-shortcut=\"alt+p\" data-start-hidden=\"false\" data-collapse-results=\"true\" data-html-container=\"body\"></script>\n</body></html>"
      },
      "delivered_time": "2021-07-28 11:47:29"
    }
  ]
}
```
<aside class="success">
  Success Data.
</aside>

## 仓库webhook测试推送
仓库webhook测试推送

> 示例:

```shell
curl -X POST \
http://localhost:3000/api/yystopf/ceshi/webhooks/3/test.json
```

```javascript
await octokit.request('POST /api/yystopf/ceshi/webhooks/3/test.json')
```

### HTTP 请求
`POST /api/:owner/:repo/webhooks/:id/test.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner                |是| | string |用户登录名  |
|repo                 |是| | string |项目标识identifier  |
|id                   |是| | integer|webhook ID|




### 返回字段说明:


> 返回的JSON示例:

```json
{
    "status": 0,
    "message": "success"
}
```
<aside class="success">
  Success Data.
</aside>