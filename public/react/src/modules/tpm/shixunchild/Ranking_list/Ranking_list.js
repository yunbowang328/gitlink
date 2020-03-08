import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { getImageUrl, toPath } from 'educoder';

import { CircularProgress } from 'material-ui/Progress';

import axios from 'axios';

const $ = window.$;

class Ranking_list extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Ranking_listData:[]
    }
  }

  Ranking_listList = (id) => {
    let Ranking_listURL = `/shixuns/` + id + `/ranking_list.json`;
    axios.get(Ranking_listURL).then((response) => {
      if (response.status === 200) {
        if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

        }else{
          this.setState({
            Ranking_listData: response.data
          });
        }
      }

    }).catch((error) => {
      console.log(error)
    });
  }

  componentDidMount() {
    let id = this.props.match.params.shixunId;
    setTimeout(this.Ranking_listList(id), 1000);
  }
  checkAddZone=(num)=>{
    return num<10 ? '0' + num.toString() : num
  }
  dateTimeFormatter=(t)=> {
    if (!t) return ''
    t = new Date(t).getTime()
    t = new Date(t)
    var year = t.getFullYear()
    var month = (t.getMonth() + 1)
    month = this.checkAddZone(month)

    var date = t.getDate()
    date = this.checkAddZone(date)

    var hour = t.getHours()
    hour = this.checkAddZone(hour)

    var min = t.getMinutes()
    min = this.checkAddZone(min)

    return year + '-' + month + '-' + date + ' ' + hour + ':' + min
  }

  formatSeconds=(value)=> {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
      theTime1 = parseInt(theTime/60);
      theTime = parseInt(theTime%60);
      if(theTime1 > 60) {
        theTime2 = parseInt(theTime1/60);
        theTime1 = parseInt(theTime1%60);
      }
    }
    var result = ""+parseInt(theTime)+"秒";
    if(theTime1 > 0) {
      result = ""+parseInt(theTime1)+"分"+result;
    }
    if(theTime2 > 0) {
      result = ""+parseInt(theTime2)+"小时"+result;
    }
    return result;
  }

  render() {
    let { Ranking_listData } = this.state;
    let { loadingContent } = this.props;

    // console.log(Ranking_listData)
    return (
      <React.Fragment>
        { loadingContent ?
          <CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '200px', display: 'block' }}/> :

          <div  className="padding20 edu-back-white" style={{minHeight: '640px'}}>
            {Ranking_listData===undefined||Ranking_listData.length===0?
              <div className="edu-txt-center mt100">
                <img src={getImageUrl("images/educoder/gold-big.png")} style={{width:"115px",height:"145px"}}   />
                <p className="color-grey-9 mt20">我们在等你，不轻言放弃</p>
              </div>
              :Ranking_listData.map((item,key)=>{
                var keys=key+1
                return(
                  <div  className="mt20 clearfix rankings">
                    <li  className="fl edu-txt-left with25 ml50">
                      <img src={getImageUrl("images/educoder/gold"+keys+".png")}
                           style={{display:key<3?"block":"none"}}
                           width="24px" height="30px"  className="mr20 fl mt5"/>
                      <span className="mr20 fl rankingindex"
                            style={{display:key>2?"block":"none"}}
                      >{key+1}</span>
                      <a href={item.users.user_url}  className="mr10 fl" target="_blank">
                        <img alt="头像"  className="radius" height="40" src={getImageUrl("images/"+item.users.image_url+"?1515212398")} width="40"/>
                      </a>

                      <a href={item.users.user_url} className="color-grey-6 task-hide" style={{maxWidth: '90px', display: 'block'}} target="_blank">{item.users.name}</a>
                    </li>

                    <li  className="fl with23 edu-txt-center color-grey-9">{this.dateTimeFormatter(item.time)}通关</li>
                    {/*<li  className="fl with13 edu-txt-center color-grey-74">*/}
                    {/*/!*{item.accuracy} %准确率*!/*/}
                    {/*</li>*/}
                    <li  className="fl with25 edu-txt-center">{item.use_time===null?"":this.formatSeconds(item.use_time)}</li>
                    <li  className="fl with14 edu-txt-center color-yellow">+{item.gold}金币 </li>
                  </div>
                )
              })}
          </div>
        }
      </React.Fragment>

    );
  }
}

export default Ranking_list;
