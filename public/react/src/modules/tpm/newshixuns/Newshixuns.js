import React, {Component} from 'react';

import {TPMIndexHOC} from '../TPMIndexHOC';

import {SnackbarHOC} from 'educoder';

import {Select, Radio, Input, Modal, Button, Form, Tooltip, Upload, Icon, notification} from 'antd';

import axios from 'axios';

import {getUploadActionUrl} from 'educoder';

import './css/Newshixuns.css';

import TPMMDEditor from "../challengesnew/TPMMDEditor";

import Bottomsubmit from "../../modals/Bottomsubmit";

const Option = Select.Option;

class Newshixuns extends Component {
  constructor(props) {
    super(props)
    this.contentMdRef = React.createRef();
    this.state = {
      shixunName: undefined,
      NAME_COUNT: 60,
      is_jupyter: "1",
      newshixunlist: undefined,
      language: undefined,
      runtime: undefined,
      run_method: undefined,
      postapplyvisible: undefined,
      fileList: [],
      Radiovalue:"1"
    }
  }


  componentDidMount() {
    this.props.form.setFieldsValue({
      is_jupyter: `1`,
    });

    let newshixunUrl = `/shixuns/new.json`;
    axios.get(newshixunUrl).then((response) => {
      if (response.status === 200) {
        if (response.data.message === undefined) {
          this.setState({
            newshixunlist: response.data
          });
          // this.contentMdRef.current.setValue(!response.data.sample[0][1] ? "" : response.data.sample[0][1]);
        }
      }
    }).catch((error) => {
      console.log(error)
    });

    let departmentsUrl = `/shixuns/departments.json`;
    axios.get(departmentsUrl).then((response) => {
      if (response.status === 200) {
        if (response.data.message === undefined) {
          this.setState({
            departmentslist: response.data.shools_name
          });
        }
      }
    }).catch((error) => {
      console.log(error)
    });


  }

  shixunNameInput = (e) => {
    this.setState({
      shixunName: e.target.value
    })

    this.props.form.setFieldsValue({
      name: e.target.value,
    });
  }

  RadiovalueonChange = (e) => {
    this.setState({
      Radiovalue: e.target.value,
    });
    this.props.form.setFieldsValue({
      is_jupyter: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({
      loading: true
    })
    const mdContnet = this.contentMdRef.current.getValue().trim();
    this.props.form.validateFieldsAndScroll((err, values) => {
      debugger
      if (!err) {
        console.log('Received values of form: ', values);

        let Url = `/shixuns.json`;
        axios.post(Url, {
            description: mdContnet,
            main_type: values.main_type,
            sub_type: values.sub_type,
            shixun: {
              name: values.name,
              trainee: values.select,
              is_jupyter: values.is_jupyter === "2" ? true : false,
            }
          }
        ).then((response) => {
          if (response.status === 200) {
            window.location.href = "/shixuns/" + response.data.shixun_identifier + "/challenges";
            // window.open("/shixuns/"+response.data.shixun_identifier+"/challenges");
          } else {
            this.setState({
              loading: false
            })
          }
        }).catch((error) => {
          this.setState({
            loading: false
          })
        })
      }else{
        this.setState({
          loading: false
        })
      }
    });
  };
  Selectthestudent = (value) => {
    this.props.form.setFieldsValue({
      select: value,
    });
  }

  main_type = (value, e) => {
    this.props.form.setFieldsValue({
      main_type: value,
    });
    this.setState({
      mainvalues: e.props.name
    })
  }

  sub_type = (value, e) => {
    this.props.form.setFieldsValue({
      sub_type: value,
    });
    let newlist = ""
    e.map((item, key) => {
      if (item.props.name != "") {
        newlist = newlist + `${item.props.name}`
      }
    })
    this.setState({
      subvalues: newlist
    })
  }

  post_apply = () => {
    this.setState({
      postapplyvisible: true
    })
  }


  sendhideModaly = () => {
    this.setState({
      postapplyvisible: false,
    })
    if (this.state.file !== undefined) {
      // this.deleteAttachment(this.state.file);
      this.setState({
        file: undefined,
        deleteisnot: true,
        language: "",
        runtime: "",
        run_method: "",
        fileList: []
      })
    } else {
      this.setState({
        file: undefined,
        deleteisnot: true,
        language: "",
        runtime: "",
        run_method: "",
        fileList: []
      })
    }
  }


  sendsure_apply = () => {
    let {language, runtime, run_method} = this.state;

    if (!language || language === "") {
      // this.props.showNotification(`请填写该镜像是基于什么语言`);
      this.setState({
        languagewritetype: true
      })
      return
    }
    if (!runtime || runtime === "") {
      // this.props.showNotification(`请填写该镜像是基于什么语言系统环境`);
      this.setState({
        systemenvironmenttype: true
      })
      return;

    }
    if (!run_method || run_method === "") {
      // this.props.showNotification(`请填写该镜像中测试代码运行方式`);
      this.setState({
        testcoderunmodetype: true
      })
      return;
    }

    var attachment_ids = undefined;
    if (this.state.fileList) {
      attachment_ids = this.state.fileList.map(item => {
        return item.response ? item.response.id : item.id
      })
    }

    if (attachment_ids === undefined || attachment_ids.length === 0) {
      this.setState({
        attachmentidstype: true
      })
      return;
    }

    var data = {
      language: language,
      runtime: runtime,
      run_method: run_method,
      attachment_id: attachment_ids[0],
    }
    var url = `/shixuns/apply_shixun_mirror.json`;
    axios.post(url, data
    ).then((response) => {

      try {
        if (response.data) {

          if (this.state.file !== undefined) {
            this.setState({
              file: undefined,
              deleteisnot: true,
              language: "",
              runtime: "",
              run_method: "",
              fileList: []
            })
          } else {
            this.setState({
              file: undefined,
              deleteisnot: true,
              language: "",
              runtime: "",
              run_method: "",
              fileList: []
            })
          }

          notification.open(
            {
              message: '提示',
              description:
                '新建申请已提交，请等待管理员审核。',

            }
          )
          this.sendhideModaly()

        }
      } catch (e) {

      }

    })

  }

  setlanguage = (e) => {
    this.setState({
      language: e.target.value
    })
    if (e.target.value) {
      this.setState({
        languagewritetype: false
      })
    }
  }
  setruntime = (e) => {
    this.setState({
      runtime: e.target.value
    })
    if (e.target.value) {
      this.setState({
        systemenvironmenttype: false
      })
    }

  }

  setrun_method = (e) => {
    this.setState({
      run_method: e.target.value
    })
    if (e.target.value) {
      this.setState({
        testcoderunmodetype: false
      })
    }
  }


  // 附件相关 START
  handleChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let {fileList} = this.state;

      if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
        console.log("handleChange1");
        // if(fileList.length===0){
        let fileLists = info.fileList;
        this.setState({
          // fileList:appendFileSizeToUploadFileAll(fileList),
          fileList: fileLists,
          deleteisnot: false
        });
        // }
      }
    }
  }

  onAttachmentRemove = (file) => {
    if (!file.percent || file.percent == 100) {
      Modal.confirm({
        title: '确定要删除这个附件吗?',
        okText: '确定',
        cancelText: '取消',
        // content: 'Some descriptions',
        onOk: () => {
          console.log("665")
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
    console.log(file);
    let id = file.response == undefined ? file.id : file.response.id
    const url = `/attachments/${id}.json`
    axios.delete(url, {})
      .then((response) => {
        if (response.data) {
          const {status} = response.data;
          if (status == 0) {
            // console.log('--- success')

            this.setState((state) => {

              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
                deleteisnot: true
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
    const {getFieldDecorator} = this.props.form;
    const {newshixunlist, fileList, postapplytitle, postapplyvisible} = this.state;
    const uploadProps = {
      width: 600,
      fileList,
      multiple: true,
      action: `${getUploadActionUrl()}`,
      onChange: this.handleChange,
      onRemove: this.onAttachmentRemove,
      beforeUpload: (file, fileList) => {

        if (this.state.fileList.length >= 1) {
          return false
        }

        const isLt150M = file.size / 1024 / 1024 < 50;
        if (!isLt150M) {

          notification.open(
            {
              message: '提示',
              description:
                '文件大小必须小于50MB',

            }
          )
        }
        if (this.state.file !== undefined) {
          this.setState({
            file: file
          })
        } else {
          this.setState({
            file: file
          })
        }
        return isLt150M;
      },
    }

    return (
      <div className="newMain clearfix">
        <style>
          {
            `
            .ant-form-item{
             margin-bottom:5px;
            }
            `
          }
        </style>
        <div className="educontent mt20 mb60 clearfix">
          <div className="new_shixun">

            <div className="mb10 edu-back-white pd40px">

              <div className="padding10-20 bor-bottom-greyE color-grey-3 clearfix">
                <span className="fl font-18 lineh-35">新建实训项目</span>
                {this.props.user && this.props.user.main_site === true ?
                  <a className="fr font-16 mt3 color-blue" href="/forums/2943"
                     target="_blank">实训制作指南</a> : ""}
              </div>
              <div className="padding10-20  color-grey-3 clearfix">
                <Form>
              <Form.Item label="实训类型">
                    {getFieldDecorator('is_jupyter')(
                      <Radio.Group onChange={this.RadiovalueonChange} value={this.state.Radiovalue}>
                        <Radio value="1">普通实训</Radio>
                        <Radio value="2" >Jupyter实训</Radio>
                      </Radio.Group>,
                    )}
                  </Form.Item>
                  <Form.Item
                    label="名称"
                    className="mt15"
                  >
                    {getFieldDecorator('name', {
                      rules: [{
                        required: true, message: '请输入名称',
                      }, {
                        max: 60, message: '请输入名称，最大限制60个字符',
                      }, {
                        whitespace: true, message: '请勿输入空格'
                      }],
                    })(
                      <Input placeholder="请输入名称，最大限制60个字符"
                             className={"input-100-45 greyInput"}
                             onInput={this.shixunNameInput} autoComplete="off"
                             addonAfter={`${String(!this.state.shixunName ? 0 : this.state.shixunName.length)}/${this.state.NAME_COUNT}`}
                             className="newViewAfter"/>
                    )}
                  </Form.Item>

                  <Form.Item
                    label="简介"
                    style={{"borderBottom": 'none'}}
                    className="chooseDes pr"
                  >
                    <TPMMDEditor ref={this.contentMdRef} placeholder="请输入简介" mdID={'courseContentMD'}
                                 refreshTimeout={1500}
                                 className="courseMessageMD"
                      // initValue={this.state.description === null ? "" : this.state.description}
                    ></TPMMDEditor>
                  </Form.Item>

                  <Form.Item
                    label={"难易度"}
                    style={{"borderBottom": 'none'}}
                    className="chooseDes pr"
                  >
                    {getFieldDecorator('select', {
                      rules: [{required: true, message: '请选择难易度'}],
                    })(
                      <div className="with15 fl pr">
                        <Select placeholder="请选择难易度"
                                style={{width: 180}}
                                onChange={this.Selectthestudent}
                        >
                          <Option value={1}>初级</Option>
                          <Option value={2}>中级</Option>
                          <Option value={3}>中高级</Option>
                          <Option value={4}>高级</Option>
                        </Select>

                      </div>
                    )}
                    <span className="fl ml20 color-grey">（实训的难易程度）</span>
                  </Form.Item>


                  <Form.Item
                    label={"实验环境"}
                    style={{"borderBottom": 'none', 'width': '18%', 'float': 'left'}}
                    className="chooseDes pr"
                  >
                    <div>

                      {getFieldDecorator('main_type', {
                        rules: [{required: true, message: '请选择主类别'}],
                      })(
                        <div className="width100 fl mr20">

                          <Select placeholder="请选择主类别"
                                  style={{width: 180}}
                                  onChange={this.main_type}
                                  defaultOpen={false}
                          >
                            {
                              newshixunlist === undefined ? "" :  this.state.Radiovalue==="2"?newshixunlist.main_type.map((item, key) => {
                                let itemtype=item.type_name.toLowerCase().indexOf('jupyter'.toLowerCase())
                                if(itemtype>-1){
                                  return (
                                    <Option value={item.id} key={key} name={item.description}>
                                      <Tooltip placement="right"
                                               title={item.description === "" ? "无描述" : item.description}>
                                        {item.type_name}
                                      </Tooltip>
                                    </Option>
                                  )
                                }

                              }):""
                            }
                            {
                              newshixunlist === undefined ? "" : this.state.Radiovalue==="1"?newshixunlist.main_type.map((item, key) => {
                                let itemtype=item.type_name.toLowerCase().indexOf('jupyter'.toLowerCase())
                                if(itemtype===-1){
                                  return (
                                    <Option value={item.id} key={key} name={item.description}>
                                      <Tooltip placement="right"
                                               title={item.description === "" ? "无描述" : item.description}>
                                        {item.type_name}
                                      </Tooltip>
                                    </Option>
                                  )
                                }

                              }):""
                            }
                          </Select>

                        </div>
                      )}
                    </div>
                  </Form.Item>

                  <style>
                    {
                      `
                      .Selectlittle .ant-select-selection__rendered{
                        line-height:25px;
                      }
                      `
                    }
                  </style>
                  <Form.Item
                    style={{"borderBottom": 'none', 'width': '82%', 'float': 'left', 'marginTop': '40px'}}
                    className="chooseDes pr"
                  >
                    <div className=" fl pr mr20">
                      {getFieldDecorator('sub_type')(
                        <div className=" fl pr mr20">
                          <Select placeholder="请选择小类别"
                                  mode="multiple"
                                  style={{width: 280}}
                                  onChange={this.sub_type}
                                  defaultOpen={false}
                                  className={"Selectlittle"}
                          >
                            {
                              newshixunlist === undefined ? "" : newshixunlist.small_type.map((item, key) => {
                                return (
                                  <Option value={item.id} key={key} name={item.description}>
                                    <Tooltip placement="right"
                                             title={item.description === "" ? "无描述" : item.description}>
                                      {item.type_name}
                                    </Tooltip>
                                  </Option>
                                )
                              })
                            }
                          </Select>
                        </div>
                      )}
                      <span className="fl ml20 color-grey lineh-20">
                              <div>
                                {this.state.mainvalues === undefined && this.state.subvalues === undefined || this.state.mainvalues === "" && this.state.subvalues === "" ? "" :
                                  <div className={"font-12"} style={{'max-width': '600px'}}>
                                    {`${this.state.mainvalues === undefined || this.state.mainvalues === "" ? "" : this.state.mainvalues}`}
                                    {`${this.state.subvalues === undefined || this.state.subvalues === "" ? "" : this.state.mainvalues === undefined || this.state.mainvalues === "" ?  this.state.subvalues : this.state.subvalues}`}
                                    {`${this.state.mainvalues === undefined || this.state.mainvalues === "" ? "" :   this.state.mainvalues}${this.state.subvalues === undefined || this.state.subvalues === "" ? "" :
                                      this.state.mainvalues === undefined || this.state.mainvalues === "" ?  this.state.subvalues : this.state.subvalues}`}
                                  </div>}

                              </div>
                        </span>
                    </div>
                  </Form.Item>


                </Form>
                <div className={"both"}></div>
                <div className=" color-grey lineh-20">
                  没有实验环境？
                  <a className="color-blue" onClick={this.post_apply}> 申请新建</a>
                </div>
                {postapplyvisible === true ? <style>
                  {
                    `
                   body{
                    overflow: hidden !important;
                    }
                    `
                  }
                </style> : ""}

                <Modal
                  keyboard={false}
                  title="申请新建"
                  visible={postapplyvisible}
                  closable={false}
                  footer={null}
                  width={850}
                  heigth={720}
                >
                  <div>
                    <li className="clearfix ml82">
                      <label className="fl mt10 "><span
                        className="color-red fl mt3">*</span>语言：&nbsp;&nbsp;</label>
                      <textarea
                        className={this.state.languagewritetype === true ? "fl task-form-80 task-height-150 bor-reds" : "fl task-form-80 task-height-150"}
                        style={{width: '89%', height: '100px'}}
                        onInput={this.setlanguage}
                        value={this.state.language}
                        placeholder="请填写该镜像是基于什么语言：示例：Python"
                        id="demand_info"></textarea>
                    </li>
                    <div
                      className={"color-red shixunspanred"}>{this.state.languagewritetype === true ? "请填写该镜像语言" : ""}</div>
                    <li className="clearfix ml1">
                      <label className="panel-form-label fl ml50"><span
                        className="color-red fl mt3">*</span>系统环境：&nbsp;&nbsp;</label>
                      <textarea
                        className={this.state.systemenvironmenttype === true ? "fl task-form-80 task-height-150 bor-reds" : "fl task-form-80 task-height-150"}
                        onInput={this.setruntime}
                        style={{height: '100px'}}
                        value={this.state.runtime}
                        placeholder="请填写该镜像是基于什么linux系统环境,代码运行环境"
                        id="demand_info"></textarea>
                    </li>
                    <div
                      className={"color-red shixunspanred"}>{this.state.systemenvironmenttype === true ? "请填写该镜像语言系统环境" : ""}</div>
                    <li className="clearfix">
                      <label className="fl mt10"><span
                        className="color-red fl mt3">*</span>测试代码运行方式：&nbsp;&nbsp;</label>

                      <textarea
                        className={this.state.testcoderunmodetype === true ? "fl task-form-80 task-height-150 bor-reds" : "fl task-form-80 task-height-150"}
                        onInput={this.setrun_method}
                        value={this.state.run_method}
                        style={{height: '100px'}}
                        placeholder="请填写该镜像中测试代码运行方式"
                        id="demand_info"></textarea>
                    </li>
                    <div
                      className={"color-red shixunspanred"}>{this.state.testcoderunmodetype === true ? "请填写该镜像测试代码运行方式" : ""}</div>
                    <li className="clearfix ml50">
                      <label className="panel-form-label fl mt-5"><span
                        className="color-red fl">*</span>测试代码：&nbsp;&nbsp;</label>
                      <div className="mt10" style={{
                        display: "inline-block"
                      }}>
                        <Upload {...uploadProps}>
                          <Icon type="upload" className="fl mt3"> </Icon>
                          <span className="color-blue fl cdefault">上传附件</span>
                          <span className="color-grey-c fl ml10 ">(单个文件50M以内)</span>

                        </Upload>
                      </div>

                    </li>
                    <div className={"color-red shixunspanred"}>
                      {this.state.attachmentidstype === true ? "请上传附件" : ""}
                    </div>
                    <li className="edu-txt-center clearfix ">
                      <a className="pop_close task-btn  mr30"
                         onClick={() => this.sendhideModaly()}
                      >取消</a>
                      <Button type="primary" onClick={() => this.sendsure_apply()}
                              className="task-btn task-btn-orange">确定</Button>
                    </li>
                    <div className="cl"></div>
                  </div>
                  {/*</Form>*/}
                </Modal>

              </div>

            </div>
          </div>
        </div>
        <Bottomsubmit {...this.props} {...this.state} url={"/shixuns"} onSubmits={() => this.handleSubmit()} loadings={this.state.loading}/>
      </div>

    );
  }
}

const NewshixunsNew = Form.create({name: 'newshixun'})(Newshixuns);

export default SnackbarHOC()(TPMIndexHOC(NewshixunsNew));






