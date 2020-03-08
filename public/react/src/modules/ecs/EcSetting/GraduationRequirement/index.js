import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {getRandomNumber} from 'educoder';
import { Spin, Button, Input, Divider, Icon, Tooltip, Form, message, Modal } from 'antd';
import axios from 'axios';
import _ from 'lodash'

import './index.scss';

const { confirm } = Modal;

class GraduationRequirement extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      editIndex: null,
      addState: false,
      submitState: false,
      validateState: false,

      currentEditReq: {},
      newRequirement: {},
      graduationRequirements: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let { yearId } = this.props;

    this.setState({ loading: true });
    axios.get(`/ec_years/${yearId}/ec_graduation_requirements.json`).then(res => {
      if(res.status === 200){
        this.setState({
          graduationRequirements: res.data.graduation_requirements,
          loading: false
        })
      }
    }).catch(e => console.log(e))
  }

  showDeleteConfirm = (id) => {
    if(this.state.editIndex !== null || this.state.addState){
      message.error('请先保存其它内容');
      return
    }
    confirm({
      title: '确认删除该毕业要求?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteRequirement(id);
      },
      onCancel() {},
    });
  }

  deleteRequirement = (id) => {
    let { yearId } = this.props;
    let url = `/ec_years/${yearId}/ec_graduation_requirements/${id}.json`;
    axios.delete(url).then(res => {
      if(res){
        message.success('操作成功');
        this.getData();
      }
    }).catch(e => console.log(e))
  }

  showEditContent = (index) => {
    let { editIndex, graduationRequirements } = this.state;
    if(editIndex !== null){
      message.error('请先保存其它内容');
      return
    }

    this.setState({ editIndex: index, currentEditReq: _.cloneDeep(graduationRequirements[index])})
  }

  onEditContentChange = (e) => {
    let { currentEditReq } = this.state;
    currentEditReq.content = e.target.value;
    this.setState({ currentEditReq });
  }

  onEditItemContentChange = (e, index) => {
    let { currentEditReq } = this.state;
    currentEditReq.ec_graduation_subitems[index].content = e.target.value;
    this.setState({ currentEditReq });
  }

  addEditItem = () => {
    let { currentEditReq } = this.state;
    currentEditReq.ec_graduation_subitems.push({id: null, content: ''})
    this.setState({ currentEditReq });
  }

  removeEditItem = (index) => {
    let { currentEditReq } = this.state;
    currentEditReq.ec_graduation_subitems.splice(index, 1);
    this.setState({ currentEditReq });
  }

  saveContentEdit = () => {
    let { currentEditReq } = this.state;

    let contentExist = currentEditReq.content && currentEditReq.content.length !== 0;
    let errorItem = currentEditReq.ec_graduation_subitems.find(item => !item.content || item.content.length === 0);
    this.setState({ validateState: !!errorItem || !contentExist });

    if(errorItem || !contentExist){ return }

    this.setState({ submitState: true }, this.updateRequirement);
  }

  cancelContentEdit = () => {
    this.setState({ currentEditReq: {}, editIndex: null, validateState: false });
  }

  updateRequirement = () => {
    let { yearId } = this.props;
    let { currentEditReq } = this.state;

    let url = `/ec_years/${yearId}/ec_graduation_requirements/${currentEditReq.id}.json`;

    axios.put(url, { content: currentEditReq.content, position: currentEditReq.position, graduation_subitems: currentEditReq.ec_graduation_subitems }).then(res => {
      if(res){
        message.success('操作成功');
        this.setState({ submitState: false, editIndex: null });
        this.getData();
      }
    }).catch(e => {
      console.log(e);
      this.setState({ submitState: false });
    })
  }

  showNewReqContent = () => {
    let { editIndex, graduationRequirements } = this.state;
    if(editIndex !== null){
      message.error('请先保存其它内容');
      return
    }

    this.setState({
      editIndex: -1, addState: true,
      newRequirement: {
        content: '', position: graduationRequirements.length + 1,
        graduation_subitems: [
          { id: null, content: '' },
          { id: null, content: '' },
          { id: null, content: '' },
        ]
      }
    })
  }

  onNewReqContentChange = (e) => {
    let { newRequirement } = this.state;
    newRequirement.content = e.target.value;
    this.setState({ newRequirement });
  }

  onNewReqItemContentChange = (e, index) => {
    let { newRequirement } = this.state;
    newRequirement.graduation_subitems[index].content = e.target.value;
    this.setState({ newRequirement });
  }

  addNewReqItem = () => {
    let { newRequirement } = this.state;
    newRequirement.graduation_subitems.push({id: null, content: ''})
    this.setState({ newRequirement });
  }

  removeNewReqItem = (index) => {
    let { newRequirement } = this.state;
    newRequirement.graduation_subitems.splice(index, 1);
    this.setState({ newRequirement });
  }

  saveNewReq = () => {
    let { newRequirement } = this.state;

    let contentExist = newRequirement.content && newRequirement.content.length !== 0;
    let errorItem = newRequirement.graduation_subitems.find(item => !item.content || item.content.length === 0);
    this.setState({ validateState: !!errorItem || !contentExist });

    if(errorItem || !contentExist){ return }

    this.setState({ submitState: true }, this.createRequirement);
  }

  cancelNewReq = () => {
    this.setState({ newRequirement: {}, addState: false, editIndex: null, validateState: false });
  }

  createRequirement = () => {
    let { yearId } = this.props;
    let { newRequirement } = this.state;

    let url = `/ec_years/${yearId}/ec_graduation_requirements.json`;

    axios.post(url, newRequirement).then(res => {
      if(res){
        message.success('操作成功');
        this.setState({ submitState: false, editIndex: null, addState: false });
        this.getData();
      }
    }).catch(e => {
      console.log(e);
      this.setState({ submitState: false });
    })
  }

  render() {
    let { can_manager } = this.props.year;
    let { loading, editIndex, addState, submitState, validateState, currentEditReq, graduationRequirements, newRequirement } = this.state;

    return (
      <div>
        <Spin spinning={loading} size='large' style={{ marginTop: '15%' }}>
          <div className="educontent ec-graduation-requirement-page">
            <div className="ec-head">
              <div className="ec-head-left">
                <div className="ec-head-label">毕业要求(及其指标点)</div>
                <div className="ec-head-tip">
                  <span>请结合本专业特色修改毕业要求文字描述及指标点，需完全覆盖12项通用标准</span>
                  <Link to="/forums/3530" target="_blank" className="link ml10">查看详情</Link>
                </div>
              </div>
              <a href={`/api/ec_years/${this.props.yearId}/ec_graduation_requirements.xlsx${getRandomNumber()}`} target="_blank" className="ant-btn ant-btn-primary color-white">导出毕业要求</a>
            </div>

            <Divider/>

            <div className="graduation-requirement-body">
              <div className="graduation-requirement-items">
                <div className="graduation-requirement-items-head">
                  <div className="no-column">指标点</div>
                  <div className="item-content-column">内容</div>
                  <div className="operation-column">
                    {
                      can_manager && !addState && (
                        <Tooltip title="添加">
                          <Icon type="plus-circle" className="edit-action" onClick={this.showNewReqContent} />
                        </Tooltip>
                      )
                    }
                  </div>
                </div>
                <div className="graduation-requirement-items-body">
                  {
                    graduationRequirements && graduationRequirements.map((item, index) => {
                      return can_manager && index === editIndex ? (
                        <div className="graduation-requirement-items-body-item active" key={index}>
                          <div className="item-row item-head">
                            <div className="no-column">{ index + 1 }</div>
                            <div className="item-content-column">
                              <Form.Item label={false} validateStatus={validateState && (!currentEditReq.content || currentEditReq.content.length === 0) ? 'error' : ''}>
                                <Input.TextArea rows={2} value={currentEditReq.content} onChange={this.onEditContentChange} />
                              </Form.Item>
                            </div>
                            <div className="item-column-operation">
                              <Tooltip title="添加"><Icon type="plus-circle" style={{ color: '#29BD8B' }} onClick={this.addEditItem}/></Tooltip>
                            </div>
                          </div>
                          {
                            currentEditReq.ec_graduation_subitems.map((subitem, i) => {
                              return (
                                <div className="item-row" key={i}>
                                  <div className="no-column">{ index + 1 }-{ i + 1 }</div>
                                  <div className="item-content-column">
                                    <Form.Item label={false} validateStatus={validateState && (!subitem.content || subitem.content.length === 0) ? 'error' : ''}>
                                      <Input.TextArea rows={2} value={subitem.content} onChange={(e) => this.onEditItemContentChange(e, i)} />
                                    </Form.Item>
                                  </div>
                                  <div className="item-column-operation">
                                    <Tooltip title="删除"><Icon type="delete" onClick={() => this.removeEditItem(i)}/></Tooltip>
                                  </div>
                                </div>
                              )
                            })
                          }

                          <div className="edit-form">
                            <Button type="primary" loading={submitState} onClick={this.saveContentEdit}>保存</Button>
                            <Button disabled={submitState} onClick={this.cancelContentEdit}>取消</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="graduation-requirement-items-body-item" key={index}>
                          <div className="item-row item-head">
                            <div className="no-column">{ index + 1 }</div>
                            <div className="item-content-column">{ item.content }</div>
                            {
                              can_manager && (
                                <div className="item-column-operation">
                                  <Tooltip title="删除"><Icon type="delete" onClick={() => this.showDeleteConfirm(item.id)} /></Tooltip>
                                  <Tooltip title="编辑"><Icon type="edit" theme="filled" className="edit-action" onClick={() => this.showEditContent(index)}/></Tooltip>
                                  {
                                    index === graduationRequirements.length - 1 && !addState && (
                                      <Tooltip title="添加"><Icon type="plus-circle" style={{ color: '#29BD8B' }} onClick={this.showNewReqContent}/></Tooltip>
                                    )
                                  }
                                </div>
                              )
                            }

                          </div>
                          {
                            item.ec_graduation_subitems.map((subitem, i) => {
                              return (
                                <div className="item-row" key={i}>
                                  <div className="no-column">{ index + 1 }-{ i + 1 }</div>
                                  <div className="item-content-column">{ subitem.content }</div>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }

                  {
                    can_manager && addState && (
                      <div className="graduation-requirement-items-body-item active">
                        <div className="item-row item-head">
                          <div className="no-column">{ graduationRequirements.length + 1 }</div>
                          <div className="item-content-column">
                            <Form.Item label={false} validateStatus={validateState && (!newRequirement.content || newRequirement.content.length === 0) ? 'error' : ''}>
                              <Input.TextArea rows={2} value={newRequirement.content} onChange={this.onNewReqContentChange} />
                            </Form.Item>
                          </div>
                          <div className="item-column-operation">
                            <Tooltip title="添加"><Icon type="plus-circle" style={{ color: '#29BD8B' }} onClick={this.addNewReqItem}/></Tooltip>
                          </div>
                        </div>
                        {
                          newRequirement.graduation_subitems.map((subitem, i) => {
                            return (
                              <div className="item-row" key={i}>
                                <div className="no-column">{ graduationRequirements.length + 1 }-{ i + 1 }</div>
                                <div className="item-content-column">
                                  <Form.Item label={false} validateStatus={validateState && (!subitem.content || subitem.content.length === 0) ? 'error' : ''}>
                                    <Input.TextArea rows={2} value={subitem.content} onChange={(e) => this.onNewReqItemContentChange(e, i)} />
                                  </Form.Item>
                                </div>
                                <div className="item-column-operation">
                                  <Tooltip title="删除"><Icon type="delete" onClick={() => this.removeNewReqItem(i)}/></Tooltip>
                                </div>
                              </div>
                            )
                          })
                        }

                        <div className="edit-form">
                          <Button type="primary" loading={submitState} onClick={this.saveNewReq}>保存</Button>
                          <Button disabled={submitState} onClick={this.cancelNewReq}>取消</Button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    )
  }
}
GraduationRequirement.propTypes = {
  schoolId: PropTypes.string,
  majorId: PropTypes.string,
  yearId: PropTypes.string,
}

export default GraduationRequirement