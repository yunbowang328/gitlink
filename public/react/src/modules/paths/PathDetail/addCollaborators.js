import React, { Component } from 'react';
import { Modal,Checkbox,Input } from "antd";
import axios from 'axios';

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
class addCollaborators extends Component{
  constructor(props){
    super(props);
    this.state = {
      addPartner:false,
      page:1,
      partnerList:undefined,
      search:'',
      partnerListid:[],
      checkAll: false,
      optionss:[],
			useristrue:false
    }
  }
  addBox=()=>{

    this.setState({
      addPartner:true,
      search:"",
      page:1,
      partnerList:undefined,
      optionss:[]
    })
    this.searchList("")

  }
  hideAddBox=()=>{
    this.setState({
      addPartner:false,
      optionss:[],
      partnerListid:[]
    })
  }
  // 搜索框输入
  changeSearchValue=(e)=>{
    this.setState({
      search: e.target.value
    })
  }
  // 回车搜索--搜索成功后page为1
  searchList=()=>{
    let id=this.props.match.params.pathId;
    let {search,page}=this.state;
    let url='/paths/'+id+'/search_members.json?search='+search+"&page="+page;
    axios.post(url).then((result)=>{
      if(result.status==200){
        let list=result.data.users;
        let optionss=[]
        for(var i=0; i<list.length;i++){
          optionss.push(list[i].user_id)
        }
        this.setState({
          partnerList:result.data.users,
          page:1,
          optionss:optionss
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }


  SaveAddBox=()=>{
    let {partnerListid} =this.state;
    let id=this.props.match.params.pathId;
    let url="/paths/"+id+"/add_subject_members.json"

		if(partnerListid.length===0){
			this.setState({
				useristrue:true
			})
			return
		}
    axios.post(url,{
      user_ids:partnerListid
    }).then((response) => {
      if(response.status==200){
        this.setState({
          addPartner:false,
          optionss:[],
          partnerListid:[]
        })
        this.props.updatadetailInfoLists();
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  addCollaboratorsid=(id)=>{
  	if(id.length===0){
  		this.setState({
				partnerListid:id,
			})
		}else{
			this.setState({
				partnerListid:id,
				useristrue:false
			})
		}

  }

  onCheckAllChange = (e) => {
    let {optionss} =this.state;

    if(e.target.checked===true){
      this.setState({
        checkAll: e.target.checked,
        partnerListid:optionss
      });
    }else{
      this.setState({
        checkAll: e.target.checked,
        partnerListid:[]
      });
    }

  }

  contentViewScroll=(e)=>{
    //滑动到底判断
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

		if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
      // console.log("到达底部");

      let id=this.props.match.params.pathId;
      let {search,page,partnerList,optionss}=this.state;
      let newpage=page+1;
      let url='/paths/'+id+'/search_members.json?search='+search+"&page="+newpage;

      axios.post(url).then((result)=>{
        if(result){
          let list=result.data.users;
          let newlist=partnerList;
          for(var j=0; j<list.length;j++){
            newlist.push(list[j])
          }
          let newoptionss=optionss
          for(var i=0; i<list.length;i++){
            newoptionss.push(list[i].user_id)
          }
          this.setState({
            partnerList:newlist,
            page:newpage,
            optionss:optionss
          })
        }
      }).catch((error)=>{
        console.log(error);
      })

    }

  }

  render(){
    let {addPartner,search,partnerList,optionss,checkAll,partnerListid,useristrue} = this.state;

    return(
				this.props.detailInfoList===undefined?"":this.props.detailInfoList.allow_add_member===true?
				<div className="edu-back-white bor-top-greyE addTeamMember">
			  <a onClick = {this.addBox} className="color-blue">+ 添加合作者</a>
        <Modal
        keyboard={false}
        title="添加合作者"
        visible={addPartner}
        closable={false}
        footer={null}
        destroyOnClose={true}
        >
          <div className="newupload_conbox clearfix">
            <div className="mb20">
              <Search placeholder="输入用户的真实姓名进行搜索" id="search_not_collaborators" style={{"width":"100%"}} 
              autocomplete="off"
              value={search} 
              onInput={this.changeSearchValue}
              onSearch={search => this.searchList(search)} />
            </div>
            <p className="clearfix pt10 pl10 pr10" style={{"background":"#F4FAFF","marginBottom":"0px"}}>
              <Checkbox   className="fl"
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              ></Checkbox>
              <span className="span1 fl edu-txt-w80 task-hide font-bd">姓名</span>
              <span className="span3 fl edu-txt-w80 task-hide font-bd">昵称</span>
              <span className="span2 fl edu-txt-w80 task-hide font-bd">职位</span>
              <span className="span3 fl edu-txt-w260 task-hide font-bd">单位</span>
            </p>
            <ul className="upload_select_box fl clearfix mb15"
                style={{"overflow-y":"auto"}}
                id="search_not_members_list"

                onScroll={this.contentViewScroll}
            >
              <CheckboxGroup style={{ width: '100%' }} value={checkAll===true?optionss:partnerListid} onChange={this.addCollaboratorsid}>
              {
                partnerList && partnerList.map((item,key)=>{
                  return(
                        <li className="clearfix" key={key}>
                          <Checkbox value={item.user_id} key={item.user_id} className="fl"></Checkbox>
                          <a target="_blank" className="task-hide color-grey3 fl span1 edu-txt-w80">{item.user_name}</a>
                          <span className="task-hide fl color-grey edu-txt-w80 span2">{item.nickname}</span>
                          <span className="task-hide fl color-grey edu-txt-w80 span2">{item.identity}</span>
                          <span className="span3 color-grey fl edu-txt-w260 task-hide">{item.school_name}</span>
                        </li>
                  )
                })
              }
              </CheckboxGroup>
            </ul>
						{useristrue===true?<span className={"color-red"}>请先选择用户</span>:""}
            <div className="mt20 marginauto clearfix edu-txt-center">
                <a onClick={this.hideAddBox} className="pop_close task-btn mr30">取消</a>
                <a className="task-btn task-btn-orange" onClick={this.SaveAddBox}  id="submit_send_shixun">确定</a>
            </div>
          </div>
        </Modal>
      </div>:""

    )
  }
}
export default addCollaborators;