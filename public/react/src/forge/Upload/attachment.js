import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Popconfirm} from "antd";
class Attachment extends Component{
  constructor(props){
    super(props);
    this.state={
      canDelete: false,
      Deleted:[]
    }
  }

  componentDidMount=()=>{
    this.getDetail();
  }

  getDetail=()=>{
    this.setState({
      canDelete: this.props.canDelete
    })
  }

  deleteAttachment = (id) => {
    const url = `/attachments/${id}.json`
    axios.delete(url, {
    }).then((response) => {
      if (response.data) {
        if (response.data.status === 0) {
          this.setState({
            Deleted: this.state.Deleted.concat(id)
          });
          this.props.showNotification("附件删除成功")
        }else{
          this.props.showNotification(response.data.message)
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render(){
    const {  Deleted , canDelete } = this.state;
    const { attachments }= this.props
    return(
      <div>
        {
          attachments ?
            <div className="attachmentsList">
              {
                attachments.map((item,key)=>{
                  return(
                    <div key= {key} style={{display: (Deleted.length > 0 && Deleted.indexOf(item.id) !== -1) ? "none" : "block"}} className="mt10 attachment-list-div" >
                      <Link to={`${item.url}`} className="attachment-list-a">
                        <i className="iconfont icon-fujian mr8 paper-clip-color font-12"></i>
                        <span>{item.title}</span>
                        <span className="ml20">{item.filesize}</span>
                      </Link>
                      {
                        canDelete ?
                          <Popconfirm placement="bottom" title={'您确定要删除附件吗'}  okText="是" cancelText="否" onConfirm={()=>this.deleteAttachment(item.id)}>
                            <span className="attachment-list-delete fr" ><i className="iconfont icon-lajitong mr10 color-grey-9 font-14"></i></span>
                          </Popconfirm>
                          :
                          ""
                      }
                    </div>

                  )
                })
              }
            </div>

            :
            ""
        }
      </div>
    )
  }
}
export default Attachment;