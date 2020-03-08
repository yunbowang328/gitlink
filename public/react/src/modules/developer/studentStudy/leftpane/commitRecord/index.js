/*
 * @Description: 提交记录
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 09:49:33
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-09 14:06:34
 */
import './index.scss';
import React, { useState, useEffect } from 'react';
import { Table, Icon, message, Pagination } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../../../../redux/actions';
import CONST from '../../../../../constants';
import moment from 'moment';
import ClipboardJS from 'clipboard';
import ErrorResult from '../../../components/errorResult';

const numberal = require('numeral');

const {reviewResult} = CONST;
// 表格列
const columns = [
  {
    title: '提交时间',
    dataIndex: 'created_at',
    render: (created_at) => (
      <span>
        {moment(created_at, 'YYYYMMDD HHmmss').fromNow()}
      </span>)
  },
  {
    title: '提交结果',
    dataIndex: 'status',
    render: (value, record) => (
      <Link to={`/myproblems/record_detail/${record.id}`}>
        <span style={{ color: value === 0 ? '#28BD8B' : '#E6262E'}}>{reviewResult[value]}</span>
      </Link>
    )
  },
  {
    title: '执行用时',
    dataIndex: 'execute_time',
    render: (value) => (<span>{`${value}s`}</span>)
  },
  {
    title: '内存消耗',
    dataIndex: 'execute_memory',
    render: (value) => {
      if (value) {
        return <span>{numberal(+value).format('0.00b')}</span>
      } else {
        return (<span>0MB</span>)
      }
    }
  },
  {
    title: '语言',
    dataIndex: 'language'
  }
]

// const paginationConfig = {
//   total: 1, // 总条数
//   pageSize: 5, // 每页显示条数
//   current: 1, // 当前页数
//   showQuickJumper: true
// }
const CommitRecord = (props) => {
  const {
    identifier,
    pages,
    commitRecord,
    // excuteState,
    language,
    operateType,
    commitRecordDetail,
    getUserCommitRecord,
    changeRecordPagination
  } = props;

  const [current, setCurrent] = useState(1);
  // const [pagination, setPagination] = useState(paginationConfig);
  // const [tableData, setTableData] = useState([]);
  // 复制面板
  let clipboard;
  // const [recordDetail, setRecordDetail] = useState({});
  // const [renderCtx, setRenderCtx] = useState(() => {
  //   return function () {
  //     return '';
  //   }
  // });
  // 渲染提交记录详情
  const renderRecordDetail = (commitRecordDetail = {}) => {
    const {id, status} = commitRecordDetail;
    if (Object.keys(commitRecordDetail).length > 0) {
      // console.log('当前状态====》》》', status);
      const classes = status === 0 ? 'record_result_suc' : 'record_result_err';
      const showErrorCode = status !== 0 ? `ecord_error_info show_error_code` : `ecord_error_info`;
      const showErrorCopy = status !== 0 ? `copy_error show_error_copy` : `copy_error`;
      return (
        <React.Fragment>
          <div className={'record_header'}>
            <p className={'record_result'}>
              执行结果: <span className={classes}>{reviewResult[status]}</span>
            </p>
            <p 
              id="copyError"
              onClick={clickCopyErrInfo}
              className={showErrorCopy} data-clipboard-target="#errcode">
              <span>
                复制错误信息 <Icon type="copy" className={'icon_style'}/>
              </span>
            </p>
            <p className={'show_detail'} style={{ visibility: id ? 'visible' : 'hidden' }}>
              <Link to={`/myproblems/record_detail/${id}`}>
                显示详情 <Icon type="right" className={'icon_style'}/>
              </Link>
            </p>
          </div>
          <div id="errcode" className={showErrorCode}>
            <ErrorResult detail={commitRecordDetail} language={language}/>
          </div>
        </React.Fragment>
      );
    } else {
      return '';
    }
  }
  // 根据id获取用户提交记录
  useEffect(() => {
    getUserCommitRecord(identifier);
  }, []);
  // 提交记录变化时，同步到表单数据
  // useEffect(() => {
  //   // const len = commitRecord.length;
  //   // const pageConfig = Object.assign({}, paginationConfig, {total: len});
  //   setTableData(commitRecord);
  //   // setPagination(pageConfig);
  // }, [commitRecord]);
  // 提交详情变化时，显示当前提交信息
  // useEffect(() => {
  //   // setRecordDetail(commitRecordDetail);
  //   if (operateType === 'submit') {
  //     setRenderCtx(() => (renderRecordDetail))
  //   }
  // }, [commitRecordDetail, operateType]);
  // 复制功能
  let count = 0;
  // useEffect(() => {
    
  // }, []);
 
  const clickCopyErrInfo = () => {
    count = 0;
    if (!clipboard) {
      console.log('==========>>>>>>>', 11111111111);
      clipboard = new ClipboardJS('#copyError');
    }
    clipboard.on('success', (e) => {
      e.clearSelection();
      if (count > 0) return;
      count++;
      message.success('复制成功');
      setTimeout(() => {
        message.destroy();
      }, 3000);
    });
  }

  const handlePaginationChange = (page) => {
    setCurrent(page);
    changeRecordPagination(page);
    // 调用查询接口
    getUserCommitRecord(identifier);
    // setPagination(Object.assign({}, pagination, { current: page}));
    // console.log('======>>>>>>', pagination)
  }
  // console.log(commitRecord);

  const _style = {
    display: pages.total > pages.limit ? 'block' : 'none'
  };

  const {status, id} = commitRecordDetail || {};
  const classes = status === 0 ? 'record_result_suc' : 'record_result_err';
  const showErrorCode = status !== 0 ? `ecord_error_info show_error_code` : `ecord_error_info`;
  const showErrorCopy = status !== 0 ? `copy_error show_error_copy` : `copy_error`;

  // if (!clipboard) {
  //   console.log('==========>>>>>>>', 11111111111);
  //   clipboard = new ClipboardJS('#copyError');
  // }
  // clipboard.on('success', (e) => {
  //   e.clearSelection();
  //   // if (count > 0) return;
  //   // count++;
  //   message.success('复制成功');
  //   setTimeout(() => {
  //     message.destroy();
  //   }, 3000);
  // });

  // return () => {
  //   clipboard = null;
  // }
  
  return (
    <div className={'commit_record_area'}>
      {renderRecordDetail(commitRecordDetail)}
      {/* <div className={'record_header'}>
        <p className={'record_result'}>
          执行结果: <span className={classes}>{reviewResult[status]}</span>
        </p>
        <p 
          id="copyError"
          onClick={clickCopyErrInfo}
          className={showErrorCopy} data-clipboard-target="#errcode">
          <span>
            复制错误信息 <Icon type="copy" className={'icon_style'}/>
          </span>
        </p>
        <p className={'show_detail'} style={{ visibility: id ? 'visible' : 'hidden' }}>
          <Link to={`/myproblems/record_detail/${id}`}>
            显示详情 <Icon type="right" className={'icon_style'}/>
          </Link>
        </p>
      </div>
      <div id="errcode" className={showErrorCode}>
        <ErrorResult detail={commitRecordDetail} language={language}/>
      </div> */}
      <div className="commit_record_table_pagination">
        <Table 
          columns={columns}
          rowKey={function (record) { return `key_${record.id}`}}
          dataSource={commitRecord}
          // pagination={pagination}
          // onChange={handleTableChange}
          pagination={false}
        />
        <div className="commit_record_pagination" style={_style}>
          <Pagination 
            showQuickJumper
            pageSize={pages.limit}
            current={current} 
            total={pages.total}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    ojForUserReducer,
    commonReducer
  } = state;
  const {
    user_program_identifier,
    commitRecordDetail,
    commitRecord,
    hack,
    operateType,
    pages
  } = ojForUserReducer;
  const { excuteState } = commonReducer;
  return {
    identifier: user_program_identifier,
    commitRecordDetail,
    commitRecord, // 提交记录
    excuteState, // 代码执行状态
    language: hack.language,
    operateType,
    pages
  }
}
const mapDispatchToProps = (dispatch) => ({
  getUserCommitRecord: (identifier) => dispatch(actions.getUserCommitRecord(identifier)),
  changeRecordPagination: (page) => dispatch(actions.changeRecordPagination(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitRecord);