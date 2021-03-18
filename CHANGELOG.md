# Changelog

## [v3.0.0](https://github.com/go-gitea/gitea/releases/tag/v1.13.1) - 2020-12-29

* BUGFIXES
  * Fix pull reqeust的访问权限问题 (#14156) (#14171)
  * Fix 部分页面访问403的问题
  * Fix 合并请求失败的问题
  * Fix 代码目录页面，文件夹和文件图片不显示的问题
  * Fix Issue列表中按‘负责人’过滤筛选时，部分项目成员不在搜索范围没的问题
  * Fix 项目更新时间不同步的问题, 添加了定时任务
* ENHANCEMENTS
  * 提升获取版本库目录代码查询速度 (#43296)
  * tag 列表慢查询速度问题 (#43332)
  * API builder 模版中 render partial builder的性能问题