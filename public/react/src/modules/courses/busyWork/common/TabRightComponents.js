import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Icon,message,Modal, Table, Divider, Tag,DatePicker,Radio,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import { WordsBtn, getRandomcode } from 'educoder';
import axios from 'axios';
import PublishRightnow from '../PublishRightnow'
import AccessoryModal from "../../coursesPublic/AccessoryModal";
import DownloadMessageysl from "../../../modals/DownloadMessageysl";

const { Option} = Select;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;
let GraduationTasksnewtype=true;
const $ = window.$;
const Search = Input.Search;
const RadioGroup = Radio.Group;

class TabRightComponents extends Component{

  constructor(props){
    super(props)

    this.publishModal = React.createRef();
    this.endModal = React.createRef();

    this.state={
      accessoryVisible: false,
      DownloadType:false,
      DownloadMessageval:undefined,
    }
  }

  componentDidMount() {
  }

  onToPublishClick = () => {

  }
  // 补交附件
  Cancelvisible=()=>{
    this.setState({
      accessoryVisible:false
    })
  }
  /// 确认是否下载
  confirmysl(url){
    axios.get(url + '&export=true' ).then((response) => {
      if(response.data.status&&response.data.status===-1){

      }else if(response.data.status&&response.data.status===-2){
        if(response.data.message === "100"){
          // 已超出文件导出的上限数量（100 ），建议：

          this.setState({
            DownloadType:true,
            DownloadMessageval:100
          })
        }else {
          //因附件资料超过500M
          this.setState({
            DownloadType:true,
            DownloadMessageval:500
          })
        }
      }else {
        this.props.slowDownload(getRandomcode(url));
        // this.props.showNotification(`正在下载中`);
        // window.open("/api"+url, '_blank');
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  Downloadcal=()=>{
    this.setState({
      DownloadType:false,
      DownloadMessageval:undefined
    })
  }


  addAccessory=()=>{
    this.setState({
      accessoryVisible:true
    })
  }
  setupdate = () => {

  }
  render(){
    const dateFormat = 'YYYY-MM-DD HH:mm';
    const { accessoryVisible } = this.state
    let { work_statuses, publish_immediately, work_id
        , end_immediately
    } =this.props;

    let courseId=this.props.match.params.coursesId;
    let category_id=this.props.match.params.category_id;
    let workId=this.props.match.params.workId;

    const isGroup = this.props.isGroup()
    const moduleName = !isGroup? "普通作业":"分组作业";
    const moduleEngName = this.props.getModuleName()

    const childModuleName = this.props.moduleName

    const isAdmin = this.props.isAdmin()
    const isSuperAdmin = this.props.isSuperAdmin()

    let exportUrls = `/api/homework_commons/${workId}/works_list.zip`
    const exportResultUrls = `/api/homework_commons/${workId}/works_list.xlsx`
    return(
      <React.Fragment>
        {isAdmin ?
        <React.Fragment>
            <div style={{display: 'inline', float: 'right'}}>
                <PublishRightnow ref={this.publishModal} showActionButton={false} {...this.props} checkBoxValues={[workId]}
                    isPublish={true} doWhenSuccess={this.props.doWhenSuccess} checkBeforePost={this.props.saveWorkSetting}
                    onToPublishClick={this.onToPublishClick}
                ></PublishRightnow>
                <PublishRightnow ref={this.endModal} showActionButton={false} {...this.props} checkBoxValues={[workId]}
                    isPublish={false} doWhenSuccess={this.props.doWhenSuccess}></PublishRightnow>
            </div>
          <DownloadMessageysl
            {...this.props}
            value={this.state.DownloadMessageval}
            modalCancel={this.Downloadcal}
            modalsType={this.state.DownloadType}
          />
            <style>{`
              .drop_down_menu li a {
                  padding: 0px;
                  font-size: 14px;
                  color: #333;
              }
              .drop_down_menu {
                  width: 121px;
              }
              .drop_down_menu li {
                  overflow: visible;
                  width: 121px;
              }
              .drop_down_menu, .drop_down_normal {
                  padding-top: 10px;
                  padding-bottom: 8px;
              }
            `}</style>
            {this.props.isAdmin()? <li className="li_line drop_down fr color-blue font-16 mt20" style={{"padding":"0 20px"}}>
              导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
              <ul className="drop_down_menu" style={{"right":"-34px","left":"unset","height":"auto"}}>
                <li><a onClick={(url)=>this.confirmysl(exportResultUrls)} className="color-dark">导出成绩</a></li>
                <li><a onClick={(url)=>this.confirmysl(exportUrls)}  className="color-dark">导出作品附件</a></li>
              </ul>
            </li>:""}

            {/* <a className={"fr color-blue font-16"} href={exportUrl}>导出作品附件</a>
            <a className={"fr color-blue font-16"} href={exportResultUrl}>导出成绩</a> */}
            {/*<a className={"fr color-blue font-16"}>导出</a>*/}
            {end_immediately &&  <a className={"fr color-blue font-16"} onClick={() => { this.endModal.current.open() } }>立即截止</a>}
            {publish_immediately && <a className={"fr color-blue font-16"} onClick={() => { this.publishModal.current.open() } } >立即发布</a>}

            {/*<a className={"fr color-blue font-16"}>项目在线质量检测</a>*/}
            {isAdmin && <a className={"fr color-blue font-16"} onClick={() => this.props.toEditPage(this.props.match.params, workId)}>编辑作业</a>}
        </React.Fragment> :
        <React.Fragment>
            {work_statuses && work_statuses.indexOf('提交作品') != -1 && <a className={"fr color-blue font-16"} href={"javascript:void(0)"}
                onClick={() => { this.props.toWorkPostPage(this.props.match.params)}}
            >提交作品</a>}
            {work_statuses && work_statuses.indexOf('修改作品') != -1 && <a className={"fr color-blue font-16"} href={"javascript:void(0)"}
                onClick={() => { this.props.toWorkPostPage(this.props.match.params, null, true, work_id)}}
            >修改作品</a>}
            {work_statuses && work_statuses.indexOf('补交附件') != -1 &&
            <React.Fragment>
              <AccessoryModal
                {...this.props}
                modalname={"补交附件"}
                visible={accessoryVisible}
                Cancelname={"取消"}
                Savesname={"确认"}
                Cancel={this.Cancelvisible}
                setupdate={this.setupdate}
                reviseAttachmentUrl={`/student_works/${work_id}/revise_attachment.json`}
              />
              <a className={"fr color-blue font-16"} href={"javascript:void(0)"}
                  onClick={this.addAccessory}
              >补交附件</a>
            </React.Fragment>
            }
        </React.Fragment> }
      </React.Fragment>

    )
  }
}

export default TabRightComponents;
