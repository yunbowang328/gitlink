/*
 * @Description: jupyter tpi 相关内容
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-12 09:01:30
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-13 23:03:27
 */
import types from "./actionTypes";
import { message ,Modal} from 'antd';
import { 
  fetchJupyterTpiDataSet,
  fetchJupyterTpiUrl,
  fetchJupyterInfo,
  fetchSyncJupyterCode,
  fetchreset_with_tpi,
  fetchSaveJupyterTpi,
  fetactive_with_tpi,
  timeinfo_with_tpis
} from "../../services/jupyterServer";

// 获取 jupyter 相关信息
export const getJupyterInfo = (id) => {
  return (dispatch, getState) => {
    const { jupyter_pagination } = getState().jupyterReducer;
    console.log(jupyter_pagination);
    fetchJupyterInfo(id).then(res => {
      if (res.data.status === 401) return;
      if (res.status === 200) {
        const { data } = res;
        // if (data.status === 0) {
        dispatch({
          type: types.SAVE_JUPYTER_INFO,
          payload: data
        });
        const { identifier, myshixun_identifier } = data;
        dispatch(saveJupyterIdentifier(identifier));
        // 调用获取数据集接口
        dispatch(getJupyterTpiDataSet(identifier, jupyter_pagination));
        // 调用获取url接口
        dispatch(getJupyterTpiUrl({identifier: myshixun_identifier}));
        // }
      }
    })
  }
}
// 获取 jupyter tpi 数据集
export const getJupyterTpiDataSet = (identifier, params) => {
  return (dispatch, getState) => {
    if (!params) {
      params = getState().jupyterReducer.jupyter_pagination;
    }
    fetchJupyterTpiDataSet(identifier, params).then(res => {
      if (res.data.status === 401) return; // 用户未登录
      if (res.status === 200) {
        const {data_sets, data_sets_count,folder_name} = res.data;
        dispatch({
          type: types.GET_JUPYTER_DATA_SETS,
          payload: {
            data_sets,
            data_sets_count,
            folder_name,
          }
        });
      }
    });
  }
}
// 获取 jupyter tpi 地址
export const getJupyterTpiUrl = (obj) => {
  return (dispatch, getState) => {
    const {jupyter_info} = getState().jupyterReducer;
    if (!obj.identifier && !jupyter_info.myshixun_identifier) return;
    const id = obj.identifier || jupyter_info.myshixun_identifier;
    fetchJupyterTpiUrl({identifier: id}).then(res => {
      if (res.data.status === 401) return; // 用户未登录
      //console.log('获取url', res);
      if (res.status === 200) {
        const { status, url = '', port } = res.data;
        dispatch(updataspinning(false))
        //setTimeout(()=>{ dispatch(addjypertime(Date.now() +3600 * 1000))},500)
        timeinfo_with_tpi(id,dispatch)
        dispatch({
          type: types.GET_JUPYTER_TPI_URL,
          payload: {
            status,
            url,
            port
          }
        })
      }
    })
  }
}
// 保存 jupyter identifer
export const saveJupyterIdentifier = (identifier) => {
  return {
    type: types.SAVE_JUPYTER_IDENTIFIER,
    payload: identifier
  }
}
// 重置代码
export const syncJupyterCode = (identifier, msg) => {
  return (dispatch) => {
    fetchSyncJupyterCode(identifier).then(res => {
      // console.log('同步代码成功: ', res);
      if (res.data.status === 401) return;
      if (res.status === 200) {
        const {status} = res.data
        if (status === 0) {
          message.success(msg);
          dispatch(updataspinning(false))
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      }
    })
  }
}

// 重置环境
export const reset_with_tpi = (identifier, msg) => {
  return (dispatch,getState) => {
    const {jupyter_info }= getState().jupyterReducer;
    if (!jupyter_info.myshixun_identifier) return;
    const params = {
      identifier: jupyter_info.myshixun_identifier,
    };
    fetchreset_with_tpi(params).then(res => {
      // console.log('同步代码成功: ', res);
      if (res.data.status === 401) return;
      if (res.status === 200) {
        const {status} = res.data
        if (status === 0) {
          message.success(msg);
          dispatch(updataspinning(false))
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      }
    })
  }
}

// 延时
export const active_with_tpi = (identifier, msg) => {
  return (dispatch,getState) => {
    const {jupyter_info }= getState().jupyterReducer;
    if (!jupyter_info.myshixun_identifier) return;
    const params = {
      identifier: jupyter_info.myshixun_identifier,
    };
    fetactive_with_tpi(params).then(res => {
      // console.log('同步代码成功: ', res);
      if (res.data.status === 401) return;
      if (res.status === 200) {
        const {status} = res.data
        if (status === 0) {
          message.success(msg);
          // dispatch(addjypertime(Date.now() + 900 * 1000,false))
          // setTimeout(()=>{dispatch(addjypertime(Date.now() + 900 * 1000,  Date.now() + 300 * 1000))},800);
          timeinfo_with_tpi(identifier,dispatch)
        }
      }
    })
  }
}


// 改变状态值
export const changeGetJupyterUrlState = (status) => {
  return {
    type: types.CHANGE_JUPYTER_URL_STATE,
    payload: status
  }
}

// 保存 jupyter tpi
export const saveJupyterTpi = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
    const { jupyter_tpi_code, jupyter_info }= getState().jupyterReducer;
    // console.log(jupyter_info.myshixun_identifier, jupyter_tpi_code);
    if (!jupyter_info.myshixun_identifier) return;
    const params = {
      identifier: jupyter_info.myshixun_identifier,
      jupyter_port: jupyter_tpi_code
    };

    fetchSaveJupyterTpi(params).then(res => {
      dispatch({
        type: types.LOADING_STATUS,
        payload: false
      });
      if (res.status === 200) {
        const { data } = res;
        if (data.status === 0) {
          message.success('保存成功!')
        }
      }
    }).catch(() => {
      dispatch({
        type: types.LOADING_STATUS,
        payload: false
      });
    });
    }, 800)

  }
}
// 改变当前页数
export const changeCurrentPage = (current) => {
  return {
    type: types.CHANGE_JUPYTER_CURRENT_PAGE,
    payload: current
  }
}

// 改变当前页数
export const changeshowDrawer = (type) => {
  return {
    type: types.CHANGE_SHOW_DRAWER,
    payload: type
  }
}
//增加倒计时
export const addjypertime=(time,endtime)=>{
  if(endtime===false){
    return {
      type: types.CHANGE_JYPYTER_TIME,
      payload: time,
      endtime:false
    }
  }else{
    return {
      type: types.CHANGE_JYPYTER_TIME,
      payload: time,
      endtime:endtime
    }
  }

}

export const updataspinning=(type)=>{
  return {
    type: types.CHANGE_UPDETA_SPIN,
    payload: type
  }
}

// 获取重置实训后的时间
export const timeinfo_with_tpi = (identifier, dispatch) => {
    const params = {
      identifier: identifier
    };
    timeinfo_with_tpis(params).then(res => {
      if (res.data.status === 401) return;
      if (res.status === 200) {
        if(res.data.status===0){
          if(res.data.useSeconds===null){
            Modal.confirm({
              title: '重置环境',
              content:" 是否确定重置环境？" ,
              okText: '确定',
              cancelText: '取消',
              onOk () {
                reset_with_tpi(identifier, '重置成功');
              },
              onCancel() {}
            })
          }else{
            let remainingSeconds=res.data.remainingSeconds;
            // let summain=3600 * 1000;
            let sums= remainingSeconds * 1000;
            let endsms=(remainingSeconds-300<=0?0:remainingSeconds-300)*1000
            // let sum=summain-sums;
            setTimeout(()=>{ dispatch(addjypertime(Date.now() +sums,endsms===0?Date.now()+1000:Date.now() +endsms))},500);
          }
        }
      }
    })
}