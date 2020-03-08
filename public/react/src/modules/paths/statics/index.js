/*
 * @Description: 实践课程统计页面
 * @Author: tangjiang
 * @Github:
 * @Date: 2020-01-10 09:33:45
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-02-14 17:51:48
 */
import './index.scss';
import React, { useEffect } from 'react';
import StaticNumberAndTxt from './StaticNumberAndTxt';
import DisplayTableData from './DisplayTableData';
import { Tabs, Tooltip } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import actions from '../../../redux/actions';
const { TabPane } = Tabs;
const App = (props) => {

  const {
    subject_info,
    other_info,
    total,
    staticList,
    changeParams,
    initTotal
  } = props;
  // const [datas, setDatas] = useState([]);
  // const [sortedInfo, setSortedInfo] = useState({});
  // console.log(props);
  const {pathId} = props.match.params;
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, i) => i + 1,
      width: 100,
      align: 'center'
    },
    {
      title: '使用单位',
      // key: 'school_name',
      dataIndex: 'school_name',
      // width: 300,
      className: 'overflow_hidden',
      align: 'center'
    },
    {
      // title: '使用课堂/个',
      title: () => (<Tooltip title="将该课程使用到课堂的数量">使用课堂</Tooltip>),
      // key: 'course_count',
      width: 150,
      dataIndex: 'course_count',
      align: 'center',
      sorter: (a, b) => a.course_count - b.course_count,
      // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order
      // sorter: (a, b) => true,
      // sorter: (a, b) => a.age - b.age
    },
    {
      title: () => (<Tooltip title="课堂的学生总数（去掉重复）">课堂学生</Tooltip>),
      // key: 'student_count',
      width:150,
      dataIndex: 'student_count',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.student_count - b.student_count,
      // sorter: (a, b) => a.age - b.age
    },
    {
      title: () => (<Tooltip title="选用该课程实训的个数（去重）">选用实训/个</Tooltip>),
      width: 150,
      // key: 'choice_shixun_num',
      dataIndex: 'choice_shixun_num',
      align: 'center',
      sorter: (a, b) => a.choice_shixun_num - b.choice_shixun_num,
      // sorter: (a, b) => a.age - b.age
    },
    {
      title: () => (<Tooltip title="选用该课程实训的次数">选用实训/次</Tooltip>),
      width: 150,
      // key: 'choice_shixun_frequency',
      dataIndex: 'choice_shixun_frequency',
      align: 'center',
      sorter: (a, b) => a.choice_shixun_frequency - b.choice_shixun_frequency,
      // sorter: (a, b) => a.bbb - b.bbb
    }
  ];
  const sxColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text, record, i) => i + 1,
      width: 60,
      align: 'center'
    }, {
      title: '章节',
      dataIndex: 'stage',
      width: 80,
      align: 'center'
    },
    {
      title: '实训名称',
      dataIndex: 'shixun_name',
      align: 'center',
      // ellipsis: true
    },
    {
      title: '关卡数',
      dataIndex: 'challenge_count',
      width: 100,
      align: 'center'
    },
    {
      title: '使用课堂',
      dataIndex: 'course_count',
      width: 110,
      align: 'center',
      sorter: (a, b) => a.course_count - b.course_count
    },
    {
      title: '使用单位',
      dataIndex: 'school_count',
      width: 110,
      align: 'center',
      sorter: (a, b) => a.school_count - b.school_count
    },
    {
      title: '使用人数',
      dataIndex: 'used_count',
      width: 110,
      align: 'center',
      sorter: (a, b) => a.used_count - b.used_count
    },
    {
      title: '通关人数',
      dataIndex: 'passed_count',
      width: 110,
      align: 'center',
      sorter: (a, b) => a.passed_count - b.passed_count
    },
    {
      title: '评测次数',
      dataIndex: 'evaluate_count',
      width: 110,
      align: 'center',
      sorter: (a, b) => a.evaluate_count - b.evaluate_count
    },
    {
      title: '通关平均时间',
      dataIndex: 'passed_ave_time',
      width: 140,
      align: 'center',
      render: (text) => (text && moment(text).format('HH:mm:ss')) || '-',
      sorter: (a, b) => a.passed_ave_time - b.passed_ave_time
    }
  ];
  const stColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text, record, i) => i + 1,
      width: 60,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'username',
      align: 'center',
      width: 200
    },
    {
      title: '通关实训数',
      dataIndex: 'passed_myshixun_count',
      align: 'center',
      with: 130,
      render: (val) => val + '',
      sorter: (a, b) => a.passed_myshixun_count - b.passed_myshixun_count
    },
    {
      title: '完成关卡',
      dataIndex: 'passed_games_count',
      align: 'center',
      with: 130,
      render: (val) => val + '',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.passed_games_count - b.passed_games_count
    },
    // {
    //   title: '代码行',
    //   dataIndex: 'code_line_count',
    //   align: 'center',
    //   with: 130,
    //   render: (val) => val + '',
    //   sorter: (a, b) => a.code_line_count - b.code_line_count
    // },
    {
      title: '评测次数',
      dataIndex: 'evaluate_count',
      align: 'center',
      with: 130,
      render: (val) => val + '',
      sorter: (a, b) => a.evaluate_count - b.evaluate_count
    },
    {
      title: '所用时间',
      dataIndex: 'cost_time',
      align: 'center',
      with: 200,
      render: (text) => (text && moment(text).format('HH:mm:ss')) || '-',
      sorter: (a, b) => a.cost_time - b.cost_time
    }
  ];

  useEffect(() => {
    changeParams({
      page: 1
    });
    pathId && staticList(pathId);
  }, []);

  const handleFetchData = () => {
    pathId && staticList(pathId);
  }

  // const {
  //   study_count,
  //   course_study_count,
  //   initiative_study,
  //   passed_count,
  //   course_used_count,
  //   school_used_count
  // } = subject_info;

  const maps = {
    1: 'subject_info', // 实践课程使用情况
    2: 'shixun_info', // 实训使用情况
    3: 'user_info' // 用户使用情况
  };

  const handleTabChange = (key) => {
    const type = maps[+key];
    // console.log(type);
    const params = {
      page: 1,
      type: type
    }
    // 恢复初始值
    changeParams(params);
    initTotal();
    pathId && staticList(pathId);
  }

  return (
    <div className="static_wrap">
      <div className="ant-spin-container">
        <div className="educontent">
          <section className="static_section_header">
            <div className="header_title">
              <span className="title-p">学习统计</span>
              <span className="title-sub"></span>
            </div>
            <div className="header-number header-flex">
              <StaticNumberAndTxt
                count={subject_info===null?0:subject_info.study_count} // 总数
                txt={'学习总人数'} // 文字描述
                desc={'学习该课程的全部人数（学习总人数=课堂学习人数+自主学习人数）'}
              />
              <StaticNumberAndTxt
                count={subject_info===null?0:subject_info.course_study_count} // 总数
                txt={'课堂学习人数'} // 文字描述
                desc={'通过课堂学习该课程的人数'}
              />
              <StaticNumberAndTxt
                count={subject_info===null?0:subject_info.initiative_study} // 总数
                txt={'自主学习人数'} // 文字描述
                desc={'通过自主学习该课程的人数'}
              />
              <StaticNumberAndTxt
                count={subject_info===null?0:subject_info.passed_count} // 总数
                txt={'通关总人数'} // 文字描述
                desc={'通关该课程所有实训的人数（去重。一个人数计算1次）'}
              />
              <StaticNumberAndTxt
                count={subject_info===null?0:subject_info.course_used_count} // 总数
                txt={'使用课堂数'} // 文字描述
                desc={'使用该课程的课堂数量'}
              />
              <StaticNumberAndTxt
                count={subject_info===null?0:subject_info.school_used_count} // 总数
                txt={'使用单位数'} // 文字描述
                desc={'使用该课程的单位数量（包括自主学习者所在单位）'}
              />
            </div>
          </section>
          <section className="static_section_table">
            <Tabs defaultActiveKey="1" onChange={handleTabChange} style={{ paddingBottom: '15px'}}>
              <TabPane tab="课堂使用情况" key="1">
                <DisplayTableData
                  columns={columns}
                  datas={other_info}
                  total={total}
                  fetchData={handleFetchData}
                />
              </TabPane>
              <TabPane tab="实际使用情况" key="2">
                <DisplayTableData
                  columns={sxColumns}
                  datas={other_info}
                  total={total}
                  fetchData={handleFetchData}
                />
              </TabPane>
              <TabPane tab="学习情况" key="3">
                <DisplayTableData
                  columns={stColumns}
                  datas={other_info}
                  total={total}
                  fetchData={handleFetchData}
                />
              </TabPane>
            </Tabs>

          </section>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { staticReducer: {subject_info, other_info, total} } = state;
  return {
    subject_info,
    other_info,
    total
  }
};

const mapDispatchToProps = (dispatch) => ({
  staticList: (id) => dispatch(actions.staticList(id)),
  changeParams: (params) => dispatch(actions.changeParams(params)),
  initTotal: () => dispatch(actions.initTotal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
// export default App;
