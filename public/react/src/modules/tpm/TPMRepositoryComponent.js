import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import TPMRepository from './TPMRepository'

import axios from 'axios';

import { trace_collapse, info } from 'educoder'

import RepositoryCodeEditor from './shixunchild/Repository/RepositoryCodeEditor'


class TPMRepositoryComponent extends Component {
    constructor(props) {
      super(props)
      this.nameTypeMap = {}
      let pathArray = []
      var splitArray = window.location.pathname.split('shixun_show/');
      if (splitArray[1]) {
        pathArray = splitArray[1].split('/')
        if (pathArray[pathArray.length - 1] == '') {
          // 有可能是这么访问的： http://localhost:3007/shixuns/3ozvy5f8/repository/fsu7tkaw/master/shixun_show/src/
          pathArray.length = pathArray.length - 1;
        }
      }
      this.state = {
        repositoryLoading: true,
        pathArray: pathArray,
        isContentWidth100: this._isFileInPathArray(pathArray)
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if (this.props.secret_repository_tab != prevProps.secret_repository_tab) {
        this.fetchRepo()
      }
    }


    componentDidMount = () => {

      this.fetchRepo()
    }
    setContentWidth100 = (flag) => {
      const newFileContent = flag === false ? '' : this.state.fileContent
      this.setState({
        // isCodeFile
        isContentWidth100: flag,
        fileContent: newFileContent
      })
    }
    saveCode = (content) => {
      const path = this.state.pathArray.join('/')
      let id = this.props.match.params.shixunId;
      let url = `/shixuns/${id}/update_file.json`;
      axios.post(url, {
        path: path,
        content
      }).then((response) => {
          if(response.status === 200){
              this.setState({
                fileContent: response.data.content,
                repositoryLoading: false
            });
          }
          trace_collapse('tpm save code res: ', response)
          this.props.showSnackbar('文件保存成功')

        }).catch((error)=>{
          console.log(error)
        });
    }
    fetchCode = (newPathArray) => {
      const path = newPathArray.join('/')

      // https://testeduplus2.educoder.net/shixuns/3ozvy5f8/file_content.json
      this.setContentWidth100(true)
      this.setState({ repositoryLoading: true, pathArray: newPathArray })
      let id = this.props.match.params.shixunId;
      let url = `/shixuns/${id}/file_content.json`;
      axios.post(url, {
        path: path,
        secret_repository: this.props.secret_repository_tab
      }).then((response) => {
        trace_collapse('repository res: ', response)

        if (response.data.status == -1) {
          this.props.showSnackbar('无法找到对应的资源，请变更地址或联系管理员！')
          return;
        }
        if(response.status === 200){
          this.setState({
              fileContent: response.data.content,
              repositoryLoading: false
          });
          this.props.history
            .replace(`${this.props.match.url}/master/shixun_show/${newPathArray.join('/')}`)
        }

      }).catch((error)=>{
        this.props.showSnackbar('无法找到对应的资源，请变更地址或联系管理员！')
        console.log(error)
      });
    }
    _isFileName = (name) => {
      return name.indexOf('.') !== -1
    }
    _isFileInPathArray = (array) => {
      if (!array || array.length === 0) {
        return false
      }
      return this.nameTypeMap[array[array.length - 1]] !== 'tree' &&  this._isFileName( array[array.length - 1] )
    }
    // listItem 如果是num，则是通过面包屑点击过来的，取pathArray的子集
    fetchRepo = (listItem) => {
      const { pathArray } = this.state;
      let newPathArray = pathArray.slice(0)

      if (listItem === 0 || listItem) {
        this.setContentWidth100(false)
        this.nameTypeMap[listItem.name] = listItem.type
        if (typeof listItem == 'number') {  // 参数是数字的话，做截取
          // if (this._isFileName(newPathArray[listItem])) { // 面包屑中的文件不让点击了
          //   listItem--;
          // }
          newPathArray = newPathArray.slice(0, listItem)
        } else if (listItem.type === 'tree') {
          newPathArray.push(listItem.name)
        } else if (listItem.type === 'blob') {
          newPathArray.push(listItem.name)
          this.setState({ pathArray: newPathArray })
          this.fetchCode(newPathArray)
          return;
        }
      }
      // https://testeduplus2.educoder.net/shixuns/3ozvy5f8/repository.json
      this.setState({ repositoryLoading: true, pathArray: newPathArray })
      let urlNewPathArray = newPathArray;
      let fileInPathArray = false;
      if (newPathArray.length) {
        fileInPathArray = this.nameTypeMap[newPathArray[newPathArray.length - 1]] ? this.nameTypeMap[newPathArray[newPathArray.length - 1]] !== 'tree'
            : (listItem ? listItem.type !== 'tree' : this._isFileName( newPathArray[newPathArray.length - 1] ))
        if ( fileInPathArray ) {
          urlNewPathArray = newPathArray.slice(0, newPathArray.length - 1)
        }
      }
      const path = urlNewPathArray.join('/')

      let id = this.props.match.params.shixunId;
      let url = `/shixuns/${id}/${this.props.secret_repository_tab ? 'secret_repository' : 'repository'}.json`;
      // this.props.setLoadingContent(true)
      axios.post(url, {
        path: path ? path : ''
      }).then((response) => {
        // this.props.setLoadingContent(false)

        const trees = response.data.trees
        const treeIsFileMap = {}
        if (!trees || !Array.isArray(trees)) {
          // this.props.showSnackbar('无法找到对应的资源，请变更地址或联系管理员！')
            // return;
        } else {
          trees.forEach(item => {
            treeIsFileMap[item.name] = item.type == 'blob'
          })
        }
        if(response.status === 200){
          this.setState({
              treeIsFileMap,
              ...response.data,
              repositoryLoading: false
          });
          this.props.history
            .replace(`${this.props.match.url}` +
              (newPathArray.length ? `/master/shixun_show/${newPathArray.join('/')}` : ''))
        }

        // 初始化时，repo接口完毕后需要看是否需要fetchCode
        if (fileInPathArray) {
          this.fetchCode(newPathArray)
        }
        // info(response)
        trace_collapse('repository res: ', response)

      }).catch((error)=>{
        console.log(error)
      });
    }


    render() {
      const { isContentWidth100 } = this.state;

      // 需要重构
      return (
        <React.Fragment>
          { !isContentWidth100 ? <TPMRepository
              {...this.props}
              {...this.state}
              nameTypeMap={this.nameTypeMap}
              fetchRepo={this.fetchRepo}
							is_jupyter={this.props.is_jupyter}
          >
          </TPMRepository>
          :
          <div className="tpmComment educontent clearfix mt30 mb80">
            {/* 可能会影响到其他页面的样式，需要测试、协商 */}
            <div className={`width100 fl edu-back-white`}
                style={{background: 'transparent'}}>
              <RepositoryCodeEditor
                {...this.state}
                {...this.props}
                fetchRepo={this.fetchRepo}
                saveCode={this.saveCode}
                nameTypeMap={this.nameTypeMap}

              ></RepositoryCodeEditor>
            </div>
          </div>
          }

        </React.Fragment>


      );
    }
}

export default  TPMRepositoryComponent ;
