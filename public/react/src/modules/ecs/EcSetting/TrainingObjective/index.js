import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Spin, Button, Input, Divider, Icon, Tooltip, Form, message } from 'antd';
import {getRandomNumber} from 'educoder';
import axios from 'axios';

import './index.scss';

class TrainingObjective extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      contentEditState: false,
      itemsEditState: false,
      submitState: false,
      validateState: false,
      itemSubmitState: false,
      itemValidateState: false,

      objective: {},
      editContent: '',
      trainingSubitems: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let { yearId } = this.props;

    axios.get(`/ec_years/${yearId}/ec_training_objectives.json`).then(res => {
      if(res.status === 200){
        this.setState({
          objective: res.data,
          editContent: res.data.content,
          trainingSubitems: res.data.ec_training_items,
          loading: false
        })
      }
    }).catch(e => console.log(e))
  }

  saveContentEdit = () => {
    let { editContent } = this.state;
    this.setState({ validateState: editContent.length === 0 });
    if(editContent.length === 0){ return; }

    this.setState(
      { submitState: true },
      () => {
        this.updateTrainingObjective(
          { content: editContent },
          () => {
            this.setState({ submitState: false, contentEditState: false });
            this.getData();
          },
          _e => {
            this.setState({ submitState: false })
          }
        )
      }
    );
  }

  cancelContentEdit = () => {
    this.setState({ editContent: this.state.objective.content, contentEditState: false });
  }

  editItemsContent = () => {
    let { trainingSubitems } = this.state;
    if(!trainingSubitems || trainingSubitems.length === 0){
      trainingSubitems = [{ id: null, content: null }]
    }
    this.setState({ trainingSubitems: trainingSubitems, itemsEditState: true });
  }

  addItemColumn = (index) => {
    let { trainingSubitems } = this.state;
    trainingSubitems.splice(index, 0, { id: null, content: null });
    this.setState({ trainingSubitems })
  }

  removeItemColumn = (index) => {
    let { trainingSubitems } = this.state;
    trainingSubitems.splice(index, 1);
    this.setState({ trainingSubitems })
  }

  onItemContentChange = (e, index) => {
    let { trainingSubitems } = this.state;
    trainingSubitems[index].content = e.target.value;

    this.setState({ trainingSubitems: trainingSubitems });
  }

  saveItemsContentEdit = () => {
    let { objective, trainingSubitems } = this.state;

    let errorItem = trainingSubitems.find(item => !item.content || item.content.length === 0);
    this.setState({ itemValidateState: !!errorItem });

    if(errorItem){ return }

    this.setState(
      { itemSubmitState: true },
      () => {
        this.updateTrainingObjective(
          { content: objective.content, training_subitems: trainingSubitems },
          () => {
            this.setState({ itemSubmitState: false, itemsEditState: false });
            this.getData();
          },
          _e => {
            this.setState({ itemSubmitState: false })
          }
        )
      }
    );
  }

  cancelItemsContentEdit = () => {
    this.setState({ trainingSubitems: this.state.objective.ec_training_items, itemsEditState: false, itemValidateState: false });
  }

  updateTrainingObjective = (data, success, fail) => {
    let { yearId } = this.props;
    let url = `/ec_years/${yearId}/ec_training_objectives.json`;

    axios.post(url, data).then(res => {
      if(res){
        message.success('操作成功');
        success();
      }
    }).catch(e => {
      console.log(e);
      fail(e);
    })
  }

  render() {
    let { can_manager } = this.props.year;
    let { loading, contentEditState, itemsEditState, objective, editContent, trainingSubitems, validateState, itemValidateState, itemSubmitState, submitState } = this.state;

    return (
      <div>
        <Spin spinning={loading} size='large' style={{ marginTop: '15%' }}>
          <div className="educontent ec-training-objective-page">
            <div className="ec-head">
              <div className="ec-head-left">
                <div className="ec-head-label">培养目标</div>
                <div className="ec-head-tip">
                  <span>请结合本专业特色修改培养目标文字描述及目标分解查看详情</span>
                  <Link to="/forums/3529" target="_blank" className="link ml10">查看详情</Link>
                </div>
              </div>
              <a href={`/api/ec_years/${this.props.yearId}/ec_training_objectives.xlsx${getRandomNumber()}`} target="_blank" className="ant-btn ant-btn-primary color-white">导出培养目标</a>
            </div>

            <Divider/>

            <div className="training-objective-body">
              {
                can_manager && contentEditState ? (
                  <div className="training-objective-content block">
                    <div>
                      <Form.Item label={false} validateStatus={validateState && (!editContent || editContent.length === 0) ? 'error' : ''}>
                        <Input.TextArea rows={6} value={editContent} onChange={e => this.setState({ editContent: e.target.value })} />
                      </Form.Item>
                    </div>
                    <div className="training-objective-content-form">
                      <Button type="primary" loading={submitState} onClick={this.saveContentEdit}>保存</Button>
                      <Button loading={submitState} onClick={this.cancelContentEdit}>取消</Button>
                    </div>
                  </div>
                ) : (
                  <div className="training-objective-content">
                    <div className="training-objective-content-text">{ objective.content }</div>
                    {
                      can_manager && (
                        <div className="training-objective-content-edit">
                          <Tooltip title="编辑">
                            <Icon type="edit" theme="filled" className="edit-action" onClick={() => this.setState({ contentEditState: true })} />
                          </Tooltip>
                        </div>
                      )
                    }
                  </div>
                )
              }

              <div className="training-objective-items">
                <div className="training-objective-items-head">
                  <div className="no-column">分项</div>
                  <div className="item-content-column">目标分解详情</div>
                  <div className="operation-column">
                      {
                        !can_manager || itemsEditState || (
                          <Tooltip title="编辑">
                            <Icon type="edit" theme="filled" className="edit-action" onClick={this.editItemsContent} />
                          </Tooltip>
                        )
                      }
                  </div>
                </div>
                <div className="training-objective-items-body">
                  {
                    can_manager && itemsEditState ? (
                      <div>
                        {
                          trainingSubitems && trainingSubitems.map((item, index) => {
                            return (
                              <div className="training-objective-items-body-item" key={index}>
                                <div className="no-column">{index + 1}</div>
                                <div className="item-content-column">
                                  <Form.Item label={false} validateStatus={itemValidateState && (!item.content || item.content.length === 0) ? 'error' : ''}>
                                    <Input.TextArea rows={2} value={item.content} onChange={e => this.onItemContentChange(e, index)} />
                                  </Form.Item>
                                  <div className="item-column-operation">
                                    { index !== 0 && <Icon type="delete" onClick={() => this.removeItemColumn(index)} /> }

                                    <Icon type="plus-circle" onClick={() => this.addItemColumn(index + 1)} style={{ color: '#29BD8B' }} />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }

                        <div className="training-objective-content-form">
                          <Button type="primary" loading={itemSubmitState} onClick={this.saveItemsContentEdit}>保存</Button>
                          <Button disabled={itemSubmitState} onClick={this.cancelItemsContentEdit}>取消</Button>
                        </div>
                      </div>
                    ) : (
                      objective.ec_training_items && objective.ec_training_items.map((item, index) => {
                        return (
                          <div className="training-objective-items-body-item" key={index}>
                            <div className="no-column">{ index + 1 }</div>
                            <div className="item-content-column">{ item.content }</div>
                          </div>
                        )
                      })
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
TrainingObjective.propTypes = {
  schoolId: PropTypes.string,
  majorId: PropTypes.string,
  yearId: PropTypes.string,
}

export default TrainingObjective