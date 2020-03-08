import React, {Component} from "react";
import '../courses/css/members.css';
import "../courses/common/formCommon.css"
import '../courses/css/Courses.css';
import beijintulogontwo from '../../../src/images/login/beijintulogontwo.png';
import educodernet from '../../../src/images/login/educodernet.png';
import InterestpageComponent from '../user/Interestpage'
import InterestpageComponentMax from '../user/InterestpageMax'
import moment from 'moment';

//educoder登入页面

var newContainer={
	background: `url(${beijintulogontwo})`,
	backgroundPosition: "center" ,
	backgroundRepeat: "no-repeat",
	backgroundAttachment: "fixed",
	backgroundSize: "100% 100%",
	height:" 100%",
	width:" 100%",
	position: "absolute",
	top: "0px",
	bottom: "0px",
	minHeight: "100%",
}
//兴趣页面
class EducoderInteresse extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}





	render() {
		console.log( window.screen.width);
		return (
			<div style={newContainer} className=" clearfix" >

				<div >
					<div style={{
						"display": "flex",
						"justify-content": "center",
						"align-items": "center",
						"width": "100%"
					}}>
						<div style={{
							paddingTop: "2%",
						}}>
							<img src={educodernet}/>
						</div>


					</div>

				  <div style={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
								marginTop: "1%",
							}}>
						{ window.screen.width <=1390?
					  	<InterestpageComponent {...this.props} {...this.state}>
							</InterestpageComponent>
							:
							<InterestpageComponentMax {...this.props} {...this.state}/>

						}

							</div>

					<div style={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
					}}>
						<div className="font-14 color-grey-9 " style={{marginTop:"20px"}}><span className="font-18">©</span>&nbsp;{moment().year()}&nbsp;EduCoder<span className="ml15 mr15">湘ICP备17009477号</span><a href="https://team.trustie.net" style={{"color":"#888"}} target="_blank">Trustie</a>&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;IntelliDE inside.</div>
					</div>
				</div>
			</div>
		)
	}

}

export default EducoderInteresse;