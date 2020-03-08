import React,{ Component } from "react";
import { Input, Checkbox, Table, Tooltip, Pagination,Spin  } from "antd";

import CourseLayoutcomponent from '../common/CourseLayoutComponent'
import BoardsListItem from './BoardsListItem'

import Titlesearchsection from '../common/titleSearch/TitleSearchSection'
import ColorCountText from '../common/titleSearch/ColorCountText'
import SendToCourseModal from '../coursesPublic/modal/SendToCourseModal'
import NoneData from "../coursesPublic/NoneData"

import axios from 'axios'

import _ from 'lodash'
import './board.css'
import '../css/members.css'
import { RouteHOC } from './common.js'
import { on, off, trigger, WordsBtn } from 'educoder'

class Boards extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      checkAllValue: false,
      checkBoxValues: [],
      pagination: {
        page: 1,
        page_size: 15,
        total_count: 0
      },
      messages: [
      ],
      sort_type: 'time',
      boardid:undefined,
      isSpin:false
    }
  }
  fetchAll = (searchText, page) => {
    this.setState({
      isSpin:true
    })
    const _serachText = searchText || this.state.searchValue
    const _page = page || this.state.pagination.page
    

    const cid = this.props.match.params.coursesId
    const bid = this.props.match.params.boardId
    // 
    // hot
    const sort_type = this.state.sort_type
    // page_size
    const url = `/boards/${bid}/messages.json?page_size=15&search=${_serachText || ''}&page=${_page}&sort=0&sort_type=${sort_type}`
    axios.get(encodeURI(url)).then((response) => {
        if (response.data.status == 0 && response.data.data) {
          let _newBoards = response.data.data.messages
          // if (_page > 1) {
          //   _newBoards = this.state.boards.slice().concat(_newBoards)
          // }
          this.setState({
            messages: _newBoards,
            boardName: response.data.data.name,
            boardid:response.data.data.id,
            parent_id: response.data.data.parent_id,
            pagination: response.data.pagination || Object.assign({}, this.state.pagination
              , { page: _page, total_count: response.data.data.total_count }),
            isSpin:false
          })
        }
      })
      .catch(function (error) {
        console.log(error);
        this.setState({
          isSpin:false
        })
      });
  }
  fetchBoards = () => {
    const boardId = this.props.match.params.boardId
    const boardsUrl = `/courses/board_list.json?board_id=${boardId}`
    axios.get(boardsUrl, { })
    .then((response) => {
      if (response.data.status == 0) {
        this.setState({
          boards: response.data.data.boards,
          course_id: response.data.data.course_id
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount = () => {
    this.setState({
      isSpin:true
    })
    this.fetchBoards()
    this.fetchAll()

    on('updateNavSuccess', this.updateNavSuccess)
  }

  componentWillUnmount() {
    off('updateNavSuccess', this.updateNavSuccess)
  }
  updateNavSuccess = () => {
    this.fetchBoards()
    if (this.props.match.params.boardId == this.state.boardid) {
      this.fetchAll()
    }
  }

  componentDidUpdate = (prevProps) => {
		if ( prevProps.match.params.boardId != this.props.match.params.boardId ) {
      this.setState({
        isSpin:true
      })
      this.clearAllCheck()
			this.fetchAll(null, 1)
		}
  }
  moveTo = (board) => {
    const len = this.state.checkBoxValues.length
    if (len == 0) {
      this.props.showNotification('请先在列表中选择要移动的帖子')
      return;
    }

    const bid = this.props.match.params.boardId

    const checkBoxValues = this.state.checkBoxValues
    const url = `/boards/${bid}/messages/bulk_move.json`
    axios.put(url, { 
      ids: checkBoxValues,
      to_board_id: board.id
    })
    .then((response) => {
      if (response.data.status == 0) {
        console.log('--- 成功')
        this.props.showNotification('帖子移动成功')
        this.props.updataleftNavfun()
        // TODO 停留在当前board 或 目标board
        this.clearAllCheck()
        this.fetchAll()
      }
    })
    .catch(function (error) {
      console.log(error);
    });    
  }
  onDelete = () => {
    const len = this.state.checkBoxValues.length
    if (len == 0) {
      this.props.showNotification('请先选择要删除的帖子')
      return;
    }
    this.props.confirm({
      // content: `确认要删除所选的${len}个帖子吗？`,
      content: `是否确认删除?`,
      onOk: () => {
        // const cid = this.props.match.params.coursesId
        const bid = this.props.match.params.boardId

        const url = `/boards/${bid}/messages/bulk_delete.json`
        const board_id = 5897
        axios.delete(url, { data: {
            // course_id: cid,
            ids: this.state.checkBoxValues
          }})
        .then((response) => {
          if (response.data.status == 0) {
            // {"status":1,"message":"删除成功"}
            console.log('--- 删除成功')
            this.clearAllCheck()
            this.fetchAll(null, 1)
						this.props.updataleftNavfun()
          }
        })
        .catch(function (error) {
          console.log(error);
        });    
      }
    })
    
  }

  onSticky = (message) => {
    const cid = this.props.match.params.coursesId    
    const url = `/messages/${message.id}/sticky_top.json`
    axios.put(url, { 
      course_id: cid,
    })
    .then((response) => {
      if (response.data.status == 0) {
        console.log('--- 置顶/取消置顶成功')
        // const boards = this.state.boards;
        // for (let _i = 0; _i < boards.length; _i++) {
          // boards[]
        // }
        this.fetchAll()
      }
    })
    .catch(function (error) {
      console.log(error);
    });  
  }
  onItemClick = (item) => {
    const checkBoxValues = this.state.checkBoxValues.slice(0);
    const index = checkBoxValues.indexOf(item.id);
    if (index != -1) {
      _.remove(checkBoxValues, (listItem)=> listItem === item.id)
    } else {
      checkBoxValues.push(item.id)
    }
    this.onCheckBoxChange(checkBoxValues)
  }

  onPressEnter = (e) => {
    clearTimeout(this.timeoutHandler)
    this.timeoutHandler = null;
    
    this.fetchAll(this.state.searchValue, 1)
  }
  onInputSearchChange = (e) => {
    this.setState({
      searchValue:e.target.value
    })

    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
      this.timeoutHandler = null;
    }
    this.timeoutHandler = setTimeout(() => {
      this.fetchAll(this.state.searchValue, 1)
    }, 1200)
  }
  addDir = () => {
  let {boardid}=this.state;
    trigger('boardAdd', parseInt(boardid))
  }
  renameDir = () => {
    const boardId = this.props.match.params.boardId    
    trigger('boardRename', { category_id: parseInt(boardId), category_name: this.state.boardName})
  }
  onToBoardsNew = () => {
    const courseId = this.state.course_id 
    const boardId = this.props.match.params.boardId    

    this.props.toNewPage(courseId, boardId)
  }
  onCheckAll = (e) => {
    this.setState({
      checkAllValue: e.target.checked
    })
    const values = this.state.messages.map(item => {
      return item.id
    })
    if (e.target.checked) {
      const concated = this.state.checkBoxValues.concat(values);
      const sortedUniqed = _.uniq(concated)
      this.setState({
        checkBoxValues: sortedUniqed
      })
    } else {
      this.setState({
        checkBoxValues: _.difference(this.state.checkBoxValues, values)
      })
    }
  }
  clearAllCheck = () => {
    this.setState({
      checkBoxValues: [],
      checkAllValue: false
    })
  }
  onCheckBoxChange = (checkedValues) => {
    this.setState({
      checkBoxValues: checkedValues,
      checkAllValue: checkedValues.length == this.state.messages.length
    })
    console.log('checked = ', checkedValues);
  }
  onPageChange = (pageNumber) => {
  	this.setState({
			checkBoxValues:[]
		})
    this.fetchAll(null, pageNumber)
  }

  onSendToOtherCourse = () => {
    const len = this.state.checkBoxValues.length
    if (len == 0) {
      this.props.showNotification('请先在列表中选择要发送的帖子')
      return;
    }
    this.refs.sendToCourseModal.setVisible(true)
  }
  onSetToOpen = () => {
    const { checkBoxValues } = this.state;
    if (checkBoxValues.length == 0) {
      this.props.showNotification('请先在列表中选择要公开的帖子')
      return;
    }
    const boardId = this.props.match.params.boardId
    const url = `/boards/${boardId}/messages/bulk_public.json`
    axios.put(url, { 
      ids: checkBoxValues
    })
    .then((response) => {
        if (response.data.status == 0) {
          this.props.showNotification('操作成功')  
          this.fetchAll()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }
  onSortTypeChange = (sort_type) => {
    this.setState({ sort_type }, () => {
      this.fetchAll()
    })
    
  }
  render(){
    const isAdmin = this.props.isAdmin()
    const isCourseEnd = this.props.isCourseEnd()
    const isAdminOrStudent = this.props.isAdminOrStudent()
    let { boardName, searchValue, boards, messages, checkBoxValues,
       checkAllValue, pagination, sort_type, parent_id } = this.state;
    const { coursedata } = this.props;

    const bid = this.props.match.params.boardId
    const haveMore = pagination.total_count - pagination.page_size * pagination.page > 0
    return(
      <React.Fragment >
        <SendToCourseModal
          ref="sendToCourseModal"
          {...this.props}
          moduleName="帖子"
          selectedMessageIds={checkBoxValues}
        ></SendToCourseModal>
        <Titlesearchsection
          title={boardName || "帖子列表"}
          searchValue={ searchValue }
          onInputSearchChange={this.onInputSearchChange}
          allowClearonChange={this.onInputSearchChange}
          showSearchInput={messages.length >= 10}
          searchPlaceholder={ '请输入帖子名称进行搜索' }
          firstRowRight={
            <React.Fragment>
              { !isCourseEnd && isAdmin && !parent_id && <WordsBtn style="blue" className="mr30" onClick={()=>this.addDir()}>新建目录</WordsBtn> }
              { isAdmin && !!parent_id && <WordsBtn style="blue" className="mr30" onClick={()=>this.renameDir()}>目录重命名</WordsBtn> }
              { !isCourseEnd && isAdminOrStudent && <WordsBtn style="blue" className="" onClick={()=>this.onToBoardsNew()}>我要发贴</WordsBtn> }
            </React.Fragment>
          }
          secondRowLeft={
            pagination ? <ColorCountText count={pagination.total_count} name="个帖子"></ColorCountText> : ''
          }
          onPressEnter={this.onPressEnter}
        ></Titlesearchsection>

        
          {/* <BoardsListItem></BoardsListItem>

          <FilesListItem></FilesListItem> */}

				{messages&&messages.length == 0?"": isAdmin && <div className="mt20 edu-back-white padding20-30">
				<div className="clearfix">
            {isAdmin&&<Checkbox className="fl" onChange={this.onCheckAll} checked={checkAllValue}>已选 {checkBoxValues.length} 个   （不支持跨页勾选）</Checkbox>}
            <div className="studentList_operation_ul">
              { !!isAdmin && 
              <React.Fragment>
                <li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.onDelete}>删除</a></li>
                <li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.onSendToOtherCourse}>发送</a></li>
                { coursedata && !!coursedata.course_public && <li className="li_line"><a href="javascript:void(0)" className="color-grey-9" onClick={this.onSetToOpen}>设为公开</a></li> }

                <li className="li_line drop_down">
                  移动到...<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                  <ul className="drop_down_menu" 
                      style={{"right":"0px","left":"unset", maxHeight: '318px', overflowY: 'auto',  minWidth: '200px'}}>
                    { boards && boards.length > 10 && <p className="drop_down_search">
                      <Input placeholder="搜索" value={this.state.dirSearchValue} onChange={(e) => {this.setState({dirSearchValue: e.target.value})}}/>
                    </p> }
                    {
                      boards && boards.filter((item)=> {
                        return item.id != bid && (!this.state.dirSearchValue || item.name.indexOf(this.state.dirSearchValue) != -1)
                      }).map( (item, index) => {
                        return <li key={`i_${index}`} onClick={() => this.moveTo(item)} title={item.name}>{item.name}</li>
                      })
                    }
                    { isAdmin && !isCourseEnd &&
                     <p className="drop_down_btn">
                      <a href="javascript:void(0)" className="color-grey-6"
                          onClick={()=>this.addDir()}
                      >新建目录...</a>
                     </p>
                    }
                    {/* <p className="drop_down_btn"><a href="javascript:void(0)" className="color-grey-6">添加分班...</a></p> */}
                  </ul>
                </li>
              </React.Fragment>
              }

              <li className="drop_down">
                {sort_type == 'time' ? '时间排序' : '热度排序'}<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                <ul className="drop_down_normal">
                  <li onClick={() => this.onSortTypeChange('time')}>时间排序</li>
                  <li onClick={() => this.onSortTypeChange('hot')}>热度排序</li>
                </ul>
              </li>
            </div>
          </div>
        </div>
        }
        <style>{`
          .panel-inner-fourm {
            border-bottom: none;
          }
          .panel-inner-fourm:hover {
            background: #fff;
          }
        `}</style>
        <Spin size="large" spinning={this.state.isSpin}>
          <div className="clearfix stu_table">
            <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>
              { messages.map((item, index) => {
                  return (
                    <div className="mt20 edu-back-white padding02010" key={`d_${index}`}>
                      <BoardsListItem 
                        {...this.props}
                        discussMessage={item}
                        checkBox={ isAdmin ? <Checkbox value={item.id} key={item.id}></Checkbox> : ''}
                        onItemClick={this.onItemClick}
                        onSticky={this.onSticky}
                      ></BoardsListItem>
                    </div>
                  )
                })
              }
            </Checkbox.Group>
          </div>
        </Spin>
        {
          ( !this.state.isSpin && (!messages || messages.length == 0) ) && <NoneData></NoneData>
        }

          {/* { haveMore && <p className="edu-txt-center pt30 pb10 clearfix">
            <a className={"clickmorebox"} onClick={() => this.fetchAll(null, parseInt(pagination.page) + 1)}>
              <Tooltip title="点击查看更多" placement="bottom" arrowPointAtCenter={true}
              >
                <i className="iconfont icon-xiajiantou color-grey-9 font-16"></i>
              </Tooltip>
            </a>
            </p> } */}
          {pagination.total_count > 15 && <Pagination className="coursePagination" 
              current={pagination.page}
              showQuickJumper pageSize={15} total={pagination.total_count} onChange={this.onPageChange} />}
               
      </React.Fragment>
      )
    }
}
export default RouteHOC()(Boards);