import React, {Component} from 'react';

import {Link} from "react-router-dom";

import {Rating, Progress} from "@icedesign/base";

import {Modal, Input, Radio, Pagination, message, Spin, Icon, Tooltip, Button,Popover} from 'antd';

import AccountProfile from "../user/AccountProfile";

import 'antd/lib/pagination/style/index.css';

import axios from 'axios'

import Modals from '../modals/Modals';

import './shixuns/css/TPMBanner.css';
import types from "../../redux/actions/actionTypes";

let $ = window.$;

const Search = Input.Search;

const RadioGroup = Radio.Group;

const { TextArea } = Input;

class TPMBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Forkvisible: false,
      Senttothetype: false,
      Senttothevcalue: undefined,
      courses_count: 1,
      course_list: [],
      pagenum: 1,
      publishbox: "",
      publishboxstatus: 0,
      pages: 1,
      Issuevisible: false,
      evaluation_set_position: [],
      tag_position: [],
      Forkauthentication: false,
      can_fork: undefined,
      certi_url: undefined,
      showradios: false,
      startbtn: false,
      Searchvalue: "",
      startshixunCombattype: false,
      shixunsmessage: "",
      shixunsreplace: false,
      hidestartshixunsreplacevalue: "",
      isIE: false,
      Forkvisibletype: false,
      isSpin: false,
      Senttothevcaluetype: false,
      jupyterbool: false,
      openknow:false,
      openshowpublictype:false,
      Radiovalue:1,
      TextAreaintshow:false,

    }
  }


  IEVersion = () => {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6;//IE版本<=7
      }
    } else if (isEdge) {
      return 'edge';//edge
    } else if (isIE11) {
      return 11; //IE11
    } else {
      return -1;//不是ie浏览器
    }
  }

  openknow=()=>{
    let storage=window.localStorage;
    this.setState({
      openknow:false
    })
    let shixunopenprocess=this.props.user&&this.props.user.user_id+'shixunopenprocess';
    storage.setItem(shixunopenprocess,true);
  }

  openshowpublic=()=>{
    let storage=window.localStorage;
    this.setState({
      openshowpublictype:false
    })
    let openopenpublictype=this.props.user&&this.props.user.user_id+'openopenpublictype';
    storage.setItem(openopenpublictype,true);
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {

      if(prevProps.user != this.props.user){
        if(this.props.user&&this.props.user.admin===true||this.props.user&&this.props.user.business===true){
          this.setState({
            TextArea:"云上实验室使用"
          })
        }
      }
      let getshixunopenprocess=this.props.user&&this.props.user.user_id+'shixunopenprocess';
      let getopenopenpublictype=this.props.user&&this.props.user.user_id+'openopenpublictype';
      let shixunopenprocess=window.localStorage.getItem(getshixunopenprocess)
      let openopenpublictype=window.localStorage.getItem(getopenopenpublictype)
      if(this.props.status===0&&this.props.openknows===false){

        if(this.props.shixunsDetails&&this.props.shixunsDetails.shixun_status === 0 && this.props.identity < 5){
          if(this.props.user&&this.props.user.user_id){
            if(shixunopenprocess===undefined||shixunopenprocess===false||shixunopenprocess===null){
              this.setState({
                openknow:true
              })
              setTimeout(()=>{
                this.openknow()
                this.setState({
                  openknow:false
                })
              }, 10000);

            }else{
              this.setState({
                openknow:false
              })
            }
          }
          }

      }else{
        this.setState({
          openknow:false
        })
      }



      if(this.props.public===0&&this.props.status>1&&this.props.openknows===false){
        if(this.props.shixunsDetails&&this.props.shixunsDetails.shixun_status === 2 && this.props.shixunsDetails&&this.props.shixunsDetails.public===0 && this.props.identity < 5){
          if(this.props.user&&this.props.user.user_id) {
            if (openopenpublictype === undefined || openopenpublictype === false || openopenpublictype === null) {
              this.setState({
                openshowpublictype: true
              })
              setTimeout(()=>{
                this.openshowpublic()
                this.setState({
                  openshowpublictype:false
                })
              }, 10000);
            } else {
              this.setState({
                openshowpublictype: false
              })
            }
          }
        }
      }else{
        this.setState({
          openshowpublictype:false
        })
      }




    }
  }


  componentDidMount() {

    let thiisie = this.IEVersion();
    if (thiisie != -1) {
      this.setState({
        isIE: true
      })
    } else {
      this.setState({
        isIE: false
      })
    }

    if (this.props.user && this.props.user.admin === true || this.props.user && this.props.user.business === true) {
      this.setState({
        TextArea: "云上实验室使用"
      })
    }
  }
  /*
  * Fork
  * */
  copyForkvisible = () => {
    let {shixunsDetails} = this.props;
    if (shixunsDetails.can_fork === null) {
      this.setState({
        Forkvisible: true
      })
    } else {
      this.setState({
        Forkvisible: false,
        Forkauthentication: true,
        can_fork: shixunsDetails.can_fork.can_fork,
        certi_url: shixunsDetails.can_fork.certi_url,
      })
    }

  }

  hideForkvisible = () => {
    this.setState({
      Forkvisible: false,
      Forkauthentication: false
    })
  }

  changeTextArea=(e)=>{
    this.setState({
      TextArea:e.target.value
    })
  }

  addForkvisible = () => {
    let reason;
    switch (this.state.Radiovalue) {
      case 1:
        reason="Shixun";
        break;
      case 2:
        reason="Course";
        break;
      case 3:
        reason="Subject";
        break;
      case 4:
        reason=this.state.TextArea;
    }

   if(this.state.Radiovalue===4){
     if(this.state.TextArea===null||this.state.TextArea===undefined||this.state.TextArea=== ""){
       this.setState({
         TextAreaintshow:true
       })
       return
     }
   }

    this.setState({
      Forkvisibletype:true,
    })

    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/copy.json";
    axios.post(url, {
      reason:reason,
    }).then((response) => {
      if (response.data.status === 401) {

      } else {
        this.setState({
          Forkvisible: false,
          Forkauthentication: false,
          // Forkvisibletype:false
        })
        window.location.href = "/shixuns/" + response.data.shixun + "/challenges";
      }

    }).catch((error) => {
      console.log(error)
    });

  }
  /*
  * 发送至按钮
  * */
  Senttothe = () => {
    if (this.props.checkIfLogin() === false) {
      this.props.showLoginDialog()
      return
    }

    // if(this.props.checkIfProfileCompleted()===false){
    // 	this.setState({
    // 		AccountProfiletype:true
    // 	})
    // 	return
    // }
    //
    // if(this.props.checkIfProfessionalCertification()===false){
    // 	this.setState({
    // 		AccountProfiletype:true
    // 	})
    // 	return
    // }
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/search_user_courses.json";
    this.setState({
      Senttothetype: true
    })

    axios.get(url, {
      params: {
        page: 1,
        limit: 10
      }
    }).then((response) => {
      this.setState({
        courses_count: response.data.courses_count,
        course_list: response.data.course_list
      })
    }).catch((error) => {
      console.log(error)
    });
  }

  SenttotheSearch = (value) => {
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/search_user_courses.json?search=" + value;
    axios.get(encodeURI(url), {
      params: {
        page: 1,
        limit: 10
      }
    }).then((response) => {
      this.setState({
        courses_count: response.data.courses_count,
        course_list: response.data.course_list,
        pages: 1,
        Searchvalue: value
      })
    }).catch((error) => {
      console.log(error)
    });
  }

  onChangeSenttothevcalue = (e) => {
    this.setState({
      Senttothevcalue: e.target.value
    })
  }
  onChangesendeSenttothe = (pageNumber) => {
    let {Searchvalue} = this.state;
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/search_user_courses.json?search=" + Searchvalue;
    axios.get(url, {
      params: {
        page: pageNumber,
        limit: 10
      }
    }).then((response) => {
      this.setState({
        courses_count: response.data.courses_count,
        course_list: response.data.course_list,
        pagenum: pageNumber,
        pages: pageNumber
      })
    }).catch((error) => {
      console.log(error)
    });
  }
  sendeSenttothevcalue = () => {

    let {Senttothevcalue} = this.state;

    if (Senttothevcalue === undefined) {
      this.setState({
        Senttothevcaluetype: true
      })
      return
    }
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/send_to_course.json";
    axios.post(url, {
      course_id: Senttothevcalue
    }).then((response) => {

      this.props.showSnackbar(response.data.message);
      this.setState({
        Senttothetype: false,
        Searchvalue: "",
        pages: 1
      })
      // window.location.href = response.data.url;
      // response.data.course_id
      this.props.history.replace(response.data.first_category_url);

    }).catch((error) => {
      console.log(error)
    });

  }

  hideSenttothevcalue = () => {
    this.setState({
      Senttothetype: false,
      Searchvalue: "",
      pages: 1
    })


  }

  /*
  * 撤销发布按钮
  * */

  ModalCancel = () => {
    this.setState({
      Modalstype: false,
      Modalstopval: "",
      modalsMidval:undefined,
      ModalsBottomval:"",
      modalstyles:"",
    })
  }
  ModalSave = () => {
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/cancel_publish.json";
    axios.get(url).then((response) => {
      this.props.showSnackbar(response.data.message);
      window.location.reload()
    }).catch((error) => {
      console.log(error)
    });
  }

  cancel_publish = () => {
    this.setState({
      Modalstype: true,
      Modalstopval: "是否确认撤销发布？",
      modalsMidval:"撤销发布后，学员将无法进行练习，若您新增关",
      ModalsBottomval:"卡，学员需要重新体验实训",
      ModalCancel: this.ModalCancel,
      ModalSave: this.ModalSave,
      modalstyles:"848282"
    })
  }
  ModalSaveopenpublic= () => {
    this.setState({
      Modalstype: true,
      Modalstopval: "公开申请已提交，请等待管理员的审核",
      modalsMidval:"• 我们将在1-2个工作日内完成审核",
      ModalCancel: this.eopenpublicupdatadata,
      ModalSave: this.eopenpublicupdatadata,
      Loadtype:true,
      modalstyles:"848282"
    })
  }
  eopenpublicupdatadata=()=>{
    window.location.reload()
  }
  openpublic=()=>{
    let id = this.props.match.params.shixunId;
    let url = `/shixuns/${id}/apply_public.json`;
    axios.get(url).then((response) => {
     if(response.data.status===0){
       this.ModalSaveopenpublic()

     }
    }).catch((error) => {
      console.log(error)
    });
  }

  ModalhidenpublicSave=()=>{
    let id = this.props.match.params.shixunId;
    let url = `/shixuns/${id}/cancel_apply_public.json`;
    axios.get(url).then((response) => {
      if(response.data.status===0){
         window.location.reload()
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  hidenpublic=()=>{
    this.setState({
      Modalstype: true,
      Modalstopval: "是否确认撤销申请公开？",
      modalsMidval:" ",
      ModalsBottomval:" ",
      ModalCancel: this.ModalCancel,
      ModalSave: this.ModalhidenpublicSave,
    })

  }
  /*
  * 申请发布按钮
  * */
  applyrelease = () => {
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/publish.json";
    axios.get(url).then((response) => {
      let evaluation_set_position
      if (response.data.evaluation_set_position === null) {
        evaluation_set_position = []
      } else {
        evaluation_set_position = response.data.evaluation_set_position
      }
      if(response.data.status===0){
        window.location.reload()
      }else{
        this.setState({
          Issuevisible: true,
          tag_position: response.data.tag_position,
          evaluation_set_position: evaluation_set_position,
          publishboxstatus: response.data.status,
        })
      }

    }).catch((error) => {
      console.log(error)
    });
  };

  hiddenIssuevisible = (val) => {
    this.setState({
      Issuevisible: false
    })
    if (val === 0 || val === 1) {
      window.location.reload()
    }

  }

  //重置按钮
  // resetshixunCombat=(id)=>{
  //     let zrl="/myshixuns/"+id+"/reset_my_game.json";
  //     axios.get(zrl).then((response) => {
  //         window.location.href = "/shixuns/" + response.data.shixun_identifier + "/challenges";
  //         message.success('重置成功');
  //     }).catch((error) => {
  //         console.log(error)
  //     });
  // }

  // reset_my_game
  hidestartshixunsreplace = (url) => {
    this.setState({
      isSpin: true,
    })
    axios.get(url).then((response) => {
        if (response.status === 200) {
          // let path="/shixuns/"+response.data.shixun_identifier+"/challenges";
          // this.props.history.push(path);
          message.success('重置成功，正在进入实训！');
          this.startshixunCombat(response.data.shixun_identifier, 1);
          this.setState({
            shixunsreplace: false,
            isSpin: false,
          })

          // message.success('重置成功，正在进入实训！');
          // this.startshixunCombat();
        }
      }
    ).catch((error) => {
      this.setState({
        startbtn: false,
        shixunsreplace: false,
        isSpin: false
      })
    });

  }


  //开始实战按钮
  startshixunCombat = (id, reset) => {

    if(this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter===true){
      if (this.props.checkIfLogin() === false) {
        this.props.showLoginDialog()
        return
      }

      if (this.props.checkIfProfileCompleted() === false) {
        this.setState({
          AccountProfiletype: true
        })
        return
      }

      // if(this.props.checkIfProfessionalCertification()===false){
      // 	this.setState({
      // 		AccountProfiletype:true
      // 	})
      // 	return
      // }

      let {shixunsDetails} = this.props
      if (shixunsDetails.shixun_status > 1) {
        this.setState({
          startbtn: true,
          hidestartshixunsreplacevalue: ""
        })
      } else {
        this.setState({
          hidestartshixunsreplacevalue: ""
        })
      }


      let url = "/shixuns/" + id + "/jupyter_exec.json";
      if (reset) {
        url += '?reset=' + reset
      }
      axios.get(url).then((response) => {
        if (response.status === 200) {
          if (response.data.status === -2) {
            // this.resetshixunCombat(response.data.message);
            this.setState({
              startbtn: false,
              shixunsreplace: true,
              hidestartshixunsreplacevalue: response.data.message + ".json"
            })
            // this.shixunexec(response.data.message+".json")
          } else if (response.data.status === -1) {

          } else if (response.data.status === -3) {
            this.setState({
              shixunsmessage: response.data.message,
              startshixunCombattype: true,
              startbtn: false
            })
          } else {
            // let path="/tasks/"+response.data.game_identifier;
            // this.props.history.push(path);


            // this.context.router.history.push(path);
            if (response.data.status != 401) {
              window.location.href = "/tasks/" + response.data.identifier+`/jupyter`;
            }

          }
        }
      }).catch((error) => {
        this.setState({
          startbtn: false
        })
      });
    }else{
      if (this.props.checkIfLogin() === false) {
        this.props.showLoginDialog()
        return
      }

      if (this.props.checkIfProfileCompleted() === false) {
        this.setState({
          AccountProfiletype: true
        })
        return
      }

      // if(this.props.checkIfProfessionalCertification()===false){
      // 	this.setState({
      // 		AccountProfiletype:true
      // 	})
      // 	return
      // }

      let {shixunsDetails} = this.props
      if (shixunsDetails.shixun_status > 1) {
        this.setState({
          startbtn: true,
          hidestartshixunsreplacevalue: ""
        })
      } else {
        this.setState({
          hidestartshixunsreplacevalue: ""
        })
      }


      let url = "/shixuns/" + id + "/shixun_exec.json";
      if (reset) {
        url += '?reset=' + reset
      }
      axios.get(url).then((response) => {
        if (response.status === 200) {
          if (response.data.status === -2) {
            // this.resetshixunCombat(response.data.message);
            this.setState({
              startbtn: false,
              shixunsreplace: true,
              hidestartshixunsreplacevalue: response.data.message + ".json"
            })
            // this.shixunexec(response.data.message+".json")
          } else if (response.data.status === -1) {

          } else if (response.data.status === -3) {
            this.setState({
              shixunsmessage: response.data.message,
              startshixunCombattype: true,
              startbtn: false
            })
          } else {
            // let path="/tasks/"+response.data.game_identifier;
            // this.props.history.push(path);


            // this.context.router.history.push(path);
            if (response.data.status != 401) {
              window.location.href = "/tasks/" + response.data.game_identifier;
            }

          }
        }
      }).catch((error) => {
        this.setState({
          startbtn: false
        })
      });
    }


  }

  tocertification = () => {
    let {certi_url} = this.state;
    this.setState({
      Forkauthentication: false
    })
    window.location.href = certi_url;
  }

  SenttotheValue = (e) => {
    this.setState({
      Searchvalue: e.target.value
    })
  }

  hidestartshixunCombattype = () => {
    this.setState({
      startshixunCombattype: false
    })
  }

  hideAccountProfile = () => {
    this.setState({
      AccountProfiletype: false
    })
  }


  onChangeRadiovalue=(e)=>{
    this.setState({
      Radiovalue:e.target.value
    })
    if(e.target.value!=4){
      this.setState({
        TextAreaintshow:false
      })
    }
  }

  render() {
    let {
      Forkvisible,
      Senttothetype,
      Senttothevcalue,
      evaluation_set_position,
      Forkauthentication,
      can_fork,
      certi_url,
      tag_position,
      courses_count,
      course_list,
      Issuevisible,
      publishboxstatus,
      showradios,
      startbtn,
      Searchvalue,
      startshixunCombattype,
      shixunsmessage,
      pages,
      shixunsreplace,
      hidestartshixunsreplacevalue,
      Forkvisibletype,
      AccountProfiletype,
      isIE
    } = this.state;
    let {shixunsDetails, shixunId, star_info, star_infos} = this.props;
    let challengeBtnTipText = '';
    let challengeBtnText = '模拟实战';
    // let star_info=[]
    // 	if (shixunsDetails.status === 0) {
    //
    // 	} else if (shixunsDetails.status === 1) {
    //
    // 	} else if (shixunsDetails.status === 2) {
    // 		challengeBtnTipText = '开始学习并完成实战任务'
    //
    // }
    if (shixunsDetails != undefined) {
      if (shixunsDetails.shixun_status === 0) {
        challengeBtnText = '继续实战'
      } else if (shixunsDetails.shixun_status === 1) {
        challengeBtnText = '查看实战'
      } else if (shixunsDetails.shixun_status === 3) {
        challengeBtnText = '继续实战'
      } else {
        challengeBtnText = "开始实战"
      }
    }


    // let list=shixunsDetails.task_operation;
    // if(list!=undefined){
    //     if (shixunsDetails.status === 0 ) {
    //         for(var i=0; i<list.length; i++){
    //             challengeBtnText =list[0]
    //         }
    //     } else if (shixunsDetails.status === 1) {
    //         for(var i=0; i<list.length; i++){
    //             challengeBtnText =list[0]
    //         }
    //     } else if (shixunsDetails.status === 3) {
    //         for(var i=0; i<list.length; i++){
    //             challengeBtnText =list[0]
    //         }
    //     }else{
    //         for(var i=0; i<list.length; i++){
    //             challengeBtnText =list[0]
    //         }
    //     }
    // }
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
    const MyRate = ({defaultValue, ...rest}) => {
      let myValue = defaultValue;
      return <Rating {...rest} value={myValue}/>;
    };
    //
    // console.log(this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter)

    // console.log(this.state)
    return (

      shixunsDetails === undefined ? "" :
        <div className="shixunDetail" id={"shixunDetail"}>
          <style>
            {
              `
              .shixunDetail_top{
                  height: 180px !important;
                  padding-top:50px !important;
              }
              .ant-popover{
               z-index:1000 !important;
              }
              `
            }
          </style>
          <div className="shixunDetail_top">

            {AccountProfiletype === true ? <AccountProfile
              hideAccountProfile={() => this.hideAccountProfile()}
              {...this.props}
              {...this.state}
            /> : ""}


            {this.state.Modalstype === true ? <Modals
              modalsType={this.state.Modalstype}
              modalsTopval={this.state.Modalstopval}
              modalCancel={this.state.ModalCancel}
              modalSave={this.state.ModalSave}
              modalsBottomval={this.state.ModalsBottomval}
              modalsMidval={this.state.modalsMidval}
              loadtype={this.state.Loadtype}
              modalstyles={this.state.modalstyles}
            /> : ""}

            <div className="educontent clearfix">
              <p className="clearfix">
                <a href={"/shixuns/" + shixunsDetails.identifier + "/challenges"}
                   className="font-28 color-white mr10 fl">{shixunsDetails.name}</a>
                {
                  shixunsDetails.fork_from === undefined || shixunsDetails.fork_from === null ? "" :
                    <a href={"/shixuns/" + shixunsDetails.fork_from.fork_identifier + "/challenges"}
                       className="fl mt5"
                       target="_blank"
                       data-tip-right={"forked from " + shixunsDetails.fork_from.username + " / " + shixunsDetails.fork_from.name}>
                      <i className="iconfont icon-fork color-grey-74 font-20 fl"></i>
                    </a>
                }

              </p>
              <div className="clearfix mt10">

                <ul className="fl color-grey-c pathInfo mt20">
                  {shixunsDetails&&shixunsDetails.stu_num===0?"":<li>
                    <span>学习人数</span>
                    <span className="mt3">{shixunsDetails.stu_num}</span>
                  </li>}
                  {/*<li>*/}
                  {/*<span>经验值</span>*/}
                  {/*<span className="mt10">{shixunsDetails.experience}</span>*/}
                  {/*</li>*/}
                  <li>
                    <span>难度级别</span>
                    <span className="shixunsdiffcult mt3">{shixunsDetails.diffcult}</span>

                  </li>
                </ul>
								{ this.props.is_jupyter===true?"":
                      <Popover placement="right" content={
                        <div style={{"width": "530px"}} >
                          <div className="pr">
                            <span className="rateTrangle"></span>
                            <div className="pr clearfix" style={{height: '177px'}}>
                              <div className="fl totalScore ml10">
                                <div>
                                  <span className="font-24 color-yellow-ff lineh-20 mb10 mlbanner36">{star_infos[0]}分</span>
                                  <span className="displayblock mt20">总评分</span>
                                  <div className="rateYo">
                                      <MyRate allowHalf defaultValue={star_info[0]} disabled/>
                                  </div>
                                </div>
                              </div>
                              <div className="fr mt20 mr20" style={{width: '375px'}}>
                                <div className="clearfix">
                                  <div className="rateYo fl mt3">
                                      <MyRate allowHalf defaultValue={5} disabled/>
                                  </div>
                                  <Progress percent={star_infos[1]} showInfo={false}></Progress>
                                  <span className="fr ml10 color-grey-6 font-12 mt4">{star_infos[1]}%</span>
                                </div>
                                <div className="clearfix">
                                  <div className="rateYo fl mt3">
                                      <MyRate allowHalf defaultValue={4} disabled/>
                                  </div>
                                  <Progress percent={star_infos[2]} showInfo={false}></Progress>
                                  <span className="fr ml10 color-grey-6 font-12 mt4">{star_infos[2]}%</span>
                                </div>
                                <div className="clearfix">
                                  <div className="rateYo fl mt3">
                                      <MyRate allowHalf defaultValue={3} disabled/>
                                  </div>
                                  <Progress percent={star_infos[3]} showInfo={false}></Progress>
                                  <span className="fr ml10 color-grey-6 font-12 mt4">{star_infos[3]}%</span>
                                </div>
                                <div className="clearfix">
                                  <div className="rateYo fl mt3">
                                      <MyRate allowHalf defaultValue={2} disabled/>
                                  </div>
                                  <Progress percent={star_infos[4]} showInfo={false}></Progress>
                                  <span className="fr ml10 color-grey-6 font-12 mt4">{star_infos[4]}%</span>
                                </div>
                                <div className="clearfix">
                                  <div className="rateYo fl mt3">
                                      <MyRate allowHalf defaultValue={1} disabled/>
                                  </div>
                                  <Progress percent={star_infos[5]} showInfo={false}></Progress>
                                  <span className="fr ml10 color-grey-6 font-12 mt4">{star_infos[5]}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }>
                        <div className="pr fl mt15" id="commentsStar">
                          <div className={"color-grey-c  ml15"} style={{color: "#fff", textAlign: "center"}}>学员评分</div>
                          <div className="rateYo">
                            <MyRate allowHalf defaultValue={star_info[0]} disabled/>
                          </div>
                        </div>
                      </Popover>}


                {
                  startbtn === false && shixunsDetails.shixun_status != -1 ?
                    <Tooltip placement="bottom" title={
                      shixunsDetails.task_operation === undefined ? "" : shixunsDetails.task_operation[0] === "开始实战" ? "开始学习并完成实战任务" : shixunsDetails.task_operation[0] === "继续挑战" ? "继续完成后续学习和实战任务" :
                        shixunsDetails.task_operation[0] === "查看实战" ? "查看我的实战光辉历史" :
                          shixunsDetails.task_operation[0] === "模拟实战" ? "模拟完成实战任务" : shixunsDetails.task_operation[0] === "开启挑战" ? "开始学习并完成实战任务" : ""
                    }>
                      <a onClick={() => this.startshixunCombat(this.props.match.params.shixunId)}
                         className="fr user_default_btn task-btn-orange font-18"
                         id="shixun_operation" data-remote="true"
                      >
                        {shixunsDetails.task_operation === undefined ? "" : shixunsDetails.shixun_status > 1 ? shixunsDetails.task_operation[0] : "模拟实战"}
                      </a>
                    </Tooltip>
                    : ""
                }

                <Modal
                  keyboard={false}
                  title="提示"
                  visible={startshixunCombattype}
                  closable={false}
                  footer={null}
                >
                  <div className="task-popup-content">
                    <p className="task-popup-text-center font-16 pb20">目前该实训项目尚在内测中，将于{shixunsmessage}之后开放，谢谢！</p>
                  </div>
                  <div className="task-popup-submit clearfix">
                    {/*<a onClick={this.hidestartshixunCombattype} className="task-btn fl">取消</a>*/}
                    <a className="task-btn task-btn-orange fr mr51" onClick={this.hidestartshixunCombattype}>知道啦</a>
                  </div>
                  {/*<p className="inviteTipbtn with100 fl">*/}
                  {/*<a onClick={this.hidestartshixunCombattype}>知道了</a>*/}
                  {/*</p>*/}
                </Modal>

                <Modal
                  keyboard={false}
                  title="提示"
                  visible={shixunsreplace}
                  closable={false}
                  footer={null}
                >
                  <Spin indicator={antIcon} spinning={this.state.isSpin}>
                    <div className="task-popup-content">
                      <p className="task-popup-text-center font-16 pb20">实训已经更新了，正在为您重置!</p>
                    </div>
                    <div className="task-popup-submit clearfix">
                      <a className="task-btn task-btn-orange fr mr51"
                         onClick={() => this.hidestartshixunsreplace(hidestartshixunsreplacevalue)}>知道了</a>
                    </div>
                  </Spin>
                </Modal>

                <Modal
                  keyboard={false}
                  visible={startbtn}
                  closable={false}
                  footer={null}
                  className="startbtnModal"
                >
                  <Spin size="large"/>
                </Modal>

                {
                  startbtn === true ?
                    <a className="fr kaike kkbths mr15 font-18">开启中</a> : ""
                }

                {/*{*/}
                {/*shixunsDetails.status=== 3 && shixunsDetails.task_operation[0]==="开始实战"?*/}
                {/*<a onClick={this.startshixunCombat} className="fr user_default_btn task-btn-orange font-18"*/}
                {/*data-tip-down="开始学习并完成实战任务"*/}
                {/*id="shixun_operation" data-remote="true"*/}
                {/*>{shixunsDetails.task_operation===undefined?"":shixunsDetails.task_operation[0]}</a>:""*/}
                {/*}*/}

                {shixunsDetails.shixun_status === 0 && this.props.identity < 5 ?
                  <Popover
                    content={
                       <pre className={"bannerpd201"}>
                          <div>点击发布后，可以马上应用到自</div>
                          <div className={"wechatcenter mt10"}>己的课堂和课程</div>
                          <div className={"wechatcenter mt15"}><Button  type="primary" onClick={this.openknow} >我知道了</Button></div>
                       </pre>
                    }
                    trigger="click"
                    placement="bottom"
                    visible={this.state.openknow}
                  >
                    <Tooltip placement="bottom" title={"发布后，可以使用到自己的课堂和课程"}>
                    <a onClick={this.applyrelease} className="fr kaike kkbths mr20 font-18 height39"
                       id="challenge_begin">发布</a>
                    </Tooltip>
                  </Popover>: ""
                }

                <Modal
                  keyboard={false}
                  title="提示"
                  visible={Issuevisible}
                  closable={false}
                  footer={null}
                >
                  {
                    publishboxstatus === 0 ? <div className="task-popup-content">
                      <p className="task-popup-text-center font-16 mt10 mb10">
                        发布申请已提交，请等待管理员的审核<br/>
                      </p>
                    </div> : publishboxstatus === 1 ?
                      <div className="task-popup-content">
                        <p className="task-popup-text-center font-16 mt10 mb10">
                          发布申请已提交，请等待管理员的审核<br/>
                          <span className="font-12 color-grey-8"> • 我们将在1-2个工作日内完成审核</span>
                        </p>
                      </div> : publishboxstatus === 2 ? <div className="task-popup-content">
                        <p className="task-popup-text-center font-16  mt10 mb10">
                          第
                          {
                            evaluation_set_position.map((item, key) => {
                              return (
                                <span key={key}>{item}<span
                                  style={{display: key != evaluation_set_position.length - 1 ? "inline-block" : 'none'}}>,</span></span>
                              )
                            })
                          }
                          关评测设置尚未完成，无法申请发布
                        </p>
                      </div> : publishboxstatus === 3 ?
                        <div className="task-popup-content">
                          <p className="task-popup-text-center font-16 mt10 mb10">
                            每一个关卡至少需要一个技能标签<br/>
                            第
                            {
                              tag_position.map((item, key) => {
                                return (
                                  <span key={key}>{item}<span
                                    style={{display: key != tag_position.length - 1 ? "inline-block" : 'none'}}>,</span></span>
                                )
                              })
                            }
                            关尚未设置技能标签，请补充
                          </p>
                        </div> :
                        <div className="task-popup-content">
                          <p className="task-popup-text-center font-16  mt10 mb10">
                            尚未创建任务的实训，不能申请发布
                          </p>
                        </div>
                  }
                  <div className="mb15 clearfix edu-txt-center">
                    <a onClick={() => this.hiddenIssuevisible(publishboxstatus)}
                       className="task-btn task-btn-orange pop_close">知道啦</a>
                  </div>

                </Modal>

                {shixunsDetails.shixun_status === 2 && shixunsDetails.public===0 && this.props.identity < 5 ?
                  <Popover
                  content={
                  <pre className={"bannerpd201"}>
                  <div>平台审核完成后，您的实训将会录入到平台的公共实训项目列表</div>
                  <div className={"wechatcenter mt10"}>您将获得实训<span className={"FF6802"}>对应的经验值和金币</span>～ </div>
                  <div className={"wechatcenter mt15"}><Button  type="primary" onClick={this.openshowpublic} >我知道了</Button></div>
                  </pre>
                }
                  trigger="click"
                  placement="bottom"
                  visible={this.state.openshowpublictype}
                  >
                    <Tooltip placement="bottom" title={"审核通过后，平台用户可以查看实训"}>
                      <Button type="primary" ghost id="challenge_begin" onClick={this.openpublic} className="fr kaike kkbths mr20 font-18 height39">
                        申请公开
                      </Button>
                    </Tooltip>
                  </Popover>: ""
                }

                {shixunsDetails.shixun_status === 2 && shixunsDetails.public===1 && this.props.identity < 5 ?
                  <Tooltip placement="bottom" title={"撤销后，仅可以使用到自己的课堂和课程"}>
                    <Button type="primary" ghost id="challenge_begin" onClick={this.hidenpublic} className="fr kaike kkbths mr20 font-18 height39" style={{'width': '140px'}}>
                      撤销申请公开
                    </Button>
                  </Tooltip>: ""
                }

                {shixunsDetails.shixun_status === 2 && shixunsDetails.public===0 && this.props.identity < 5 ?
                  <Tooltip placement="bottom" title={"撤销发布后，学员将无法进行练习"}>
                  <a onClick={this.cancel_publish} className="fr kaike kkbths mr20 font-18 height39"
                     id="challenge_begin">撤销发布</a>
                  </Tooltip>
                  : ""
                }

                {
                  this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter===true?"":<a onClick={this.Senttothe}
                     className="fr kaike kkbths mr20 font-18"
                     data-tip-down=""
                     style={{display: shixunsDetails.shixun_status === 0 || shixunsDetails.shixun_status === 3 || shixunsDetails.shixun_status === 1 || shixunsDetails.shixun_status === -1 ? "none" : "block"}}
                     data-remote="true">
                    <Tooltip placement="bottom" title={"以实训作业的形式发送到我的课堂"}>
                      发送至
                    </Tooltip>
                  </a>
                }

                <Modal
                  keyboard={false}
                  title="发送实训"
                  visible={Senttothetype}
                  closable={false}
                  footer={null}
                >
                  <div className="">
                    <div className="newupload_conbox">

                      <div className="mb15 font-14 edu-txt-center color-orange-tip">
                        选择的实训将会发送到指定课堂
                      </div>

                      <div className="mb10 edu-position">
                        <Search
                          placeholder="输入课堂名称的关键字进行搜索"
                          value={Searchvalue}
                          onInput={this.SenttotheValue}
                          onSearch={(value) => this.SenttotheSearch(value)}
                          style={{width: '100%'}}
                        />
                      </div>
                      <style>
                        {`
																.edu-h270{
																	 height:270px;
																	  overflow-y: auto;
																}
															`}
                      </style>

                      <div id="search_course_list" className={courses_count > 12 ? "cdefault " : "cdefault "}>
                        <div className="clearfix mb20 edu-bg-light-blue edu-h270">
                          <ul>
                            <RadioGroup onChange={this.onChangeSenttothevcalue} value={Senttothevcalue}>
                              {
                                course_list === undefined ? "" : course_list.map((item, key) => {
                                  return (
                                    <Radio style={radioStyle} value={item.course_id}
                                           key={key}>{item.name}</Radio>
                                  )
                                })
                              }
                            </RadioGroup>
                          </ul>
                        </div>
                      </div>
                      {this.state.Senttothevcaluetype === true ? <div className={"color-red"}>请选择你要发送的课堂</div> : ""}
                      <div className="mt10 marginauto" style={{display: courses_count > 12 ? "block" : "none"}}>
                        <Pagination size="small" className="mb20"
                                    showQuickJumper defaultCurrent={1} current={pages} pageSize={10}
                                    total={courses_count} onChange={this.onChangesendeSenttothe}/>
                      </div>

                      <div className="mt10 marginauto flexbannerright">
                        <div className={"-flex"}></div>
                        <div className={"-flex"}></div>
                        <div className={"-flex"}>
                          <a onClick={this.hideSenttothevcalue}
                             className="pop_close task-btn mr10 ml25 margin-tp26">取消</a>
                          <a className="task-btn task-btn-orange margin-tp26"
                             onClick={this.sendeSenttothevcalue}
                             id="submit_send_shixun">确定</a>
                        </div>


                      </div>

                    </div>
                  </div>
                </Modal>

                {shixunsDetails.shixun_status === 3 &&
                <a className="fr kaike kkbths mr15 font-18">已关闭</a>
                }

                {shixunsDetails.shixun_status === -1 &&
                <a className="fr kaike kkbths mr15 font-18">已删除</a>
                }


                {this.props.identity < 8 && shixunsDetails.shixun_status != -1 && shixunsDetails.shixun_status != 0?
                  <div className="fr kaike kkbth mr20"
                       style={{display: shixunsDetails.can_copy === false || shixunsDetails.can_copy === null ? "none" : "flex"}}>
                    <Tooltip placement="bottom" title={"基于这个实训修改形成新的实训"}>
                       <span className="flex1 edu-txt-center fl font-18"
                             onClick={this.copyForkvisible}
                             style={{display: shixunsDetails.can_copy === false || shixunsDetails.can_copy === null ? "none" : "inline-block"}}
                       >
                              Fork
                        </span>
                    </Tooltip>


                    {Forkvisible===true?<style>
                      {
                        `
                        .ant-modal-body{ 
                           padding: 10px;
                        }
                        `
                      }
                    </style>:""}

                    {
                      this.state.TextAreaintshow===true?<style>
                        {
                          `
                          .ant-input:hover {
                              border: 1px solid red !important;
                          }
                          .ant-input:focus {
                              border: 1px solid red !important;
                          }
                          `
                        }
                      </style>:""
                    }
                    {Forkvisible===true?<Modal
                      keyboard={false}
                      title="Fork原因"
                      visible={Forkvisible}
                      closable={false}
                      footer={null}
                    >
                      {Forkvisibletype === true ?
                        <Spin
                          tip="请等待正在复制中..."
                          style={{marginLeft: '38%'}}
                        >
                        </Spin> :
                        <div>
                          <div className="task-popup-content">
                            <div className={"forkfactors"}>请根据实际情况，填写fork本实训的原因</div>
                            <Radio.Group onChange={this.onChangeRadiovalue} value={this.state.Radiovalue} className={"ml20 mt20 mb20"} style={{ width: "100%" }}>
                              <Radio style={radioStyle} value={1}>
                                实训内容升级
                              </Radio>
                              <Radio style={radioStyle} value={2}>
                                课堂教学使用
                              </Radio>
                              <Radio style={radioStyle} value={3}>
                                实践课程使用
                              </Radio>
                              <Radio style={radioStyle} value={4}>
                                其它原因
                              </Radio>
                              {this.state.Radiovalue === 4 ?
                                <TextArea className={this.state.TextAreaintshow===true?"bor-red mt10":"mt10"}
                                          placeholder="请填写fork原因（60字以内)"
                                          value={this.state.TextArea}
                                          rows={4} style={{ width: '85%', marginLeft: '30px' }} onInput={this.changeTextArea}
                                          maxlength={60}
                                />: null}
                              {this.state.TextAreaintshow===true?<div className={"color-red ml30"}>不能为空</div>:""}
                            </Radio.Group>
                          </div>
                          <div className="task-popup-submit clearfix">
                            <a onClick={this.hideForkvisible} className="task-btn fl">取消</a>
                            <a className="task-btn task-btn-orange fr" onClick={this.addForkvisible}>确定</a>
                          </div>
                        </div>
                      }


                    </Modal>:""}

                    <Modal
                      keyboard={false}
                      title="提示"
                      visible={Forkauthentication}
                      closable={false}
                      footer={null}
                    >
                      <div className="task-popup-content"><p
                        className="task-popup-text-center font-16 pb20">{can_fork}<br/>请问是否前往进行认证？</p>
                      </div>
                      <div className="task-popup-submit clearfix">
                        <a onClick={this.hideForkvisible} className="task-btn fl">取消</a>
                        <a className="task-btn task-btn-orange fr" onClick={this.tocertification}>确定</a>
                      </div>
                    </Modal>
                    {!!shixunsDetails.fork_num &&
                    <Link to={"/shixuns/" + shixunId + "/fork_list"} className="forkNumst" data-tip-down="Fork实训列表">
                      {shixunsDetails.fork_num}
                    </Link>
                    }

                  </div> : ""}

              </div>

            </div>

          </div>
          <div className="alert alert-orange mb15 mt15 clearfix"
               style={{display: shixunsDetails.shixun_status === 1 ? "block" : "none"}}
          >正在等待管理员的审核。在审核通过前，可以随时撤销发布
          </div>
        </div>

    );
  }
}

export default TPMBanner;

