import React, { Component } from 'react';


// import Divider from 'material-ui/Divider';
// import Dialog, {
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from 'material-ui/Dialog';

// import AppBar from 'material-ui/AppBar';

// import getMuiTheme from 'material-ui/styles/getMuiTheme'


// import MobileTearSheet from '../../../MobileTearSheet';

// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import Divider from 'material-ui/Divider';
// import Avatar from 'material-ui/Avatar';


// import PropTypes from 'prop-types';

// import Tabs, { Tab } from 'material-ui/Tabs';

// import Input, { InputLabel } from 'material-ui/Input';
// import { FormControl, FormHelperText } from 'material-ui/Form';


import { IIHOC as DebuggerHOC, stringify } from './ii_debug'

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};
/*
<AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
*/

//  https://material-ui-next.com/discover-more/showcase/
// class TestMaterialDesign extends Component {

// 	// ------------------------------------------------
// 	// static childContextTypes = {
//  //        muiTheme: PropTypes.object
//  //    }

//  //    getChildContext() {
//  //        return {
//  //            muiTheme: getMuiTheme()
//  //        }
//  //    }
//     // ------------------------------------------------

//   state = {
//     open: false,
//     value: 0,
//   };

//   handleOpen = () => {
//     this.setState({open: true});
//   };

//   handleClose = () => {
//     this.setState({open: false});
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };
//   onGoldRewardInputChange(event) {
//      this.setState({ goldRewardInput: event.target.value });
//   }
//   render() {

//     const {value} = this.state

//     return (

//                   <Dialog
//                 open={true}
//                 onClose={this.handleGoldRewardDialogClose}
//             >
//               <DialogTitle id="alert-dialog-title">{"奖励设置"}</DialogTitle>
//                 <DialogContent>

//                       <FormControl aria-describedby="name-error-text">
//                       <InputLabel htmlFor="goldReward">1请输入奖励的金币数量</InputLabel>
//                       <Input id="goldReward"  type="number" value={this.state.goldRewardInput} onChange={(e) => this.onGoldRewardInputChange(e)} />

//                     </FormControl>
//                 </DialogContent>
//                 <DialogActions>
//                 </DialogActions>
//             </Dialog>
//     );
//   }
// }
// const TestMaterialDesign = () => (

//   <FlatButton label="Primary" primary={true} />
// );

// export default TestMaterialDesign;



// --------------------------------------------------------
// Props Proxy and state abstraction demonstration
function PPHOC(WrappedComponent) {
  return class PP extends React.Component {
    componentDidMount() {
      // console.log('componentDidMount1 componentDidMount1 ')
    }
    constructor(props) {
      super(props)
      this.state = { fields: {} }
    }

    getField(fieldName) {
      if (!this.state.fields[fieldName]) {
        // TODO 从服务端取state对应的数据
        // 共享state
        this.state.fields[fieldName] = {
          value: '',
          onChange: event => {
            this.state.fields[fieldName].value = event.target.value
            this.forceUpdate()
          }
        }
      }

      return {
        value: this.state.fields[fieldName].value,
        onChange: this.state.fields[fieldName].onChange
      }
    }

    render() {
      const props = Object.assign({}, this.props, {
        fields: this.getField.bind(this),
      })
      return (
        <div>
          <h2>
            PP HOC
          </h2>
          <p>Im a Props Proxy HOC that abstracts controlled inputs</p>
          <WrappedComponent {...props}/>
        </div>
      )
    }
  }
}

class Example extends React.Component {
  componentDidMount() {
    console.log('componentDidMount componentDidMount ')
  }
  render() {
    return (
      <div>
        <h2>
          Wrapped Component
        </h2>
        <p>
          Props
        </p>
        <pre>{stringify(this.props)}</pre>
        <form>
          <label>Automatically controlled input!</label>
          <input type="email" {...this.props.fields('email')}/>
        </form>
      </div>
    )
  }
}

const EnhancedExample = DebuggerHOC(PPHOC(Example))

// module.exports = EnhancedExample;

export default EnhancedExample