/*
 * @Description: 开发者社区入口文件，此处提供全局store，并且此处Provier只能有一个子无互 
 * @Author: tangjiang 
 * @Date: 2019-11-13 20:14:04 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-15 20:43:27
 */
import React from 'react';
import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
import { SnackbarHOC } from 'educoder';
import DeveloperHome from './DeveloperHome';

const App = (props) => {
  return (
    <DeveloperHome {...props}/>
  );
}

export default SnackbarHOC()(TPMIndexHOC(App));
