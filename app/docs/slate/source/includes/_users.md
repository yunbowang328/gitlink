<!--
 * @Date: 2021-03-01 10:35:21
 * @LastEditors: viletyy
 * @LastEditTime: 2021-04-26 10:47:30
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