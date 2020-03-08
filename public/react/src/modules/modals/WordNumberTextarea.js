import React, { Component } from 'react';
import './WordNumberTextarea.css';
class WordNumberTextarea extends Component {
  constructor(props) {
    super(props);
  }
render() {
    return(
			<div className="WordNumbernote">
					<textarea 
						placeholder={this.props.placeholder}
						className="WordNumberTextarea"
						value={this.props.value}
						onInput={(e)=>this.props.onInput(e)}
						maxlength={this.props.maxlength}
					/>
					<div className="WordNumberTextarea-count"><span>{this.props.value===undefined||this.props.value===null?0:this.props.value.length}</span>/{this.props.maxlength}</div>
			</div>
    )
  }
}

export default WordNumberTextarea;