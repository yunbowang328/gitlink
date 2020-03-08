import React, { Component } from 'react';

class CurriculumSubpage extends Component {
	//测试用
	constructor(props) {
		super(props)
		// console.log(props);
	}

	componentWillMount(){
	}
	componentDidMount(){
		// 起始页面
		// console.log(this.props);
		console.log("CurriculumSubpage");
		console.log(this.props.match.params);
	}
	Curriculumstructure=()=>{
		this.props.history.push(`/ecs/major_schools/${this.props.match.params.majorId}/years/${this.props.match.params.yearId}/courses/subpage/ec_course_support_setting/1`);
	}


	render() {
		// console.log("Curriculumtwo");
		// console.log(this.props);
		return (
			<div className="educontent fl">
				<span onClick={()=>this.Curriculumstructure()}>点我进去课程体系</span>
			</div>
		)
	}


}
export default CurriculumSubpage;