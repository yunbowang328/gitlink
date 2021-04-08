# Licenses


## Get All Licenses
The Licenses API returns metadata about popular open source licenses and information about a particular project's license file.

> 示例:

```shell
curl -X GET \
-d "name=AFL" \
http://localhost:3000/api/licenses
```

```javascript
await octokit.request('GET /api/licenses')
```

### HTTP Request

`GET https://forgeplus.trustie.net/api/licenses.json`

### 请求参数

Name | Required | Type | Description
----- | ---- | ----- | -----
name   |false|string   |name of the license


> 返回字段说明:

```json
{
  "licenses": [
    {
      "id": 57,
      "name": "AFL-1.2"
    },
    {
      "id": 76,
      "name": "AFL-3.0"
    },
    {
      "id": 214,
      "name": "AFL-1.1"
    },
    {
      "id": 326,
      "name": "AFL-2.1"
    },
    {
      "id": 350,
      "name": "AFL-2.0"
    }
  ]
}
```
