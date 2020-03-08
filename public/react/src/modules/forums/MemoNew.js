import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import { Select,Icon, Upload, Button } from 'antd';

// demo http://react-component.github.io/upload/examples/simple.html
// import Upload from 'rc-upload';

import axios from 'axios'

import 'antd/lib/select/style/index.css'
import TPMMDEditor from '../tpm/challengesnew/TPMMDEditor'

import { getUrl, getUploadActionUrl, appendFileSizeToUploadFileAll, appendFileSizeToUploadFile } from 'educoder'
import CaseDetail from "../moop_cases/CaseDetail";
const Option = Select.Option;
const $ = window.$;

let origin = getUrl();
let path = getUrl("/editormd/lib/")

//  load 
if (!window.postUpMsg) {
   $.getScript(
      `${origin}/javascripts/attachments.js`,
      (data, textStatus, jqxhr) => {
      
    });
}

// editorMD to create
/**
 *
 * @param id  渲染DOM的id
 * @param width 宽度
 * @param high  高度
 * @param placeholder
 * @param imageUrl 上传图片的url
 * @returns {*} 返回一个editorMD实例
 */
function create_editorMD(id, width, high, placeholder, imageUrl, callback){
    var editorName = window.editormd(id, {
        width   : width,
        height  : high,
        syncScrolling : "single",
        //你的lib目录的路径，我这边用JSP做测试的
        path    : path ,   // "/editormd/lib/"
        tex              : true,
        tocm             : true,
        emoji            : true,
        taskList         : true,
        codeFold         : true,
        searchReplace    : true,
        htmlDecode       : "style,script,iframe",
        sequenceDiagram  : true,
        autoFocus: false,
            toolbarIcons : function() {
            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            return ["bold", "italic", "|", "list-ul", "list-ol", "|", "code", "code-block", "|", "testIcon", "testIcon1", '|', "image", "table"
              // , '|', "underlineIcon"
              , "|", "watch", "clear" ]
        },
        toolbarCustomIcons : {
            testIcon  : "<a type=\"inline\" class=\"latex\" ><div class='zbg'></div></a>",
            testIcon1 : "<a type=\"latex\" class=\"latex\" ><div class='zbg_latex'></div></a>",

            // underlineIcon例子
            // underlineIcon : "<a type=\"underline\" class=\"underline\" ><div class='underlineIcon'></div></a>"
        },
        //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
        saveHTMLToTextarea : true,
        // 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
        dialogMaskOpacity : 0.6,
        placeholder: placeholder,
        imageUpload : true,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp", "JPG", "JPEG", "GIF", "PNG", "BMP", "WEBP"],
        imageUploadURL : imageUrl,//url
        onload: function(){

            // underlineIcon例子
            // $('#'+ id + " .underline").bind('click', function() {
            //   var __Cursor = editorName.cm.getDoc().getCursor();
            //   editorName.appendMarkdown('__')
            //   editorName.cm.setCursor(__Cursor.line, __Cursor.ch + 2);
            // });
        
          // this.previewing();
            $("#"+ id +" [type=\"latex\"]").bind("click", function(){
                editorName.cm.replaceSelection("```latex");
                editorName.cm.replaceSelection("\n");
                editorName.cm.replaceSelection("\n");
                editorName.cm.replaceSelection("```");
                var __Cursor = editorName.cm.getDoc().getCursor();
                editorName.cm.setCursor(__Cursor.line-1, 0);
            });

            $("#"+ id +" [type=\"inline\"]").bind("click", function(){
                editorName.cm.replaceSelection("`$$$$`");
                var __Cursor = editorName.cm.getDoc().getCursor();
                editorName.cm.setCursor(__Cursor.line, __Cursor.ch-3);
                editorName.cm.focus();
            });
            $("[type=\"inline\"]").attr("title", "行内公式");
            $("[type=\"latex\"]").attr("title", "多行公式");

            window.md_elocalStorage(editorName, `memoNew_${id}`, "memoNew");

            callback && callback()
        }
    });
    return editorName;
}

const typeNameMap = {
  '技术分享': 5, 
  '操作指南': 3,
	'通知公告':16,
}
export const typeNameMap2 = {
  5: '技术分享', 
  3: '操作指南',
	16: '通知公告',
}
const defaultType = '技术分享'

const languageSeparator = '/'
class MemoNew extends Component {
    constructor(props) {
      super(props)
      this.mdRef = React.createRef();

      // https://testbdweb.trustie.net/uploads.js?attachment_id=1&filename=jqui.js
      // https://ant.design/components/upload-cn/
      this.uploaderProps = {
        action: '/uploads.js',
        data: { attachment_id: 1 }, // , filename: 2
        headers: {
          Authorization: 'authorization-text',
        },
        multiple: true,
        beforeUpload(file) {
          // console.log('beforeUpload', file.name);
        },
        onStart: (file) => {
          console.log('onStart', file.name);
          // this.refs.inner.abort(file);
        },
        onSuccess(file) {
          console.log('onSuccess', file);
        },
        onProgress(step, file) {
          console.log('onProgress', Math.round(step.percent), file.name);
        },
        onError(err) {
          console.log('onError', err);
        },
      };

      this.state = {
        memoSubject: '',
        memoContent: '',
        memoType: typeNameMap[defaultType],
        memoRepertoire: '',
        memoLanguage: [],

        repertoires: [],
        currentSelectRepertoiresIndex: -1,
        repertoiresTagMap: {},

        fileList: [],
				forums:[{id:5,name:"技术分享"},{id:3,name:"技术指南"},{id:16,name:"通知公告"}],
      }
    }
    onCommit() {
      const { memoSubject, memoRepertoire, memoLanguage, currentMemoId, memoType } = this.state;
      const { showNotification } = this.props;
      if (!memoSubject) {
        showNotification('请先输入话题名称')
        return
      } 
      let mdVal;
      try {
        mdVal = this.mdRef.current.getValue()

      } catch (e) {
        showNotification('编辑器还未加载完毕，请稍后')
        return
      }

      if (!mdVal) {
        showNotification('请先输入话题内容')
        return
      } 
      // !memoRepertoire ||
      if (memoType === 5 && ( !memoLanguage || memoLanguage.length === 0 )) {
        showNotification('请先选择技术标签')
        return
      }
      /*
        <meta content="authenticity_token" name="csrf-param" />
        <meta content="G7peAyb1T37RvdwxnVUKmTXuL8T7FaBze5mK0j6MCKs=" name="csrf-token" />

        http://localhost:3000/attachments/download/185790/Git-2.17.1.2-32-bit.exe
        https://www.educoder.net/attachments/205112.js?attachment_id=1
      */
      // collect attachments
      const $ = window.$;
      const attachmentsMap = {};
      const attachmentIds = this.state.fileList.map(item => {
        return item.response ? item.response.id : item.id
      })
      // $('#attachments_fields .attachment').each(( index, item ) => {
      //   const filename = $(item).find('.upload_filename').val();
      //   // $($('#attachments_fields .attachment')[0]).find('input:nth-child(6)').val()
      //   const token = $(item).find('input:nth-child(7)').val()
      //   const attachment_id = parseInt($(item).children().last().val())
      //   attachmentsMap[index] = {
      //     filename,
      //     token,
      //     attachment_id
      //   }  
      //   attachmentIds.push(attachment_id)
      // })
      

      if (currentMemoId) {
        this.updateMemo(attachmentIds)
      } else {
        this.newMemo(attachmentIds)  
      }
    }
    onCancel() {
      const { currentMemoId, memoType } = this.state;
      if (currentMemoId) {  // 编辑
        this.props.history.push(`/forums/${currentMemoId}`)
      } else {    // 新建
        this.props.history.push(`/forums`) 
      }
      // debugger;this.props.history.goBack()
    }
    updateMemo(attachmentsMap) {
      const { memoSubject, memoRepertoire, memoLanguage, memoType, currentMemoId, content } = this.state;
      const mdVal = this.mdRef.current.getValue()
      console.log('isContentEdit: ', mdVal === content);
      const newMemoUrl = `/memos/${currentMemoId}.json`
      axios.put(newMemoUrl, {
          content_changed: this.contentChanged,
          tags: memoLanguage,
          // memo:{
            subject: memoSubject ,
            content: mdVal,
            forum_id: memoType,
            repertoire_name: memoRepertoire,
            // language: memoLanguage.join(languageSeparator),
            // 
          // },
          attachment_ids: attachmentsMap
        }, {
        // withCredentials: true,
      })
      .then((response) => {
        const { status, message, memo_id } = response.data;
        if (status === 0) {
          window.$("html,body").animate({"scrollTop":0})
          this.props.history.push(`/forums/${currentMemoId}`)
        } else {
          this.props.showNotification(message)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    newMemo(attachmentsMap) {
      const { memoSubject, memoRepertoire, memoLanguage, memoType } = this.state;
      const mdVal = this.mdRef.current.getValue()
      
      const newMemoUrl = `/memos.json`
      axios.post(newMemoUrl, {
          tags: memoLanguage,
          // memo:{
            subject: memoSubject ,
            content: mdVal,
            forum_id: memoType,
            // repertoire_name: memoRepertoire,
            
          // },
          attachment_ids: attachmentsMap
        }, {
        // withCredentials: true,
      })
      .then((response) => {
        const { status, message, memo_id } = response.data;
        if (status === 0) {
          window.$("html,body").animate({"scrollTop":0})
          this.props.history.push(`/forums/${memo_id}`)
        } else {
          this.props.showNotification(message)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    componentDidMount() {
      const newMemoUrl = `/memos/new.json`
      axios.get(newMemoUrl,{
          // withCredentials: true,
      })
      .then((response) => {
        const data = response.data;
        const repertoires = [];
        const repertoiresTagMap = {}
        if ( data.tag_list ) {
					document.title = "交流问答";
          // data.tag_list.forEach((item, index)=>{
          //   const tagArray = [];
          //   item.tag.forEach( (tag, index) => {
          //     tagArray.push(tag.name)
          //   })
          //   repertoires.push(item.rep.repertoire.name) 
          //   repertoiresTagMap[item.rep.repertoire.name] = tagArray
          // })
          this.setState({
            tag_list: data.tag_list
            // repertoires,
            // repertoiresTagMap
          })

          // const user = response.data.current_user;
          // user.tidding_count = response.data.tidding_count;
          // this.props.initCommonState(user)

          // 初始化 csrf meta
          const $ = window.$
          $('head').append( $('<meta content="authenticity_token" name="csrf-param" />') )
          $('head').append( $(`<meta content="${response.data.csrf_token}" name="csrf-token" />`) )
        }
        if(data.forums){
					this.setState({
						forums: data.forums===undefined||data.forums===null||data.forums.length===0? this.state.forums:data.forums
						// repertoires,
						// repertoiresTagMap
					})
				}
      }).catch((error) => {
        console.log(error)
      })

      // 如果是编辑
      const { match } = this.props
      const memoId = match.params.memoId;
      if (memoId) {
        const memoUrl = `/memos/${match.params.memoId}/edit.json`;
        axios.get(memoUrl,{
              // withCredentials: true,
          })
          .then((response) => {
            const tag_list = response.data.tag_list
            if (tag_list) {
              // this.setState({...response.data})

							document.title = response.data.subject;
              const { content, forum_id, id, repertoire_name, subject, 
                current_user, tag_list, attachments_url, memo_tags, attachments } = response.data;
              this.initMD(content);
              // this.onRepertoiresChange(repertoire_name)
              // tag -> memo_tags
              const tag = memo_tags;
              let memoLanguage = []
              if (tag) {
                memoLanguage = tag.map((item, index) => {
                  return item.id + ""
                })
              }
              const fileList = attachments.map(item => {
                return {
                  id: item.id,
                  uid: item.id,
                  name: appendFileSizeToUploadFile(item),
                  url: item.url,
                  filesize: item.filesize,
                  status: 'done'
                }
              })
              this.setState({
                fileList,
                currentMemoId: memoId,
                memoSubject: subject,
                memoType: forum_id,
                memoRepertoire: repertoire_name,
                memoLanguage,
                attachments_url,
                content

                // repertoires: [],
                // currentSelectRepertoiresIndex: -1,
              }, ()=> {
                // 解决有时候编辑时内容不显示的问题
                setTimeout(() => {
                  this.mdRef.current && this.mdRef.current.setValue(content || '')
                }, 2000)

                $('.upload_filename').each((index, item) => {
                  var width = window._textWidth($(item), '14px');
                  console.log(width)
                  $(item).css('width', width + 20)
                })
                
              })
              // 加载完后滚动条滚动
              window.$("html,body").animate({"scrollTop":0})

              this.props.initForumState({
                // current_user,
                tag_list
              })
            }

          }).catch((error) => {
            console.log(error)
          })
      } else {
        this.initMD();
      }
      


      
    }
    initMD(initValue) {
      return;

      this.contentChanged = false;
      const placeholder = "";
      // amp;
      // 编辑时要传memoId
      // const imageUrl = `/upload_with_markdown?container_id=&container_type=Memo`;
      const imageUrl = `${getUploadActionUrl()}`;
      
      // 创建editorMd
      
      const taskpass_editormd = create_editorMD("memoMD", '100%', 400, placeholder, imageUrl, () => {
        setTimeout(()=>{
          taskpass_editormd.resize()
          taskpass_editormd.cm && taskpass_editormd.cm.refresh()
        }, 500)

        if (initValue) {
          taskpass_editormd.setValue(initValue)  
        }
        taskpass_editormd.cm.on("change", (_cm, changeObj) =>{
          console.log('....contentChanged')
          this.contentChanged = true;
        })
      });
      this.taskpass_editormd = taskpass_editormd;
      window.taskpass_editormd = taskpass_editormd;
      
    }

    renderOptions(array) {
      const elementArray = [];
      array.forEach(( item, index ) => {
        elementArray.push(
            <Option key={index} value={item}>{item}</Option>
          )
      })
      return elementArray
    }
    onRepertoiresChange(value) {
      
      const index = this.state.repertoires.indexOf(value)

      this.setState({
        currentSelectRepertoiresIndex: index,
        memoRepertoire: value,
        memoLanguage: ''
      });
    };

    renderTag() {
      const { tag_list } = this.state;
      if (!tag_list || tag_list.length === 0) {
        return ''
      }
      const result = []

      tag_list.forEach((item, index) => {
        result.push(<Option value={item.id+''} key={index} >{item.name}</Option>)
      })

      return result;
    }

    onTagChange(value) {
      if (value && value.length > 3) {
        this.props.showNotification(`最多选择3个技术标签`)

        return;
      }
      this.setState({
        memoLanguage: value
      })
    }
    
    onTypeChange(value) {

      this.setState({
        memoType: typeNameMap[value]
      })
    }
    onMemoNameChange(e) {
      this.setState({
        memoSubject: e.target.value
      })
    }
    renderAttachment() {
      const { attachments_url } = this.state;
      const attachments = []
      attachments_url.forEach((item, index) => {
        const ar = item.url.split('/')
        const fileName = ar[ar.length - 1]
        /*
          <p className="clearfix" key={index} >
            <a href={item.url} className="color-green clearfix notefileDownload">
              <span className="fl">{fileName}</span><i className="iconfont icon-xiazai color-green ml5 fl"></i>
            </a>
          </p>
        */ 
        // ?attachment_id=2
        /*
        <span id="attachments_fields" className="attachments_fields" xmlns="http://www.w3.org/1999/html">
          </span>

        */
        attachments.push(
            <React.Fragment>
              <span id={`attachments_10${index}`} className="attachment">
                <label className="panel-form-label fl">&nbsp;</label>
                <i className="iconfont icon-fujian ml20mr20Color" aria-hidden="true"></i>
                <input type="text" className="upload_filename readonly hidden" name="attachments[2][filename]" readonly="readonly"
                   style={{border:'none',whiteSpace: 'nowrap', textOverflow:'ellipsis',fontFamily: 'Consolas'
                    , color: '#676767', marginLeft: '20px', verticalAlign: 'middle'}}
                   size="8" value={item.filename}></input>
                <font className="mr20 ml20mr20Color" style={{marginLeft:'10px', verticalAlign: 'middle'}}>{window.conver_size(item.id)}</font>
                <a href={`/attachments/${item.id}.js?attachment_id=10${index}`} className="remove-upload" 
                  style={{verticalAlign: 'top', display: 'inlineBlock'}} data-remote="true" 
                  data-method="delete">
                  <i className="iconfont ml20mr20Color">&#xe61c;</i>
                </a>
                <div className="div_attachments" name="div_attachments_xx"></div>
                {/**/}<input type="hidden" name="attachments[xx][token]" 
                      value="185811.24305bb2c4912f715629aa3615cdbabc"></input>
                <input type="hidden" name="attachments[xx][attachment_id]" value={item.id}></input>
              </span>
              <div className="cl"></div>
            </React.Fragment>

          )
      })
      return attachments;
    }
    handleChange = (info) => {
      if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
        let fileList = info.fileList;
        this.setState({ 
          fileList: appendFileSizeToUploadFileAll(fileList)
        });
      }
    }
    onAttachmentRemove = (file) => {
			if(!file.percent || file.percent == 100){
				this.props.confirm({
					// title: '确定要删除这个附件吗?',
					content: '是否确认删除?',

					okText: '确定',
					cancelText: '取消',
					// content: 'Some descriptions',
					onOk: () => {
						this.deleteAttachment(file)
					},
					onCancel() {
						console.log('Cancel');
					},
				});
				return false;
			}

    }
    deleteAttachment = (file) => {
      // 初次上传不能直接取uid
      const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
      axios.delete(url, {
      })
        .then((response) => {
          if (response.data) {
            const { status } = response.data;
            if (status == 0) {
              console.log('--- success')
              
              this.setState((state) => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  	render() {
  		const { match, history,forums } = this.props
      const { 
        // repertoires,  repertoiresTagMap, currentSelectRepertoiresIndex, memoRepertoire,
        tag_list,
        memoSubject, memoType,
        memoLanguage, attachments_url, fileList } = this.state;
      const memoId = match.params.memoId;

      const uploadProps = {
        width: 600,
        fileList,
        multiple: true,
        // https://github.com/ant-design/ant-design/issues/15505
        // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
        // showUploadList: false,
        action: `${getUploadActionUrl()}`,
        onChange: this.handleChange,
        onRemove: this.onAttachmentRemove,
        beforeUpload: (file) => {
          console.log('beforeUpload', file.name);
          const isLt150M = file.size / 1024 / 1024 < 150;
          if (!isLt150M) {
            this.props.showNotification('文件大小必须小于150MB!');
          }
          return isLt150M;
        },
      };
	    return (
    		<div >
          <p className="clearfix mb10 undefined cBreadcrumb"><a className="btn colorgrey fl hovercolorblue"
                                                                href="/forums">交流问答</a><span
            className="color-grey-9 fl ml3 mr3"> / </span><span>详情</span></p>
          <div className="pt20 pl20 pr20 pb20 bor-bottom-greyE clearfix" style={{background: '#fff'}}>
            <span className="fl font-16">{ memoId ? '编辑话题' : '发布话题'}</span>
            {/*<a href="/shixuns/mf98sgi3/settings" className="ring-green mt7 fr" id="edit_setting" 
              data-remote="true" data-tip-down="编辑"><img src="/images/educoder/icon/edit.svg" className="fl ml2 mt3">
            </a>*/}
          </div>

	        <div className="edu-back-white mb10 clearfix" id="memoSubject">
            <div className="padding30-20">
              <p className="color-grey-6 font-16 mb30">话题名称</p>
              <div className="df">
                <span className="mr30 color-orange pt10">*</span>
                <div className="flex1 mr20">
                  <input type="text" className="input-100-45 greyInput" maxlength="50" 
                      value={memoSubject} onChange={(val)=>this.onMemoNameChange(val)} placeholder="">
                  </input>
                </div>
                <div style={{width: '57px'}}>
                  <span className="color-orange mt8 fl none" >
                    <i className="fa fa-exclamation-circle mr3"></i>必填项
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="edu-back-white mb10 clearfix">
            <div className="padding30-20">
              <p className="color-grey-6 font-16 mb30">内容</p>
              <div className="df">
                <span className="mr30 color-orange pt10">*</span>
                <div className="flex1 mr20">
                  <TPMMDEditor ref={this.mdRef} placeholder={''} watch={false}
                    mdID={'memoMD'} initValue={this.state.content} className="memoMD">
                  </TPMMDEditor>
                  {/* <div className="flex1 break_word show_content_grey new_li" id="memoMD">
                    <textarea style={{'display':'none'}}></textarea>
                  </div> */}
                  <p id="e_tip_memoNew" className="edu-txt-right color-grey-cd font-12"></p>
                  <p id="e_tips_memoNew" className="edu-txt-right color-grey-cd font-12"></p>
                </div>
                <div style={{width: '57px'}}>
                  <span className="color-orange mt8 fl none" >
                    <i className="fa fa-exclamation-circle mr3"></i>必填项
                  </span>
                </div>
              </div>

              
                
              {/* <form className="newForm">
              <span id={`attachments_fields`} className="attachments_fields" 
                xmlns="http://www.w3.org/1999/html">
                { attachments_url && !!attachments_url.length && 
                  this.renderAttachment()
                }
              </span> 
              <span className="add_attachment">
                <input className="file_selector" data-are-you-sure="您确定要删除吗？" 
                  data-delete-all-files="您确定要删除所有文件吗" data-description-placeholder="可选的描述" 
                  data-field-is-public="公开" data-file-count="个文件已上传" 
                  data-lebel-file-uploding="个文件正在上传" data-max-concurrent-uploads="2" 
                  data-max-file-size-message="该文件无法上传。超过文件大小限制 (50 MB)，建议上传到百度云等其他共享工具里，然后在txt文档里给出链接以及共享密码并上传" 
                  data-max-file-size="52428800" data-upload-path="/uploads.js" id="_file" 
                  multiple="multiple" name="attachments[dummy][file]" 
                  onChange={()=>{debugger;window.addInputFiles( window.$('.file_selector')[0] ) }} 
                  style={{'display':'none'}} type="file">
                </input>
              </span> 
              </form>*/}

              <style>{`
                .memo_upload.upload_1  {
                  margin-left: 36px;
                }
                .memo_upload.upload_1 .ant-upload-list {
                  margin-left: 30px;
                }
                .memo_upload.upload_1 .ant-upload-list-item-info .anticon-paper-clip {
                  top: 4px;
                }
              `}</style>
              {/*<Upload {...this.uploaderProps} ref="inner"><a>开始上传</a></Upload>*/}
              <Upload {...uploadProps} className="upload_1 memo_upload" >
                <Button className="uploadBtn">
                  <Icon type="upload" /> 上传附件
                </Button>
                (单个文件150M以内)
              </Upload>

            {/* 请求status 422 */}
            
                    {/* <Icon type="upload" ></Icon> */}
              {/* <div className="df uploadBtn">
                <a href="javascript:void(0);" className="fl" onClick={()=>window.$('#_file').click()} 
                    data-tip-down="请选择文件上传">
                  <i className="fa fa-upload mr5 color-blue"></i>
                  <span className="color-blue">  上传附件
                  </span><span style={{color: '#CDCDCD', fontSize: "14px"}}>(单个文件50M以内)</span>
                </a>
              </div> */}
            </div>
          </div>
        {/* TODOTODO 这里重复的html代码太多，如果有其他页面有类似需求，需要封装*/}

          <div className="edu-back-white mb10 clearfix">
            <div className="padding30-20">
              <p className="color-grey-6 font-16 mb30">话题类型</p>
              <div className="df">
                <span className="mr30 color-orange pt10">*</span>
                <div className="flex1 mr20">
                  <Select className="ecSelect" value={typeNameMap2[memoType]}
                    onChange={(val)=>this.onTypeChange(val)}>
                    <Option value="技术分享">技术分享</Option>
                    <Option value="操作指南">操作指南</Option>
										<Option value="通知公告">通知公告</Option>
                  </Select>
                </div>
                <div style={{width: '57px'}}>
                  <span className="color-orange mt8 fl none" >
                    <i className="fa fa-exclamation-circle mr3"></i>必填项
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* memoType === typeNameMap['技术分享'] && 
          <div className="edu-back-white mb10 clearfix">
            <div className="padding30-20">
              <p className="color-grey-6 font-16 mb30">技术标签</p>
              <div className="df">
                <span className="mr30 color-orange pt10">*</span>
                <div className="mr20">
                  <Select className="ecSelect" placeholder="请选择大标签" onChange={(e) => this.onRepertoiresChange(e)}
                    value={memoRepertoire}
                  >
                    {this.renderOptions(repertoires)}
                  </Select>
                </div>
                <div className="flex1 mr20">
                  <Select className="ecSelect" placeholder="请选择小标签" 
                    onChange={(e) => this.onTagChange(e)} value={memoLanguage}
                    dropdownStyle={{'maxHeight': '300px', 'overflow': 'auto'}} >
                    { currentSelectRepertoiresIndex >= 0 
                        && this.renderOptions(repertoiresTagMap[repertoires[currentSelectRepertoiresIndex]])}
                    
                  </Select>
                </div>

                <div style={{width: '57px'}}>
                  <span className="color-orange mt8 fl none" >
                    <i className="fa fa-exclamation-circle mr3"></i>必填项
                  </span>
                </div>
              </div>
            </div>
          </div> */}

          { memoType === typeNameMap['技术分享'] && 
          <div className="edu-back-white mb10 clearfix">
            <div className="padding30-20">
              <p className="color-grey-6 font-16 mb30">技术标签</p>
              <div className="df">
                <span className="mr30 color-orange pt10">*</span>

                <div className="flex1 mr20">
                  <Select 
                    className="ecSelect" 
                    value={memoLanguage}
                    placeholder="请选择技术标签" 
                    onChange={(e) => this.onTagChange(e)} 
                    dropdownStyle={{'maxHeight': '300px', 'overflow': 'auto'}}
                    mode="multiple"
                    filterOption={(inputValue, option) => { return option.props.children.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) != -1 } }
                    tokenSeparators={[';']} >
                    {this.renderTag()}
                  </Select>
                </div>

                <div style={{width: '57px'}}>
                  <span className="color-orange mt8 fl none" >
                    <i className="fa fa-exclamation-circle mr3"></i>必填项
                  </span>
                </div>
              </div>
            </div>
          </div> }

          <div className="clearfix mt30">
            <a href="javascript:void(0)" className="defalutSubmitbtn fl mr20" 
                onClick={()=>{this.onCommit()}}>提交</a>
            <a onClick={()=>{ this.onCancel() }} className="defalutCancelbtn fl">取消</a>
          </div>

	      </div>
	    );
  	}
}

export default MemoNew;
