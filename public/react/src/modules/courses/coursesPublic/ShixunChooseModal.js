import React,{ Component } from "react";
import { Modal,Checkbox,Select,Input,Tooltip} from "antd";
import axios from'axios';
import NewShixunModel from '../coursesPublic/NewShixunModel';

const Option = Select.Option;
const Search = Input.Search;
class ShixunChooseModal extends Component{
  constructor(props){
    super(props);
    this.state={
      shixunmodal: false,
      hometypepvisible: false,
    }
  }
  setVisible = (visible) => {
    // if (visible) {
    //   this.createCommonWork()
    // } else {
    //
    // }
		this.setState({ shixunmodal: visible })
  }
  hidecouseShixunModal = () => {
    this.setVisible(false)
  }
  componentDidMount() {


  }
  funshixunmodallist=(search,type,loading,page)=>{
    let{newshixunmodallist}=this.state;
    let newshixunmodallists=[]
    if(page>1){
      newshixunmodallists=newshixunmodallist;
    }
    this.setState({
      hometypepvisible:loading
    })
    let coursesId=this.props.match.params.coursesId;
    let url = this.props.shixunsUrl || "/courses/"+coursesId+"/homework_commons/shixuns.json";

    axios.get(url, {
      params: {
        search: search,
        type:type,
        page:page
      }
    }).then((result)=>{
      if(result.status===200){

        let  shixun_list=result.data.shixun_list;
        for(var i=0; i<shixun_list.length;i++){
          newshixunmodallists.push(shixun_list[i])
        }
        this.setState({
          shixunmodal:true,
          shixunmodallist:result.data,
          newshixunmodallist:newshixunmodallists,
          hometypepvisible:false
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  funpatheditarry=(list)=>{
    this.setState({
      patheditarry:list
    })
  }
  createCommonWork=()=>{

    this.setState({
      hometypepvisible:true,
      patheditarry:[]
    })

    let coursesId=this.props.match.params.coursesId;
    let url = this.props.shixunsUrl || "/courses/"+coursesId+"/homework_commons/shixuns.json";

    axios.get(url).then((result)=>{
      if(result.status===200){
        this.setState({
          shixunmodal:true,
          shixunmodallist:result.data,
          hometypepvisible:false,
          newshixunmodallist:result.data.shixun_list,
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  render(){
     let {Searchvalue,type,category_id, datas, shixunmodal, shixunmodallist
          , hometypepvisible, newshixunmodallist, patheditarry }=this.state;
     let {visible}=this.props;

     // console.log(patheditarry)
    return(
			shixunmodal===true?<NewShixunModel
				statustype={'published'}
				type={'shixuns'}
        datas={datas}
        category_id={this.props.match.params.category_id}
				NewShixunModelType={shixunmodal}
        shixunmodallist={shixunmodallist}
        funshixunmodallist={(search,type,loading,page)=>this.funshixunmodallist(search,type,loading,page)}
        hometypepvisible={hometypepvisible}
				hideNewShixunModelType={this.hidecouseShixunModal}
        newshixunmodallist={newshixunmodallist}
        coursesId={this.props.match.params.coursesId}
        courseshomeworkstart={(category_id,homework_ids)=> this.props.newhomeworkstart 
                && this.props.newhomeworkstart(category_id,homework_ids)}
        funpatheditarry={(patheditarry)=>this.funpatheditarry(patheditarry)}
        patheditarry={patheditarry}
        {...this.props}
      ></NewShixunModel>:""
    )
  }
}
export default ShixunChooseModal;