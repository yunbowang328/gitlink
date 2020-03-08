import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Table, message } from 'antd';
import axios from 'axios';

import './AddMajorModal.scss';

const { Search } = Input;
const tableColumns = [
  { title: '专业代码', dataIndex: 'code', key: 'code', width: 100, },
  { title: '专业名称', dataIndex: 'name', key: 'name', },
  { title: '', dataIndex: 'selected', key: 'selected', width: 80, render: selected => selected && <span className="color-orange">已选择</span> },
];
const defaultPagination = { current: 1, pageSize: 10, total: 0 };

class AddMajorModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      confirmLoading: false,
      error: '',
      keyword: '',
      pagination: {...defaultPagination},

      schoolId: props.schoolId,
      majorData: [],
      selectedData: []
    }

    this.getMajors = this.getMajors.bind(this);
    this.selectMajor = this.selectMajor.bind(this);
    this.onAfterModalClose = this.onAfterModalClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.visible && this.props.visible){
      this.getMajors();
    }
  }

  onSearch = () => {
    this.setState({ pagination: {...defaultPagination} }, () => {
      this.getMajors();
    })
  }

  getMajors(){
    let { schoolId, keyword, pagination } = this.state;

    this.setState({ loading: true });
    axios.get(`/schools/${schoolId}/ec_majors.json`, {
      params: {
        search: keyword,
        page: pagination.current,
        per_page: pagination.pageSize
      }
    }).then(res => {
      if(res.status === 200){
        let pagination = { ...this.state.pagination };
        pagination.total = res.data.count;

        this.setState({
          majorData: res.data.ec_majors,
          loading: false,
          pagination,
        })
      }
    }).catch(e => {
      console.log(e);
      this.setState({ loading: false })
    })
  }

  getCheckboxProps(record){
    return { ...record, disabled: record.selected }
  }

  selectMajor(selectedRowKeys){
    this.setState({ selectedData: selectedRowKeys });
  }

  onPaginationChange(page, pageSize){
    this.setState({ pagination: { current: page, pageSize: pageSize } }, () => {
      this.getMajors()
    });
  }

  handleOk(){
    let { selectedData } = this.state;

    if(selectedData.length === 0){
      this.setState({ error: '请选择专业' });
      return;
    }

    this.submitMajor(selectedData);
  }

  handleCancel(){
    this.props.onHide(false);
  }

  onAfterModalClose(){
    this.setState({
      error: '',
      keyword: '',
      pagination: {...defaultPagination},
      majorData: [],
      selectedData: [],
    });
  }

  submitMajor(ids) {
    let { schoolId } = this.state;

    this.setState({ confirmLoading: true });
    axios.post(`/schools/${schoolId}/ec_major_schools.json`, { major_ids: ids }).then(res => {
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
    let { loading, keyword, majorData, selectedData, pagination } = this.state;

    return (
      <div>
        <Modal
          title="添加认证专业"
          wrapClassName="add-major-modal"
          visible={this.props.visible}
          confirmLoading={this.state.confirmLoading}
          afterClose={this.onAfterModalClose}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>

          <div className="add-major-search">
            <Search
              placeholder="专业代码/专业名称检索"
              onInput={e => this.setState({keyword: e.target.value})}
              onSearch={this.onSearch}
              value={keyword}/>
          </div>

          <div className="add-major-body">
            <Table rowKey="id"
                   rowSelection={{onChange: this.selectMajor, getCheckboxProps: this.getCheckboxProps, selectedRowKeys: selectedData}}
                   loading={loading}
                   columns={tableColumns}
                   dataSource={majorData}
                   pagination={{...pagination, onChange: this.onPaginationChange}}
                   size="small"
                   scroll={{ y: 200 }}/>
            <div className="error">{ this.state.error }</div>
          </div>
        </Modal>
      </div>
    )
  }
}

AddMajorModal.propTypes = {
  schoolId: PropTypes.number,
  visible: PropTypes.bool,
  onHide: PropTypes.func
}

export default AddMajorModal