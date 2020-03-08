# 新版Git测试说明
统一：
参考实训：http://47.96.87.25:48080/shixuns/ca9fvobr/repository
请求方式：POST
参数{repo_path: "educoder/ca9fvobr.git"}
公共方法：
['add_repository', 'fork_repository', 'delete_repository', 'file_tree', 'update_file',
 'file_content', 'commits']

1、仓库目录接口
    测试方法：模拟1000个用户同时去访问接口，访问方式
    http://121.199.19.206:9000/api/file_tree
    参数：
    {repo_path: "educoder/ca9fvobr.git", path: ''} // 如：{path: 'step1'}

2、创建版本库
    访问地址：http://121.199.19.206:9000/api/add_repository
    参数：
    {repo_path: 比如："Hjqreturn/aaass1.git"}

3、fork版本库
   http://121.199.19.206:9000/api/fork_repository
   参数：
   {repo_path: 'Hjqreturn/aaass1.git', fork_repository_path: 'educoder/ca9fvobr.git'}
   说明：fork_repository_path是新项目的repo_path, repo_path是源项目的


4、更新文件
    测试方法：
    1、更新同一个文件，并发量可以不用很大，可以用同一个用户并发10-100
    2、更新不同的文件：可以依据创建的版本库去更新
    访问地址：http://121.199.19.206:9000/api/update_file
    参数：
    {repo_path: "educoder/ca9fvobr.git",
                                   file_path: 'step1/main.py',
                                   message: 'commit by test',
                                   content: 'afdjadsjfj1111',
                                   author_name: 'guange',
                                   author_email: '8863824@gmil.com'}

5、获取文件内容
    访问地址：http://121.199.19.206:9000/api/file_content
    参数：
    {repo_path: "educoder/ca9fvobr.git", path: 'step1/main.py',}

6、获取提交记录
    访问地址：http://121.199.19.206:9000/api/commits
    参数：
    {repo_path: 比如："educoder/ca9fvobr.git"}


