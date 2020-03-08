import React from 'react';
import { Link } from 'react-router-dom';
import { Spin, Avatar, Tooltip, Button, Divider, Input, Row, Col, Icon, Modal } from "antd";
import { getImageUrl } from 'educoder';
import axios from 'axios';

import './index.scss';
import bgImage from '../../../images/ecs/bg.jpg';

import MajorManager from "./MajorManager";
import AddMajorModal from "./AddMajorModal";
import AddManagerModal from "./AddManagerModal";

const { Search } = Input;
const { confirm } = Modal;

class Home extends React.Component {
  constructor (props) {
    super(props);

    const searchParams = new URLSearchParams(props.location.search.substring(1));
    let schoolId = searchParams.get('school_id');

    if(!schoolId){
      this.props.history.push(`/nopage`);
      return;
    }

    this.state = {
      loading: true,
      majorLoading: true,
      AddMajorVisible: false,
      AddManagerVisible: false,
      searchKeyword: '',

      schoolId: schoolId,
      currentMajorId: null,
      school: null,
      currentUser: null,
      managers: null,
      templateMajor: null,
      majors: null,
      majorCount: 0
    }

    this.getSchoolMajors = this.getSchoolMajors.bind(this);
    this.HideAddMajorModal = this.HideAddMajorModal.bind(this);
    this.showDeleteMajorConfirm = this.showDeleteMajorConfirm.bind(this);
    this.showAddManagerModal = this.showAddManagerModal.bind(this);
    this.HideAddManagerModal = this.HideAddManagerModal.bind(this);
  }

  componentDidMount() {
    this.getSchoolDetail();
  }

  getSchoolDetail() {
    axios.get(`/schools/${this.state.schoolId}/detail.json`).then(result => {
      if(result.status === 200){
        window.document.title = result.data.school.name;
        this.setState({
          school: result.data.school,
          currentUser: result.data.current_user,
          managers: result.data.school_managers,
          loading: false
        });
        this.getSchoolMajors();
      }
    }).catch(e => {
      console.log(e);
      this.setState({ loading: false });
    });
  }

  getSchoolMajors(){
    let that = this;
    let keyword = this.state.searchKeyword;
    this.setState({ majorLoading: true });

    axios.get(`/schools/${this.state.schoolId}/ec_major_schools.json?search=${keyword}&per_page=50`).then(result => {
      if(result.status === 200){
        that.setState({
          majorCount: result.data.count,
          templateMajor: result.data.template_ec_major_school,
          majors: result.data.ec_major_schools,
          majorLoading: false
        });
      }
    }).catch(e => {
      console.log(e);
      that.setState({ majorLoading: false });
    });
  }

  showAddManagerModal(majorId){
    this.setState({ currentMajorId: majorId, AddManagerVisible: true });
  }

  HideAddMajorModal(added){
    this.setState({ AddMajorVisible: false });
    if(added){
      this.setState({ searchKeyword: '' }, this.getSchoolMajors)
    }
  }
  HideAddManagerModal(added){
    this.setState({ AddManagerVisible: false });
    if(added){
      this.setState({ searchKeyword: '' }, this.getSchoolMajors)
    }
  }

  showDeleteMajorConfirm(majorId){
    confirm({
      title: '确认删除该认证专业?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteMajor(majorId);
      },
      onCancel() {},
    });
  }

  deleteMajor(majorId){
    let { schoolId, majorCount, majors } = this.state;
    axios.delete(`/schools/${schoolId}/ec_major_schools/${majorId}.json`).then(res => {
      if(res.status === 200){
        this.setState({
          majorCount: majorCount - 1,
          majors: majors.filter(major => major.id !== majorId)
        });
      }
    }).catch(e => console.log(e))
  }

  render() {
    let { currentUser, school, managers, templateMajor, majors, majorCount } = this.state;

    const manageSchool = !!currentUser && (currentUser.manager || currentUser.admin);
    const manageMajor = !!currentUser && (manageSchool || currentUser.major_manager);

    const configBtnText = manageMajor ? '配置' : '查看';

    return (
      <div className="newMain clearfix">
        <Spin spinning={this.state.loading}  size="large" style={{marginTop:'15%'}}>
          <div className="ec-home">
            <div className="pr mb20">
              <div className="head-image" style={{background: `url(${bgImage}) no-repeat top center`}}>
                <span className="font-30 color-white font-bd">{ school && school.name }</span>
              </div>
            </div>

            <div className="educontent mb20 ec-home-item school-manager-item">
              <div className="ec-home-item-head">
                <div className="ec-home-item-label">学校管理员</div>
                <div className="ec-home-item-tip">温馨提醒：学校管理员有添加专业及设置专业管理员等权限</div>
              </div>
              <div className="ec-home-item-body ec-school-manager">
                {
                  managers && managers.map((manager) => {
                    return (
                      <Link to={`/users/${manager.login}`} key={manager.id} className="ec-school-manager-item">
                        <Avatar size={48} src={getImageUrl(`images/${manager.image_url}`)} alt="头像"/>
                        <Tooltip title={manager.name} placement="bottom">
                          <span className="ec-school-manager-name">{ manager.name }</span>
                        </Tooltip>
                      </Link>
                    )
                  })
                }
              </div>
            </div>

            <div className="educontent mb50 ec-home-item major-list-item">
              <div className="ec-home-item-head">
                <div className="major-list-item-head">
                  <div className="ec-home-item-label">专业列表</div>
                  <div className="ec-home-item-tip">
                    <span>请添加参与认证的专业名称</span>
                    <Link to="/forums/3527" target="_blank" className="link ml10">查看详情</Link>
                  </div>
                </div>
                <Button type="primary" onClick={() => { this.setState({ AddMajorVisible: true }) }}>添加专业</Button>
              </div>

              <Divider/>

              <div className="major-list-container">
                <div className="major-list-head">
                  <div className="total">{majorCount || 0} 个检索结果（{majorCount || 0} 专业）</div>
                  <Search
                    placeholder="专业代码/专业名称检索"
                    onInput={e => this.setState({searchKeyword: e.target.value})}
                    onSearch={this.getSchoolMajors}
                    value={this.state.searchKeyword}
                    style={{ width: 200 }}
                  />
                </div>
                <div className="major-list-body">
                  <Row className="major-list-row head">
                    <Col span={2} className="textcenter">序号</Col>
                    <Col span={4}>专业代码</Col>
                    <Col span={6}>专业名称</Col>
                    <Col span={8}>专业管理员</Col>
                    <Col span={4} className="textcenter">操作</Col>
                  </Row>
                  <Spin spinning={this.state.majorLoading}>
                    {
                      templateMajor && (
                        <Row className="major-list-row">
                          <Col span={2} className="textcenter">0</Col>
                          <Col span={4}>000000</Col>
                          <Col span={6}>
                            <Link to={`/ecs/major_schools/${templateMajor.id}`}>{ templateMajor.name }</Link>
                          </Col>
                          <Col span={8}></Col>
                          <Col span={4} className="textcenter">
                            <Link to={`/ecs/major_schools/${templateMajor.id}`} className="link">{ configBtnText }</Link>
                          </Col>
                        </Row>
                      )
                    }
                    {
                      majors && majors.map((major, index) => {
                        return (
                          <Row className="major-list-row" key={major.id}>
                            <Col span={2} className="textcenter">{ index + 1 }</Col>
                            <Col span={4}>{ major.code }</Col>
                            <Col span={6}>
                              <Link to={`/ecs/major_schools/${major.id}`}>{ major.name }</Link>
                            </Col>
                            <Col span={8}>
                              <div className="manager-box">
                                { manageMajor && <a className="link mr10" onClick={() => this.showAddManagerModal(major.id)}><Icon type="plus-circle" /></a> }

                                <MajorManager schoolId={school.id}
                                              majorId={major.id}
                                              canManage={manageMajor}
                                              managers={major.major_managers}></MajorManager>
                              </div>
                            </Col>
                            <Col span={4} className="textcenter operate-box">
                              <Link to={`/ecs/major_schools/${major.id}`} className="link">{ configBtnText }</Link>
                              { manageSchool && ( <a className="link" onClick={() => this.showDeleteMajorConfirm(major.id)}>删除</a> ) }
                            </Col>
                          </Row>
                        )
                      })
                    }
                  </Spin>
                </div>
              </div>
            </div>
          </div>

          <AddMajorModal schoolId={this.state.schoolId} visible={this.state.AddMajorVisible} onHide={this.HideAddMajorModal}/>
          { this.state.school && <AddManagerModal schoolId={this.state.schoolId} schoolName={this.state.school.name} majorId={this.state.currentMajorId} visible={this.state.AddManagerVisible} onHide={this.HideAddManagerModal}/> }
        </Spin>
      </div>
    )
  }
}

export default Home;