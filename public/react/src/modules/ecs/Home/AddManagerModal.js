import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Table, message, Select, Form, Row, Col, Button } from 'antd';
import axios from 'axios';

import './AddManagerModal.scss';

const { Option } = Select;

const columnRender = (text) => <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}> {text} </div>
const tableColumns = [
  { title: '姓名', dataIndex: 'name', key: 'name', width: 60, render: columnRender },
  { title: '职称', dataIndex: 'identity', key: 'identity', width: 60, },
  { title: '单位', dataIndex: 'school_name', key: 'school_name', render: (_, record) => columnRender(`${record.school_name} ${record.department_name}`) },
  { title: '手机号', dataIndex: 'phone', key: 'phone', width: 80, },
];
const defaultPagination = { current: 1, pageSize: 20, total: 0 };

class AddManagerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      confirmLoading: false,
      nameValidateStatus: '',
      error: '',
      name: '',
      school: props.schoolName,
      identity: '',
      pagination: {...defaultPagination},

      schoolId: props.schoolId,
      userData: [],
      selectedData: []
    }

    this.getUsers = this.getUsers.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.onAfterModalClose = this.onAfterModalClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  onSearch = () => {
    this.setState({ pagination: {...defaultPagination} }, () => {
      this.getUsers();
    })
  }

  getUsers(){
    let { majorId } = this.props;
    let { name, school, identity, pagination } = this.state;

    if(name.length === 0){
      this.setState({ nameValidateStatus: 'error' });
      return;
    }

    this.setState({ loading: true });
    axios.get(`/ec_major_schools/${majorId}/users.json`, {
      params: {
        name, school, identity,
        page: pagination.current,
        per_page: pagination.pageSize
      }
    }).then(res => {
      if(res.status === 200){
        let pagination = { ...this.state.pagination };
        pagination.total = res.data.count;

        this.setState({
          userData: res.data.users,
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
    return { ...record, disabled: record.manager }
  }

  selectUser(selectedRowKeys){
    this.setState({ selectedData: selectedRowKeys });
  }

  onPaginationChange(page, pageSize){
    this.setState({ pagination: { current: page, pageSize: pageSize } }, () => {
      this.getUsers()
    });
  }

  onNameChange = (e) => {
    let name = e.target.value;
    let nameValidateStatus = '';

    if(name.length === 0){
      nameValidateStatus = 'error'
    }

    this.setState({ nameValidateStatus, name });
  }

  handleOk(){
    this.setState({ error: '' });
    let { selectedData } = this.state;

    if(selectedData.length === 0){
      this.setState({ error: '请选择至少一个用户' });
      return;
    }

    this.submitUsers(selectedData);
  }

  handleCancel(){
    this.props.onHide(false);
  }

  onAfterModalClose(){
    this.setState({
      error: '',
      nameValidateStatus: '',
      name: '',
      school: this.props.schoolName,
      identity: '',
      pagination: {...defaultPagination},
      userData: [],
      selectedData: [],
    });
  }

  submitUsers(ids) {
    let { majorId } = this.props;

    this.setState({ confirmLoading: true });
    axios.post(`/ec_major_schools/${majorId}/major_managers.json`, { user_ids: ids }).then(res => {
      if(res.status !== 200){ return }

      message.success('操作成功');
      this.setState({ confirmLoading: false });
      this.props.onHide(true);
    }).catch(e => {
      console.log(e);
      this.setState({ confirmLoading: false });
    })
  }

  render() {
    let { loading, name, school, identity, userData, selectedData, pagination, nameValidateStatus } = this.state;

    return (
      <div>
        <Modal
          title="添加管理员"
          wrapClassName="add-ec-manager-modal"
          visible={this.props.visible}
          confirmLoading={this.state.confirmLoading}
          afterClose={this.onAfterModalClose}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>

          <div className="add-ec-manager-search">
            <Form layout="horizontal">
              <Row>
                <Col span={12}>
                  <Form.Item label="姓名" labelCol={{ span: 6 }} wrapperCol={{span: 16}} validateStatus={nameValidateStatus}>
                    <Input onChange={this.onNameChange} value={name} placeholder="请输入姓名" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="职业" labelCol={{ span: 6 }} wrapperCol={{span: 17}} >
                    <Select value={identity} onChange={value => this.setState({ identity: value }) } placeholder="请选择职业">
                      <Option value="">全部</Option>
                      <Option value="teacher">教师</Option>
                      <Option value="student">学生</Option>
                      <Option value="professional">专业人士</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={18}>
                  <Form.Item label="学校" labelCol={{ span: 4 }} wrapperCol={{span: 18}}>
                    <Input onChange={e => this.setState({ school: e.target.value })} value={school} placeholder="请输入学校名称"/>
                  </Form.Item>
                </Col>
                <Col span={4} offset={2}>
                  <Button type="primary" className="mt5" onClick={this.onSearch}>搜索</Button>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="add-ec-manager-body">
            <Table rowKey="id"
                   rowSelection={{onChange: this.selectUser, getCheckboxProps: this.getCheckboxProps, selectedRowKeys: selectedData, columnWidth: 40}}
                   loading={loading}
                   columns={tableColumns}
                   dataSource={userData}
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

AddManagerModal.propTypes = {
  schoolId: PropTypes.string,
  schoolName: PropTypes.string,
  majorId: PropTypes.number,
  visible: PropTypes.bool,
  onHide: PropTypes.func
}

export default AddManagerModal