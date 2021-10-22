# Pulls


## Get a pull request
获取合并请求详情接口

> 示例:

```shell
curl -X GET http://localhost:3000/api/Jasder/gitlink/pulls/88.json
```

```javascript
await octokit.request('GET /api/Jasder/gitlink/pulls/88.json')
```

### HTTP 请求
`GET /api/:owner/:repo/pulls/:id.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |
|id             |是|  | integer | pull id值 |




> 返回的JSON示例:

```json
{
    "status": 0,
    "message": "响应成功",
    "project_name": "Gitlink",
    "identifier": "forgeplus",
    "project_identifier": "forgeplus",
    "pr_time": "52分钟前",
    "commits_count": 229,
    "files_count": 328,
    "comments_count": 0,
    "comments_total_count": 0,
    "pull_request": {
        "id": 1189,
        "base": "master",
        "head": "develop",
        "status": 0,
        "fork_project_id": null,
        "is_original": false,
        "pull_request_staus": "open",
        "fork_project_user": null,
        "create_user": "jasder",
        "mergeable": true,
        "state": "open"
    },
    "issue": {
        "id": 51888,
        "subject": "FIx release v3.2.0",
        "description": null,
        "is_private": false,
        "branch_name": null,
        "project_author_name": "Gitlink",
        "closed_on": "",
        "created_at": "2021-10-12 15:51",
        "assign_user_name": "victor",
        "assign_user_login": "moshenglv",
        "author_name": "段甲生",
        "author_login": "jasder",
        "author_picture": "images/avatars/User/36480?t=1615520120",
        "issue_status": "新增",
        "priority": "正常",
        "version": null,
        "issue_tags": null
    },
    "conflict_files": []
}
```

## 获取pull request文件列表
获取pull request文件列表

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/Jason/gitlink/pulls/1/files.json 
```

```javascript
await octokit.request('GET /api/jasder/gitlink/pulls/1/files.json')
```

### HTTP 请求
`GET /api/:owner/:repo/pulls/:id/files.json`

### 请求参数:
|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo           |是|string |project's identifier |
|id             |是|int |pull request's id  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
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



> 返回的JSON示例:

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


## 获取pull request的commits列表
获取pull request的commits列表

> 示例:

```shell
curl -X GET http://localhost:3000/api/jasder/jasder_test/pulls/1/commits.json
```

```javascript
await octokit.request('GET /api/jasder/jasder_test/pulls/1/commits.json')
```

### HTTP 请求
`GET /api/:owner/:repo/pulls/:id/commits.json`

### 请求参数:
|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo           |是|string |project's identifier |
|id             |是|int |pull request's id  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
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


> 返回的JSON示例:

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

## Compare two commits
Compare two commits

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/Jason/test-txt/compare/master...develop

curl -X GET \
http://localhost:3000/api/Jason/test-txt/compare/master...Jason/test-txt:develop
```

```javascript
await octokit.request('GET /api/Jason/test-txt/compare/master...Jason/test-txt:develop')
```

### HTTP 请求
`GET /api/:owner/:repo/compare/{base}...{head}.json`

### 请求参数:
|参数名|必选|类型|说明|
|-|-|-|-|
|owner          |是|string |用户登录名  |
|repo           |是|string |project's identifier |
|base             |是|string |pull request's id  |
|head             |是|string |pull request's id  |


### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
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

> 返回的JSON示例:

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
```


##  List pull requests
获取合并请求列表

> 示例:

```shell
curl -X GET http://localhost:3000/api/Jasder/gitlink/pulls.json
```

```javascript
await octokit.request('GET /api/Jasder/gitlink/pulls.json')
```

### HTTP 请求
`GET /api/:owner/:repo/pulls.json`

### 请求参数:
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
|owner             |是| |string |用户登录名  |
|repo             |是| |string |项目标识identifier  |




> 返回的JSON示例:

```json
{
  "status": 0,
  "message": "响应成功",
  "open_count": 4,
  "close_count": 51,
  "merged_issues_size": 123,
  "search_count": 4,
  "limit": null,
  "user_admin_or_member": true,
  "user_admin_or_developer": true,
  "project_name": "Gitlink",
  "project_author_name": "Gitlink",
  "issues": [
    {
      "pull_request_id": 1189,
      "pull_request_status": 0,
      "pull_request_head": "develop",
      "pull_request_base": "master",
      "pull_request_staus": "open",
      "is_original": false,
      "fork_project_id": null,
      "fork_project_identifier": null,
      "fork_project_user": null,
      "id": 51888,
      "name": "FIx release v3.2.0",
      "pr_time": "59分钟前",
      "assign_user_name": "victor",
      "assign_user_login": "moshenglv",
      "author_name": "段甲生",
      "author_login": "jasder",
      "avatar_url": "images/avatars/User/36480?t=1615520120",
      "priority": "正常",
      "version": null,
      "journals_count": 0,
      "issue_tags": null
    }
  ]
}
```