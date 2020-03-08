import React,{ Component } from "react";
import { Modal,Checkbox,DatePicker} from "antd";
import { handleDateString } from 'educoder';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
const CheckboxGroup = Checkbox.Group;
const dateFormat = 'YYYY-MM-DD HH:mm';

function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}
function disabledDateTime() {
	return {
		// disabledHours: () => range(0, 24).splice(4, 20),
		disabledMinutes: () => range(1, 30).concat(range(31, 60)),
		// disabledSeconds: () => [55, 56],
	};
}


function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}



class HomeworkModal extends Component{
  constructor(props){
    super(props);
    this.state={
      group_ids:[],
			endtime:""
    }
  }
	componentDidMount() {


		if(this.props.course_groups!=undefined&&this.props.course_groups.length!=0){

			let arr=this.props.course_groups.map(item => item.id);
			this.shixunhomeworkedit(arr);
		}

		if(this.props.starttimes!=undefined&&this.props.starttimes!=""){
			if(this.props.starttimesend!=undefined&&this.props.starttimesend!=""){
				this.setState({
					endtime:this.props.starttimesend,
				})
			}else {
				this.setState({
					endtime:moment(moment(handleDateString(this.props.starttimes)).add(1, 'week')).format("YYYY-MM-DD HH:mm")
				})
			}

		}
	}
  componentDidUpdate=(prevProps)=>{
    // if(prevProps.visible!=this.props.visible){
		//
    //   if(this.props.course_groups!=undefined){
    //     let arr=this.props.course_groups.map(item => item.id);
    //     this.shixunhomeworkedit(arr);
    //   }
    // }
		if(prevProps.course_groups!=this.props.course_groups){
			if(this.props.course_groups!=undefined){
				let arr=this.props.course_groups.map(item => item.id);
				this.shixunhomeworkedit(arr);
			}
		}
    if(prevProps.starttimes!=this.props.starttimes){

			if(this.props.starttimes!=undefined&&this.props.starttimes!=""){
				if(this.props.starttimesend!=undefined&&this.props.starttimesend!=""){
					this.setState({
						endtime:this.props.starttimesend,
					})
				}else{
					this.setState({
						endtime:moment(moment(handleDateString(this.props.starttimes)).add(1, 'week')).format("YYYY-MM-DD HH:mm")
					})
				}

			}
		}
  }

  //勾选实训
  shixunhomeworkedit=(list)=>{
    this.setState({
      group_ids:list
    })
    this.props.getcourse_groupslist && this.props.getcourse_groupslist(list)
  }

	onChangeTimeend= (date, dateString) => {
		// console.log('startValue',dateString);

		this.setState({
			endtime: date===null?"":handleDateString(dateString),
		})

	}

	propsSaves=(ds,endtime)=>{
  	if(ds.length ===0&&endtime === ""){
			this.props.Saves()
		}else{
			if(this.props.typs!="end"){
				if(endtime === ""||endtime===undefined||endtime===null){

					this.setState({
						endtimetype:true,
						endtimetypevalue:"截止时间不能为空"
					})
					return
				}

				if(moment(endtime,"YYYY-MM-DD HH:mm") <= moment(this.props.starttimes,"YYYY-MM-DD HH:mm")){
					this.setState({
						endtimetype:true,
						endtimetypevalue:"必须晚于发布时间"
					})
					return
				}
			}
			this.props.Saves(ds,moment(handleDateString(endtime),"YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"))
		}


	}

  render(){
     let {group_ids,endtime}=this.state;
     let {course_groups}=this.props;


		 // console.log(this.props.starttimes)
     // console.log(this.state.endtime)

     // console.log(this.props.starttime,this.props.endtime)
    // TODO course_groups为空时的处理

		// let endtimelist=this.props.starttimes===undefined||this.props.starttimes===""?"":moment(handleDateString(endtime)).add(1,'months')
    return(
      <div>
        {
          this.props.visible===true?<style>
            {
              `
              body {
							  overflow: hidden !important;
							}
              `
            }
          </style>:""
        }
        {
          this.props.visible===true? <Modal
          keyboard={false}
          className={"HomeworkModal"}
          title={this.props.modalname}
          visible={this.props.visible}
          closable={false}
          footer={null}
          destroyOnClose={true}
        >
          <div className="task-popup-content">
            

            { this.props.usingCheckBeforePost ?
            <React.Fragment>
              <p className="task-popup-text-center font-16">
                <span>发布设置均可修改，</span>
                <span className={"color-blue underline"} onClick={this.props.onToPublishClick}>
                点击修改
                </span>
              </p>
              <p className="task-popup-text-center font-16 mt10">
                此设置将对所有分班生效
              </p>
            </React.Fragment> : 
            <React.Fragment>
              <p className="task-popup-text-center font-16">
                {this.props.Topval}
                <span className={"color-blue underline"}>{this.props.Topvalright}</span>
              </p>
              <p className="task-popup-text-center font-16 mt10">
                {this.props.Botvalleft===undefined?"":<span className={"colorFF6800"}>"{this.props.Botvalleft}"</span>}
                {this.props.Botval}
              </p>
            </React.Fragment>  }


            {this.props.starttime===undefined||
						 this.props.starttime===""?""
            : <p className="task-popup-text-center font-16 mt20">
                <span className={"font-14 mr20 color979797"}>{this.props.starttime}</span>
                <span className={"font-14 color979797"}>
									{/*{this.props.endtime}*/}
									<span className={"mr10"}>截止时间:</span>
									<DatePicker
										dropdownClassName="hideDisable"
										showTime={{ format: 'HH:mm' }}
										disabledTime={disabledDateTime}
										disabledDate={disabledDate}
										showToday={false}
										locale={locale}
										format={dateFormat}
										placeholder="请选择截止时间"
										id={"endTime"}
										width={"210px"}
										value={endtime===null||endtime===""?"":moment(endtime, dateFormat)}
										onChange={this.onChangeTimeend}
										className={ this.state.endtimetype===true?"noticeTip":""}
									/>
									{this.state.endtimetype===true?<div className={"color-red fr mr90 mt5"}>{this.state.endtimetypevalue}</div>:""}
                </span>
              </p>}
            {/* usingCheckBeforePost 为true的时候 全选所有分班 */}
            {this.props.modaltype===undefined||this.props.modaltype===2||this.props.modaltype===4 
              || !course_groups || course_groups.length == 0 
              || this.props.usingCheckBeforePost ?"":<ul className="upload_select_box fl clearfix mt20 mb30"
                style={{"overflow-y":"auto",padding:"10px 0px"}}
                id="search_not_members_list"

                // onScroll={this.contentViewScroll}
            >
              <style>
                {
                  `
                  .HomeworkModal .ant-checkbox-wrapper {
                        margin-top: 0px;
                        float: left;
                    }
                   	.width300{
										 width:300px;
										 display: inline-block;
										}
                  `
                }
              </style>
              {/*<Loading visible={hometypepvisible} shape="dot-circle" className="newnext-loading" color='#4AC7FF'>*/}
              {/*</Loading>*/}
                {  <Checkbox.Group style={{ width: '100%' }} value={group_ids}  onChange={this.shixunhomeworkedit}>
                  {
                    course_groups.map((item,key)=>{
                      return(
                        <div className="clearfix edu-txt-center lineh-40" key={key}>
                          <li  style={{ width: '100%',padding: "0px 10px"}}>
                            <Checkbox
                              className="task-hide edu-txt-left width300"
                              name="shixun_homework[]"
                              value={item.id}
															key={item.id}
                            >
                              <span style={{"textAlign":"left","color":"#05101A"}} className="task-hide color-grey-name">{item.name}</span>
                            </Checkbox>
                          </li>

                        </div>
                      )
                    })
                  }
                </Checkbox.Group>}

           </ul>
            }

            <div className="clearfix mt30 edu-txt-center mb10">
                <a  className="task-btn color-white mr30" onClick={this.props.Cancel}>{this.props.Cancelname}</a>
                <a className="task-btn task-btn-orange" onClick={()=>this.propsSaves(group_ids,this.state.endtime)}>{this.props.Savesname}</a>
            </div>

          </div>
        </Modal>:""}
      </div>
    )
  }
}
export default HomeworkModal;