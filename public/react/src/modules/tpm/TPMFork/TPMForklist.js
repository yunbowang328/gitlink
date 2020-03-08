import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal,Pagination,Tooltip,Spin} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

// import "antd/dist/antd.css";

import { Rating } from "@icedesign/base";

import axios from 'axios';

import {getImageUrl, toPath, getUrl} from 'educoder'

import './shixunCss/fork.css';

let origin = getUrl();

let path = getUrl("/editormd/lib/")

const $ = window.$;

let timeout;

let currentValue;



export default class TPMFork_listComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shixuns:undefined,
      total_count:0,
      shixunsID:undefined,
      Forkvisible: true,
      Forkcurrent: 1
    }
  }


  componentDidMount() {
    let id = this.props.match.params.shixunId;

    let Url="/shixuns/"+id+"/fork_list.json";
    axios.get(Url, {
      params: {
        page:1,
        limit:8
      }
    }).then((response)=> {
      this.setState({
        shixunsID:id,
        shixuns:response.data.shixuns,
        total_count:response.data.total_count,
        Forkvisible:false
      })
    }).catch((error)=>{
      console.log(error)
    });
  }


  TPMForkonChange=(pageNumber)=>{
    let id = this.props.match.params.shixunId;
    this.setState({
      Forkvisible:true
    })
    let Url="/shixuns/"+id+"/fork_list.json";
    axios.get(Url, {
      params: {
        page:pageNumber,
        limit:8
      }
    }).then((response)=> {
      this.setState({
        shixunsID:id,
        shixuns:response.data.shixuns,
        total_count:response.data.total_count,
        Forkvisible: false,
        Forkcurrent: pageNumber
      })
    }).catch((error)=>{
      console.log(error)
    });
  }
  render() {

    let {shixuns, total_count, shixunsID, Forkvisible, Forkcurrent} = this.state;

		const MyRate = ({ defaultValue, ...rest }) => {
			let myValue = defaultValue;
			// console.log(myValue-Math.floor(myValue))
			// if (myValue < Math.ceil(myValue)) {
			// 	myValue = Math.floor(myValue) + 0.5;
			// }

			return <Rating {...rest} value={myValue} />;
		};
    return (
      <React.Fragment>
        <div className="educontent mb20">

          <div className="edu-back-white padding20 clearfix mt30">
            <span className="fl font-16">Fork实训列表</span>
            <a href={"/shixuns/"+shixunsID+"/challenges"} className="font-16 color-grey-9 fr">返回</a>
          </div>

					<style>
						{
							`
							.taglistleft{
								position: absolute;
								left: 10px;
								bottom: 118px;
							}

							`
						}
					</style>
          {/*<Loading visible={Forkvisible} shape="dot-circle" style={{width:'100%'}}color='#4AC7FF'>*/}
					<Spin spinning={Forkvisible}  size="large" style={{marginTop:'15%'}}>
            <div className="mt30 square-list clearfix mh320">

              { shixuns===undefined?" ":shixuns.map((item,key)=>{
                return(
                  <div className="square-Item" key={key} id={item.id}>

                    <div className="tag-green taglistleft">
                      <span className="tag-name"> {item.tag_name}</span>
                      {/*<img src={require(`./shixunCss/tag2.png`)}/>*/}
                    </div>

                    <div className={item.power === false ? "closeSquare" : "none"}>
                      <img src={getImageUrl("images/educoder/icon/lockclose.svg")}
                           className="mt80 mb25"/>
                      <p className="font-14 color-white">非试用内容，需要授权</p>
                    </div>

                    <a href={"/shixuns/"+item.identifier+"/challenges"} className="square-img" target="_blank">
                      <img  src={'/'+item.pic}/>
                    </a>

                    <div className="square-main">
                      <p className="task-hide">
                        <a href={"/shixuns/"+item.identifier+"/challenges"} target="_blank" className="justify color-grey-name">
                          {item.name}
                        </a>
                      </p>

                      <p className="clearfix mt8 ml-3">
												<span className="rateYoStar fl" style={{padding: '0px',height: '20px',lineHeight: '19px',cursor: 'default'}} title="">
															<MyRate key={key} allowHalf defaultValue={item.score_info===null?5:item.score_info} disabled/>
												</span>
                        <span className="fl ml25 font-12 color-grey-9 lineh-12 mt4">{item.score_info===null?"5分":item.score_info+"分"}</span>
                      </p>

                      <p className="clearfix mt8 font-12 color-grey-B4">

                        <Tooltip placement="bottom" title={"关卡"}>
                            <span className="mr10 fl squareIconSpan">
                                  <i className="iconfont icon-shixunguanqia fl mr3"></i>{item.challenges_count}
                            </span>
                        </Tooltip>

                        {/*<Tooltip placement="bottom" title={"经验值"}>*/}
                            {/*<span className="mr10 fl squareIconSpan">*/}
                                  {/*<i className="iconfont icon-jingyan fl mr3"></i>{item.exp}*/}
                            {/*</span>*/}
                        {/*</Tooltip>*/}

                        <Tooltip placement="bottom" title={"学习人数"}>
                            <span className="mr10 fl squareIconSpan" style={{display:item.stu_num===0?"none":'block'}}>
                                  <i className="iconfont icon-chengyuan fl mr3"></i>{item.stu_num}
                            </span>
                        </Tooltip>


                        <span className="fr color-grey-B3 squareIconSpan">{item.level}</span>
                      </p>

                    </div>
                  </div>
                )
              })
              }
            </div>

            {/*<div>{total_count}</div>*/}
            <div className="educontent mb80 edu-txt-center mt10" style={{display: total_count > 8 ? "block" : "none"}}>
            {/*<div className={total_count < 9 ? " ml32" : "ml105"}>*/}
              <Pagination
                showQuickJumper
                defaultCurrent={1}
                pageSize={8}
                total={total_count}
                current={Forkcurrent}
                style={
                  {
                    display: total_count < 9 ? 'none' : 'block'
                  }
                }
                onChange={this.TPMForkonChange}/>
            </div>
					</Spin>
          {/*</Loading>*/}
        </div>
      </React.Fragment>
    )
  }
}


