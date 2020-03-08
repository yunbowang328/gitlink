import React, { Component } from "react";
import { Modal, Checkbox, Input, Spin} from "antd";
import axios from 'axios'
import ModalWrapper from "../../common/ModalWrapper"
import InfiniteScroll from 'react-infinite-scroller';

const Search = Input.Search
const pageCount = 15;
class SendToCourseModal extends Component{
  constructor(props){
    super(props);
    this.state={
      checkBoxValues: [],
      course_lists: [],
      course_lists_after_filter: [],
      searchValue: '',
      hasMore: true,
      loading: false,
      page: 1
    }
  }
  fetchCourseList = (arg_page) => {
    const page = arg_page || this.state.page;
    // search=''&
    let url = `/courses/mine.json?page=${page}&page_size=${pageCount}`
    const searchValue = this.state.searchValue.trim()
    if (searchValue) {
      url += `&search=${searchValue}`
    }
    this.setState({ loading: true })
    axios.get(url, {
    })
    .then((response) => {
      if (!response.data.data || response.data.data.length == 0) {
        this.setState({
          course_lists: page == 1 ? [] : this.state.course_lists,
          page,
          loading: false,
          hasMore: false,
        })
      } else {
        this.setState({
          course_lists: page == 1 ? response.data.data : this.state.course_lists.concat(response.data.data),
          course_lists_after_filter: response.data.data,
          page,
          loading: false,
          hasMore: response.data.data.length == pageCount
        })
      }

    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  componentDidMount() {
    setTimeout(() => {
      this.fetchCourseList()
    }, 500)
    
  }
  setVisible = (visible) => {
    this.refs.modalWrapper.setVisible(visible)
    if (visible == false) {
      this.setState({
        checkBoxValues: []
      })
    }
  }

  onSendOk = () => {
    if (!this.state.checkBoxValues || this.state.checkBoxValues.length == 0) {
      this.props.showNotification('请先选择要发送至的课堂')
      return;
    }
    if(this.props.url==="/files/bulk_send.json"){
      axios.post("/files/bulk_send.json", {
         course_id:this.props.match.params.coursesId,
        ids: this.props.selectedMessageIds,
        to_course_ids: this.state.checkBoxValues
        })
      .then((response) => {
        if (response.data.status == 0) {
          this.setVisible(false)
          this.props.gobackonSend(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      const bid = this.props.match.params.boardId
      const url = `/boards/${bid}/messages/bulk_send.json`
      axios.post(url, {
          ids: this.props.selectedMessageIds,
          to_course_ids: this.state.checkBoxValues
        })
        .then((response) => {
          if (response.data.status == 0) {
            this.setVisible(false)
            this.props.showNotification('发送成功')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  onOk = () => {
    const { course_lists, checkBoxValues } = this.state
    this.onSendOk()
    // this.props.onOk && this.props.onOk(checkBoxValues)
    
    // this.refs.modalWrapper.setVisible(false)
  }

  onCheckBoxChange = (checkBoxValues) => {
    this.setState({
      checkBoxValues: checkBoxValues
    })
  }

  onSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }
  handleInfiniteOnLoad = () => {
    console.log('loadmore...')
    this.fetchCourseList(this.state.page + 1)
  }

  onSearch = () => {
    // const course_lists_after_filter = this.state.course_lists.filter( item => item.name.indexOf(this.state.searchValue) != -1 )
    // this.setState({ course_lists_after_filter })
    this.fetchCourseList(1)
  }
  render(){
    const { course_lists, checkBoxValues, searchValue, loading, hasMore } = this.state
    const { moduleName } = this.props
    return(
      <ModalWrapper
        ref="modalWrapper"
        title={`发送${moduleName}`}
        {...this.props }
        onOk={this.onOk}
      >
        <style>
        {`
        .demo-loading-container {
          position: absolute;
          bottom: 93px;
          width: 82%;
          text-align: center;
        }`}
        </style>
        <p className="color-grey-6 mb20 edu-txt-center" style={{ fontWeight: "bold" }} >选择的{moduleName}发送到<span className="color-orange-tip">指定课堂</span></p>

        <Search 
          className="mb14"
          value={searchValue}
          placeholder="请输入课堂名称进行搜索"
          onChange={this.onSearchChange}
          onSearch={this.onSearch}
        ></Search>

        <div>
          {/* https://github.com/CassetteRocks/react-infinite-scroller/issues/70 */}
          <div className="edu-back-skyblue padding15" style={{"height":"300px", overflowY: "scroll", overflowAnchor: 'none' }}>
            <InfiniteScroll
              threshold={10}
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!loading && hasMore}
              useWindow={false}
            >
              <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>

                { course_lists && course_lists.map( course => {
                  return (
                    <p className="clearfix mb7" key={course.id}>
                      <Checkbox className="fl" value={course.id} key={course.id}></Checkbox>
                      <span className="fl with45"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>{course.name}</label></span>
                    </p>
                  )
                }) }
              </Checkbox.Group>
              {loading && hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
              {/* TODO */}
              {/* {
                !hasMore && <div>没有更多了。。</div>
              } */}
            </InfiniteScroll>
          </div>
        </div>
      </ModalWrapper>
    )
  }
}
export default SendToCourseModal;


