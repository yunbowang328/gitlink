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
