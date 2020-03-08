import React, { Component } from 'react';
import "./secureCode.css";

/**
 * An TextInput with Icon and check
 * 带图标检查的输入框
 */
class CheckInputysl extends Component {
	constructor(){
		super();
		this.state = {
			isMove:false,
			start:0,
			moveLength:0,
			clear:false,
			move:0,
			width:0
		};
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
	}
	componentDidMount() {
		let dragHandler = document.getElementById("dragHandler");
		dragHandler.addEventListener("mousedown", this.onMouseDown);
	}
	onMouseDown(e){
		console.log("28");
		document.addEventListener("mousemove", this.onMouseMove);
		document.addEventListener("mouseup", this.onMouseUp);
		let event=e||window.event;
		this.setState({
			isMove:true,
			start:event.pageX
		});
	}
	onMouseUp(e){
		console.log("38");
		let event=e||window.event;
		this.setState({
			isMove:false,
		});
		let drag = window.getComputedStyle(this.verifyDOM);
		let handler = window.getComputedStyle(this.handlerDOM);
		let moveLength = event.clientX-this.verifyDOM.offsetLeft - Number.parseInt(handler.width) / 2;
		// console.log(drag.width);
		let maxWidth = Number.parseInt(drag.width) - Number.parseInt(handler.width);
		console.log("moveLength="+moveLength);
		console.log("maxWidth="+maxWidth);
		if(moveLength <= maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
			this.setState({
				move:0,
				width:0
			});
			document.removeEventListener("mousemove", this.onMouseMove);
			document.removeEventListener("mouseup", this.onMouseUp);
		}
		if(this.props.onDrag){
			this.props.onDrag(this.state.clear);
		}
	}
	onMouseMove(e){
		console.log("63");
		let event=e||window.event;
		let drag = window.getComputedStyle(this.verifyDOM);
		let handler = window.getComputedStyle(this.handlerDOM);
		let moveLength = event.clientX-this.verifyDOM.offsetLeft - Number.parseInt(handler.width) / 2;
		let maxWidth = Number.parseInt(drag.width) - Number.parseInt(handler.width);
		if(this.state.isMove){
			if(moveLength<0){
				moveLength=0
			}else if(moveLength >= maxWidth){
				moveLength=maxWidth;
				this.removeMouseMove();
			}
			this.setState({
				move:moveLength,
				width:moveLength
			});
		}
	}
	//清空事件
	removeMouseMove(){
		this.setState({
			clear:true
		});
		let dragHandler = document.getElementById("dragHandler");
		dragHandler.removeEventListener("mousedown", this.onMouseDown);
		document.removeEventListener("mousemove", this.onMouseMove);
		document.removeEventListener("mouseup", this.onMouseUp);
		this.props.dragOkCallback();
	}
	render(){
		return (
			<div id="drag" className="nl-drag-verify"  ref={dom => {this.verifyDOM = dom}} style={{"color":this.state.clear ? "#fff" : "#252535"}}>
				<div className="drag_bg" ref={dom => {this.bgDOM = dom}} style={{"width":this.state.width}}></div>
				<div className="drag_text">{this.state.clear ? "验证通过" : "拖动滑块验证"}</div>
				<div id="dragHandler" className={this.state.clear? "handler handler_ok_bg" : "handler handler_bg"} style={{"left":this.state.move}} ref={dom => {this.handlerDOM = dom}}></div>
			</div>
		);
	}
}

export default  ( CheckInputysl );