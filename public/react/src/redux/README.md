# actions 文件下文件的配置

  ## actionTypes.js
    此文件指定所有请求的action类型, 类型名统一用大写形式表示

    const types = {
      ADD_TODO: 'ADD_TODO'
    }

    export default types;

  ## testActions.js
    此文件针对每一个模块指定 action 方法， 最终通过 index.js 文件统一导出

    import types from './actionTypes';

    export default function toggleTodo() {
      return {
        type: types.ADD_TODO
      }
    }

  ## index.js 
    此文件为默认的导出文件， 里边包含所有指定的其它 actions 文件

    import toggleTodo from './testAction.js';

    export default {
      toggleTodo
    }

# reducers 文件下文件配置

  ## testReducer.js
    修改state值的唯一方式， 根据 action 类型打开对应的 reducer

    import types from '../actions/actionTypes';

    const initialState = { // 指定状态
      count: 0
    };

    const testReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_TODO:
        return {
          ...state,
          count: state.count + 1
        };
      default:
        return state;
    }
    }

    export default testReducer;

# stores 文件配置

    import { createStore } from 'redux';
    import rootReducer from '../reducers';

    const configureStore = () => createStore(rootReducer);

    export default configureStore;


# 使用 

```
  import React from 'react';
  import { Provider } from 'react-redux';
  import DeveloperHome from './DeveloperHome';
  // import store from '../../redux/stors/configureStore';
  import configureStore from '../../redux/stores/configureStore'
  const store = configureStore();

  const App = () => {
    return (
      <Provider store={store}>
        <DeveloperHome />
      </Provider>
    );
  }

  export default App;
```

````

  import React, { PureComponent, Fragment } from 'react';
  import { connect } from 'react-redux';
  import actions from '../../redux/actions';

  class DeveloperHome extends PureComponent {

    render () {
      const { testReducer, handleClick } = this.props;
      return (
        <Fragment>
          <h2> Developer Home, { testReducer.count } </h2>
          <button onClick={() => handleClick() }>add</button>
        </Fragment>
      );
    }
  }

  /**
  * @param {*} state store
  * @param {*} ownProps  DeveloperHome 中的 props
  */
  const mapStateToProps = (state, ownProps) => {
    return {
      testReducer: state.testReducer
    };
  }


  const mapDispatchToProps = (dispatch) => {
    return {
      handleClick: () => dispatch(actions.toggleTodo())
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeveloperHome);
````