import React, { Component } from "react";
import { Modal, Checkbox, Input, Spin} from "antd";
import axios from 'axios';
import moment from 'moment';
import ModalWrapper from "../common/ModalWrapper";
import InfiniteScroll from 'react-infinite-scroller';

const dateFormat ="YYYY-MM-DD HH:mm"
const Search = Input.Search
const pageCount = 15;
class  Sendtofilesmodal extends Component{
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
						course_lists: page == 1 ? response.data.data : this.state.course_lists.concat(response.data.data ),
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
		// setTimeout(() => {
		// 	this.fetchCourseList()
		// }, 500)
		// console.log(this.props)
	}

	componentDidUpdate = (prevProps) => {
		// console.log(this.props.match.params.attachmentId)

		if ( prevProps.sendTotype != this.props.sendTotype ) {
			this.fetchCourseList()
		}

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
		if( this.state.checkBoxValues.length===0){
          this.setState({
			  checkBoxValuestype:true
		  })
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
						// this.props.gobackonSend(response.data.message)
						// this.props.showNotification(response.data.message)
						this.props.cancelmodel()
						this.props.showNotification("发送资源成功")
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
				{...this.state }
				onOk={this.onOk}
			>
				<style>
					{`
					.demo-loading-container {
					  position: absolute;
					  bottom: 93px;
					  width: 82%;
					  text-align: center;
					}
					 .ModalWrappertitle{
					     background: #D0E8FC;
               padding: 10px;
					 }
					`}
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

					<p className="clearfix ModalWrappertitle">
						<div className="task-hide fl pagemancenter" style={{"width":'215px'}}>课堂名称</div>
						<div className="task-hide fl pagemancenter" style={{"width":'140px'}}>创建时间</div>
						<div className="task-hide fl pagemancenter" style={{"width":'110px'}}>结束时间</div>
					</p>
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
											<Checkbox className="fl" value={course.id}  key={course.id} ></Checkbox>
										 <div className="task-hide fl" style={{"width":'224px'}} title={course.name}>{course.name}</div>
										 <div className="task-hide fl" style={{"width":'130px'}}>{moment(course.created_at).format('YYYY-MM-DD')}</div>
										 <div className="task-hide fl" style={{"width":'110px'}}>{course.end_date}</div>
										</p>
									)
								}) }
							</Checkbox.Group>

						</InfiniteScroll>

					</div>
				</div>
			</ModalWrapper>
		)
	}
}
export default Sendtofilesmodal;


