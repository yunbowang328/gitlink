/*
 * @Description: 将多维数组转变成一维数组
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-09 09:35:01
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-16 11:36:22
 */
function flatten (array) {
  return flatten.rec(array, []);
}

flatten.rec = function flatten (array, result) {

  for (let item of array) {
    if (Array.isArray(item)) {
      flatten(item, result);
    } else {
      result.push(item);
    }
  }

  return result;
}

export default flatten;
