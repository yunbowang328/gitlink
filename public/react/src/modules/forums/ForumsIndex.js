import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import Loading from '../../Loading'

import Loadable from 'react-loadable';

import classNames from 'classnames'

import MemoTechShare from './MemoTechShare'
// import MemoGuide from './MemoGuide'
// import MemoNewest from './MemoNewest'
// import MemoHottest from './MemoHottest'

import MemoDetail from './MemoDetail'
import MemoNew from './MemoNew'
import MemoMyPublish from './MemoMyPublish'
import MemoShixun from './shixun/MemoShixun'


import { TPMIndexHOC } from '../tpm/TPMIndexHOC'

import RightMyPublish from './RightMyPublish'
import UserSection from './UserSection'
import RightHotLabel from './RightHotLabel'
import RightHotQuestion from './RightHotQuestion'
import RightMemoLabel from './RightMemoLabel'
import RecommendShixun from './RecommendShixun'


import ForumsNavTab from './ForumsNavTab'

import axios from 'axios'


import 'rc-select/assets/index.css';
import './ForumsIndex.css'
import './RightSection.css'

import { SnackbarHOC, getUrl } from 'educoder'
import { CNotificationHOC } from '../courses/common/CNotificationHOC'


let _url_origin = getUrl()

const $ = window.$
$('head').append( $('<link rel="stylesheet" type="text/css" />')
  .attr('href', `${_url_origin}/stylesheets/css/edu-admin.css?6`) );
$('head').append( $('<link rel="stylesheet" type="text/css" />')
  .attr('href', `${_url_origin}/stylesheets/css/edu-forum.css?1525440977`) );
$('head').append( $('<link rel="stylesheet" type="text/css" />')
  .attr('href', `${_url_origin}/stylesheets/educoder/magic-check.css?1525440977`) );

setTimeout(()=>{
  // 附件上传滚动条  \public\stylesheets\jquery\jquery-ui-1.9.2.css
  $('head').append( $('<link rel="stylesheet" type="text/css" />')
  .attr('href', `${_url_origin}/stylesheets/jquery/jquery-ui-1.9.2.css`) );
}, 1000)

class ForumsIndex extends Component {
    constructor(props) {
      super(props)

      this.state = {
        searchValue: '',
        enterKeyFlag: false,
        showSearchValue: false, 
        selectedHotLabelIndex: -1,
      }
    }

    setSearchValue = (searchValue, enterKeyFlag) => {
      if (enterKeyFlag === true) {
        this.setState({
          selectedHotLabelIndex: -1
        })
      }
      this.setState({
        searchValue,
        showSearchValue: (enterKeyFlag && searchValue) ? true : false,
        enterKeyFlag: enterKeyFlag === true ? !this.state.enterKeyFlag : this.state.enterKeyFlag
      })
    }

    setHotLabelIndex = (index, callback) => {
      const newState = {
        selectedHotLabelIndex: index,
      }
      if (index != -1) {
        newState.searchValue = ''
        newState.showSearchValue = false
      }
      this.setState({
        ...newState
      }, callback)
    }

    initForumState(data) {
      this.setState({...data})
    }


    componentDidMount() {
      window.document.title = '交流问答'
      
    }



    componentWillReceiveProps(newProps, newContext) {

    }
    
    

  	render() {
  		const { match, history, resLoading } = this.props
      const { memo } = this.state;

  		const techSharePath = `${match.path}/categories/:memoType`
      const guidePath = `${match.path}/categories/:memoType`
      const hottestPath = `${match.path}/categories/:memoType`  //  ?order=hottest
  		const newestPath = `${match.path}/categories/:memoType`   // ?order=newest

      const shixunDiscussPath = `/forums/categories/shixun_discuss`
  		const locationPath = history.location.pathname


      const isWidth100 = (locationPath.indexOf('forums/new') !== -1 
        || locationPath.indexOf('/edit') !== -1) ? true : false

      const pathArray = locationPath.split('/');
      const isMemoDetail = (!isWidth100 && 
          pathArray.length === 3 && !isNaN(parseInt(pathArray[2])) ) ? true : false

      const isGuide = locationPath.indexOf('/forums/categories/3') !== -1 

	    return (
    		<div className="newMain clearfix">
          <div className="educontent mt30 clearfix">
    			{/* 左边栏   component={TechShare} 
            <ForumsNavTab {...this.props}></ForumsNavTab> */}
            <div className={classNames('fl', { with75: !isWidth100}, { width100: isWidth100}) }>

              
              <Switch>
                <Route path={`/forums/categories/my_published`}  render={
                  (props) => (<MemoMyPublish {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)}
                    setSearchValue={this.setSearchValue} 
                    setHotLabelIndex={this.setHotLabelIndex}
                     />)
                }></Route>
                <Route path={`${shixunDiscussPath}`} render={
                  (props) => (<MemoShixun {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)} 
                    setSearchValue={this.setSearchValue} 
                    setHotLabelIndex={this.setHotLabelIndex}
                    />)
                }></Route>
                <Route path={`${techSharePath}`} render={
                  (props) => (<MemoTechShare {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)} 
                    setSearchValue={this.setSearchValue} 
                    setHotLabelIndex={this.setHotLabelIndex}
                    />)
                }></Route>
                
                
                {/*
                <Route path={`${guidePath}`}  render={
                  (props) => (<MemoGuide {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)} />)
                }></Route>
                <Route path={`${hottestPath}`}  render={
                  (props) => (<MemoHottest {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)} />)
                }></Route>
                <Route path={`${newestPath}`}  render={
                  (props) => (<MemoNewest {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)} />)
                }></Route> */}

                {/* :forumTypeId/ */}
                <Route path={`/forums/new`}  render={
                  (props) => (<MemoNew {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)}
                     />)
                }></Route>

                <Route path={`/forums/:memoId/edit`}  render={
                  (props) => (<MemoNew {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)}
                     />)
                }></Route>

                

                <Route path={`${match.path}/:memoId`}  render={
                  (props) => (<MemoDetail {...this.props} {...this.state} {...props} 
                    initForumState={(data)=>this.initForumState(data)} 
                     />)
                }></Route>

                



            
                <Redirect from={`${match.url}`} to={`/forums/categories/all?order=newest`} />
              </Switch>
                
            </div>

			      
              {/* 右边栏 */}
            { !isWidth100 && <div className="with25 fl">
              <div className="ml20">
                {isMemoDetail ? 
                  <React.Fragment>
                    <UserSection {...this.props} {...this.state}  initForumState={(data)=>this.initForumState(data)} ></UserSection>
                    {/*todo 新增RightMemoLabel 和 推荐实训RecommendShixun */}
                    { memo && memo.tag && <RightMemoLabel {...this.props} {...this.state}></RightMemoLabel> }
                    <RecommendShixun {...this.props} {...this.state}></RecommendShixun>
                  </React.Fragment>
                  : 
                  <React.Fragment>
                    <RightMyPublish {...this.props} {...this.state} setSearchValue={this.setSearchValue}></RightMyPublish>
                    { !isGuide && <RightHotLabel {...this.props} {...this.state} ></RightHotLabel> }
                    <RightHotQuestion {...this.props} {...this.state} ></RightHotQuestion>
                    <RecommendShixun {...this.props} {...this.state}></RecommendShixun>
                  </React.Fragment>
                }

                

                
              </div>
            </div>
            }

          </div>
        </div>
	    );
  	}
}

export default CNotificationHOC() (SnackbarHOC() ( TPMIndexHOC ( ForumsIndex ) ));

/*
:
列表所有：
http://localhost:3000/forums/categories/all
:
详情：
:
http://localhost:3000/forums/5
:
http://localhost:3000/forums/new
:
http://localhost:3000/forums/categories/my_published
*/