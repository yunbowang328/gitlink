import React, { Component } from 'react';

import moment from 'moment'
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';

import { Upload, Icon, message } from 'antd';

import 'antd/lib/upload/style/index.css'
import Radio, { RadioGroup } from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// -------------------------------------------

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  // if (!isJPG) {
  //   message.error('You can only upload JPG file!');
  // }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  // return isJPG && isLt2M;
  return isLt2M;
}

// -------------------------------------------
const children = [];
for (let i = 10; i < 36; i++) {
	// value={i}
  children.push(
    <Option key={i.toString(36) + i} disabled={i === 10} title={`中文${i}`} >
      中文{i}
    </Option>
  );
}
// DOC https://v1-0-0.material-ui.com/customization/themes/
const myStyles = theme => ({
  // root: {
  //   color: 'inherit',
  //   textDecoration: 'inherit',
  //   '&:hover': {
  //     textDecoration: 'underline',
  //   },
  // },
  // 使用主题的主色
  primary: {
    color: theme.palette.primary.main,
  },
  radio: {
    '&$checked': {
      color: '#4B8DF8'
    },
    color: 'red'
  },
  checked: {}
});

class TestRC extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    /*
    
          labelStyle={{color: 'yellow'}}
          iconStyle={{ fill: 'red', color: 'blue' }}
    */ 
    const props = this.props;
    return (
      <div>
        <Radio
          label='My checkbox' 
          classes={{root: props.classes.radio, checked: props.classes.checked}}
        >111</Radio>
        <Checkbox label='My checkbox' 
          classes={{root: props.classes.radio, checked: props.classes.checked}}

        />
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="//jsonplaceholder.typicode.com/posts/"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      </div>
    );
  }
}

export default  withStyles(myStyles)(TestRC);
