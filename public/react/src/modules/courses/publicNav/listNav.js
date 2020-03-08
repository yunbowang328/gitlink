import React,{ Component } from "react";
import { Input,Menu } from "antd";
import './nav.css';


const Search = Input.Search;
class ListNav extends Component{
  constructor(props){
    super(props);
    this.state = { 
      task_value:"",
      source_value:"",
      stu_new_flag:false,
      headIndex:2
    }
  }


  inputTask=(e)=>{
    this.setState({
      task_value:e.target.value
    })
  }

  inputSource=(e)=>{
    this.setState({
      source_value:e.target.value
    })
  }

  

  render(){
    let {
      task_value , 
      source_value,headIndex
    }=this.state;
    return(
      <div id="course_activities_content">

        {
          headIndex == 2 && 
          <div className="edu-back-white">
            <p className="clearfix padding30 bor-bottom-greyE">
              <span className="font-18 fl">毕设任务</span>
              <li className="fr">
                <a className="color-blue mr30">题库选用</a>
                <a className="color-blue">新建</a>
              </li>
            </p>
            <div className="clearfix pl30 pr30" style={{height:'72px'}}>
              <div className="fl mt6 task_menu_ul">
                <Menu mode="horizontal" defaultSelectedKeys="1">
                  <Menu.Item key="1">全部</Menu.Item>
                  {this.props.isAdmin?<Menu.Item key="2">未发布</Menu.Item>:""}
                  <Menu.Item key="3">提交中</Menu.Item>
                  <Menu.Item key="4">评阅中</Menu.Item>
                  <Menu.Item key="5">已结束</Menu.Item>
                </Menu>
              </div>
              <div className="fr mt16 mb16 searchView">
                <Search 
                value={task_value}
                placeholder="请输入名称进行搜索"
                onInput={this.inputTask}
                ></Search>
              </div>
            </div>
          </div>
        }
        {
          headIndex == 3 && 
          <div className="edu-back-white">
            <p className="clearfix padding30 bor-bottom-greyE">
              <span className="font-18 fl">资源列表</span>
              <li className="fr">
                <a href="javascript:void(0)" className="color-blue mr30">新建目录</a>
                <a href="javascript:void(0)" className="color-blue mr30">导入资源</a>
                <a href="javascript:void(0)" className="color-blue">上传资源</a>
              </li>
            </p>
            <div className="pl30 pr30">
              <div className="clearfix">
                <p className="fl mt22">
                  <span className="mr40">共 3 个资源</span>
                  <span className="mr40">公共资源：0 个</span>
                  <span>私有资源：3 个</span>
                </p>
                <div className="fr mt16 mb10 searchView">
                  <Search 
                  value={source_value}
                  onInput={this.inputSource}
                  placeholder="请输入名称进行搜索"
                  ></Search>
                </div>
              </div>
              <div className="edu-txt-right pb10">
                <ul className="inline sourceTag">
                  <a href="javascritp:void(0)" className="active">全部</a>
                  <a href="javascritp:void(0)">群体协同 x1</a>
                </ul>
              </div>
            </div>
          </div>
        }

      </div>
    )
  }
}
export default ListNav;