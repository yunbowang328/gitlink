import types from '../actions/actionTypes';

const initialState = {
  count: 0
};

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case types.ADD_TODO:
//       return {
//         ...state,
//         count: state.count + 1
//       };
//     default:
//       return state;
//   }
// }
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