/*
 * @Description: undefined 
 * @Author: tangjiang 
 * @Date: 2019-11-15 11:02:49 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-18 16:52:38
 */

import './index.scss';

import React from 'react';
import { Table, Button, Dropdown, Icon, Menu, Card, Input, Select, Tag } from 'antd';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import MultipTags from './components/multiptags';
// import { Link } from 'react-router-dom';
import CONST from '../../constants';
import { withRouter } from 'react-router';
import { toStore, CNotificationHOC } from 'educoder'; 
// import MyIcon from '../../common/components/MyIcon';

const {tagBackground, diffText} = CONST;
const { Search } = Input;
const { Option } = Select;
// import reqwest from 'reqwest';
/**
 * 下拉菜单
 */
const maps = {
  'categoryMenu': [
    { 
      'key': '0',
      'name': '全部',
      'value': '0'
    },
    { 
      'key': '1',
      'name': '程序设计基础',
      'value': '1'
    },
    { 
      'key': '2',
      'name': '数据结构与计算',
      'value': '2'
    }
  ],
  'languageMenu': [
    {
      'key': 'C',
      'name': 'C',
      'value': 'C'
    },
    {
      'key': 'C++',
      'name': 'C++',
      'value': 'C++'
    },
    {
      'key': 'Python',
      'name': 'Python',
      'value': 'Python'
    },
    {
      'key': 'Java',
      'name': 'Java',
      'value': 'Java'
    }
  ],
  'difficultMenu': [
    { 
      'key': '1',
      'name': '简单',
      'value': '1'
    },
    { 
      'key': '2',
      'name': '中等',
      'value': '2'
    },
    { 
      'key': '3',
      'name': '困难',
      'value': '3'
    }
  ],
  'statusMenu': [
    { 
      'key': '-1',
      'name': '未做',
      'value': '-1'
    },
    { 
      'key': '0',
      'name': '未通过',
      'value': '0'
    },
    { 
      'key': '1',
      'name': '已通过',
      'value': '1'
    }
  ],
  'come_fromMenu': [
    { 
      'key': 'all',
      'name': '全部',
      'value': 'all'
    },
    { 
      'key': 'mine',
      'name': '我创建的',
      'value': 'mine'
    }
  ]
};

const testMaps = {
  category: {
    1: '程序设计基础',
    2: '数据结构与算法'
  }
}
class DeveloperHome extends React.PureComponent {
  /**
   * 表格列
   */
  options = {
    title: '操作',
    key: 'action',
    // fixed: 'right',
    width: 100,
    render: (text, record) => (
      <React.Fragment>
        <Button
          shape="circle" 
          type="primary"
          icon="edit"
          size="small"
          onClick={() => this.handleClickEditor(record.identifier)}
        >
          {/* <Link to={`/problems/${record.identifier}/edit`}></Link> */}
        </Button>
        <Button
          shape="circle" 
          type="danger"
          icon="close"
          size="small"
          style={{ marginLeft: '10px', display: record.open_or_not ? 'none' : 'inline-block' }}
          onClick={() => this.handleClickDelete(record)}
        >
        </Button>
      </React.Fragment>
    ),
  }

  columns = [
    {
      title: '标题',
      dataIndex: 'name',
      render: (name, record) => <Button type="link" onClick={() => this.handleNameClick(record)} className={'oj_item_name'}>{name}</Button>
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: '20%',
      align: 'center',
      render: (category) => <span>{category ? testMaps['category'][+category] : '-'}</span>
    },
    {
      title: '难度',
      dataIndex: 'difficult',
      align: 'center',
      width: '15%',
      render: (difficult) => {
        if (difficult) {
          return <Tag color={tagBackground[+difficult]}>{diffText[+difficult]}</Tag>
        } else {
          return '-';
        }
      }
    },
    {
      title: '热度',
      dataIndex: 'hack_user_lastest_codes_count',
      sorter: true,
      align: 'center',
      width: '10%'
    },
    {
      title: '通过率',
      dataIndex: 'passed_rate',
      sorter: true,
      align:'right',
      width: '10%',
      render: val => <span>{`${val}%`}</span>
    },
  ];

  state = {
    data: [],
    loading: false,
    searchParams: {
      search: '', // 查询关键字
      'come_from': '', // 来源
      difficult: '', // 难易度
      status: '', // 未做
      category: '', // 分类
      'sort_by': '', // 排序
      'sort_direction': '', // 排序方向
      page: 1, // 当前页数
      limit: 10 // 每页显示条件
    },
    columns: this.columns,
    searchInfo: []
  };

  componentDidMount() {
    // 是否是我的，如果是我的 显示编辑按钮
    const { isMySource } = this.props;
    if (isMySource) {
      this.handleFilterSearch({come_from: 'mine'});
      let _columns = this.columns.concat([this.options]);
      this.setState({
        columns: _columns
      });
    } else {
      this.fetchData();
    }
   
    const {hacks_count} = this.props.ojListReducer;
    this.setState({
      pagination: {
        total: hacks_count
      }
    });
  }

  // 是否登录
  isLogin = (url) => {
    if(this.props.checkIfLogin()===false){
      this.props.showLoginDialog()
      return false;
    }
    return true;
  }

  // 新建
  handleClickNew = () => {
    if (this.isLogin()) {
      // this.props.history.push('/problems/new');
      window.location.href = '/problems/new'
    }
    // window.location.href = '/problems/new';
  }

  // 编辑
  handleClickEditor = (identifier) => {
    if (this.isLogin()) {
      this.props.history.push(`/problems/${identifier}/edit`)
    }
  }

  // 删除
  handleClickDelete = (record) => {
    const { deleteItem } = this.props;
    this.props.confirm({
      title: '提示',
      content: `确定要删除${record.name}吗?`,
      onOk () {
        // 调用删除接口
        // console.log(record.identifier);
        deleteItem(record.identifier);
      }
    });
    // Modal.confirm({
    //   title: '删除',
    //   content: `确定要删除${record.name}吗?`,
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk () {
    //     // 调用删除接口
    //     console.log(record.identifier);
    //     deleteItem(record.identifier);
    //   }
    // });
  }
  // table条件变化时
  handleTableChange = (pagination, filters, sorter) => {
    const {field, order} = sorter;
    const {current, pageSize} = pagination;
    this.handleFilterSearch({
      sort_by: field, 
      sort_direction: order === 'descend' ? 'desc' : 'asc',
      page: current,
      limit: pageSize
    });
    this.props.changePaginationInfo(pagination);
  };
  // 获取接口数据
  fetchData = () => {
    this.props.fetchOJList(this.state.searchParams);
  };

  /**
   * 根据类型获取下拉菜单
   * @param type 类型
   * @param handleClick 处理函数
   */
  getMenuItems = (type, handleClick) => {
    return (
      <Menu onClick={handleClick}>
        {
          maps[type].map((item) => {
            return (
              <Menu.Item key={item.key}>
                {item.name}
              </Menu.Item>
            )
          })
        }
      </Menu>
    )
  };

  getOptionsItem = (type) => {
    return maps[type].map(item => {
      return <Option key={item.key} value={item.value}>{item.name}</Option>
    });
  }
  // 点击条件时加载数据
  handleFilterSearch = (obj) => {
    const searchParams = Object.assign({}, this.state.searchParams, obj);
    this.setState({
      searchParams: searchParams
    }, () => {
      if (this.isLogin()) {
        this.fetchData();
      }
    });
  }

  // 添加显示搜索条件
  addShowFilterCtx = (obj) => {
    const {searchInfo} = this.state
    const index = searchInfo.findIndex(item => item.type === obj.type);
    let tempArr = [...searchInfo];
    if (index > -1) {
      tempArr[index] = obj;
    } else {
      tempArr.push(obj);
    }
    this.setState({
      searchInfo: tempArr
    });
  }
  /**
   * 搜索输入框
   * @param value 输入框值
   */
  handleInputSearch = (value) => {
    value = value.trim();
    // if (value.length === 0) return;
    this.handleFilterSearch({search: value});
  } 
  // handleSearchChange = (e) => {
  //   console.log(e.target.value);
  //   const value = e.target.value.trim();
  // }
  // 下拉类别菜单
  handleCategoryMenuClick = (item) => {
    this.addShowFilterCtx({
      type: 'category',
      key: item.key
    });
    this.handleFilterSearch({category: +item.key === 0 ? '' : +item.key});
  }
  // 下拉语言
  handleLanguageMenuClick = (item) => {
    this.addShowFilterCtx({
      type: 'language',
      key: item.key
    });
    this.handleFilterSearch({language: item.key})
  }
  // 难度下拉
  handleHardMenuClick = (item) => {
    this.addShowFilterCtx({
      type: 'difficult',
      key: item.key
    });
    this.handleFilterSearch({difficult: +item.key});
  }
  // 状态下拉
  handleSatusMenuClick = (item) => {
    this.addShowFilterCtx({
      type: 'status',
      key: item.key
    });
    this.handleFilterSearch({status: +item.key});
  }
  // 来源下拉
  handleOriginMenuClick = (item) => {
    
    this.addShowFilterCtx({
      type: 'come_from',
      key: item.key
    });

    this.handleFilterSearch({come_from: item.key === 'all' ? '' : item.key});
    
    if (item.key !== 'all') {
      let _columns = this.columns.concat([this.options]);
      this.setState({
        columns: _columns
      });
    } else {
      this.setState({
        columns: this.columns
      })
    }
  }

  handleTagClose = (info) => {
    
    this.handleFilterSearch({[info.type]: ''});
    // 移除 searcInfo 中的数据
    const { type } = info;
    let tempArr = [...this.state.searchInfo];
    const index = tempArr.findIndex(item => item.type === type);
    if (index > -1) tempArr.splice(index, 1);
    this.setState({
      searchInfo: tempArr
    });
    if (info.type === 'come_from' && info.key === 'mine') {
      this.setState({
        columns: this.columns
      });
    }
  }

  // 点击name

  handleNameClick = (record) => {
    // console.log('name has click', record);
    // 先调用start接口获取返回的 identifier, 再跳转到开启编辑
    if (this.isLogin()) {
      toStore('hack_identifier', record.identifier); // 保存当前编辑的id号
      this.props.startProgramQuestion(record.identifier, this.props);
    }
  }
  // if(this.props.checkIfLogin()===false){
  //   this.props.showLoginDialog()
  //   return
  // }

  render () {
    // const { testReducer, handleClick } = this.props;
    const { 
      ojListReducer: {hacks_list, top_data, hacks_count},
      user,
      pagination
    } = this.props;
    const {passed_count = 0, simple_count = 0, medium_count = 0, diff_count = 0} = top_data;
    const { columns } = this.state;

    // 渲染条件内容
    const renderSearch = () => {
      return this.state.searchInfo.map(info => {
        let ctx = '';
        const arrs = maps[`${info.type}Menu`];
        arrs.forEach(item => {
          if (item.key === info.key) ctx = item.name;
        });
        return (
          <Tag
            closable
            className={'search_tag_style'}
            key={info.type}
            onClose={() => this.handleTagClose(info)}
          >{ctx}</Tag>
      )});
    };
    // console.log('=====>>>>>>>>>.', this.props);
    
    const newBtnStyle = user && (user.admin || (user.is_teacher && user.professional_certification) || user.business)
      ? { display: 'block'} 
      : { display: 'none'};
    return (
      <div className="developer-list">
        <div className="ant-spin-container">
          <div className={'banner-wrap'}></div>
          <div className="educontent">
            <div className={'card-top'}>
              <div className="search-params">
                <p className={'save-question'}>已解决 <span className={''}>{passed_count}</span> / {hacks_count} 题</p>
                <div className={'question-level'}>
                  <MultipTags type="success" text="简单" numb={simple_count} style={{ marginRight: '20px' }}/>
                  <MultipTags type="warning" text="中等" numb={medium_count} style={{ marginRight: '20px' }}/>
                  <MultipTags type="error" text="困难" numb={diff_count}/>
                </div>
                {/* 认证的老师, 超级管理员, 运营人员可见 */}
                <Button style={ newBtnStyle } type="primary" onClick={this.handleClickNew}>新建
                  {/* <Link to="/problems/new">新建</Link> */}
                </Button>
              </div>
            </div>
            <div className={'card-table'}>
              <div className={'filter_ctx_area'}>
                <div>
                  <Dropdown className={'dropdonw-style'} placement="bottomLeft" overlay={this.getMenuItems('categoryMenu', this.handleCategoryMenuClick)}>
                    <span className={'dropdown-span'}>分类 <Icon type="down"/></span>
                  </Dropdown>
                  <Dropdown className={'dropdonw-style'} placement="bottomLeft" overlay={this.getMenuItems('languageMenu', this.handleLanguageMenuClick)}>
                    <span className={'dropdown-span'}>语言 <Icon type="down"/></span>
                  </Dropdown>
                  <Dropdown className={'dropdonw-style'} placement="bottomLeft" overlay={this.getMenuItems('difficultMenu', this.handleHardMenuClick)}>
                    <span className={'dropdown-span'}>难度 <Icon type="down"/></span>
                  </Dropdown>
                  <Dropdown className={'dropdonw-style'} placement="bottomLeft" overlay={this.getMenuItems('statusMenu', this.handleSatusMenuClick)}>
                    <span className={'dropdown-span'}>状态 <Icon type="down"/></span>
                  </Dropdown>
                  <Dropdown className={'dropdonw-style'} placement="bottomLeft" overlay={this.getMenuItems('come_fromMenu', this.handleOriginMenuClick)}>
                    <span className={'dropdown-span'}>来源 <Icon type="down"/></span>
                  </Dropdown>
                </div>
                
                <div className={'choice_ctx'}>
                  {renderSearch()}
                </div>
                <Search
                  placeholder="输入标题进行搜索"
                  onChange={this.handleSearchChange}
                  onSearch={value => this.handleInputSearch(value)}
                  style={{ width: 320, float: 'right' }}
                />
              </div>
              
              <Card bordered={false} style={{ marginTop: '2px'}}>
                <Table
                  columns={columns}
                  rowKey={record => Math.random()}
                  dataSource={hacks_list}
                  pagination={pagination}
                  onChange={this.handleTableChange}
                />
              </Card>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @param {*} state store
 * @param {*} ownProps  DeveloperHome 中的 props
 */
const mapStateToProps = (state, ownProps) => {
  const {
    testReducer,
    ojListReducer,
    commonReducer
  } = state;

  const { pagination } = ojListReducer;

  return {
    testReducer,
    ojListReducer,
    isMySource: commonReducer.isMySource,
    pagination
  }
};


const mapDispatchToProps = (dispatch) => ({
  handleClick: () => dispatch(actions.toggleTodo()),
  fetchOJList: (params) => dispatch(actions.getOJList(params)),
  changePaginationInfo: (obj) => dispatch(actions.changePaginationInfo(obj)),
  startProgramQuestion: (id, props) => dispatch(actions.startProgramQuestion(id, props)),
  deleteItem: (identifier) => dispatch(actions.deleteItem(identifier))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CNotificationHOC() (DeveloperHome)));
// export default DeveloperHome;
