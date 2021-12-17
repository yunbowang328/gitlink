# Changelog
## [v3.2.0](https://forgeplus.trustie.net/projects/jasder/forgeplus/releases) - 2021-06-09

### ENHANCEMENTS
  * ADD 集成邮件和平台站内信等通知系统
  * Fix 代码库二级页面-优化文件子目录浏览功能(#50388)
  * Fix 代码库二级页面-优化commit提交详情页页面排版及数据显示(#50372)
  * Fix 代码库二级页面-优化commit提交信息列表页加载方式和数据排序功能(#50348)
  * Fix 代码库二级页面-优化创建发行版功能(#50346)
  * Fix 代码库二级页面-优化标签列表页功能(#50344)
  * Fix 代码库二级页面-优化发行版本列表页功能(#50345)
  * Fix 代码库二级页面-优化分支列表页功能(#50343)
  * Fix 其他问题优化(#51581) (#51343) (#51108)

---

### BUGFIXES
  * Fix 发行版—标签跳转链接错误(#51666)
  * Fix 文件预览报错(#51660)
  * Fix 标签创建时间显示错误(#51658)
  * Fix 分支列表中头像显示问题(#51656)
  * Fix 文本信息过长(#51630) (#51626)
  * Fix 版本库中附件下载400(#51625)
  * Fix loading页面优化(#51588)
  * Fix 提交详情页面优化(#51577)
  * Fix 修复疑修复制功能(#51569)
  * Fix 修复新建发行版用户信息显示错误的问题(#51665)
  * Fix 修复查看文件详细信息报错的问题(#51561)
  * Fix 修复提交记录中时间显示格式问题(#51526)
  * Fix 组织下项目更加更新时间倒序排序(#50833)


## [v3.1.0](https://forgeplus.trustie.net/projects/jasder/forgeplus/releases) - 2021-06-09

* ENHANCEMENTS
  * ADD 用户活动统计图表功能
  * ADD 用户精选项目功能
  * ADD 用户贡献度统计图表功能
  * ADD 用户开发能力数据统计工
  * ADD 用户角色定位展示功能
  * ADD 用户专业定位标签展示功能
  * ADD 修改用户基本资料功能
  * ADD 更改密码功能
  * ADD 用户个人主页基本现在展示可配置功能

* BUGFIXES
  * Fix 解决一些bug
  * Fix 优化美化页面


* BUGFIXES
  * Fix 在线修改文件，页面文件显不及时的问题(46049)
  * Fix Fork项目，接口多次调用问题(45052)
  * FIX 页面置顶功能区域排版问题(45825)
  * Fix 其他样式显示问题

* ENHANCEMENTS
  * ADD 合并请求页面显示有冲突文件状态(46016)
  * ADD 创建组织各属性添加规则匹配功能(45707)
  * ADD 微信分享功能(45707)

## [v3.0.3](https://forgeplus.trustie.net/projects/jasder/forgeplus/releases) - 2021-05-08

* BUGFIXES
  * Fix 解决疑修标题过长导致的排版问题(45469)
  * Fix 解决合并请求详情页面排版错误的问题(45457)
  * FIX 解决转移仓库界面专有名词描述错误的问题(45455)
  * Fix 解决markdown格式文件自动生成数字排序的问题(45454)
  * Fix 解决镜像项目源地址不显示的问题(45403)
  * Fix 解决镜像项目导航显示错误问题(45398)
  * Fix 解决其他相关bug

* ENHANCEMENTS
  * UPDATE 用户注册时，账号和密码正则匹配调整(45336) (45318) (45290)
  * ADD 创建组织各属性添加规则匹配功能(45313) (45289)
  * ADD 创建团建各属性添加规则匹配功能(45334) (45325) (45287)
  * ADD 仓库转移功能(45017) (45015)
 
## [v3.0.2](https://forgeplus.trustie.net/projects/jasder/forgeplus/releases) - 2021-04-23

* BUGFIXES
  * Fix 解决部分用户头像不显示问题
  * Fix 解决代码库模块中最左侧目录中的文件定位加载不准确的问题
  * FIX 解决团队管理页面中项目链接错误问题
  * Fix 解决markdown格式文件显示问题
  * Fix 解决组织名下创建项目报错的问题
  * Fix 解决组织名下的项目，创建issue报错的问题
  * Fix 解决组织名下创建团队提示信息信息显示错误问题
  * Fix 解决点击组织图片时，链接加载错误问题
  * Fix 修复查询版本库信息安全漏洞
  * Fix 解决修复团队成员操作访问组织仓库报403错误的问题
  * Fix 解决owners团队成员对仓库添加成功失败的问题

* ENHANCEMENTS
  * ADD 自动生产用户头像功能
  * ADD 创建组织支持中文名称
  * ADD 创建团建支持中文名称
  * ADD 组织名称统一显示中文名
  * ADD 团队名称统一显示中文名
  * ADD 用户头像悬浮时展示相关信息
  * ADD 项目详情页添加实践课程链接入口
  * ADD README文件页面添加添加目录导航功能
  * UPDATE 升级改版底部footer信息
  * UPDATE 升级用户操作版本库权限

## [v3.0.1](https://forgeplus.trustie.net/projects/jasder/forgeplus/releases) - 2021-03-19

* BUGFIXES
  * Fix pull reqeust模块中用户头像显示问题
  * Fix 解决issue模块中，指派用户的问题
  * Fix 解决合并请求失败的后显示message信息不正确
  * Fix 代码目录页面，readme文件提供单独的api

* ENHANCEMENTS
  * 重构项目详情页面

## [v3.0.0](https://forgeplus.trustie.net/projects/jasder/forgeplus/releases) - 2020-12-29

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
