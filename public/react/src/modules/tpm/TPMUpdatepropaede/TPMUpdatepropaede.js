import React, {Component} from 'react';

import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal} from 'antd';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import axios from 'axios';

import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';

import {getUrl} from 'educoder';



export default class TPMUpdatepropaede extends Component {
    constructor(props) {
        super(props)
			  this.neweditanswerRef=React.createRef();
        this.state = {
            shixunId:undefined,
        }
    }

    componentDidMount() {
        let id = this.props.match.params.shixunId;
        let url="/shixuns/"+id+"/propaedeutics.json";
        axios.get(url).then((response) => {
            if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

            }else{
                this.setState({
                    shixunId:id,
                })
                if(response.data.content[0]!=null){
									this.setState({
										editanswersRefval:response.data.content,
									})
									this.neweditanswerRef.current.setValue(response.data.content)
                }else{
									this.setState({
										editanswersRefval:"",
									})
									this.neweditanswerRef.current.setValue('')
                }
            }
        }).catch((error) => {
            console.log(error)
        });

    }

    updatepropaedeuticsvalue=()=>{
        let id = this.props.match.params.shixunId;
        let {shixunId} = this.state;
        let url="/shixuns/"+id+"/update_propaedeutics.json";
        const update_propaedeuticsvalue = this.neweditanswerRef.current.getValue().trim();
        axios.post(url,{
                content:update_propaedeuticsvalue
            }
            ).then((response) => {
            if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

            }else{
                this.props.showNotification(response.data.message);
                if(response.data.status===1){
                    this.props.history.replace("/shixuns/"+shixunId+"/propaedeutics");
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        let {shixunId} = this.state;
        return (
            <React.Fragment>
                <div className="educontent">

                     <div className="edu-back-white mt30">
                         <div className="font-16 pt20 pl20 pr20 pb20 bor-bottom-greyE clearfix">
                             <span className="fl">背景知识</span>
                             <Link to={"/shixuns/"+shixunId+"/propaedeutics"}className="color-grey-9 fr">返回</Link>
                         </div>

                         <div className="padding40-20">
														 <TPMMDEditor ref={this.neweditanswerRef} placeholder="请输入选择题的题干内容" mdID={'editquestioMDid'} refreshTimeout={1500}
																					needRecreate={true}	 watch={true}  className="courseMessageMD" initValue={this.neweditanswerRefval}></TPMMDEditor>
                         </div>
                     </div>

                    <div className="clearfix mb30 mt30">
                        <a className="defalutSubmitbtn fl mr20"
                           onClick={this.updatepropaedeuticsvalue}>保存</a>
                        <Link to={"/shixuns/"+shixunId+"/propaedeutics"} className="defalutCancelbtn fl"
                        >取消</Link>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}


