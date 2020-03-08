import React,{ Component } from "react";
import { Input, Checkbox} from "antd";
import ModalWrapper from '../../common/ModalWrapper'
const Search = Input.Search
// 题库选用弹框  https://www.trustie.net/issues/19980
class ChooseGraduateTopicModal extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }
  
  setVisible = (visible) => {
    this.refs.modalWrapper.setVisible(visible)
  }

  //切换tab
  changeNav=(index)=>{
    this.setState({
      nav_my:index
    })
  }
  onOk = () => {
    this.refs.modalWrapper.setVisible(false)
  }
  render() {
    let {flag,nav_my}=this.state
    let {workType}=this.props;
    return(
        <ModalWrapper
          ref="modalWrapper"
          onOk={this.onOk}
          title={ "题库选用" }

        >
          <React.Fragment>
            <style>{`
              .courseModalNav li{
                float: left;
                margin-right: 20px;
              }
              .courseModalNav li:last-child{
                margin-right: 0px;
              }
              .courseModalNav li.active a{
                color: #fff!important;
                background-color: #4CACFF;
              }
              .courseModalNav li a{
                display: block;
                padding:0px 10px;
                height: 28px;
                line-height: 28px;
                background-color: #F5F5F5;
                border-radius: 36px;
                color: #666666!important;
              }
            `}</style>
            <div className="clearfix mb30">
              <ul className="fl mt2 courseModalNav">
                <li className={nav_my===1?"active":""} onClick={()=>this.changeNav(1)}><a>我的题库</a></li>
                <li className={nav_my===1?"":"active"} onClick={()=>this.changeNav(2)}><a>公共题库</a></li>
              </ul>
              <Search placeholder="输入适用选题名称关键字搜索" className="searchView fr" style={{"width":"268px","height":"30px"}}></Search>
            </div>
            <p className="color-grey-6 mb25 edu-txt-center">
              选用对象：你在课堂{"毕设选题"}列表中已<span className="color-orange-tip">“加入题库”</span>
              的选题
            </p>
            <div>
              <div className="edu-back-skyblue padding20" style={{"height":"300px"}}>
                <p className="clearfix mb7">
                  <Checkbox className="fl"></Checkbox>
                  <span className="fl with45"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>毕业设计2018开题报告题报</label></span>
                  <span className={nav_my===1?"fl with50 color-grey-6 task-hide pl5":"fl with30 color-grey-6 task-hide pl5"}>数据库原理数据库原理</span>
                  {
                    nav_my===2 && 
                    <span className="fl with16 color-grey-6 task-hide pl10">胡莎莎胡莎莎</span>
                  }
                </p>
              </div>
            </div>
          </React.Fragment>
        </ModalWrapper>
    )
  }
}
export default ChooseGraduateTopicModal;