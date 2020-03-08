import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spin, Button, Table, Input, Divider, Modal, message, Breadcrumb } from 'antd';

import './index.scss';
import AddYearModal from "./AddYearModal";

const { Search } = Input;
const { confirm } = Modal;

const defaultPagination = { current: 1, pageSize: 20, total: 0 };


class EcYear extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      majorId: props.match.params.majorId,

      spin: true,
      loading: true,
      keyword: '',
      pagination: {...defaultPagination},

      major: {},
      yearData: [],
      
      // add year modal vars
      addYearModalVisible: false
    }
  }

  componentDidMount() {
    this.getMajor();
  }

  getMajor = () => {
    axios.get(`/ec_major_schools/${this.state.majorId}.json`).then(res => {
      if(res.status === 200){
        window.document.title = res.data.name;
        this.setState({ spin: false, major: res.data });
        this.getYearData();
      }
    }).catch(e => console.log(e));
  }

  onSearch = () => {
    this.setState({ pagination: {...defaultPagination} }, () => {
      this.getYearData();
    })
  }

  getYearData = () => {
    let { majorId, keyword, pagination } = this.state;
    axios.get(`/ec_major_schools/${majorId}/ec_years.json`, {
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
          loading: false,
          yearData: res.data.ec_years,
          pagination
        })
      }
    }).catch((e) => {
      console.log(e);
      this.setState({ loading: false });
    })
  }

  onPaginationChange = (page, pageSize) => {
    this.setState({ pagination: { current: page, pageSize: pageSize } }, () => {
      this.getYearData()
    });
  }

  showDeleteYearConfirm = (yearId) => {
    confirm({
      title: '确认删除该届别?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.deleteYear(yearId);
      },
      onCancel() {},
    });
  }

  deleteYear = (yearId) => {
    let { majorId } = this.state;
    axios.delete(`/ec_major_schools/${majorId}/ec_years/${yearId}.json`).then(res => {
      if(res.status === 200){
        message.success('操作成功');
        this.getYearData();
      }
    }).catch(e => console.log(e))
  }

  HideAddYearModal = (added) => {
    this.setState({ AddYearModalVisible: false });
    if(added){
      this.setState({ keyword: '', pagination: { ...defaultPagination } }, this.getYearData);
    }
  }

  render() {
    let { majorId, spin, keyword, loading, pagination, major, yearData } = this.state;

    const linkRender = (num, url) => {
      return <Link to={url}>{ num === 0 ? "立即配置" : num }</Link>;
    }
    const contrastRender = (num, other) => {
      let color = other !== 0 && num === other ? 'color-green' : 'color-orange';

      return other === 0 ? (
        <div className={color}><span>--</span> / <span>--</span></div>
      ) : (
        <div className={color}><span>{num}</span> / <span>{other}</span></div>
      )
    }
    const statusRender = (text, record) => {
      let zero = record.graduation_subitem_count === 0;

      return zero ? (
        <span className="color-orange">--</span>
      ) : (
        <span className={text === 'achieved' ? 'color-green' : 'color-orange'}>
      { text === 'achieved' ? '已达成' : '未达成' }
    </span>
      )
    }
    const operationRender = (_, record) => {
      return (
        <div className="operation-box">
          <Link to={`/ecs/major_schools/${majorId}/years/${record.id}/training_objectives`} className="link">立即配置</Link>
          <a className="link" onClick={() => this.showDeleteYearConfirm(record.id)}>删除</a>
        </div>
      )
    }
    const tableColumns = [
      { title: '届别', dataIndex: 'year', render: text => `${text}届` },
      { title: '培养目标', dataIndex: 'training_subitem_count', render: (text, record) => linkRender(text, `/ecs/major_schools/${this.state.majorId}/years/${record.id}/training_objectives`), },
      { title: '毕业要求', dataIndex: 'graduation_requirement_count', render: (text, record) => linkRender(text, `/ecs/major_schools/${this.state.majorId}/years/${record.id}/graduation_requirement`), },
      { title: '课程体系', dataIndex: 'course_count', render: (text, record) => linkRender(text, `/ecs/major_schools/${this.state.majorId}/years/${record.id}/ec_course_setting`), },
      { title: '课程目标（达成情况）', key: 'courseTarget', render: (_, record) => { return contrastRender(record.achieved_graduation_course_count, record.course_target_count) } },
      { title: '毕业要求指标点（达成情况）', key: 'graduation', render: (_, record) => { return contrastRender(record.achieved_graduation_objective_count, record.graduation_subitem_count) } },
      { title: '评价结果', dataIndex: 'status', render: statusRender },
      { title: '操作', key: 'operation', render: operationRender }
    ];

    return (
      <div className="newMain clearfix">
        <Spin size="large" spinning={spin} style={{marginTop: '15%'}}>
          <div className="educontent ec-year-list-page">
            <div className="educontent ec-breadcrumb">
              <Breadcrumb separator=">">
                <Breadcrumb.Item key="department">
                  <Link to={`/ecs/department?school_id=${major && major.school_id}`}>{ major && major.school_name }</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item key="major-school">{ major && major.name }</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            
            <div className="ec-year-list-container">
              <div className="year-list-head">
                <div className="year-list-head-left">
                  <div className="year-list-head-label">{ major.name }</div>
                  <div className="year-list-head-tip">
                    <span>请选择添加参与认证的学生界别，多个界别分次添加</span>
                    <Link to="/forums/3528" target="_blank" className="link ml10">查看详情</Link>
                  </div>
                </div>
                <Button type="primary" onClick={() => this.setState({ AddYearModalVisible: true })}>添加届别</Button>
              </div>
  
              <Divider/>
  
              <div className="year-list-body">
                <div className="year-list-search">
                  <Search
                    placeholder="届别检索"
                    onInput={e => this.setState({keyword: e.target.value})}
                    onSearch={this.onSearch}
                    value={keyword}
                    style={{ width: 200 }}/>
                </div>
  
                <div className="year-list-table">
                  <Table rowKey="id"
                         loading={loading}
                         columns={tableColumns}
                         dataSource={yearData}
                         pagination={{...pagination, onChange: this.onPaginationChange}}/>
                </div>
              </div>
            </div>
          </div>

          <AddYearModal schoolId={major && major.school_id}
                        majorId={majorId}
                        visible={this.state.AddYearModalVisible}
                        onHide={this.HideAddYearModal}/>
        </Spin>
      </div>
    )
  }
}

export default EcYear;