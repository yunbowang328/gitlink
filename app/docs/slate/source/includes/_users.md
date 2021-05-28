<!--
 * @Date: 2021-03-01 10:35:21
 * @LastEditors: viletyy
 * @LastEditTime: 2021-05-28 16:04:04
 * @FilePath: /forgeplus/app/docs/slate/source/includes/_users.md
-->
# Users

## 获取当前登陆用户信息
获取当前登陆用户信息

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/me.json
```

```javascript
await octokit.request('GET /api/users/me.json')
```

### HTTP 请求
`GET api/users/me.json`

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|user_id       |int   |用户id |
|username      |string|用户名称|
|admin         |boolean|是否为管理用户|
|login         |string|登录名|
|image_url     |string|用户头像|


> 返回的JSON示例:

```json
{
  "username": "username",
  "login": "login",
  "user_id": 100000,
  "image_url": "avatars/User/b",
  "admin": false
}
```
<aside class="success">
  Success Data.
</aside>

## 获取用户星标项目
获取用户星标项目

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/is_pinned_projects.json
```

```javascript
await octokit.request('GET /api/users/:login/is_pinned_projects.json')
```

### HTTP 请求
`GET api/users/:login/is_pinned_projects.json`

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|total_count       |int   |星标项目数量 |
|identifier                       |string   |项目标识   |
|name                             |string   |项目名称   |
|description                      |string   |项目描述   |
|visits                           |int      |项目访问数量|
|praises_count                    |int      |项目点赞数量|
|watchers_count                   |int      |项目关注数量|
|issues_count                     |int      |项目issue数量|
|pull_requests_count              |int      |项目合并请求数量|
|forked_count                     |int      |项目复刻数量|
|is_public                        |bool     |项目是否公开|
|mirror_url                       |string   |镜像地址|
|type                             |int      |项目类型 0 普通项目 1 普通镜像项目 2 同步镜像项目|
|time_ago                         |string   |上次更新时间|
|open_devops                      |int      |是否开启devops|
|forked_from_project_id           |int      |fork项目id|
|platform                         |string   |项目平台|
|author.name                      |string   |项目拥有者名称|
|author.type                      |string   |项目拥有者类型|
|author.login                     |string   |项目拥有者用户名|
|author.image_url                 |string   |项目拥有者头像|
|category.name                    |string   |项目分类名称|
|language.name                    |string   |项目语言名称|


> 返回的JSON示例:

```json
{
    "total_count": 1,
    "projects": [
        {
            "id": 89,
            "repo_id": 89,
            "identifier": "monkey",
            "name": "boke",
            "description": "dkkd",
            "visits": 4,
            "praises_count": 0,
            "watchers_count": 0,
            "issues_count": 0,
            "pull_requests_count": 0,
            "forked_count": 0,
            "is_public": true,
            "mirror_url": "https://github.com/viletyy/monkey.git",
            "type": 1,
            "last_update_time": 1619685144,
            "time_ago": "27天前",
            "forked_from_project_id": null,
            "open_devops": false,
            "platform": "forge",
            "author": {
                "name": "测试组织",
                "type": "Organization",
                "login": "ceshi_org",
                "image_url": "images/avatars/Organization/9?t=1612706073"
            },
            "category": {
                "id": 3,
                "name": "深度学习"
            },
            "language": {
                "id": 2,
                "name": "C"
            }
        }
    ]
}
```
<aside class="success">
  Success Data.
</aside>

## 用户添加星标项目
用户添加星标项目

> 示例:

```shell
curl -X POST http://localhost:3000/api/users/yystopf/is_pinned_projects/pin.json
```

```javascript
await octokit.request('GET /api/users/:login/is_pinned_projects/pin.json')
```

### HTTP 请求
`POST /api/users/:login/is_pinned_projects/pin.json`

### 请求字段说明:
#### 同时设定多个星标项目
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|is_pinned_project_ids       |array   |设定为星标项目的id |

#### 只设定一个星标项目
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|is_pinned_project_id       |integer   |设定为星标项目的id |

> 返回的JSON示例:

```json
{
    "status": 0,
    "message": "success"
}
```


## 用户近期活动统计
用户近期活动统计, 默认显示近一周的数据

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/statistics/activity.json
```

```javascript
await octokit.request('GET /api/users/:login/statistics/activity.json')
```

### HTTP 请求
`GET /api/users/:login/statistics/activity.json`

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|dates                  |array   |时间 |
|issues_count           |array   |易修数量|
|pull_requests_count    |array   |合并请求数量|
|commtis_count          |array   |贡献数量|


> 返回的JSON示例:

```json
{
    "dates": [
        "2021.05.21",
        "2021.05.22",
        "2021.05.23",
        "2021.05.24",
        "2021.05.25",
        "2021.05.26",
        "2021.05.27",
        "2021.05.28"
    ],
    "issues_count": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    "pull_requests_count": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    "commits_count": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
}
```
<aside class="success">
  Success Data.
</aside>


## 获取用户贡献度
获取用户贡献度

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/headmaps.json
```

```javascript
await octokit.request('GET /api/users/:login/headmaps.json')
```

### HTTP 请求
`GET api/users/:login/headmaps.json`


### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|year       |string   |年份 |

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|total_contributions       |int   |所选时间内的总贡献度 |
|headmaps.date      |string|时间|
|headmaps.contributions         |int|贡献度|


> 返回的JSON示例:

```json
{
    "total_contributions": 139,
    "headmaps": [
        {
            "date": "2021-02-07",
            "contributions": 1
        },
        {
            "date": "2021-02-21",
            "contributions": 13
        },
        {
            "date": "2021-02-25",
            "contributions": 5
        },
        {
            "date": "2021-03-01",
            "contributions": 2
        },
        {
            "date": "2021-03-04",
            "contributions": 1
        },
        {
            "date": "2021-03-15",
            "contributions": 9
        },
        {
            "date": "2021-03-22",
            "contributions": 14
        },
        {
            "date": "2021-03-24",
            "contributions": 1
        },
        {
            "date": "2021-03-30",
            "contributions": 11
        },
        {
            "date": "2021-04-06",
            "contributions": 1
        },
        {
            "date": "2021-04-12",
            "contributions": 1
        },
        {
            "date": "2021-04-13",
            "contributions": 2
        },
        {
            "date": "2021-04-19",
            "contributions": 3
        },
        {
            "date": "2021-04-23",
            "contributions": 37
        },
        {
            "date": "2021-04-25",
            "contributions": 2
        },
        {
            "date": "2021-04-26",
            "contributions": 6
        },
        {
            "date": "2021-04-28",
            "contributions": 1
        },
        {
            "date": "2021-04-29",
            "contributions": 18
        },
        {
            "date": "2021-04-30",
            "contributions": 9
        },
        {
            "date": "2021-05-04",
            "contributions": 1
        },
        {
            "date": "2021-05-06",
            "contributions": 1
        }
    ]
}
```
<aside class="success">
  Success Data.
</aside>

## 获取用户动态
获取用户动态

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/project_trends.json
```

```javascript
await octokit.request('GET /api/users/:login/project_trends.json')
```

### HTTP 请求
`GET api/users/:login/project_trends.json`


### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|date       |string   |日期，格式: 2021-05-28 |

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|total_count                    |int   |所选时间内的总动态数 |
|project_trends.trend_type      |string|动态类型，Issue：易修，VersionRelease：版本发布，PullRequest：合并请求|
|project_trends.action_type     |string|操作类型|
|project_trends.trend_id        |integer|动态id|
|project_trends.user_name       |string|用户名称|
|project_trends.user_login      |string|用户用户名|
|project_trends.user_avatar     |string|用户头像|
|project_trends.action_time     |string|操作时间|
|project_trends.name            |string|动态标题|

> 返回的JSON示例:

```json
{
    "total_count": 16,
    "project_trends": [
        {
            "id": 27,
            "trend_type": "Issue",
            "action_type": "创建了工单",
            "trend_id": 18,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "21天前",
            "name": "31213123123",
            "issue_type": "1",
            "status_id": 2,
            "priority_id": 4,
            "created_at": "2021-05-07 15:39",
            "updated_at": "2021-05-27 15:42",
            "assign_user_name": "yystopf",
            "assign_user_login": "yystopf",
            "issue_journal_size": 1,
            "issue_journals": []
        },
        {
            "id": 8,
            "trend_type": "VersionRelease",
            "action_type": "创建了版本发布",
            "trend_id": 8,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "24天前",
            "name": "heihei1",
            "tag_name": "v1.0",
            "target_commitish": "master",
            "tarball_url": "http://localhost:10080/forgeceshiorg1/ceshi1/archive/v1.0.tar.gz",
            "zipball_url": "http://localhost:10080/forgeceshiorg1/ceshi1/archive/v1.0.zip",
            "url": "http://localhost:10080/api/v1/repos/forgeceshiorg1/ceshi1/releases/84",
            "version_gid": "84",
            "created_at": "2021-05-04 12:04"
        },
        {
            "id": 25,
            "trend_type": "PullRequest",
            "action_type": "关闭了合并请求",
            "trend_id": 14,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "28天前",
            "name": "13",
            "created_at": "2021-04-30 15:39"
        },
        {
            "id": 24,
            "trend_type": "PullRequest",
            "action_type": "创建了合并请求",
            "trend_id": 13,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "28天前",
            "name": "211212",
            "created_at": "2021-04-30 15:37"
        },
        {
            "id": 23,
            "trend_type": "PullRequest",
            "action_type": "创建了合并请求",
            "trend_id": 12,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "28天前",
            "name": "奇偶哦iu",
            "created_at": "2021-04-30 10:19"
        },
        {
            "id": 22,
            "trend_type": "PullRequest",
            "action_type": "创建了合并请求",
            "trend_id": 11,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "28天前",
            "name": "2112123",
            "created_at": "2021-04-29 18:46"
        },
        {
            "id": 21,
            "trend_type": "PullRequest",
            "action_type": "关闭了合并请求",
            "trend_id": 10,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "28天前",
            "name": "23123",
            "created_at": "2021-04-29 18:45"
        },
        {
            "id": 20,
            "trend_type": "PullRequest",
            "action_type": "创建了合并请求",
            "trend_id": 9,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "28天前",
            "name": "33",
            "created_at": "2021-04-29 18:37"
        },
        {
            "id": 19,
            "trend_type": "PullRequest",
            "action_type": "关闭了合并请求",
            "trend_id": 8,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "28天前",
            "name": "gggg",
            "created_at": "2021-04-29 17:51"
        },
        {
            "id": 16,
            "trend_type": "Issue",
            "action_type": "创建了工单",
            "trend_id": 8,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "1个月前",
            "name": "hjhkj",
            "issue_type": "1",
            "status_id": 1,
            "priority_id": 2,
            "created_at": "2021-04-19 10:52",
            "updated_at": "2021-04-19 10:52",
            "assign_user_name": null,
            "assign_user_login": null,
            "issue_journal_size": 0,
            "issue_journals": []
        },
        {
            "id": 7,
            "trend_type": "VersionRelease",
            "action_type": "创建了版本发布",
            "trend_id": 7,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "1个月前",
            "name": "v3.0.1",
            "tag_name": "v3.0.1",
            "target_commitish": "master",
            "tarball_url": "http://localhost:10080/yystopf/ceshirepo1/archive/v3.0.1.tar.gz",
            "zipball_url": "http://localhost:10080/yystopf/ceshirepo1/archive/v3.0.1.zip",
            "url": "http://localhost:10080/api/v1/repos/yystopf/ceshirepo1/releases/78",
            "version_gid": "78",
            "created_at": "2021-03-30 15:51"
        },
        {
            "id": 6,
            "trend_type": "VersionRelease",
            "action_type": "创建了版本发布",
            "trend_id": 6,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "1个月前",
            "name": "v3.0.0",
            "tag_name": "v3.0.0",
            "target_commitish": "master",
            "tarball_url": "http://localhost:10080/yystopf/ceshirepo1/archive/v3.0.0.tar.gz",
            "zipball_url": "http://localhost:10080/yystopf/ceshirepo1/archive/v3.0.0.zip",
            "url": "http://localhost:10080/api/v1/repos/yystopf/ceshirepo1/releases/77",
            "version_gid": "77",
            "created_at": "2021-03-30 15:33"
        },
        {
            "id": 5,
            "trend_type": "VersionRelease",
            "action_type": "创建了版本发布",
            "trend_id": 5,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "1个月前",
            "name": "v1.0.0",
            "tag_name": "v1.0.0",
            "target_commitish": "master",
            "tarball_url": "http://localhost:10080/yystopf/ceshirepo1/archive/v1.0.0.tar.gz",
            "zipball_url": "http://localhost:10080/yystopf/ceshirepo1/archive/v1.0.0.zip",
            "url": "http://localhost:10080/api/v1/repos/yystopf/ceshirepo1/releases/76",
            "version_gid": "76",
            "created_at": "2021-03-30 15:27"
        },
        {
            "id": 2,
            "trend_type": "VersionRelease",
            "action_type": "创建了版本发布",
            "trend_id": 2,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "2个月前",
            "name": "vvvv",
            "tag_name": "v1.1",
            "target_commitish": "dev",
            "tarball_url": "http://localhost:10080/yystopf/virus_blog/archive/v1.1.tar.gz",
            "zipball_url": "http://localhost:10080/yystopf/virus_blog/archive/v1.1.zip",
            "url": "http://localhost:10080/api/v1/repos/yystopf/virus_blog/releases/6",
            "version_gid": "6",
            "created_at": "2021-03-15 14:18"
        },
        {
            "id": 2,
            "trend_type": "PullRequest",
            "action_type": "创建了合并请求",
            "trend_id": 2,
            "user_name": "yystopf",
            "user_login": "yystopf",
            "user_avatar": "system/lets/letter_avatars/2/Y/241_125_89/120.png",
            "action_time": "3个月前",
            "name": "444",
            "created_at": "2021-02-25 17:31"
        }
    ]
}
```
<aside class="success">
  Success Data.
</aside>

## 用户开发能力
用户开发能力， 默认为所有时间下的开发能力

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/statistics/develop.json
```

```javascript
await octokit.request('GET /api/users/:login/statistics/develop.json')
```

### HTTP 请求
`GET /api/users/:login/statistics/develop.json`


### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|start_time       |integer   |时间戳，开始时间，格式：1621526400|
|end_time         |integer   |时间戳，结束时间，格式：1622131200|

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|influence              |int   |影响力 |
|contribution           |int   |贡献度|
|activity               |int   |活跃度|
|experience             |int   |项目经验|
|language               |int   |语言能力|
|languages_percent      |float |语言百分比|
|each_language_score    |int   |各门语言分数|


> 返回的JSON示例:

```json
{
    "platform": {
        "influence": 61,
        "contribution": 75,
        "activity": 66,
        "experience": 95,
        "language": 87,
        "languages_percent": {
            "CSS": 0.03,
            "C#": 0.13,
            "Ruby": 0.04,
            "Go": 0.05,
            "C": 0.19,
            "Java": 0.34,
            "Python": 0.09,
            "C+": 0.01,
            "C++": 0.11,
            "Scala": 0.01,
            "HTML": 0.01
        },
        "each_language_score": {
            "CSS": 71,
            "C#": 86,
            "Ruby": 75,
            "Go": 77,
            "C": 90,
            "Java": 93,
            "Python": 83,
            "C+": 66,
            "C++": 85,
            "Scala": 66,
            "HTML": 66
        }
    },
    "user": {
        "influence": 60,
        "contribution": 72,
        "activity": 65,
        "experience": 88,
        "language": 84,
        "languages_percent": {
            "C": 0.25,
            "C#": 0.33,
            "C++": 0.13,
            "CSS": 0.08,
            "Go": 0.04,
            "HTML": 0.04,
            "Java": 0.04,
            "Ruby": 0.08
        },
        "each_language_score": {
            "C": 81,
            "C#": 84,
            "C++": 75,
            "CSS": 71,
            "Go": 66,
            "HTML": 66,
            "Java": 66,
            "Ruby": 71
        }
    }
}
```
<aside class="success">
  Success Data.
</aside>

## 用户角色定位
用户角色定位，默认显示所有时间下的角色定位数据

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/statistics/role.json
```

```javascript
await octokit.request('GET /api/users/:login/statistics/role.json')
```

### HTTP 请求
`GET /api/users/:login/statistics/role.json`


### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|start_time       |integer   |时间戳，开始时间，格式：1621526400|
|end_time         |integer   |时间戳，结束时间，格式：1622131200|

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|total_projects_count              |int   |用户所有的项目数量 |
|role.object.count                 |int   |用户该语言下的项目数量|
|role.object.percent               |float |用户该语言下的项目占比|

> 返回的JSON示例:

```json
{
    "total_projects_count": 27,
    "role": {
        "owner": {
            "count": 24,
            "percent": 0.89
        },
        "manager": {
            "count": 1,
            "percent": 0.04
        },
        "developer": {
            "count": 2,
            "percent": 0.07
        },
        "reporter": {
            "count": 0,
            "percent": 0.0
        }
    }
}
```
<aside class="success">
  Success Data.
</aside>

## 用户专业定位
用户专业定位，默认显示所有时间下的专业定位数据

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/statistics/major.json
```

```javascript
await octokit.request('GET /api/users/:login/statistics/major.json')
```

### HTTP 请求
`GET /api/users/:login/statistics/major.json`


### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|start_time       |integer   |时间戳，开始时间，格式：1621526400|
|end_time         |integer   |时间戳，结束时间，格式：1622131200|

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|categories              |int   |用户项目分类 |

> 返回的JSON示例:

```json
{
    "categories": [
        "大数据",
        "机器学习",
        "深度学习",
        "人工智能",
        "智慧医疗",
        "云计算"
    ]
}
```
<aside class="success">
  Success Data.
</aside>

## 待办事项-用户通知信息
待办事项-用户通知信息

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/applied_messages.json
```

```javascript
await octokit.request('GET /api/users/:login/applied_messages.json')
```

### HTTP 请求
`GET /api/users/:login/applied_messages.json`

### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|login       |string   |用户标识 |

### 返回字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|applied       |object   |通知主体 |
|applied.id             |int      |通知主体的迁移id |
|applied.status         |string   |通知主体的迁移状态，canceled:取消,common:正在迁移, accept:已接受,refuse:已拒绝|
|applied.time_ago       |string   |通知主体的迁移创建的时间 |
|applied.project.id     |int      |通知主体的迁移项目的id |
|applied.project.identifier     |string      |通知主体的迁移项目的标识 |
|applied.project.name     |string      |通知主体的迁移项目的名称 |
|applied.project.description     |string      |通知主体的迁移项目的描述 |
|applied.project.is_public     |bool      |通知主体的迁移项目是否公开 |
|applied.project.owner.id     |bool      |通知主体的迁移项目拥有者id |
|applied.project.owner.type     |string      |通知主体的迁移项目拥有者类型 |
|applied.project.owner.name     |string      |通知主体的迁移项目拥有者昵称 |
|applied.project.owner.login     |string      |通知主体的迁移项目拥有者标识 |
|applied.project.owner.image_url     |string      |通知主体的迁移项目拥有者头像 |
|applied.user.id     |int      |通知主体的迁移创建者的id |
|applied.user.type     |string      |通知主体的迁移创建者的类型 |
|applied.user.name     |string      |通知主体的迁移创建者的名称 |
|applied.user.login     |string      |通知主体的迁移创建者的标识 |
|applied.user.image_url     |string      |通知主体的迁移创建者头像 |
|applied.owner.id     |int      |通知主体的迁移接受者的id |
|applied.owner.type     |string      |通知主体的迁移接受者的类型 |
|applied.owner.name     |string      |通知主体的迁移接受者的名称 |
|applied.owner.login     |string      |通知主体的迁移接受者的标识 |
|applied.owner.image_url     |string      |通知主体的迁移接受者头像 |
|applied_type       |string   |通知类型 |
|name       |string   | 通知内容 |
|viewed         |string|是否已读，waiting:未读,viewed:已读|
|status         |string|通知状态, canceled:已取消,common: 正常,successed:成功,failure:失败|
|time_ago     |string|通知时间|


> 返回的JSON示例:

```json
{
    "total_count": 5,
    "applied_messages": [
        {
            "applied": {
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
                "time_ago": "35分钟前"
            },
            "applied_user": {
                "id": 6,
                "type": "User",
                "name": "yystopf",
                "login": "yystopf",
                "image_url": "system/lets/letter_avatars/2/Y/241_125_89/120.png"
            },
            "applied_type": "AppliedTransferProject",
            "name": "正在将【测试项目啊1】仓库转移给【测试组织】",
            "viewed": "viewed",
            "status": "common",
            "created_at": "2021-04-26 09:54",
            "time_ago": "35分钟前"
        },
        ...
    ]
}
```

## 待办事项-接受仓库
待办事项-接受仓库

> 示例:

```shell
curl -X GET http://localhost:3000/api/users/yystopf/applied_transfer_projects.json
```

```javascript
await octokit.request('GET /api/users/:login/applied_transfer_projects.json')
```

### HTTP 请求
`GET /api/users/:login/applied_transfer_projects.json`

### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|login       |string   |用户标识 |

### 返回字段说明:
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
    "total_count": 4,
    "applied_transfer_projects": [
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
                "id": 52,
                "type": "Organization",
                "name": "身份卡手动阀",
                "login": "ceshi1",
                "image_url": "images/avatars/Organization/52?t=1618805056"
            },
            "id": 1,
            "status": "canceled",
            "created_at": "2021-04-25 18:06",
            "time_ago": "16小时前"
        },
        ...
    ]
}
```

## 用户接受迁移
用户接受迁移

> 示例:

```shell
curl -X POST http://localhost:3000/api/users/yystopf/applied_transfer_projects/2/accept.json
```

```javascript
await octokit.request('GET /api/users/:login/applied_transfer_projects/:id/accept.json')
```

### HTTP 请求
`GET /api/users/:login/applied_transfer_projects/:id/accept.json`

### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|login       |string   |用户标识 |
|id          |int      |迁移id |

### 返回字段说明:
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
        "id": 52,
        "type": "Organization",
        "name": "身份卡手动阀",
        "login": "ceshi1",
        "image_url": "images/avatars/Organization/52?t=1618805056"
    },
    "id": 1,
    "status": "canceled",
    "created_at": "2021-04-25 18:06",
    "time_ago": "16小时前"
}
```

## 用户拒绝迁移
用户拒绝迁移

> 示例:

```shell
curl -X POST http://localhost:3000/api/users/yystopf/applied_transfer_projects/2/refuse.json
```

```javascript
await octokit.request('GET /api/users/:login/applied_transfer_projects/:id/refuse.json')
```

### HTTP 请求
`GET /api/users/:login/applied_transfer_projects/:id/refuse.json`

### 请求字段说明:
参数  | 类型 | 字段说明
--------- | ----------- | -----------
|login       |string   |用户标识 |
|id          |int      |迁移id |

### 返回字段说明:
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
        "id": 52,
        "type": "Organization",
        "name": "身份卡手动阀",
        "login": "ceshi1",
        "image_url": "images/avatars/Organization/52?t=1618805056"
    },
    "id": 1,
    "status": "canceled",
    "created_at": "2021-04-25 18:06",
    "time_ago": "16小时前"
}
```