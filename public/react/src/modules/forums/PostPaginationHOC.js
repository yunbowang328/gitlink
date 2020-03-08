import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import update from 'immutability-helper'
import PostItem from './PostItem'

import { CircularProgress } from 'material-ui/Progress';

import { queryString } from 'educoder'
import { on, off, updatePageParams } from 'educoder'
import './Post.css'
const $ = window.$

function urlStringify(params) {
	let noParams = true;
	let paramsUrl = '';
  	for (let key in params) {
  		noParams = false;
    	paramsUrl += `${key}=${params[key]}&`
  	}
  	if (noParams) {
  		return '';
  	}
  	paramsUrl = paramsUrl.substring(0, paramsUrl.length - 1);
  	return paramsUrl;
}
export function postPaginationHOC(options = {}) {
// options.isMyPublish
return function wrap(WrappedComponent) {
	
  	return class II extends React.Component {
	  	constructor(props) {
	      super(props)

	      this.state = {
	        currentPage: 1,
	        loadingMemos: true

	      }
	    }


	    componentDidMount() {    
	    	$('body>#root').on('onMemoDelete', (event) => {	
	    		// const val = $('body>#root').data('onMemoDelete')
	    		const val = window.onMemoDelete ;
	    		this.onMemoDelete( JSON.parse(decodeURIComponent(val)) )
	    	})
	    	window.$('#shixun_search_input').val('')
		      
	    	this.props.setSearchValue('')
		      
	    	this.fetchMemos(null, '')
	      	
	      	const that = this;
	      	$(window).on('popstate',  (e) => {
			    var state = e.originalEvent.state;
			    console.log('popstate', state)
			    if (state !== null) {

			        let currentPage = that.state.currentPage;;
				    //   // 浏览器地址改变了
				    const search = that.props.history.location.search
				    const parsed = queryString.parse(search);
				    if (parsed.page != currentPage) {
				        currentPage = parseInt( parsed.page || 1)
				    //     that.setSearchValue('')
				        that.fetchMemos(currentPage)
				        this.setState({
				          	currentPage,
				        })
				    } 
			    }
			});

	      	// RightMyPublish组件发过来的消息
			// $(window).on('setSearchValue', (event, val, noFetch)=>{
				
			// })

			on('hotTagClick', (event, tagName, index) => {
				this.props.setHotLabelIndex(tagName.selectedHotLabelIndex, () => {
					this.fetchMemos(1, undefined)
				})
			})
	    }
	    componentWillReceiveProps(newProps, newContext) {
	    	if (newProps.enterKeyFlag !== this.props.enterKeyFlag) {
	    		const childPath = this.props.match.path.split('/:')[0]
		      	// 加入一个浏览地址
		      	const _search = this.props.location.search;
		      	if (_search) {
		      		const parsed = queryString.parse(_search);
		      		if (parsed.page != 1) {
		      			parsed.page = 1;
		      			this.props.history.push(`${this.props.match.url}?${queryString.stringify(parsed)}`)
		      		}
		      	}
				this.fetchMemos(1, newProps.searchValue, newProps.selectedHotLabelIndex)	// 搜索框模糊搜索，重置为第一页
		        
	    	}
	    }
	    componentWillUnmount() {
	    	// 要移除掉，不然到了MemoDetail页面，可能会有2个onMemoDelete监听
	    	$('body>#root').off('onMemoDelete')
	    	$(window).off('setSearchValue')
	    	$(window).off('popstate')
	    	off('hotTagClick')
	    }
	    fetchMemos(arg_currentPage, arg_searchValue, arg_selectedHotLabelIndex) {
	    	let { match, history } = this.props

	    	let searchValue = arg_searchValue != undefined ? arg_searchValue : this.props.searchValue
	    	// 根据参数初始化页数
		    
		    const memoType = match.params.memoType;
		    const urlArray = match.url.split('/')
		    const lastPath = urlArray[2]

	    	// 1 问题反馈
	      	// 3 操作指南  5 技术分享
	      	
	      	const memoTypeMap = {
	      		'guide': 3,
	      		'techShare': 5
	      	}
	      	const orderTypeMap = {
	      		'hottest': 'replies_count',
  	      		'newest': 'updated_at', // 'created_at',
	      	}
	      	const _search = this.props.history.location.search;
		    const parsed = queryString.parse(_search);

		    let currentPage = parseInt( arg_currentPage ? arg_currentPage : (parsed.page || 1) )

	      	const params = {
		        // replies_count最热  created_at 最新
		        // s_order: 'replies_count',
		        page: currentPage,
		        
		        // forum:     // forum_id
		        // user_id
	      	}
	      	if (searchValue) {
	      		params.search = searchValue.trim()
	      	}
	      	let orderType = ''
	      	if (memoType==='all') {
	      		orderType = parsed.order || 'hottest';
	      		params.order = orderTypeMap[orderType] 
	      	} else if (options.isMyPublish) {
	      		params.user_id = -1
	      	} else if (memoType) {
	      		params.forum = memoType
	      		if (memoType == 5) {	// 讨论区的技术分享tab按照创建时间倒序 
	      			params.order = 'created_at'
	      		}
	      	}

	      	let { selectedHotLabelIndex, hot_tags } = this.props;
      		selectedHotLabelIndex = arg_selectedHotLabelIndex ? arg_selectedHotLabelIndex : selectedHotLabelIndex
	      	if (selectedHotLabelIndex !== -1 && hot_tags[selectedHotLabelIndex]) {
	        	params.tag_repertoire_id = hot_tags[selectedHotLabelIndex].tag_repertoire_id // encodeURIComponent()
	      	}
	      	      	

	      	let paramsUrl = queryString.stringify(params)
	      	const memosUrl = '/memos.json?' + paramsUrl    // /${challenge.identifier}/star

	      	this.setState({
		        currentPage,
		        loadingMemos: true,
		        orderType: orderType
		    })
	      	// 获取memo list
	      	axios.get(memosUrl,{
	          	// withCredentials: true,
	        })
	      	.then((response) => {
	      		const memo_count = response.data.memo_count
	      		if (memo_count>=0) {

	      			const maxPage = Math.ceil( memo_count / 15 )
	      			// page超出，显示最后一页
	      			if (maxPage != 0 && maxPage < currentPage) {
	      				this.fetchMemos(maxPage);
	      				return;
	      			}
	      			// const user = response.data.current_user;
	      			// user.tidding_count = response.data.tidding_count;
		    		// this.props.initCommonState(user)
		    		this.props.initForumState(response.data)
		    		this.setState({
		    			p_forum_id: params.forum,
		    			p_s_order: params.s_order,
		    			loadingMemos: false
		    		})
		    	}

	      	}).catch((error) => {
	      		console.log(error)
	      	})
	    }


	    onCurrentPageChange(pageNum) {
	    	this.setState({
	    		currentPage: pageNum
	    	})
	    }

	    onPaginationChange(pageNum, pageSize) {
	      	window.$("html,body").animate({"scrollTop":0})

			updatePageParams(pageNum, this.props)

	      	// 加入一个浏览地址
	    //   	const params = {
	    //   		page: pageNum
	    //   	}
	    //   	if (this.state.orderType) {
  			// 	params.order = this.state.orderType;
  			// }
	      	// this.props.history.push(`${url}?${queryString.stringify(parsed)}`)

	      	this.fetchMemos(pageNum);

	      // this.setState({
	      //   currentPage: pageNum
	      // })
	    }

	    // 置顶
	    setTop(memo) {
	    	const params = {
	    		sticky: memo.sticky ? 0 : 1,	
	    	}
	    	if (this.state.p_s_order) { 
	    		params.order = this.state.p_s_order;
	    	}
	    	if (this.state.p_forum_id) { 
	    		params.forum_id = this.state.p_forum_id;
	    	}
	      	let paramsUrl = urlStringify(params)
	    	const set_top_or_down_Url = `/memos/${memo.id}/sticky_or_cancel.json?${paramsUrl}`;
	    	// 获取memo list
	      	axios.post(set_top_or_down_Url, {
	          	// withCredentials: true,
	        })
	      	.then((response) => {
	      		const status = response.data.status
	      		if (status === 0) {
			    	this.fetchMemos(1, '')

	      			// const { memo_list } = response.data;
	      			// this.props.initForumState({ memo_list })
	      			// 刷新列表
	      			// TODO 服务端直接返回第一页列表
	      			// this.props.history.replace('/')
		    	}
	      	}).catch((error) => {
	      		console.log(error)
	      	})
	    }
	    // 取消置顶
	    setDown(memo) {
	    	this.setTop(memo);
	    }
	    onMemoDelete(memo) {
	    	const deleteUrl = `/memos/${memo.id}.json`;
	    	// 获取memo list
	      	axios.delete(deleteUrl, {
	          	// withCredentials: true,
	        })
	      	.then((response) => {
	      		const status = response.data.status
	      		if (status === 0) {

	      			this.props.showNotification('删除成功');
	      			// 刷新列表
	      			this.fetchMemos();
		    	}
	      	}).catch((error) => {
	      		console.log(error)
	      	})
	    }
	    // item渲染
	    // 
	    renderMemoList() {
	      const { memo_list, user } = this.props;
	      if (!memo_list) {
	        return ''
	      }
	      return memo_list.map( (item, index) => {
	        return (
	          	<PostItem key={item.id} user={user} index={index} {...this.props}
	          		setTop={(memo)=>this.setTop(memo)}
		        	setDown={(memo)=>this.setDown(memo)}
		        	memo={item}
	          	></PostItem>
	          )
	      })
	    }

	    render() {
	    	const { loadingMemos } = this.state;
	    	const { memo_list, searchValue, showSearchValue, memo_count, selectedHotLabelIndex, hot_tags} = this.props;

	    	// 规则： 搜索框输入了值 或者 选择了热门标签的时候显示该提示
			const _showSearchValue = showSearchValue || selectedHotLabelIndex != -1
			let _searchValue;
			if (showSearchValue) {
				_searchValue = searchValue
			} else if (selectedHotLabelIndex != -1){
				_searchValue = hot_tags[selectedHotLabelIndex].name || hot_tags[selectedHotLabelIndex]
			}

	      	return (

	      	<div className="edu-back-white" id="forum_index_list"> {/* fl with100 */}
	      		<div className="clearfix">
		      	 	{ _showSearchValue &&
		      		<div className="noMemosTip" style={{display: loadingMemos ? 'none' : 'block'}}>
		      			<span className="fr pr20" id="search_result">
				        	共找到&nbsp;
				        	<span className="color-orange03">{memo_count}</span>个"
				        	<span className="color-orange03">{_searchValue}</span>"相关的结果
				      	</span>
		      		</div> }

			        <CircularProgress size={40} thickness={3} 
						style={{ marginLeft: 'auto', marginRight: 'auto', paddingTop: '20%'
							   , display: loadingMemos ? 'block': 'none' }}/>
				    { !loadingMemos &&
			        <WrappedComponent {...this.props} {...this.state}
			        	
			        	onPaginationChange={(pageNum, pageSize) => this.onPaginationChange(pageNum, pageSize)}
			        	onCurrentPageChange={(pageNum, pageSize) => this.onCurrentPageChange(pageNum, pageSize)}

			        	renderMemoList={() => this.renderMemoList()}
			        	fetchMemos={(arg1, arg2) => this.fetchMemos(arg1, arg2)}
			        	
			        ></WrappedComponent>
			        }
			    </div>
                
			</div>
	      	)
	    }
  	}
}
}