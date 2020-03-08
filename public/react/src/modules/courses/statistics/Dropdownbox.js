import React, {Component} from "react";
import {Menu, Dropdown, Icon, Input, Checkbox} from "antd";
import {getImageUrl} from 'educoder';

const {Search} = Input;

class Dropdownbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: '1',
			visible: false,
			onSearchvalue: undefined,
			checkedValues: []
		}
	}

	componentDidMount() {
		let {group_ids} = this.props;
		if (group_ids) {
			this.setState({
				checkedValues: group_ids
			})
		}
	}

	componentDidUpdate = (prevProps) => {
		if (prevProps != this.props) {
			let {group_ids} = this.props;
			if (group_ids) {
				this.setState({
					checkedValues: group_ids
				})
			}
		}
	}
	SaveChange = () => {
		this.props.postwork_scoredata(this.state.checkedValues)
	}


	handleVisibleChange = flag => {
		this.setState({visible: flag});
	};

	CheckboxonChange = (checkedValues) => {
		this.setState({
			checkedValues: checkedValues
		})
	}

	unCheckboxonChange = () => {
		this.setState({
			checkedValues: [],
			onSearchvalue: undefined
		})
	}

	onSearch = (value) => {
		this.setState({
			onSearchvalue: value
		})
	}

	onSearchonChange = (e) => {
		this.setState({
			onSearchvalue: e.target.value
		})
	}

	render() {
		let {course_groups} = this.props;

		const menu = (
			<Checkbox.Group style={{width: 220}} className={"StatisticsMenubox"} value={this.state.checkedValues}
											onChange={(checkedValues) => this.CheckboxonChange(checkedValues)}>
				<Menu className="Statisticslibox">
					<li className={"Statisticsli"}>
						{course_groups && course_groups.length > 10 ? <Search
							placeholder="请输入名称搜索"
							onSearch={(value) => this.onSearch(value)}
							onChange={(e) => this.onSearchonChange(e)}
							value={this.state.onSearchvalue}
							style={{width: 200}}
						/> : ""}
					</li>
					{course_groups && course_groups.map((item, key) => {
						if (this.state.onSearchvalue) {
							if (item.name.indexOf(this.state.onSearchvalue) != -1) {
								return (
									<Menu.Item key={key}>
										<Checkbox value={item.id} key={item.id}>  {item.name}</Checkbox>
									</Menu.Item>
								)
							}
						} else {
							return (
								<Menu.Item key={key}>
									<Checkbox value={item.id} key={item.id}>  {item.name}</Checkbox>
								</Menu.Item>
							)
						}
					})}
					<Menu.Divider/>
					<li className={"Statisticsli"}>
						<span onClick={() => this.SaveChange()} className={"ant-btn-link"}>确定</span>
						<span className={"ml20 ant-btn-link"} onClick={() => this.unCheckboxonChange()}>重置</span>
					</li>
				</Menu>
			</Checkbox.Group>
		);

		return (
			<React.Fragment>
				<Dropdown overlay={menu}
									onVisibleChange={this.handleVisibleChange}
									visible={this.state.visible}
				>
					<a className="ant-dropdown-link">
						分班 <Icon type="down"/>
					</a>
				</Dropdown>
			</React.Fragment>
		)
	}
}

export default Dropdownbox;
