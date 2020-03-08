import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Select, message } from 'antd';
import axios from 'axios';

import './AddYearModal.scss';

const { Option } = Select;

class AddYearModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmLoading: false,
      error: '',

      year: '',
      currentYear: new Date().getFullYear()
    }
  }

  handleOk = () => {
    let { year } = this.state;

    if(!year || year.length === 0){
      this.setState({ error: '请选择届别' });
      return;
    }

    this.submitYear();
  }

  handleCancel = () => {
    this.props.onHide(false);
  }

  onAfterModalClose = () => {
    this.setState({ year: '' });
  }

  submitYear = () =>  {
    let { schoolId, majorId } = this.props;
    let { year } = this.state;

    this.setState({ confirmLoading: true });
    axios.post(`/ec_major_schools/${majorId}/ec_years.json`, { school_id: schoolId, year: year }).then(res => {
      if(res.status === 200){
        message.success('操作成功');
        this.setState({ confirmLoading: false });
        this.props.onHide(true);
      }
    }).catch(e => {
      console.log(e);
      this.setState({ confirmLoading: false });
    })
  }

  render() {
    let { confirmLoading, year, currentYear } = this.state;

    return (
      <div>
        <Modal
          title="添加届别"
          wrapClassName="add-year-modal"
          visible={this.props.visible}
          confirmLoading={confirmLoading}
          afterClose={this.onAfterModalClose}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          
          <div className="add-year-container">
            <div className="add-year-tip">
              基础数据：除学生列表与成绩录入以外的所有基础数据<br/>
              将自动复制上届别的数据；数据均可再编辑
            </div>

            <div className="add-year-content">
              <div className="add-year-content-label">选择届别：</div>
              <div className="add-year-content-select">
                <Select defaultValue="" value={year} onChange={ value => this.setState({ year: value })} style={{width: '100%'}} placeholder="请选择届别">
                  {
                    [...Array(10)].map((_, index) => {
                      let y = currentYear - 5 + index;
                      return (
                        <Option value={ y }>{y}届</Option>
                      )
                    })
                  }
                </Select>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

AddYearModal.propTypes = {
  schoolId: PropTypes.number,
  majorId: PropTypes.number,
  visible: PropTypes.bool,
  onHide: PropTypes.func
}

export default AddYearModal