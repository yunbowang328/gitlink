import React, {Component} from "react";
import './guide.css'

import guihome1 from "../../../images/guideimg/guihome1.png";
import guihome2 from "../../../images/guideimg/guihome2.jpg";
import guihome3 from "../../../images/guideimg/guihome3.jpg";
import guihome4 from "../../../images/guideimg/guihome4.jpg";
import guihome5 from "../../../images/guideimg/guihome5.jpg";
 import guihome6 from "../../../images/guideimg/guihome6.jpg";
// import guihome6 from "../../../images/guideimg/guihome6.png";
// import guihome7 from "../../../images/guideimg/guihome7.png";


class Guide extends Component {

	constructor(props) {
		super(props);
		this.state={
			pingmuz:"",
			page:1,
			mywidth:1,
		}

	}
	componentDidMount() {
		console.log("GuideGuideGuideGuide加载了")
		// 1366x768
		// var mywidthone=7;

		var mywidthone=0;
		if(window.screen.width===1024){
			mywidthone=1;
		}
		else if(window.screen.width===1280){
			mywidthone=2;
		}
		else if(window.screen.width===1440){
			mywidthone=3;
		}
		else if(window.screen.width===1680){
			mywidthone=4;
		}
		else if(window.screen.width===1920){
			mywidthone=5;
		}
		else if(window.screen.width===1366){
			mywidthone=6;
		}
		else if(window.screen.width===1600){
			mywidthone=7;
		}
		else{
			mywidthone=5;
		}
		this.setState({
			mywidth:mywidthone,
		});

	}
	thissetPage=(i)=>{
		this.setState({
			page:i,
		})
		if(i===7){
			this.props.setwindowlocal("false");
		}
	}
	render() {
		let {page,mywidth}=this.state;
		// console.log("屏幕宽度");
		console.log(window.screen.width);
		console.log(mywidth);

		return (
			<div className="guide-shadow">
				<style>
					{
						`
						body {
    overflow: hidden !important;
    }
						`
					}
				</style>
				{
					page===1?
						<div className="guide-content">
							<img className={mywidth===1?"ysldiv11024":mywidth===2?"ysldiv11280":mywidth===3?"ysldiv11440":mywidth===4?"ysldiv11680":mywidth===5?"ysldiv11900":mywidth===6?"ysldiv11366":mywidth===7?"ysldiv11600":"ysldiv11900"} src={guihome1} onClick={(i)=>this.thissetPage(2)} />
						</div>
						:""
				}
				{
					page===2?
						<div  className="guide-content">
              <img  className={mywidth===1?"ysldiv21024":mywidth===2?"ysldiv21280":mywidth===3?"ysldiv21440":mywidth===4?"ysldiv21680":mywidth===5?"ysldiv21900":mywidth===6?"ysldiv21366":mywidth===7?"ysldiv21600":"ysldiv21900"} src={guihome2} onClick={(i)=>this.thissetPage(3)}/>
						</div>
						:
						""
				}
				{
					page===3?
						<div  className="guide-content">
							<img  className={mywidth===1?"ysldiv31024":mywidth===2?"ysldiv31280":mywidth===3?"ysldiv31440":mywidth===4?"ysldiv31680":mywidth===5?"ysldiv31900":mywidth===6?"ysldiv31366":mywidth===7?"ysldiv31600":"ysldiv31900"} src={guihome3} onClick={(i)=>this.thissetPage(4)}/>
						</div>
						:
						""
				}
				{
					page===4?
						<div  className="guide-content">
							<img  className={mywidth===1?"ysldiv41024":mywidth===2?"ysldiv41280":mywidth===3?"ysldiv41440":mywidth===4?"ysldiv41680":mywidth===5?"ysldiv41900":mywidth===6?"ysldiv41366":mywidth===7?"ysldiv41600":"ysldiv41900"} src={guihome4} onClick={(i)=>this.thissetPage(5)}/>
						</div>
						:
						""
				}
				{
					page===5?
						<div  className="guide-content">
							<img  className={mywidth===1?"ysldiv51024":mywidth===2?"ysldiv51280":mywidth===3?"ysldiv51440":mywidth===4?"ysldiv51680":mywidth===5?"ysldiv51900":mywidth===6?"ysldiv51366":mywidth===7?"ysldiv51600":"ysldiv51900"} src={guihome5} onClick={(i)=>this.thissetPage(6)}/>
						</div>
						:
						""
				}
				{
					page===6?
						<div  className="guide-content">
							<img  className={mywidth===1?"ysldiv61024":mywidth===2?"ysldiv61280":mywidth===3?"ysldiv61440":mywidth===4?"ysldiv61680":mywidth===5?"ysldiv61900":mywidth===6?"ysldiv61366":mywidth===7?"ysldiv61600":"ysldiv61900"} src={guihome6} onClick={(i)=>this.thissetPage(7)}/>
							{/*<img  className={mywidth===1?"ysldiv71024":mywidth===2?"ysldiv71280":mywidth===3?"ysldiv71440":mywidth===4?"ysldiv71680":mywidth===5?"ysldiv71900":mywidth===6?"ysldiv71366":mywidth===7?"ysldiv71600":"ysldiv71900"} src={guihome7} onClick={(i)=>this.thissetPage(7)}/>*/}
						</div>
						:
						""
				}
			</div>
		)
	}
}


export default Guide;