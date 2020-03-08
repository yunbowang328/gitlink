/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-12 09:01:39
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-13 15:28:45
 */
import types from "../actions/actionTypes";

const initState = {
  jupyter_tpi_url: '',
  jupyter_info: {}, // 保存用户信息及实训相关的内容
  jupyter_data_set: [],
  jupyter_identifier: '',
  jupyter_tpi_url_state: -1, // 获取 url 状态值: 0 成功, 其它 失败
  jupyter_tpi_code: '', // 端口号
  jupyter_data_set_count: 1, // 数据集总数
  jupyter_pagination: {
    page: 1,
    limit: 20 // 默认加载20条
  }
};

const JupyterReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_JUPYTER_DATA_SETS:
      const { data_sets, data_sets_count,folder_name} = action.payload;
      let newjupyter_data_set=state.jupyter_data_set;
      data_sets.map((item,key)=>{
        newjupyter_data_set.push(item)
      })
      return {
        ...state,
        jupyter_data_set: newjupyter_data_set,
        jupyter_data_set_count: data_sets_count,
        jupyter_folder_name:folder_name,
      }
    case types.GET_JUPYTER_TPI_URL:
      const {url, status, port} = action.payload;
      return {
        ...state,
        jupyter_tpi_url: url,
        jupyter_tpi_url_state: status,
        jupyter_tpi_code: port
      }
    case types.SAVE_JUPYTER_IDENTIFIER:
      //console.log('保存的jupyter_identifier', action.payload);
      return {
        ...state,
        jupyter_identifier: action.payload
      }
    case types.SAVE_JUPYTER_INFO:
      return {
        ...state,
        jupyter_info: action.payload
      }
    case types.CHANGE_JUPYTER_URL_STATE:
      return {
        ...state,
        jupyter_tpi_url_state: action.payload
      }
    case types.CHANGE_JUPYTER_CURRENT_PAGE:
      return {
        ...state,
        jupyter_pagination: Object.assign({}, state.jupyter_pagination, { page: action.payload })
      }
    default:
      return {
        ...state
      }
  }
}

export default JupyterReducer;
