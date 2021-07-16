<!--
 * @Date: 2021-07-14 15:10:29
 * @LastEditors: viletyy
 * @LastEditTime: 2021-07-14 15:37:23
 * @FilePath: /forgeplus/app/docs/slate/source/includes/_public_keys.md
-->
# PublicKeys

## public_keys列表
获取public_keys列表，支持分页

> 示例:

```shell
curl -X GET \
http://localhost:3000/api/public_keys.json
```

```javascript
await octokit.request('GET /api/public_keys.json')
```

### HTTP 请求
`GET api/public_keys.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
page  |否| 1 | int |  页码   |
limit |否| 15 | int | 每页数量 |

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
total_count              |int   |总数 |
public_keys.id           |int   |ID|
public_keys.name         |string|密钥标题|
public_keys.content      |string|密钥内容|
public_keys.fingerprint  |string|密钥标识|
public_keys.created_time |string|密钥创建时间|


> 返回的JSON示例:

```json
{
    "total_count": 1,
    "public_keys": [
        {
            "id": 16,
            "name": "xxx",
            "content": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDe5ETOTB5PcmcYJkIhfF7+mxmJQDCLg7/LnMoKHpKoo/jYUnFU9OjfsxVo3FTNUvh2475WXMAur5KsFoNKjK9+JHxvoXyJKmyVPWgXU/NRxQyaWPnPLPK8qPRF5ksJE6feBOqtsdxsvBiHs2r1NX/U26Ecnpr6avudD0cmyrEfbYMWbupLrhsd39dswPT73f3W5jc7B9Y47Ioiv8UOju3ABt1+kpuAjaaVC6VtUQoEFiZb1y33yBnyePya7dvFyApyD4ILyyIG2rtZWK7l53YFnwZDuFsTWjEEEQD0U4FBSFdH5wtwx0WQLMSNyTtaFBSG0kJ+uiQQIrxlvikcm63df7zbC3/rWLPsKgW122Zt966dcpFqiCiJNDKZPPw3qpg8TBL6X+qIZ+FxVEk/16/zScpyEfoxQp0GvgxI7hPLErmfkC5tMsib8MAXYBNyvJXna0vg/wOaNNIaI4SAH9Ksh3f/TtalYVjp6WxIwVBfnbq51WnmlnEXePtX6XjAGL+GbF2VQ1nv/IzrY09tNbTV6wQsrSIP3VDzYQxdJ1rdsVNMoJB0H2Pu0NdcSz53Wx45N+myD0QnE05ss+zDp5StY90OYsx2aCo6qAA8Qn2jUjdta7MQWwkPfKrta4tTQ0XbWMjx4/E1+l3J5liwZkl2XOGOwhfXdRsBjaEziZ18kQ== yystopf@163.com",
            "fingerprint": "SHA256:cU8AK/+roqUUyiaYXIdS2Nj4+Rb2p6rqWSeRDc+aqKM",
            "created_unix": 1626246596,
            "created_time": "2021/07/14 15:09"
        }
    ]
}
```
<aside class="success">
Success — a happy kitten is an authenticated kitten!
</aside>

## 创建public_key
创建public_key

> 示例:

```shell
curl -X POST \
http://localhost:3000/api/public_keys.json
```

```javascript
await octokit.request('POST /api/public_keys.json')
```

### HTTP 请求
`POST api/public_keys.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
key   |是 | 否 | string |  密钥   |
title |是 | 否 | string | 密钥标题 |

> 请求的JSON示例：
```json
{
  "public_key": {
    "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDe5ETOTB5PcmcYJkIhfF7+mxmJQDCLg7/LnMoKHpKoo/jYUnFU9OjfsxVo3FTNUvh2475WXMAur5KsFoNKjK9+JHxvoXyJKmyVPWgXU/NRxQyaWPnPLPK8qPRF5ksJE6feBOqtsdxsvBiHs2r1NX/U26Ecnpr6avudD0cmyrEfbYMWbupLrhsd39dswPT73f3W5jc7B9Y47Ioiv8UOju3ABt1+kpuAjaaVC6VtUQoEFiZb1y33yBnyePya7dvFyApyD4ILyyIG2rtZWK7l53YFnwZDuFsTWjEEEQD0U4FBSFdH5wtwx0WQLMSNyTtaFBSG0kJ+uiQQIrxlvikcm63df7zbC3/rWLPsKgW122Zt966dcpFqiCiJNDKZPPw3qpg8TBL6X+qIZ+FxVEk/16/zScpyEfoxQp0GvgxI7hPLErmfkC5tMsib8MAXYBNyvJXna0vg/wOaNNIaI4SAH9Ksh3f/TtalYVjp6WxIwVBfnbq51WnmlnEXePtX6XjAGL+GbF2VQ1nv/IzrY09tNbTV6wQsrSIP3VDzYQxdJ1rdsVNMoJB0H2Pu0NdcSz53Wx45N+myD0QnE05ss+zDp5StY90OYsx2aCo6qAA8Qn2jUjdta7MQWwkPfKrta4tTQ0XbWMjx4/E1+l3J5liwZkl2XOGOwhfXdRsBjaEziZ18kQ== yystopf@163.com", 
    "title": "xxx"
  }
}
```

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
total_count              |int   |总数 |
id           |int   |ID|
name         |string|密钥标题|
content      |string|密钥内容|
fingerprint  |string|密钥标识|
created_time |string|密钥创建时间|


> 返回的JSON示例:

```json
{
    "id": 17,
    "name": "xxx",
    "content": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDe5ETOTB5PcmcYJkIhfF7+mxmJQDCLg7/LnMoKHpKoo/jYUnFU9OjfsxVo3FTNUvh2475WXMAur5KsFoNKjK9+JHxvoXyJKmyVPWgXU/NRxQyaWPnPLPK8qPRF5ksJE6feBOqtsdxsvBiHs2r1NX/U26Ecnpr6avudD0cmyrEfbYMWbupLrhsd39dswPT73f3W5jc7B9Y47Ioiv8UOju3ABt1+kpuAjaaVC6VtUQoEFiZb1y33yBnyePya7dvFyApyD4ILyyIG2rtZWK7l53YFnwZDuFsTWjEEEQD0U4FBSFdH5wtwx0WQLMSNyTtaFBSG0kJ+uiQQIrxlvikcm63df7zbC3/rWLPsKgW122Zt966dcpFqiCiJNDKZPPw3qpg8TBL6X+qIZ+FxVEk/16/zScpyEfoxQp0GvgxI7hPLErmfkC5tMsib8MAXYBNyvJXna0vg/wOaNNIaI4SAH9Ksh3f/TtalYVjp6WxIwVBfnbq51WnmlnEXePtX6XjAGL+GbF2VQ1nv/IzrY09tNbTV6wQsrSIP3VDzYQxdJ1rdsVNMoJB0H2Pu0NdcSz53Wx45N+myD0QnE05ss+zDp5StY90OYsx2aCo6qAA8Qn2jUjdta7MQWwkPfKrta4tTQ0XbWMjx4/E1+l3J5liwZkl2XOGOwhfXdRsBjaEziZ18kQ== yystopf@163.com",
    "fingerprint": "SHA256:cU8AK/+roqUUyiaYXIdS2Nj4+Rb2p6rqWSeRDc+aqKM",
    "created_time": "2021/07/14 15:26"
}
```
<aside class="success">
Success — a happy kitten is an authenticated kitten!
</aside>


## 删除public_key
删除public_key

> 示例:

```shell
curl -X DELETE \
http://localhost:3000/api/public_keys/:id.json
```

```javascript
await octokit.request('DELETE /api/public_keys/:id.json')
```

### HTTP 请求
`DELETE api/public_keys/:id.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
id   |是 | 否 | int |  密钥ID   |


> 返回的JSON示例:

```json
{
    "status": 0,
    "message": "success"
}
```
<aside class="success">
Success — a happy kitten is an authenticated kitten!
</aside>

