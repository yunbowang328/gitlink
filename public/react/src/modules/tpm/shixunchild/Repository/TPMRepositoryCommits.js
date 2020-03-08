import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import axios from 'axios';

import TPMNav from '../../component/TPMNav'
import TPMRightSection from '../../component/TPMRightSection'
import { CircularProgress } from 'material-ui/Progress';

import { trace_collapse } from 'educoder'
const $ = window.$;

// 点击按钮复制功能
function jsCopy(){
    var e = document.getElementById("copy_rep_content");
    e.select();
    document.execCommand("Copy");
}
class TPMRepositoryCommits extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RepositoryList: undefined,
        }
	}
  componentDidMount() {
    let id = this.props.match.params.shixunId;

    let collaborators=`/shixuns/`+id+`/commits.json`;
    axios.post(collaborators, {
        secret_repository: this.props.secret_repository_tab
    }).then((response)=> {

        if(response.status===200){
            this.setState({
              RepositoryList: response.data
          });
        }
        trace_collapse('repo commits res', response.data)

      }).catch((error)=>{
        console.log(error)
      });

  }
  render() {
    const { loadingContent, creator, shixun, myshixun, recommend_shixuns, current_user, watched,
        aboutFocus, user, match
       } = this.props;
    let { RepositoryList } = this.state;
    return (
      <React.Fragment>

        <div className="tpmComment educontent clearfix mt30 mb80">
            {/* 可能会影响到其他页面的样式，需要测试、协商 */}
            <div className="with65 fl edu-back-white commentsDelegateParent"
                style={{background: 'transparent'}}>
                <TPMNav
                    match={match}
                    user={user}
                    shixun={shixun}
                    {...this.props}
										is_jupyter={this.props.is_jupyter}
                ></TPMNav>
            { loadingContent ?
            <CircularProgress size={40} thickness={3}
                style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '200px', display: 'block' }}/>
                :

                <div className="" >
                    <div className="edu-back-white font-16 mb10 clearfix padding20">
                        <span className="fl"><i className="iconfont icon-tijiaojilu mr5"></i>
                            提交记录
                        </span>
                        {/* &nbsp;35 */}
                        <span className="color-grey-9 fr">
                        <Link to={`/shixuns/${match.params.shixunId}/repository/${match.params.repoId}`}
                            className="font-14 color-grey-9">返回</Link>
                        </span>
                    </div>

                    <style>
                    {`
                        a.pullreques_name:hover {
                            color: #666 !important
                        }
                    `}
                    </style>
                    <div className="edu-back-white font-16 mb10 clearfix padding20">
                        <ul className="pullreques_pull_list">
                            { RepositoryList === undefined ? "" : RepositoryList.commits.map( (item, key)=>{
                            return (
                            <li className="clear" key={ key }>
                                <a
                                    style={{ cursor: 'inherit' }}
                                    className="fl color-grey-6 font-16 pullreques_name task-hide"
                                    target="_blank">{item.email}</a>
                                <p className="pullreques_pull_txt ml10 fl" style={{lineHeight: '32px'}}>
                                    {item.title}
                                </p>
                                <a  style={{ cursor: 'inherit' }}
                                    className="fr mr15 color-blue">{item.time}</a>

                                <div className="cl"></div>
                            </li>)
                            })
                            }
                        </ul>
                    </div>
                </div>
                }
            </div>

            <div className="with35 fr pl20">
            <TPMRightSection {...this.props}></TPMRightSection>
            </div>
        </div>


      </React.Fragment>

    );
  }
}

/**
    { RepositoryList === undefined ? "" : RepositoryList.commits.map( (item, key)=>{
                    // {"email":"李暾","title":"2\n","id":"80cb6fc55a14bdd64a9c99913f416966238ed3de","time":"49年前"}
                    return (
                        <div>
                            <div>{item.email}</div>
                            <div>{item.title}</div>
                            <div>{item.id}</div>
                            <div>{item.time}</div>
                        </div>
                    )
                })
 */
export default TPMRepositoryCommits;
