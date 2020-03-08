import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import axios from 'axios';

import {getImageUrl,} from "educoder";

import './TPMright.css';

import {Progress, Tooltip} from 'antd';

// import "antd/dist/antd.css";

class TPMRightSection extends Component {
  constructor(props) {
    super(props)
    this.state = {

      TPMRightSection: false,
      clickNewsubscripttype: false
    }
  }

  // componentDidMount() {
  //   let id=this.props.match.params.shixunId;
  //
  //   let shixunsDetailsURL=`/shixuns/`+id+`/show_right.json`;
  //
  //   axios.get(shixunsDetailsURL).then((response)=> {
  //         if(response.status===200){
  //             this.setState({
  //               TPMRightSectionData: response.data
  //           });
  //         }
  //     }).catch((error)=>{
  //       console.log(error)
  //     });
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //      return nextProps.TPMRightSectionData !== this.state.TPMRightSectionData
  // }
  clickNewsubscript = (val) => {
    if (val === 0) {
      this.setState({
        TPMRightSection: true,
        clickNewsubscripttype: true
      })
    } else {
      this.setState({
        TPMRightSection: false,
        clickNewsubscripttype: false
      })
    }

  }

  render() {
    let {TPMRightSection, clickNewsubscripttype} = this.state;
    let {TPMRightSectionData} = this.props
    let Progresssum;
    if(TPMRightSectionData&&TPMRightSectionData.complete_count!=null){
      Progresssum=(parseInt(TPMRightSectionData&&TPMRightSectionData.complete_count) / parseInt(TPMRightSectionData&&TPMRightSectionData.challenge_count))*100;
    }

    // console.log(this.props&&this.props.is_jupyter===true)
    return (
      <div>
        <style>
          {
            `
         .altimgs{
             border-radius: 4px;
              width: 100px;
              height: 60px;
          }
                                              
                                  `
          }
        </style>
        {
          TPMRightSectionData === undefined ? "" :
            <div>
              <div className="edu-back-white pd302020zuoze mb10">
                <p className="font-16 mb20"><i className={"iconfont icon-chuangjianzhe1 audit_situationactive font-14"}></i>  创建者</p>
                <div className="df">
                  <a
                    href={TPMRightSectionData === undefined ? "" : TPMRightSectionData.creator === undefined ? "" : `/users/${TPMRightSectionData.creator.login}/courses`}>
                    <img alt="头像" className="radius mr10" height="36"
                         src={getImageUrl(TPMRightSectionData === undefined ? "" : TPMRightSectionData.creator === undefined ? "" : 'images/' + TPMRightSectionData.creator.image_url + "?1532489442")}
                         width="36"/>
                  </a>
                  <div className="flex1">

                    <div className="creatorname  sortinxdirection space-between">
                      <div className={"creatornamelist color-grey-3"}>
                        {TPMRightSectionData === undefined ? "" : TPMRightSectionData.creator === undefined ? "" : TPMRightSectionData.creator.name}
                      </div>
                      <div className={"creatornamelist width80center"}>
                        <span className={"color888hezuo  font-14"}>共发布实训</span> <span className={"color-grey-3"}>{TPMRightSectionData.user_shixuns_count}</span> <span className={"color888hezuo"}>个</span>
                      </div>
                    </div>
                    {/*<div className="clearfix">*/}
                    {/*  <span className={"fr color888hezuo"}>发布实训项目</span>*/}
                    {/*  /!*<span className="ml20">粉丝 <span id="user_h_fan_count">{TPMRightSectionData.fans_count}</span></span>*!/*/}
                    {/*  /!* <a href="/watchers/unwatch?className=fr+user_watch_btn+edu-default-btn+edu-focus-btn&amp;object_id=3039&amp;object_type=user&amp;shixun_id=61&amp;target_id=3039" className="fr edu-default-btn user_watch_btn edu-focus-btn" data-method="post" data-remote="true" id="cancel_watch" rel="nofollow">取消关注</a> *!/*/}
                    {/*</div>*/}

                  </div>
                </div>
              </div>

              {this.props&&this.props.is_jupyter===true?"":this.props&&this.props.status>1?<div className="edu-back-white padd252020px relative borderbottomf4">
                <div className="font-16 mb5">
                  <span><i className={"iconfont icon-jilu1 audit_situationactive font-14"}></i>  学习统计</span>
                  <span className={"sortinxdirection space-between fr"}>
												<span className="color888hezuo font-14">已完成 {TPMRightSectionData&&TPMRightSectionData.complete_count===null?0:TPMRightSectionData&&TPMRightSectionData.complete_count} 关 / 共 {TPMRightSectionData&&TPMRightSectionData.challenge_count} 关</span>
											</span>

                </div>

                <Progress percent={Progresssum} showInfo={false} status="active" strokeColor={{
                  '0%': '#29BD8B',
                  '100%': '#29BD8B',
                }} />
              </div>:""}
              {
                TPMRightSectionData === undefined ? "" : TPMRightSectionData.tags === undefined ? "" : TPMRightSectionData.tags.length === 0 ? "" :
                  <div className="edu-back-white padd252020px mb10 relative">
                    <p className="font-16 mb20">
											<span><i className={"iconfont icon-biaoqian2 audit_situationactive font-14"}></i>  技能标签</span>
                      <span className={"sortinxdirection space-between fr"}>
												<span className="color888hezuo  font-14">已获得 {TPMRightSectionData&&TPMRightSectionData.user_tag_count} 个 / 共 {TPMRightSectionData&&TPMRightSectionData.tag_count} 个</span>
											</span>

                    </p>
                    <div className={TPMRightSection === false ? "newedbox newedboxheight" : "newedbox newminheight"}>
                      <div className="clearfix" id="boxheight">
                        {TPMRightSectionData.tags.map((item, key) => {
                          return (
                            <span className={item.status === false ? "newedu-filter-btn fl" : "edu-filter-btn29BD8B fl"}
                                  style={{display: item.tag_name === " " || item.tag_name === "" ? "none" : ""}}
                                  key={key}>{item.tag_name}</span>
                          )
                        })
                        }
                      </div>
                    </div>


                    <div
                      className={TPMRightSectionData.tags.length > 15 && clickNewsubscripttype === false ? "textcenter color-grey-9 mt20 rightjinengs" : "none"}
                      onClick={() => this.clickNewsubscript(0)}>
                      <span className="mr8">
                        <div>
                           <p className={"font-12"}>展开全部</p>
                           <p className={"font-12"}><i className={"iconfont icon-jiantou9 font-12"}></i></p>
                        </div>
                      </span>
                    </div>


                    <div className={clickNewsubscripttype === false ? "none" : "textcenter mt20 color-grey-9 rightjinengs"}
                      onClick={() => this.clickNewsubscript(1)}>
                      <span className="mr8">
                        <div>
                           <p className={"font-12"}><i className={"iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu- font-12"}></i></p>
                           <p className={"font-12"}>收起全部</p>
                        </div>
                      </span>
                    </div>

                  </div>


              }


              <div className="padding20 edu-back-white mb10 mt10" style={{
                display: TPMRightSectionData === undefined ? "none" : TPMRightSectionData.paths === undefined ? "" : TPMRightSectionData.paths.length === 0 ? "none" : "block"
              }}>
                <p className="mb20 font-16 clearfix"><i className={"iconfont icon-shu1 audit_situationactive font-14"}></i>  所属课程</p>
                <div className="recommend-list">
                  {
                    TPMRightSectionData === undefined ? "" : TPMRightSectionData.paths === undefined ? "" : TPMRightSectionData.paths.map((i, k) => {
                      if(k>2){

                      }else{
                        return (

                          <div className="recomments clearfix df" key={k}>

                            <a href={"/paths/" + i.id} height="96" width="128" target="_blank">

                              <img alt="实训" height="96" src={"/" + i.image_url} width="128" className={"altimgs"}/>
                            </a>

                            <div className="ml10 flex1">
                              <a href={"/paths/" + i.id} target="_blank" data-tip-down={i.name}
                                 className="color-grey-6 task-hide mb12 recomment-name">{i.name}</a>
                              <p className="clearfix mt8 font-12 color-grey-B4">

                                <Tooltip placement="bottom" title={"章节"}>
                                <span className="mr10 fl squareIconSpan"><i
                                  className="iconfont icon-shixun fl mr3"></i>{i.stages_count}</span>
                                </Tooltip>

                                {/*<Tooltip placement="bottom" title={"经验值"}>*/}
                                {/*<span className="mr10 fl squareIconSpan"><i className="iconfont icon-jingyan fl mr3"></i>{i.score_count}</span>*/}
                                {/*</Tooltip>*/}

                                <Tooltip placement="bottom" title={"学习人数"}>
                                <span className="mr10 fl squareIconSpan"><i
                                  className="iconfont icon-chengyuan fl mr3"></i>{i.members_count}</span>
                                </Tooltip>

                              </p>
                            </div>

                          </div>

                        )
                      }

                    })
                  }
                </div>
              </div>

              {TPMRightSectionData === undefined ? "" : TPMRightSectionData.paths === undefined ? "" : TPMRightSectionData.paths.length === 0 ? "" :
                this.props.user && this.props.user.main_site === true ? <div className="padding20 edu-back-white"
                                                                             style={{
                                                                               display:
                                                                                 TPMRightSectionData === undefined ? "none" : TPMRightSectionData.recommands === undefined ? "none" : TPMRightSectionData.recommands.length === 0 ? "none" : "block"
                                                                             }}
                >
                  <p className="mb20 font-16 clearfix"><i className={"iconfont icon-tuijian audit_situationactive font-14"}></i>  推荐实训</p>
                  <div className="recommend-list">
                    {
                      TPMRightSectionData === undefined ? "" : TPMRightSectionData.recommands === undefined ? "" : TPMRightSectionData.recommands.map((item, key) => {
                        if(key>2){

                        }else{
                          return (
                            <div className="recomments clearfix df" key={key}>
                              <a href={"/shixuns/" + item.identifier + "/challenges"} target="_blank">
                                <img alt="69?1526971094" height="96" src={"/" + item.pic} width="128" className={"altimgs"}/>
                              </a>
                              <div className="ml10 flex1">
                                <Tooltip placement="bottom" title={item.name}>
                                  <a href={"/shixuns/" + item.identifier + "/challenges"} target="_blank"
                                     className="color-grey-6 task-hide mb12 recomment-name">{item.name}</a>
                                </Tooltip>
                                <p className="clearfix mt8 font-12 color-grey-B4">
                                  <span className="fl">{item.stu_num} 人学习</span>
                                  <span className="fr color-orange pr10">{item.level}</span>
                                </p>

                              </div>
                            </div>
                          )
                        }

                      })
                    }
                  </div>
                </div> : ""
              }
            </div>
        }
      </div>
    )


  }
}

export default TPMRightSection;
