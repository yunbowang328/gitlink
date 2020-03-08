import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import 'moment/locale/zh-cn';
import delay from '../../../images/delay.png'
import invalid from '../../../images/invalid.png'
import {
    Form,
    Select,
    Input,
    Button,
    Checkbox,
    Upload,
    Icon,
    message,
    Modal,
    Table,
    Divider,
    InputNumber,
    Tag,
    DatePicker,
    Radio,
    Tooltip
} from "antd";
import '../css/members.css'
import "../common/formCommon.css"
import '../css/Courses.css'
import './style.css'


class TraineetraininginformationModal extends Component {
    constructor(props) {
        super(props);
        this.setState({
            props: this.props,
            userids: this.props.userids,
            game_list:this.props.game_list,
            experience:this.props.experience,

        })
       // console.log("TraineetraininginformationModal")
       // console.log(this.props)
    }


    Cancel = () => {
        this.props.Cancel()
    }
    componentDidMount() {
        // this.seacthdata();

    }
  // componentWillReceiveProps(nextProps) {
  //   // console.log("46");
  //   // console.log(nextProps);
  //   // console.log(this.props);
  //   if (nextProps.boolgalist != this.props.boolgalist) {
  //     // console.log("50");
  //     // console.log(nextProps.user);
  //     if (nextProps.boolgalist !== undefined) {
  //       // console.log("53");
  //       // console.log(nextProps.user);
  //       this.setState({
  //         boolgalist: nextProps.boolgalist,
  //       })
  //     }
  //
  //
  //   }
  //
  //
  // }
  LimitNumber=(txt)=> {
    var str = txt;
    if(str.length>25){
      str = str.substring(0,25)+"......"
    }
    return str;
  }
    render() {
      // console.log(83);
      // console.log(this.props.boolgalist);
      const  columns = [
          {
            title: '关卡',
            dataIndex: 'number',
            key: 'number',
            width:"91px",
            align: "center",
            render: (text, record) => (
              <span>
            <a style={{"color": '#07111B', "text-align": "center"}}>{record.number}</a>
            </span>
            ),
          },
          {
            title: '完成时间',
            dataIndex: 'name',
            key: 'name',
            width:"150px",
            align: "center",
            render: (text, record) => (
              <span>
             <a style={{
               "color": '#989898',
               "text-align": "center"
             }}>{record.name === 'Invalid date' ? "--" : record.name}</a>
        </span>
            ),
          },
          {
            title: '',
            dataIndex: 'complete_status',
            key: 'complete_status',
            width:"87px",
            align: "center",
            render: (text, record) => (
              <span>
               {record.complete_status === 2 ? <img src={delay}/> : record.complete_status === 3 ?
                 <img src={invalid}/> : ""}

        </span>
            ),
          },
          {
            title: '耗时',
            dataIndex: 'stduynumber',
            key: 'stduynumber',
            width:"150px",
            align: "center",
            render: (text, record) => (
              <span>
             <a style={{"color": '#989898', "text-align": "center"}}>{record.stduynumber}</a>
        </span>
            ),
          },
          {
            title: '经验值',
            key: 'classroom',

            dataIndex: 'classroom',
            align: "center",
            render: (text, record) => (
              <span>
             <a style={{"color": '#29BD8B', "text-align": "center"}}>{record.classroom}</a>
        </span>
            ),
          }
        ];

      const columnss = [
            {
              title: '关卡',
              dataIndex: 'number',
              key: 'number',
              align: "center",
              width:"119px",
              render: (text, record) => (
                <span >
            <a style={{"color":'#07111B', "text-align": "center"}}>{record.number}</a>
            </span>
              ),
            },
            {
              title: '完成时间',
              dataIndex: 'name',
              key: 'name',
              width:"174px",
              align: "center",
              render: (text, record) => (
                <span >
             <a style={{"color":'#989898', "text-align": "center"}} >{record.name==='Invalid date'?"--":record.name}</a>
        </span>
              ),
            },
            {
              title: '耗时',
              dataIndex: 'stduynumber',
              key: 'stduynumber',
              align: "center",
              width:"119px",
              render: (text, record) => (
                <span>
             <a style={{"color":'#989898', "text-align": "center"}}>{record.stduynumber}</a>
        </span>
              ),
            },
            {
              title: '经验值',
              key: 'classroom',
              dataIndex: 'classroom',
              align: "center",

              render: (text, record) => (
                <span>
             <a style={{"color":'#29BD8B', "text-align": "center"}}>{record.classroom}</a>
        </span>
              ),
            }
          ];

        return (
            <div>
                <Modal
                    keyboard={false}
                    className="HomeworkModal"
                    title={"学员实训信息"}
                    visible={this.props.visible}
                    footer={null}
                    onCancel={this.Cancel}
                    maskClosable={false}
                    destroyOnClose={true}
                >
                    <div style={{width:"100%" }} >
                    <div style={{"width": "100%","text-align": "left","clear": "both"}}>
                        <div className="mt8 fl" >
                            <span style={{"text-align": "left"}}>{this.props.viewtrainingdata === undefined ? "" :  this.LimitNumber(this.props.viewtrainingdata.shixun_name)}</span>
                          <span className="ml10  "  style={{"text-align": "left","color":'#29BD8B'}} >经验值：<span style={{"color":'#29BD8B'}}> {this.props.experience=== undefined?"0" :this.props.experience}/</span><span style={{"color":'#29BD8B'}}>{this.props.viewtrainingdata === undefined ? "" : this.props.viewtrainingdata.shixun_score}</span></span>
                        </div>
                        {/*<Button type="primary" className="ml30"  >实训报告</Button>*/}
                        <Button  type="primary" target="_blank" className="lh38 fr" style={{"text-align": "center","width": "100px",color: "#fff"}} href={`/courses/${this.props.coursesId}/shixun_homeworks/${this.props.viewtrainingdata.work_id}/shixun_work_report`}>
                            实训报告
                        </Button>
                        {/*这里到时候要做判断*/}
                    </div>

                    </div>
                    {/*<div className=" bor-bottom-greyE mt45 "></div>*/}

                    <div style={{"clear": "both"}}>
                    <div className="fl edu-back-white ml10 ">
                            <img alt="头像" className="radius mt10" height="70" id="nh_user_logo" name="avatar_image"
                                 src={this.props.viewtrainingdata === undefined ? "" : "/images/" + `${this.props.viewtrainingdata.image_url}`}
                                 width="70"/>
                    </div>
                        <div className="fl  edu-back-white ml20  mt15">
                            <li>{this.props.viewtrainingdata === undefined ? "" :this.props.viewtrainingdata.username}<span style={{"color":"#323232"}}> 通关：</span><span style={{"color": '#FF6800'}}>{this.props.viewtrainingdata === undefined ? "" :this.props.viewtrainingdata.complete_count}/{this.props.viewtrainingdata === undefined ? "" :this.props.viewtrainingdata.challenges_count}</span></li>
                          {this.props.viewtrainingdata === undefined ? <li className="yslminheigth"></li> :this.props.viewtrainingdata.efficiency === undefined ? <li className="yslminheigth"></li> :this.props.viewtrainingdata.efficiency === null ? <li className="yslminheigth"></li> :this.props.viewtrainingdata.efficiency === "null" ? <li className="yslminheigth"></li> :this.props.viewtrainingdata.efficiency === "" ? <li className="yslminheigth"></li> : <li><span   style={{"color":"#989898"}} >完成效率：</span><span  style={{"color":"#4C4C4C"}}>{this.props.viewtrainingdata.efficiency}</span></li>}
                            <li><span style={{"color":"#989898"}}>通关时间：</span> <span style={{"color":"#4C4C4C"}}>{this.props.viewtrainingdata === undefined ? "":moment(this.props.viewtrainingdata.passed_time).format('YYYY-MM-DD HH:mm')==="Invalid date"?"--":moment(this.props.viewtrainingdata.passed_time).format('YYYY-MM-DD HH:mm')}</span> </li>
                        </div>
                        <div className="fl  edu-back-white ml20  mt15">
                          {this.props.viewtrainingdata === undefined ? <li className="yslminheigth mt20"></li> :this.props.viewtrainingdata.max_efficiency === undefined ? <li className="yslminheigth mt20"></li> :this.props.viewtrainingdata.max_efficiency === null ? <li className="yslminheigth mt20"></li> :this.props.viewtrainingdata.max_efficiency === "null" ? <li className="yslminheigth mt20"></li>: this.props.viewtrainingdata.max_efficiency === "" ? <li className="yslminheigth mt20"></li> :  <li className="mt20"> <span style={{"color":"#989898"}}>课堂最高完成效率：</span> <span style={{"color":"#4C4C4C"}}>{this.props.viewtrainingdata.max_efficiency} </span> </li>}
                            <li><span style={{"color":"#989898"}}>总耗时:</span>  <span style={{"color":"#4C4C4C"}}> {this.props.viewtrainingdata === undefined ? "" :this.props.viewtrainingdata.total_spend_time}</span> </li>

                        </div>
                    </div>
                  {this.props.boolgalist === false?
                     <div>
                       {
                         this.props.game_list === undefined?"" : this.props.game_list.length<5?
                           <div className="edu-table edu-back-white ">
                             <style>
                               {
                                 `  .ant-table-body{
                                 overflow: hidden !important; 
                                  }
                                   .edu-table .ant-table-tbody > tr > td {
														height: 58px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 58px;
														 }
														 
														 .edu-table .ant-table-header {
														   overflow: hidden !important;
														   }
                                  `
                               }

                             </style>
                             <div className={"both"}></div>
                             {this.props.game_list === undefined ? "" : <Table
                               className="mt20"
                               dataSource={this.props.game_list}
                               columns={columns}
                               loading={false}
                               pagination={false}
                             />}
                           </div>
                           :
                           <div className="edu-table edu-back-white ">
                             <style>
                               {
                                 `
                                     .edu-table .ant-table-tbody > tr > td {
														height: 58px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 58px;
														 }
														  .edu-table .ant-table-header {
														   overflow: hidden !important;
														   }
                                 `

                               }
                             </style>
                             <div className={"both"}></div>
                             {this.props.game_list === undefined ? "" : <Table
                               className="mt20"
                               dataSource={this.props.game_list}
                               columns={columns}
                               loading={false}
                               pagination={false}
                               scroll={{  y: 300 }}
                             />}
                           </div>
                       }


                     </div>



                    :


                  <div>
                    {
                      this.props.game_list === undefined?"" : this.props.game_list.length<5?
                        <div className="edu-table edu-back-white ">
                          <style>
                            {
                              `  .ant-table-body{
                                 overflow: hidden !important; 
                                  }
                                         .edu-table .ant-table-tbody > tr > td {
														height: 58px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 58px;
														 }
                                  
                                  `
                            }

                          </style>
                          <div className={"both"}></div>
                          {this.props.game_list === undefined ? "" : <Table
                            className="mt20"
                            dataSource={this.props.game_list}
                            columns={columnss}
                            loading={false}
                            pagination={false}
                          />}
                        </div>
                        :
                        <div className="edu-table edu-back-white ">
                          <style>
                            {
                              `
                                     .edu-table .ant-table-tbody > tr > td {
														height: 58px;
															}
														.edu-table .ant-table-thead > tr > th{
																 	height: 58px;
														 }
														 .edu-table .ant-table-header {
														   overflow: hidden !important;
														   }
                              `
                            }
                          </style>
                          <div className={"both"}></div>
                          {this.props.game_list === undefined ? "" : <Table
                            className="mt20"
                            dataSource={this.props.game_list}
                            columns={columnss}
                            loading={false}
                            pagination={false}
                            scroll={{  y: 300 }}
                          />}
                        </div>
                    }




                  </div>


                  }




                    </Modal>


            </div>

        )
    }
}

export default TraineetraininginformationModal;