import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { getImageUrl, toPath } from 'educoder';

import { Tooltip } from 'antd';

import axios from 'axios';

import { CircularProgress } from 'material-ui/Progress';

const $ = window.$;

class Propaedeutics extends Component {
  constructor(props) {
    super(props)
    this.state={
      PropaedeuticsListcontent:undefined,
      shixunId:undefined
    }
  }

  componentDidMount() {
    let id = this.props.match.params.shixunId;
    this.setState({
      shixunId:id
    })
    let url="/shixuns/"+id+"/propaedeutics.json";
    axios.get(url).then((response) => {

      if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

      }else{
        if(response.data.content!=null){
          this.setState({
            PropaedeuticsListcontent:response.data.content
          })
        }else{
          this.setState({
            PropaedeuticsListcontent:""
          })
        }
      }
    }).catch((error) => {
      console.log(error)
    });

  }

  updatamakedown=(id)=>{
    setTimeout(()=>{
      var shixunDescr = window.editormd.markdownToHTML(id, {
        htmlDecode: "style,script,iframe",
        taskList: true,
        tex: true,
        flowChart: true,
        sequenceDiagram: true
      });
      $("#"+id+" p:first").addClass("ReactMarkdown");
      $('#collaborators_list_info').show()
    }, 200)
  }
  render() {
    let {loadingContent} = this.props;
    let {PropaedeuticsListcontent,shixunId}=this.state

    if(PropaedeuticsListcontent!=undefined){
      this.updatamakedown("ReactMarkdown")
    }

    return (
      <React.Fragment>
        <p className="clearfix mb10 pl20 pr20" style={{display:this.props.identity<5&&this.props.status<3?"block":'none'}} >
					<Tooltip placement="bottom" title={"编辑"}>
					<Link to={"/shixuns/"+shixunId +"/update_propaedeutics"} className="fr audit_situationactive mt20" id="edit_propaedeutics">
						{/*<img src={getImageUrl("images/educoder/icon/edit.svg")} className="fl mt3 ml2" />*/}
           编辑
					</Link>
					</Tooltip>
        </p>

        <style>
          {
            `
            .editormd-html-preview, .editormd-preview-container {
                width:100% !important;
            }
            `
          }
        </style>
        {
          loadingContent ?
            <CircularProgress size={40} thickness={3}
                              style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '200px', display: 'block' }}/> :
            <div id="collaborators_list_info" style={{display: 'none',minHeight: '640px',padding:'20px 30px 30px 30px'}}>
              {PropaedeuticsListcontent===undefined?"":
                <p id="ReactMarkdown">

                  {PropaedeuticsListcontent === undefined ||PropaedeuticsListcontent === ""?
                    <div className="alltask">
                      <div className="alltask">
                        <div className="edu-tab-con-box clearfix edu-txt-center">
                          <img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
                          <p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p>
                        </div>
                      </div>
                    </div>
                    :<textarea>{PropaedeuticsListcontent}</textarea>}

                </p>
              }
            </div>
        }
      </React.Fragment>
    );
  }
}

export default Propaedeutics;
