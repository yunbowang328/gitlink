# Gitignores

## gitignore模板列表
获取gitignore模板列表, 支持名称搜索过滤

> 示例:

```shell
curl -X GET \
-d "name=Ada" \
http://localhost:3000/api/ignores.json
```

```javascript
await octokit.request('GET /api/ignores.json')
```

### HTTP 请求
`GET api/ignores.json`

### 请求参数
参数    | 必选 | 默认 | 类型 | 字段说明
--------- | ------- | ------- | -------- | ----------
name   |否| 否 ||string   |gitignore名称

### 返回字段说明
参数  | 类型 | 字段说明
--------- | ----------- | -----------
id             |int   |id |
name           |string|gitignore名称|


> 返回的JSON示例:

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
<aside class="success">
Success — a happy kitten is an authenticated kitten!
</aside>
