import React, { Component } from 'react';
import { notification } from 'antd'
import Modals from '../../modals/Modals'

export function CNotificationHOC(options = {}) {
	return function wrap(WrappedComponent) {
    return class Wrapper extends Component {
      constructor(props) {
        super(props);
        
        notification.config({
          duration: 3,
        });

        this.state = {
          dialogOpen: false,
          defineOpen:false
        }
      }
    
			showNotification = (description, message = "提示", icon) => {
        // const data = {
        //   message,
        //   description
        // }
        // if (icon) {
        //   data.icon = icon;
        // }
        // notification.open(data);

				notification.open({
					message:message,
					description: description,
					style: {
						zIndex: 99999999
					},
				});
      }

			  bytesToSize = (bytes)  => {
				if (bytes === 0) return '0 B';
				let k = 1024,
					sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
					i = Math.floor(Math.log(bytes) / Math.log(k));
				return (bytes / Math.pow(k, i)). toFixed(2) + ' ' + sizes[i];
			}

      configNotification = (placement) => {
        placement && notification.config({
          placement: placement,
        });
      }

      getNowFormatDates=(val,type)=>{

        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month ;
        var setnum=0;
        if(val===1){
          month= date.getMonth() + 1;
        }else if(val===2){
          month= date.getMonth() + 2;
        }else{
          month= date.getMonth() + 3;
        }
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }

        var min=date.getMinutes();
        if(val===1){
          if (min >= 0 && min <= 9) {
            min = "0" + min;
          }
        }else{
          if (min >= 0) {
            min = "00";
            setnum=1;
          }
        }

        let hour=date.getHours()+ setnum;

        var currentdate;

        if(type===1){
          currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + "00" + seperator2 + "00";
        }else{
          if(val===1){
            currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + date.getHours() + seperator2 + min;
          }else{
            currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + hour + seperator2 + min;
          }

        }


        return currentdate;
      }


      confirm = (object) => {
        const { title, content,subContent, onOk, onCancel, okText } = object;
        this.onCancel = onCancel
        this.onOk = onOk
        this.okText = okText || '确定'
        this.setState({ title, content , subContent , dialogOpen: true  })
      }
      onDialogOkBtnClick = () => {
        this.onOk && this.onOk();
        // TODO promise

        this.setState({ dialogOpen: false })
        this.onCancel = null
        this.onOk = null
      }
      handleDialogClose = () => {
        this.onCancel && this.onCancel();

        this.setState({ dialogOpen: false })
        this.onCancel = null
        this.onOk = null
      }

      // 附件太大提示框
      define = (object) =>{
        const { title, content } = object;
        this.setState({ title, content, defineOpen: true  })
      }
      onDialogdefineOkBtnClick = () =>{
        this.onCancel && this.onCancel();

        this.setState({ defineOpen: false })
        this.onCancel = null
        this.onOk = null
      }
      render() {
        const { snackbarOpen, snackbarText, snackbarHorizontal, snackbarVertical, dialogOpen, content ,subContent ,defineOpen } = this.state;

        
        return (
          <React.Fragment>
            <style>
              {`
                .confirmModal .task-popup-content {
                  padding: 0px;
                }
              `}
            </style>
            <Modals 
                className="confirmModal"
                modalsType={dialogOpen}
                modalsTopval={
									content
                }
                modalsBottomval={ subContent || "" }
                modalCancel={this.handleDialogClose}
                modalSave={this.onDialogOkBtnClick}
                okText={this.okText}
						>
						</Modals>
            <Modals
                modalsType={defineOpen}
                modalsTopval={
									content
								}
                loadtype={true}
                modalsBottomval={""}
                modalCancel={undefined}
                modalSave={this.onDialogdefineOkBtnClick}
						>
						</Modals>
            <WrappedComponent {...this.props} 
                showNotification= { this.showNotification }
						    bytesToSize={this.bytesToSize}
                getNowFormatDates={(value,type)=>this.getNowFormatDates(value,type)}
                configNotification={ this.configNotification } 
                confirm={ this.confirm }
                define={ this.define }
            >
            </WrappedComponent>
          </React.Fragment>
        )
      }
    }
	}
}