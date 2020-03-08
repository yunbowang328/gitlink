import React, { Component } from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import PropTypes from 'prop-types';

let defaultItemLabelName ='label'
let defaultItemValueName ='value'

/*

      className={classes.size}
      icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
      checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
*/
class CheckBoxGroup extends Component {

	constructor(props) {
		super(props)
		this.valueMap = props.initialValueArray.slice(0)	|| []// 也要初始化antd form initialValue
		this.options = undefined;
	}
	handleChange = (index, value) => event => {
	    this.valueMap[index] = event.target.checked ? value : ''
	    this.props.onChange && this.props.onChange(this.valueMap)
	};
	componentWillReceiveProps(newProps, newContext) {
		if (newProps.initialValueArray && (!this.props.initialValueArray 
				|| (newProps.initialValueArray.join('') !== this.props.initialValueArray.join('') ))) { 
			this.valueMap = newProps.initialValueArray.slice(0) || [];
		}
	}

	render() {
  		const { options, itemLabelName, itemValueName, itemLabelFunction, itemValueFunction } = this.props;
  		const newItemLabelName = itemLabelName || defaultItemLabelName
  		const newItemValueName = itemValueName || defaultItemValueName
  		this.options = options;
	    return (
	      	<FormControl component="fieldset">
	      		<FormGroup>
	      		{ options.map( (option, index) => {
	      			const val = itemValueFunction ? itemValueFunction(option, index) : option[newItemValueName];
		      		return (<FormControlLabel key={index}
			          	control={
				            <Checkbox
				            	checked={this.valueMap[index]}
				              	value={val}
				              	onChange={this.handleChange(index, val)}
				              	color="primary"
								classes={{root: this.props.classes.radio,
									checked: this.props.classes.checked}}
				            /> }
			          	label={itemLabelFunction ? itemLabelFunction(option, index) : option[newItemLabelName]}
			        ></FormControlLabel>)
			        })
		        }
		        </FormGroup>
	      	</FormControl>	
	    );
  	}
}


export default CheckBoxGroup ;
