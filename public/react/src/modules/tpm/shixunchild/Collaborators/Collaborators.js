import React, {Component} from 'react';

import {Modal, Button, Radio, Input, Checkbox, message, Spin, Icon, Pagination} from 'antd';

import {getImageUrl, toPath} from 'educoder'

import axios from 'axios';

import NoneData from "../../../courses/coursesPublic/NoneData";

import './Collaborators.css';


const RadioGroup = Radio.Group;



class Collaborators extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collaboratorList: [],
      Collaboratorsvisible: false,
      Collaboratorsvisibleadmin: false,
      value: 1,
      page: 1,
      Searchadmin: undefined,
      allChangechecked: false,
      Collaboratorslist: [],
      Collaboratorslisttype: false,
      collaborators_deletetype: false,
      collaborators_deletevalue: null,
      onSearchcalue: "",
      collaboratorListsum: 10,
      collaboratorListsumtype: true,
      user_name: undefined,
      school_name: undefined,
      spinnings: false,
      useristrue: false,
      mylistansum: 6,
      limit: 20,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.shixunId;

    let collaborators = `/shixuns/` + id + `/collaborators.json`;
    axios.get(collaborators).then((response) => {
      if (response.status === 200) {
        if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

        } else {
          this.setState({
            collaboratorList: response.data
          });
        }

      }
    }).catch((error) => {
      console.log(error)
    });
  }

  updatacomponentDiddata = (pageNumber) => {
    let id = this.props.match.params.shixunId;

    let collaborators = `/shixuns/` + id + `/collaborators.json`;
    axios.get((collaborators),{params:{
        page:pageNumber?pageNumber:undefined
      }}).then((response) => {
      if (response.status === 200) {
        if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

        } else {
          this.setState({
            collaboratorList: response.data
          });
        }
      }
    }).catch((error) => {
      console.log(error)
    });
  }
  CollaboratorsshowModal = (type) => {

    if (type === "cooperation") {
      this.setState({
        Collaboratorsvisibleadmin: false,
        Collaboratorslist: [],
        Searchadmin: [],
        addadminrediovalue:undefined
      });
    } else if (type === "admin") {
      this.setState({
        Collaboratorsvisible: false,
        Collaboratorslist: [],
        Searchadmin: [],
        addadminrediovalue:undefined
      });
    } else if (type === "collaborators_deletetype") {
      this.setState({
        collaborators_deletetype: false,
        addadminrediovalue:undefined
      });
    }
  }

  showCollaboratorsvisible = (type) => {

    this.setState({
      Collaboratorslist: [],
      Searchadmin: undefined,
      onSearchcalue: ""
    })
    let admintype = this.props.identity;
    if (admintype > 4) {
      this.props.showNotification("您没有权限");
      return
    }
    if (type === "cooperation") {
      this.setState({
        Collaboratorsvisibleadmin: true,
        Collaboratorsvisible: false,
      });
    } else if ("admin") {
      let id = this.props.match.params.shixunId;
      let url = "/shixuns/" + id + "/change_manager.json";
      axios.get(url).then((response) => {
        if (response.status === 200) {
          // this.setState({
          //     Collaboratorsvisible: true
          // })
          if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

          } else {
            this.setState({
              Collaboratorsvisible: true,
              Collaboratorsvisibleadmin: false,
              Collaboratorslist: response.data
            })
          }
        }
      }).catch((error) => {
        console.log(error)
      });

    }
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  onSearchadmins = (e) => {
    this.setState({
      onSearchcalue: e.target.value
    })
  }
  onSearchadmin = (value) => {

    let {collaboratorList, user_name, school_name} = this.state;
    this.setState({
      // Searchadmin: undefined,
      spinnings: true,
    })
    // if (value === "") {
    //     this.setState({
    //         Searchadmin: [],
    //         collaboratorList: collaboratorList
    //     })
    // } else {
    //
    // }
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/add_collaborators.json";
    axios.get(url, {
      params: {
        user_name: user_name,
        school_name: school_name,
      }
    }).then((response) => {
      if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {
        this.setState({
          spinnings: false
        })
      } else {
        let newlist = response.data.users;
        for (var i = 0; i < newlist.length; i++) {
          newlist[i].checked = false
        }
        this.setState({
          Searchadmin: newlist,
          collaboratorList: collaboratorList,
          spinnings: false
        })
      }

    }).catch((error) => {
      console.log(error)
    });
  }

  selectChangenickname = (e, key) => {

    let {Searchadmin} = this.state;
    let newlist = Searchadmin;
    for (var i = 0; i < newlist.length; i++) {
      newlist[key].checked = e.target.checked
    }

    let arrlist = [];
    let alltype = false;
    for (var z = 0; z < newlist.length; z++) {
      if (newlist[z].checked === true) {
        arrlist.push(newlist[z])
      }
    }

    if (Searchadmin.length === arrlist.length) {
      alltype = true
    } else {
      alltype = false
    }

    if (newlist.length === 0) {
      this.setState({
        Searchadmin: newlist,
        allChangechecked: alltype,
      })
    } else {
      this.setState({
        Searchadmin: newlist,
        allChangechecked: alltype,
        useristrue: false
      })
    }


  }
  allChange = (e) => {

    let {Searchadmin} = this.state;
    let newlist = Searchadmin;
    for (var i = 0; i < newlist.length; i++) {
      newlist[i].checked = e.target.checked
    }
    this.setState({
      Searchadmin: newlist,
      allChangechecked: e.target.checked
    })
  }
  submit_add_collaborators_form = () => {

    let id = this.props.match.params.shixunId;
    let {Searchadmin, collaboratorList} = this.state;
    let newlist = Searchadmin;
    let user_ids = []
    if (newlist.length === 0) {
      this.setState({
        Collaboratorslisttype: true
      })
      return
    }
    for (var i = 0; i < newlist.length; i++) {
      if (newlist[i].checked === true) {
        user_ids.push(newlist[i].user_id)
      }
    }

    for (var i = 0; i < user_ids.length; i++) {
      for (var j = 0; j < collaboratorList.length; j++) {
        if (user_ids[i] === collaboratorList[j].user.user_id) {
          message.error("添加失败，重复添加！");

          return
        }
      }
    }

    if (user_ids.length === 0) {
      this.setState({
        useristrue: true
      })
      return
    }
    let url = "/shixuns/" + id + "/shixun_members_added.json";
    axios.post(url, {
      user_ids: user_ids
    }).then((response) => {
      this.updatacomponentDiddata();
      this.props.showNotification(response.data.message);
      this.setState({
        Collaboratorsvisibleadmin: false,
        Collaboratorslist: [],
        Searchadmin: []
      })
    }).catch((error) => {
      console.log(error)
    });
  }
  addadminredio = (e) => {
    this.setState({
      addadminrediovalue: e
    })

  }
  submit_addadminredio = () => {

    let {addadminrediovalue} = this.state;

    let id = this.props.match.params.shixunId;

    let url = "/shixuns/" + id + "/change_manager.json";
    if (addadminrediovalue === undefined) {
      this.setState({
        // Collaboratorsvisible: false,
        // Collaboratorslist: [],
        // Searchadmin: [],
        addadminrediovalue:undefined
      });
      this.props.showNotification("所选人员为空，没有更换成功");
      // this.CollaboratorsshowModal("admin")
      return
    }


    axios.post(url, {
      user_id: addadminrediovalue
    }).then((response) => {
      this.setState({
        Collaboratorsvisible: false,
        Collaboratorslist: [],
        Searchadmin: [],
        addadminrediovalue:undefined
      });
      this.updatacomponentDiddata();
      this.props.showNotification(response.data.message);
      // window.location.reload();
    }).catch((error) => {
      console.log(error)
    });
  }

  collaborators_delete = (value) => {
    this.setState({
      collaborators_deletetype: true,
      collaborators_deletevalue: value
    })

  }
  collaborators_deletes = () => {
    let {collaborators_deletevalue} = this.state;
    if (collaborators_deletevalue === null) {
      return
    }
    let id = this.props.match.params.shixunId;
    let url = "/shixuns/" + id + "/collaborators_delete.json?user_id=" + collaborators_deletevalue;
    axios.delete(url).then((response) => {
      if (this.props.current_user.user_id == collaborators_deletevalue) {
        this.props.history.push('/shixuns')
        return;
      }
      this.props.showNotification(response.data.message);
      this.updatacomponentDiddata();
      this.setState({
        collaborators_deletetype: false
      })
    }).catch((error) => {
      console.log(error)
    });
  }

  loadMore = () => {
    let {collaboratorList} = this.state;
    this.setState({
      collaboratorListsum: collaboratorList.length,
      collaboratorListsumtype: false
    })
  }


  contentViewScrolledit = (e) => {

    //滑动到底判断
    let newscrollTop = parseInt(e.currentTarget.scrollTop);
    let allclientHeight = e.currentTarget.clientHeight + newscrollTop;

    if (e.currentTarget.scrollHeight - allclientHeight === 0 || e.currentTarget.scrollHeight - allclientHeight === 1 || e.currentTarget.scrollHeight - allclientHeight === -1) {
      let {page, collaboratorList, user_name, school_name, Searchadmin} = this.state;
      let newpage = page + 1;
      let newSearchadmin = Searchadmin
      let id = this.props.match.params.shixunId;
      let url = "/shixuns/" + id + "/add_collaborators.json";
      axios.get(url, {
        params: {
          user_name: user_name,
          school_name: school_name,
          page: newpage
        }
      }).then((response) => {
        if (response.data.status === 403 || response.data.status === 401 || response.data.status === 500) {

        } else {
          let newlist = response.data.users;
          for (var i = 0; i < newlist.length; i++) {
            newlist[i].checked = false
            newSearchadmin.push(newlist[i])
          }

          this.setState({
            Searchadmin: newSearchadmin,
            collaboratorList: collaboratorList,
            page: newpage
          })
        }

      }).catch((error) => {
        console.log(error)
      });

    }

  }
  onChangepageNumber=(pageNumber)=>{
    this.updatacomponentDiddata(pageNumber);
  }
  toggleHover=(type,key)=>{
    this.setState({
      hovertype:type,
      hoverkey:type===false?undefined:key
    })
  }
  render() {
    let {
      collaboratorList,
      Collaboratorsvisible,
      Collaboratorsvisibleadmin,
      Searchadmin,
      allChangechecked,
      Collaboratorslist,
      Collaboratorslisttype,
      collaborators_deletetype,
      onSearchcalue,
      collaboratorListsum,
      collaboratorListsumtype,
      user_name,
      school_name,
      useristrue,
      mylistansum,
      page,
      limit
    } = this.state;
    let {loadingContent} = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

    // console.log(collaboratorList)
    return (
      <React.Fragment>
        <style>
          {
            `
                  .sortinxdirectionbox{
                      height: 76px;
                      border-bottom: 1px solid #F4F4F4;
                  }
                  .pt25{
                    padding-top:25px;
                  }
                  `
          }
        </style>
        <div className={"edu-back-white"}>
        <p className="sortinxdirection sortinxdirectionbox"
           style={{display: this.props.identity < 5 ? "flex" : "none"}}
        >
          <div className="yslwushiwidth">
            <p
              className="edu-default-btn edu-greenback-btn  ml20 height28 mt25 color333hezuo">{collaboratorList && collaboratorList.member_count}人</p>
          </div>

          <div className="yslwushiwidth xaxisreverseorder pt25">
            {/*<a onClick={() => this.showCollaboratorsvisible("cooperation")}*/}
            {/*	 className="edu-default-btn edu-greenback-btn  mr20 height40 yslwushiwidthbuton"*/}
            {/*	 data-remote="true">*/}
            {/*	<span className={"line27"}>+ </span>添加合作者*/}
            {/*</a>*/}
            {/*<a onClick={() => this.showCollaboratorsvisible("admin")}*/}
            {/*	 style={{display:this.props.identity===1?"flex":"none"}}*/}
            {/*	 data-remote="true"*/}
            {/*	 className="edu-default-btn edu-greenback-btn  mr20 height40 yslwushiwidthbuton">*/}
            {/*	<p style={{*/}
            {/*		textAlign: "center",*/}
            {/*		width:'100%',*/}
            {/*		lineHeight: "29px",*/}
            {/*	}}>更换管理员</p>*/}
            {/*</a>*/}
            <Button type="primary"
                    onClick={() => this.showCollaboratorsvisible("cooperation")}
                    className="edu-default-btn edu-greenback-btn  mr20 heighthezuo34 yslwushiwidthbuton"
            >添加合作者</Button>
            <Button type="primary" ghost
                    style={{display: this.props.identity === 1 ? "flex" : "none"}}
                    onClick={() => this.showCollaboratorsvisible("admin")}
                    className="edu-default-btn  mr20 heighthezuo34">
              更换管理员
            </Button>

          </div>

        </p>

        <Modal
          keyboard={false}
          title="更换管理员"
          visible={Collaboratorsvisible}
          closable={false}
          footer={null}
        >
          <div className="mb15 font-14 edu-txt-center color-orange-tip">
            选择的成员将会成为新的管理员<br/> 您将不再拥有管理员的权限，但您仍是合作团队的一员
          </div>
          <div className="clearfix mb15 edu-bg-light-blue edu-max-h200">
            <ul className="">
              <li className={Collaboratorslist&&Collaboratorslist.length===0?"centertop20 clearfix":"clearfix"}>
                {Collaboratorslist&&Collaboratorslist.length===0?<span>
                  请先将新的管理员通过 <a className={"color-blue"} onClick={() => this.showCollaboratorsvisible("cooperation")}>"添加合作者"</a> 加入合作者列表
                </span>:""}
                <RadioGroup onChange={this.onChange}>
                  {
                    Collaboratorslist.length === 0 ? "" : Collaboratorslist.map((item, key) => {
                      return (
                        <Radio key={key} style={radioStyle} value={item.user_id} defaultChecked={false}
                               onClick={() => this.addadminredio(item.user_id)}>{item.name}</Radio>
                      )
                    })
                  }
                </RadioGroup>
              </li>
            </ul>
          </div>

          <div className="clearfix edu-txt-center mt20">
            <a className="pop_close task-btn mb10 mr40 colorFFF"
               onClick={() => this.CollaboratorsshowModal("admin")}>取消</a>
            <a className="task-btn task-btn-orange"
               onClick={this.submit_addadminredio}>确定</a>
          </div>

        </Modal>

        {Collaboratorsvisibleadmin === true ? <Modal
          keyboard={false}
          title="添加合作者"
          visible={Collaboratorsvisibleadmin}
          closable={false}
          footer={null}
          width={800}
        >
          {/*<Search*/}
          {/*placeholder="输入用户的姓名、昵称、邮箱进行搜索"*/}
          {/*value={onSearchcalue}*/}
          {/*onSearch={(value) => this.onSearchadmin(value)}*/}
          {/*onInput={this.onSearchadmins}*/}
          {/*style={{width: '100%'}}*/}
          {/*/>*/}
          <span className="mr10">姓名或手机号:</span>

          <Input placeholder="请输入姓名或手机号码搜索" value={user_name} onInput={(e) => {
            this.setState({user_name: e.target.value})
          }}
                 style={{width: '215px'}}
          ></Input>
          <span className="label ml10 " style={{minWidth: '36px'}}>单位:</span>
          <Input placeholder="请输入单位名称" className="ml10" value={school_name} onInput={(e) => {
            this.setState({school_name: e.target.value})
          }}
                 style={{width: '215px'}}
          >
          </Input>

          <a className="task-btn task-btn-orange ml20" onClick={() => this.onSearchadmin()}
             style={{height: '30px', lineHeight: '30px', width: '70px'}}
          >搜索</a>
          <p className="clearfix pl35 mt20">
            <span className="fl edu-txt-w100 task-hide font-bd ml10 edu-txt-left">姓名</span>
            <span className="fl edu-txt-w100 task-hide font-bd">职业</span>
            <span className="fl edu-txt-w180 task-hide font-bd ml80">单位</span>
          </p>


          <div className="mt5" style={{background: '#f7f9fd'}}>
            <Spin indicator={antIcon} spinning={this.state.spinnings}>
              <div className="clearfix">
                <ul className="upload_select_box fl" id="search_not_teachers_list"
                    onScroll={this.contentViewScrolledit}>
                  {Searchadmin === undefined ? <li style={{textAlign: 'center'}}>
                    <span>请试试搜索一下</span>
                  </li> : Searchadmin.length === 0 ? <NoneData/> : Searchadmin.map((item, key) => {
                    return (
                      <li key={key} style={{display: item.identify === "专业人士" ? "none" : "block"}}>
                        <Checkbox className="fl mr20" checked={item.checked}
                                  onChange={(e) => this.selectChangenickname(e, key)}
                                  id={item.user_id}></Checkbox>
                        <a className="task-hide color-grey3  fl span1 edu-txt-w80 edu-txt-left">{item.nickname}</a>
                        <span className="task-hide fl color-grey edu-txt-w80 span2">{item.identify}</span>
                        <span
                          title={item.school_name}
                          style={{width: '150px'}}
                          className="span3 color-grey fl edu-txt-w260 task-hide ml50 task-hide">{item.school_name}</span>
                      </li>
                    )
                  })

                  }
                </ul>
              </div>
            </Spin>
          </div>
          <div className="mt10 clearfix">

          <span className="fl mr15">
              <Checkbox className="fl" checked={allChangechecked} onChange={this.allChange}>全选</Checkbox>
              <div className="fl" style={{height: '27px'}}>
                  <span className="color-orange fl" id="add_teacher_notice"
                        style={{display: Collaboratorslisttype === true ? 'inline' : 'none'}}>请至少选择一个用户</span>
              </div>
          </span>


          </div>
          {useristrue === true ? <span className={"color-red"}>请先选择用户</span> : ""}
          <div className="clearfix edu-txt-center mt20">
            <a className="pop_close task-btn mb10 mr40 colorFFF"
               onClick={() => this.CollaboratorsshowModal("cooperation")}>取消</a>
            <a className="task-btn task-btn-orange"
               onClick={() => this.submit_add_collaborators_form()}>确定</a>
          </div>
        </Modal> : ""}
        <style>
          {
            `
									.collaborators-item-middles{width: 100% !important;}
									.ysltithead{
									    padding-bottom: 20px;
									}
									`
          }
        </style>
        <div className="pl20" id="collaborators_list_info">
          {
            collaboratorList === undefined || collaboratorList.length === 0 ? "" : collaboratorList.members.map((item, key) => {
                return (
                  <div className="collaborators-item clearfix sortinxdirection ysltithead" key={key}>
                    <a href={item.user.user_url} target="_blank" className="mr20 fl edu-position">
                      <img alt="用户头像" className="radius" height="48" src={getImageUrl("images/" + item.user.image_url)}
                           width="48"/>
                      <span className={item && item.user && item.user.shixun_manager === true? "ml20 yslusercjz  newyslusercjz" : "none "}
                        // style={{display: this.props.power === false ? "none" : "inline-block"}}
                      >
                        <p className="yslusercjztest newyslusercjztest">{item.user.shixun_manager === true ? "创建者" : ""}</p></span>
                    </a>


                    <div className="fl collaborators-item-middles">
                      <p className="mb10 sortinxdirection space-between hezuozhe655">
                        <a href={item.user.user_url} target="_blank" className="yslusername">{item.user.name}</a>
                          {item.user.shixun_manager === true ? "" : <span>
                            <i className={this.state.hovertype===true&&key===this.state.hoverkey?"fontnewreds iconfont icon-shanchu_Hover":"fontneweees iconfont icon-shanchu_moren"}
                               style={{display: this.props.power === false ? "none" : "block"}}
                               onClick={() => this.collaborators_delete(item.user.user_id)}
                               onMouseEnter={()=>this.toggleHover(true,key)}
                               onMouseLeave={()=>this.toggleHover(false,key)}
                          ></i></span> }
                        {/*<span*/}
                        {/*  className={item && item.user && item.user.shixun_manager === true ? "ml20 yslusercjz " : "ml20"}*/}
                        {/*  style={{display: this.props.power === false ? "none" : "inline-block"}}><p*/}
                        {/*  className="yslusercjztest">{item.user.shixun_manager === true ? "创建者" : ""}</p></span>*/}
                      </p>

                      <p className="color-grey-B2 font-12 mb10 sortinxdirection mt14">
                        <p className="hezuozhe655 sortinxdirection space-between">
                          {/*<p className={item.user.identity===null||item.user.identity===undefined||item.user.identity===""?" font-16 ":"mr20 font-16 w70"}>{item.user.identity}</p>*/}
                          <p
                            className={item.user.school_name === null || item.user.school_name === "" ? "" : " font-12 color888hezuo maxfont450"}>{item.user.school_name}</p>
                          <p className="fabushixunwidth color888hezuo">发布实训项目&nbsp;&nbsp;<span
                            className="ml2">{item.user.user_shixuns_count}</span></p>
                        </p>
                        {/*删除n12.17*/}
                        {/*<div className="xaxisreverseorder yslwushiwidth10">*/}
                        {/*  {item.user.shixun_manager === true ? "" :*/}

                        {/*    <i className="iconfont icon-shanchu newbianji1 color-grey-c   font-16 w40"*/}
                        {/*       style={{display: this.props.power === false ? "none" : "block"}}*/}
                        {/*       onClick={() => this.collaborators_delete(item.user.user_id)}>*/}
                        {/*    </i>*/}
                        {/*  }*/}
                        {/*</div>*/}

                      </p>
                      {/*<p className="mb10">*/}
                      {/*  */}
                      {/*    /!*<span>粉丝&nbsp;&nbsp;*!/*/}
                      {/*    /!*<span id="user_h_fan_count">{item.user.fans_count}</span>*!/*/}
                      {/*    /!*</span>*!/*/}
                      {/*</p>*/}
                      {/* <p className="color-grey-B2 task-hide">{item.user.brief_introduction}</p> */}
                    </div>
                    {/*<a href="/watchers/unwatch?object_id=3039&amp;object_type=user&amp;shixun_id=61&amp;target_id=3039" className="fr user_default_btn user_private_btn mt30 font-16 mr20" data-method="post" data-remote="true" rel="nofollow">取消关注</a>*/}
                  </div>
                )
            })
          }
          <Modal
            keyboard={false}
            title="提示"
            visible={collaborators_deletetype}
            closable={false}
            footer={null}
          >
            <div className="task-popup-content">
              <div className="task-popup-text-center font-14">确定要删除吗？</div>
            </div>
            <div className="task-popup-submit clearfix">
              <a className="pop_close task-btn mb10 mr40 colorFFF"
                 onClick={() => this.CollaboratorsshowModal("collaborators_deletetype")}>取消</a>
              <a className="task-btn task-btn-orange fr" onClick={this.collaborators_deletes}>确定</a>
            </div>

          </Modal>
        </div>

        {/*<div*/}
        {/*  className={collaboratorList.length > 10 && collaboratorListsumtype === true ? "" : "none"}*/}
        {/*  style={{textAlign: 'center', borderTop: '1px solid #eee'}}>*/}
        {/*  <a className="loadMore" onClick={this.loadMore}>加载更多</a>*/}
        {/*  /!*{*!/*/}
        {/*  /!*	mylistansum>5?*!/*/}
        {/*  /!*		<div className="edu-txt-center mt40 mb40">*!/*/}
        {/*  /!*			<Pagination showQuickJumper current={page}*!/*/}
        {/*  /!*									onChange={this.paginationonChanges} pageSize={limit}*!/*/}
        {/*  /!*									total={mylistansum}*!/*/}
        {/*  /!*			></Pagination>*!/*/}
        {/*  /!*		</div>*!/*/}
        {/*  /!*		:""*!/*/}
        {/*  /!*}*!/*/}

        {/*</div>*/}
        </div>

        {collaboratorList && collaboratorList.member_count>10?<div className={"edu-txt-center mt30 "}>
            <Pagination showQuickJumper defaultCurrent={1} total={collaboratorList && collaboratorList.member_count} onChange={this.onChangepageNumber} />
        </div>:""}


      </React.Fragment>

    );
  }
}

export default Collaborators;
