import React, {Component} from 'react';

import MonacoEditor from 'react-monaco-editor';

import {
  Input,
  Select,
  Checkbox,
  Modal,
  Icon,
  Upload,
  Button,
  Tooltip,
  Form
} from 'antd';

import axios from 'axios';

import TPMMDEditor from "../challengesnew/TPMMDEditor";

import Bottomsubmit from "../../modals/Bottomsubmit";

import {getUploadActionUrl} from 'educoder';

import './css/TPMsettings.css';

import '../newshixuns/css/Newshixuns.css';

const Option = Select.Option;

class Shixuninformation extends Component {
  constructor(props) {
    super(props)
    this.contentMdRef = React.createRef();
    this.state = {
      NAME_COUNT: 60,
      shixunmemoMDvalue: "",
      testscripttiptype: false,
      shixunName: '',
      trainee: undefined,
      choice_small_type: [],
      simichecked: false,
      Executivetyoe: false,
      Executiveordervalue: "",
      Compilecommandvalue: "",
      shixun_service_configs: undefined,
      fileList:[],
      loading:false,
    }
  }

  componentDidMount() {
    let query=this.props.location.search
    const types = query.split('?edit=')
    if(types[1]==="1"){
      let anchorElement = document.getElementById("newcourseContentMD");
      if(anchorElement){
        this.scrollToAnchor("newcourseContentMD");
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data != this.props.data) {

      if (this.props.data ) {
        if (this.props.data.shixun){
          this.setState({
          shixunName: this.props.data && this.props.data.shixun.name,
          trainee: this.props.data && this.props.data.shixun.trainee,
          choice_main_type: this.props.data && this.props.data.shixun.choice_main_type,
          choice_small_type: this.props.data && this.props.data.shixun.choice_small_type,
          choice_standard_scripts: this.props.data && this.props.data.shixun.choice_standard_scripts,
          shixunmemoMDvalue: this.props.data && this.props.data.shixun.evaluate_script,
          simichecked: this.props.data && this.props.data.shixun.is_secret_repository,
          shixun_service_configs: this.props.data && this.props.data.shixun.shixun_service_configs,
          standard_scripts: this.props.data && this.props.data.shixun.standard_scripts,
          shixun_service_configlist: this.props.data && this.props.data.shixun.shixun_service_configs,
        })

        if (this.props.data && this.props.data.shixun.choice_standard_scripts === null) {
          this.setState({
            choice_standard_scripts: {id: this.props.data && this.props.data.shixun.standard_scripts[0].id, value: ""},
            choice_standard_scriptssum: this.props.data && this.props.data.shixun.standard_scripts[0].id
          })
          this.props.form.setFieldsValue({
            selectscripts: this.props.data && this.props.data.shixun.standard_scripts[0].id
          })
          this.get_mirror_script(this.props.data && this.props.data.shixun.standard_scripts[0].id)
        } else {
          this.props.form.setFieldsValue({
            selectscripts: this.props.data && this.props.data.shixun.choice_standard_scripts
          })
        }

        let newlist = ""
        this.props.data && this.props.data.shixun.choice_small_type.map((item, key) => {
          this.props.data && this.props.data.shixun.small_type.map((i, k) => {
            if (item === i.id) {
              newlist = newlist + `${i.description}`
            }
          })
        })
        this.setState({
          subvalues: newlist
        })

        this.props.data && this.props.data.shixun.main_type.map((item, key) => {
          if (item.id === this.props.data && this.props.data.shixun.choice_main_type) {
            this.setState({
              mainvalues: item.description,
            })
          }
        })

        this.props.form.setFieldsValue({
          name: this.props.data && this.props.data.shixun.name,
          trainee: this.props.data && this.props.data.shixun.trainee,
          selectleft: this.props.data && this.props.data.shixun.choice_main_type,
          selectright: this.props.data && this.props.data.shixun.choice_small_type,
        })
        this.contentMdRef.current.setValue(this.props.data && this.props.data.shixun.description);

      }
    }
    }
  }

  getshixunmemoMDvalue = (value, e) => {

    this.setState({
      shixunmemoMDvalue: value
    })
  }

  testscripttip = (val) => {
    if (val === 0) {
      this.setState({
        testscripttiptype: true
      })
    } else if (val === 1) {
      this.setState({
        testscripttiptype: false
      })
    }
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
          this.props.showNotification("提交成功")

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



  bigClass = (value,e) => {
    this.setState({
      mainvalues:e.props.name
    })
    let list = []
    list.push(this.state.choice_main_type)
    this.state.choice_small_type.map((item, key) => {
      list.push(item)
    })


    let newshixun_service_configs = this.state.shixun_service_configs;

    let newshixun_service_configsagin = [];
    newshixun_service_configs.map((item, key) => {
      list.map((its, index) => {
        if (item.mirror_repository_id === its) {
          newshixun_service_configsagin.push(item)
        }
      })
    })



    this.props.data.shixun.main_type.some((item, key) => {
        if (item.id === value) {
          newshixun_service_configsagin[0] = {
            mirror_repository_id: value,
            name: item.type_name,
            cpu_limit: 1,
            lower_cpu_limit: 0.1,
            memory_limit: 1024,
            request_limit: 10
          }
          return true
        }
      }
    )




    this.props.form.setFieldsValue({
      selectleft: value,
    })

    let url = `/shixuns/get_mirror_script.json?mirror_id=` + value;
    axios.get(url).then((response) => {
      if (response.status === 200) {
        this.setState({
          choice_standard_scripts:{id: response.data[0].id, value: ""},
          choice_standard_scriptssum:response.data[0].id
        })
        this.props.form.setFieldsValue({
          selectscripts:response.data[0].id
        })
        this.get_mirror_script(response.data[0].id)

        if(e.props.mirror_name===null){
          this.setState({
            choice_main_type: value,
            standard_scripts: response.data,
          })
        }else{
          this.setState({
            choice_main_type: value,
            standard_scripts: response.data,
            shixun_service_configs: newshixun_service_configsagin,
            shixun_service_configlist: newshixun_service_configsagin,
          })
        }


      }
    }).catch((error) => {
      console.log(error)
    });
  }
  Deselectlittle = (value,e) => {

    let {shixun_service_configs, choice_small_type} = this.state;
    let newshixun_service_configs = shixun_service_configs;
    let newchoice_small_type = choice_small_type;

    newshixun_service_configs.some((item, key) => {
        if (item.mirror_repository_id === value) {
          newshixun_service_configs.splice(key, 1)
          return true
        }
      }
    )

    newchoice_small_type.some((item, key) => {
        if (item === value) {
          newchoice_small_type.splice(key, 1)
          return true
        }
      }
    )


    this.setState({
      choice_small_type: newchoice_small_type,
      shixun_service_configs: newshixun_service_configs,
      shixun_service_configlist: newshixun_service_configs,
    })
  }

  showlittleClass=(value,e)=>{
    let newlist = ""
    e.map((item, key) => {
      if (item.props.name != "") {
        newlist = newlist + `${item.props.name}`
      }
    })
    this.setState({
      subvalues: newlist
    })

    this.props.form.setFieldsValue({
      selectright: value,
    })
  }
  littleClass = (value,e) => {

     let newshixun_service_configs = this.state.shixun_service_configs;
     let newchoice_small_type = this.state.choice_small_type;
     let list = []
     list.push(this.state.choice_main_type)
     newchoice_small_type.map((item, key) => {
       list.push(item)
     })

     let newshixun_service_configsagin = []

     newshixun_service_configs.map((item, key) => {
       list.map((its, index) => {
         if (item.mirror_repository_id === its) {
           newshixun_service_configsagin.push(item)
         }
       })
     })

     this.props.data.shixun.small_type.some((items, keys) => {
         if (items.id === value) {
           newshixun_service_configsagin.push({
             mirror_repository_id: value,
             name: items.type_name,
             cpu_limit: 1,
             lower_cpu_limit: 0.1,
             memory_limit: 1024,
             request_limit: 10
           })
           return true
         }
       }
     )

     newchoice_small_type.push(value)
      if(e.props.mirror_name===null){
       this.setState({
         choice_small_type: newchoice_small_type,
       })
     }else{
        this.setState({
          choice_small_type: newchoice_small_type,
          shixun_service_configs: newshixun_service_configsagin,
          shixun_service_configlist: newshixun_service_configsagin,
        })
      }
  }

  SelectScput = (value, e) => {
    this.setState({
      choice_standard_scriptssum: value,
      language: e.props.name,
      choice_standard_scripts: {id: e.props.value, value: ""},
      standard_scriptsModal: true
    })
  }

  hidestandard_scriptsModal = () => {
    this.setState({
      standard_scriptsModal: false,
      standard_scriptsModals: false
    })
  }

  get_mirror_script = (ids) => {
    let {choice_standard_scriptssum} = this.state;
    let id = this.props.match.params.shixunId;
    let url = `/shixuns/${id}/get_script_contents.json`;
    axios.get((url),{params:{
        script_id:ids?ids:choice_standard_scriptssum
      }}).then((response) => {
      if (response.status === 200) {
        // this.evaluate_scriptMD(response.data.content, "shixunmemoMD");
        if(ids==undefined){
          this.setState({
            standard_scriptsModal: false,
            standard_scriptsModals: true,
          })
        }
        this.setState({
          shixunmemoMDvalue: response.data.content
        })
      }

    }).catch((error) => {
      console.log(error)
    })
  }

  simionChange = (e) => {
    this.setState({
      simichecked: e.target.checked
    })
  }


  showModal = () => {
    this.setState({
      visibleTemplate: true,
    });
  }

  handleCancelTemplate = (e) => {
    this.setState({
      Executiveordervalue: "",
      Compilecommandvalue: "",
      visibleTemplate: false
    })
  }

  hideModalTemplate = (e) => {
    let id = this.props.match.params.shixunId;
    let {Executiveordervalue, Compilecommandvalue} = this.state;

    if (Executiveordervalue === "" || Executiveordervalue === undefined) {
      this.setState({
        Executivetyoe: true,
      });
      return
    }
    // Executiveordervalue=String(Executiveordervalue);
    // Compilecommandvalue=String(Compilecommandvalue);
    let trl = `/shixuns/${id}/get_custom_script.json?compile=${Executiveordervalue}&excutive=${Compilecommandvalue}`
    axios.get(trl).then((response) => {
      // this.evaluate_scriptMD(response.data.shixun_script, "shixunmemoMD");
      this.setState({
        shixunmemoMDvalue: response.data.shixun_script
      })
    }).catch((error) => {
      console.log(error)
    });
    this.setState({
      visibleTemplate: false
    })
  }

  Executiveorder = (e) => {
    this.setState({
      Executiveordervalue: e.target.value
    })
  }

  Compilecommand = (e) => {
    this.setState({
      Compilecommandvalue: e.target.value
    })
  }

  setConfigsInputs=(e,keys,str)=>{

    let {shixun_service_configs}=this.state;
    let newshixun_service_configs=shixun_service_configs;
    newshixun_service_configs.map((item,key)=>{
      if(key===keys){
        switch (str) {
          case 1:
            item.cpu_limit=e.target.value
            break;
          case 2:
            item.lower_cpu_limit=e.target.value
            break;
          case 3:
            item.memory_limit=e.target.value
            break;
          case 4:
            item.request_limit=e.target.value
            break;
        }
      }
    })

    this.setState({
      shixun_service_configs:newshixun_service_configs,
      shixun_service_configlist:newshixun_service_configs,
    })

  }
  //跳转道描点的地方
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  }
  onSubmits=()=>{
    this.setState({
      loading:true
    })
    const mdContnet = this.contentMdRef.current.getValue().trim();
    let{choice_standard_scriptssum,choice_standard_scripts}=this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let url = `/shixuns/${this.props.match.params.shixunId}.json`;
        let newshixun_service_configlist = this.state.shixun_service_configlist.map(v => {
          let v1 = Object.assign({},v);
          delete v1.name;
          return v1
        });

        let data={
          main_type:this.state.choice_main_type,
          sub_type:this.state.choice_small_type,
          is_secret_repository:this.state.simichecked,
          shixun:{
            name: values.name,
            trainee: this.state.trainee,
            is_jupyter: this.props.shixunsDetails.is_jupyter,
            mirror_script_id: this.props.shixunsDetails.is_jupyter===true?null:this.state.choice_standard_scriptssum===undefined?this.state.choice_standard_scripts:this.state.choice_standard_scriptssum,
          },
          shixun_info: {
            description: mdContnet,
            evaluate_script: this.props.shixunsDetails.is_jupyter===true?"":this.state.shixunmemoMDvalue
         },
         shixun_service_configs:newshixun_service_configlist
      }

        axios.put(url, data).then((result) => {
          if (result) {
            if (result.data) {
                  this.props.getdatas()
              if(result.data.shixun_identifier){
                this.props.showNotification("基本信息更新成功!")
                this.scrollToAnchor("head-navpre1");
                this.setState({
                  loading:false
                })
              }
            }
          }
        }).catch((error) => {
          this.setState({
            loading:false
          })
        });
      }else{
        this.setState({
          loading:false
        })
      }
    });
  }

  Selectthestudent = (value) => {
    this.setState({
      trainee: value
    })
  }
  render() {


    // console.log(operateauthority)
    const {getFieldDecorator} = this.props.form;
    const { fileList, choice_standard_scripts, postapplyvisible, shixunmemoMDvalue} = this.state;

    // console.log("1222")
    // console.log(choice_standard_scripts)

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
      beforeUpload: (file, fileList) => {

        if (this.state.fileList.length >= 1) {
          return false
        }
        // console.log('beforeUpload', file.name);
        const isLt150M = file.size / 1024 / 1024 < 50;
        if (!isLt150M) {
          // this.props.showNotification(`文件大小必须小于50MB`);
          this.props.showNotification("文件大小必须小于50MB")
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
    let operateauthority = this.props.identity === 1 ? true : this.props.identity < 5 && this.props.data&&this.props.data.shixun.status == 0 ? true : false;
    return (
      <div>
        <div className="educontent mb50 edu-back-white padding10-20">
          <Form>
            <Form.Item
              label="名称"
              style={{"borderBottom": 'none'}}
              className="mt15"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入选题名称',
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

            <span id={"newcourseContentMD"}></span>
            <Form.Item
              label="简介"
              style={{"borderBottom": 'none', 'marginBottom': '0px'}}
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
              {getFieldDecorator('trainee', {
                rules: [{required: true, message: '请选择难易度'}],
              })(
                <div className="with15 fl pr">
                  <Select placeholder="请选择难易度"
                          style={{width: 180}}
                          onChange={this.Selectthestudent}
                          value={this.state.trainee}
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

                {getFieldDecorator('selectleft', {
                  rules: [{required: true, message: '请选择主类别'}],
                })(
                  <div className="width100 fl mr20">
                    <Select placeholder="请选择主类别"
                            value={this.state.choice_main_type === "" ? undefined : this.state.choice_main_type}
                            style={{width: 180}}
                            onChange={operateauthority ? this.bigClass : ""}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                    >

                      {
                        this.props.data === undefined ? "" : this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter === true?this.props.data.shixun&&this.props.data.shixun.main_type.map((item, key) => {
                          let itemtype=item.type_name.toLowerCase().indexOf('jupyter'.toLowerCase())
                          if(itemtype>-1) {
                            return (
                              <Option value={item.id} key={key} name={item.description} mirror_name={item.mirror_name}>
                                <Tooltip placement="right" title={item.description === "" ? "无描述" : item.description}>
                                  {item.type_name}
                                </Tooltip>
                              </Option>
                            )
                          }
                        }):""
                      }

                      {
                        this.props.data === undefined ? "" : this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter === false?this.props.data.shixun&&this.props.data.shixun.main_type.map((item, key) => {
                          let itemtype=item.type_name.toLowerCase().indexOf('jupyter'.toLowerCase())
                          if(itemtype===-1) {
                            return (
                              <Option value={item.id} key={key} name={item.description}>
                                <Tooltip placement="right" title={item.description === "" ? "无描述" : item.description}>
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


            <Form.Item
              style={{"borderBottom": 'none', 'width': '81%', 'float': 'left', 'marginTop': '40px'}}
              className="chooseDes pr"
            >
              <div className=" fl pr mr20">
                {getFieldDecorator('selectright', {
                  rules: [{required: false, message: '请选择小类别'}],
                })(
                  <div className=" fl pr mr20">
                    <Select placeholder="请选择小类别"
                            mode="multiple"
                            value={!this.state.choice_small_type?undefined:this.state.choice_small_type.length === 0 || this.state.choice_small_type[0] === "" || this.state.choice_small_type === [] ? undefined : this.state.choice_small_type}
                            style={{width: 200}}
                            disabled={operateauthority ? false : true}
                            onDeselect={operateauthority ? this.Deselectlittle : ""}
                            onSelect={operateauthority ? this.littleClass : ""}
                            onChange={this.showlittleClass}
                            defaultOpen={false}
                    >
                      {
                        this.props.data === undefined ? "" : this.props.data.shixun&&this.props.data.shixun.small_type.map((item, key) => {
                          return (
                            <Option value={item.id} key={key} name={item.description} mirror_name={item.mirror_name}>
                              <Tooltip placement="right" title={item.description === "" ? "无描述" : item.description}>
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
                               {`${this.state.subvalues === undefined || this.state.subvalues === "" ? "" : this.state.mainvalues === undefined || this.state.mainvalues === "" ? this.state.subvalues : this.state.subvalues}`}
                               {`${this.state.mainvalues === undefined || this.state.mainvalues === "" ? "" :  this.state.mainvalues}${this.state.subvalues === undefined || this.state.subvalues === "" ? "" :
                                 this.state.mainvalues === undefined || this.state.mainvalues === "" ? this.state.subvalues : this.state.subvalues}`}
                             </div>}
                      </div>
                </span>
              </div>
            </Form.Item>

            <div className={"both"}></div>
            <div className=" color-grey lineh-20 mb20">
              没有实验环境？
              <a className="color-blue" onClick={this.post_apply}> 申请新建</a>
            </div>


            { this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter===true?"":<Form.Item
              label={"评测脚本"}
              style={{"borderBottom": 'none'}}
              className="chooseDes pr"
            >
              {getFieldDecorator('selectscripts', {
                rules: [{required: true, message: '请选择评测脚本'}],
              })(
                <div className="with15 fl pr">
                  <Select placeholder="请选择选择脚本"
                          style={{width: 180}}
                          className="fl"
                          disabled={operateauthority ? false : true}
                          value={choice_standard_scripts === undefined || choice_standard_scripts === null ? undefined : choice_standard_scripts.id === undefined ? choice_standard_scripts : choice_standard_scripts.id}
                          onChange={operateauthority ? this.SelectScput : ""}>
                    {
                      this.state.standard_scripts=== undefined ? "" : this.state.standard_scripts.map((item, key) => {
                        return (
                          <Option value={parseInt(item.id)} name={item.scptname} key={key}>{item.scptname}</Option>
                        )

                      })
                    }
                  </Select>
                </div>
              )}
              <span className="fl ml20 color-blue" style={{'line-height': '30px'}}>
                <span onClick={() => this.showModal()}>使用自定义脚本</span>
              <span className={"color-grey ml10"} onClick={() => this.testscripttip(0)}>
                     <Icon type="exclamation-circle"/>
              </span>
              	<div className="invite-tip clearfix none " id="test_script_tip"
                     style={{
                       top: '33px',
                       left: '-15px',
                       width: '450px',
                       zIndex: '10',
                       display: this.state.testscripttiptype === true ? 'block' : "none"
                     }}>
                  <style>
                    {
                      `
                      .top-black-trangle{
                         right: auto;
                        left: 0px;
                      }
                      `
                    }
                  </style>
										<span className="top-black-trangle"></span>
										<div className="padding20 invitecontent clearfix">
											<p className="font-12 edu-txt-left">
												使用自定义模板，平台无法自动更新脚本，请在关卡创建完后手动更新脚本中的必填参<br/>
												数和以下2个数组元素：<br/>
												challengeProgramNames<br/>
												sourceClassNames<br/><br/>
												示例：有2个关卡的实训<br/><br/>
												各关卡的待编译文件为：<br/>
												src/step1/HelloWorld.java<br/>
												src/step2/Other.java<br/><br/>
												各关卡的编译后生成的执行文件为：<br/>
												step1.HelloWorld<br/>
												step2.Other<br/><br/>
												则数组元素更新如下：<br/>
												challengeProgramNames=("src/step1/<br/>
												HelloWorld.java" "src/step2/Other.java")<br/>
												sourceClassNames=("step1.HelloWorld<br/>
												" "step2.Other")<br/><br/>
												其它参数可按实际需求定制
											</p>
										</div>
										<p className="inviteTipbtn with100 fl">
											<a onClick={() => this.testscripttip(1)}>知道了</a>
										</p>
									</div>
            </span>
            </Form.Item>}

            { this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter===true?"": <div className="mt30 clearfix df">
              <div
                className={operateauthority === false ? 'nonemodel' : ""}
              ></div>
              <div className="flex1">
                <div className="fl" style={{border: '1px solid #ccc'}}>
                  <MonacoEditor
                    height="450"
                    width="1150"
                    // language={this.state.language}
                    value={shixunmemoMDvalue}
                    options={{
                      selectOnLineNumbers: true
                    }}
                    onChange={this.getshixunmemoMDvalue}
                    // onChange={this.getshixunmemoMDvalue}
                  />
                </div>
              </div>
            </div>}
          </Form>


          { this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter===true?"": <span className="ant-form-text mt20">私密版本库：
            <Checkbox onChange={this.simionChange}
                      checked={this.state.simichecked}>
              {this.state.simichecked===false?"（若需要对学员隐藏部分版本库内容时，请选中；选中保存后表示启用私密版本库，请将需要对学员隐藏的文件存储在私密版本库）":"已创建的私密版本库及其内容，将在“保存”时被删除"}</Checkbox>
        </span>}

          {this.props.identity < 3 ? <div className="edu-back-white padding40-20 mb20">
            <p className="color-grey-6 font-16 mb30">服务配置</p>
            {this.state.shixun_service_configs && this.state.shixun_service_configs.map((item, key) => {

              return (
                <div key={key}>
                  <div id="5">
                    <div className="color-grey-6 font-16 mt30 mb20" id="shixun_scenario_type_name">
                      <span className={"fl"}>{item.name}</span>
                      {/*<span className={"fr mr40"} onClick={()=>this.Deselectlittle(item.mirror_repository_id)}><i className="fa fa-times-circle color-grey-c font-16 fl"></i></span>*/}
                    </div>
                    <div className="clearfix mb5">
                      <label className="panel-form-label fl">CPU(核)：</label>
                      <div className="pr fl with80 status_con">
                        <input type="text" value={item.cpu_limit} onInput={(e) => this.setConfigsInputs(e, key, 1)}
                               className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称"/>
                      </div>
                      <div className="cl"></div>
                    </div>
                    <div className="clearfix mb5">
                      <label className="panel-form-label fl">最低CPU(核)：</label>
                      <div className="pr fl with80 status_con">
                        <input type="text" value={item.lower_cpu_limit}
                               onInput={(e) => this.setConfigsInputs(e, key, 2)}
                               className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称"/>
                      </div>
                      <div className="cl"></div>
                    </div>
                    <div className="clearfix mb5">
                      <label className="panel-form-label fl">内存限制(M)：</label>
                      <div className="pr fl with80 status_con">
                        <input type="text" value={item.memory_limit} onInput={(e) => this.setConfigsInputs(e, key, 3)}
                               className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称"/>
                      </div>
                      <div className="cl"></div>
                    </div>
                    <div className="clearfix mb5">
                      <label className="panel-form-label fl">内存要求(M)：</label>
                      <div className="pr fl with20 status_con">
                        <input type="text" value={item.request_limit} onInput={(e) => this.setConfigsInputs(e, key, 4)}
                               className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称"/>
                      </div>
                      <label className="panel-form-label fl"
                             style={{width: '48%'}}>温馨提示：纯编程类型实训建议使用默认值，对于大数据等建议使用最大内存的30%</label>
                      <div className="cl"></div>
                    </div>
                  </div>
                </div>
              )

            })}
          </div> : ""}


          {postapplyvisible === true ? <style>
            {
              `
           body{
            overflow: hidden !important;
            }
            `
            }
          </style> : ""}

          {/*<Modal*/}
          {/*  keyboard={false}*/}
          {/*  title="提示"*/}
          {/*  visible={this.state.simicheckedtype}*/}
          {/*  closable={false}*/}
          {/*  footer={null}*/}
          {/*>*/}
          {/*  <div className="task-popup-content">*/}
          {/*    <p className="task-popup-text-center font-16">已创建的私密版本库及其内容，将在“保存”时被删除</p>*/}
          {/*    <p className="task-popup-text-center font-16">是否确认取消选择？</p>*/}
          {/*  </div>*/}

          {/*  <div className="task-popup-submit clearfix mt10">*/}
          {/*    <a onClick={() => this.hidesimichecked()} className="task-btn fl">取消</a>*/}
          {/*    <a className="task-btn task-btn-orange fr" onClick={() => this.getsimichecked()}>确定</a>*/}
          {/*  </div>*/}
          {/*</Modal>*/}

          <Modal
            keyboard={false}
            title="提示"
            visible={this.state.standard_scriptsModal}
            closable={false}
            footer={null}
          >
            <div className="task-popup-content">
              <p className="task-popup-text-center font-16">原有脚本将被新的脚本覆盖，无法撤销</p>
              <p className="task-popup-text-center font-16">是否确认执行覆盖操作</p>
            </div>

            <div className="task-popup-submit clearfix mt10">
              <a onClick={() => this.hidestandard_scriptsModal()} className="task-btn fl">取消</a>
              <a className="task-btn task-btn-orange fr" onClick={() => this.get_mirror_script()}>确定</a>
            </div>
          </Modal>


          <Modal
            keyboard={false}
            title="提示"
            visible={this.state.standard_scriptsModals}
            closable={false}
            footer={null}
          >
            <div className="task-popup-content">
              {/*<p className="task-popup-text-center font-16">已根据您的选择，生成新的评测脚本！</p>*/}
              {/*<p className="task-popup-text-center font-16 mt10">您之前使用的脚本已复制到剪贴板，可通过Ctrl+C贴贴</p>*/}
              <p className="task-popup-text-center font-16">评测脚本生成成功！</p>
            </div>
            <div className="task-popup-sure clearfix">
              <a className="task-btn task-btn-orange" onClick={() => this.hidestandard_scriptsModal()}>确定</a>
            </div>
          </Modal>

          <Modal
            keyboard={false}
            title="自定义模板"
            visible={this.state.visibleTemplate}
            onCancel={this.handleCancelTemplate}
            onOk={this.hideModalTemplate}
            okText="确认"
            cancelText="取消"
          >
            <div>
              <li className="clearfix mb15">
                <label className="panel-form-label fl"><span
                  className="color-orange mr5">*</span>执行命令：</label>
                <textarea className="task-form-80 task-height-150 panel-box-sizing fl mt10"
                          onInput={this.Executiveorder}
                          value={this.state.Executiveordervalue}
                          style={{width: '100%'}}
                          id="executive_command"
                >
														</textarea>
                <p className="-text-danger fl mt5"
                   id="executive_command_notice"
                   style={{display: this.state.Executivetyoe === false ? "none" : "block"}}
                >执行命令不能为空</p>
              </li>

              <li className="clearfix mb15">
                <label className="panel-form-label fl">编译命令：</label>
                <textarea className="task-form-80 task-height-150 panel-box-sizing fl mt10"
                          value={this.state.Compilecommandvalue}
                          onInput={this.Compilecommand}
                          id="compile_command"
                          style={{width: '100%'}}
                >
														</textarea>
              </li>
            </div>
          </Modal>

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
          </Modal>
        </div>
        {this.props.identity < 5 ?
          <Bottomsubmit {...this.props} {...this.state} url={`/shixuns/${this.props.match.params.shixunId}/challenges`}
                        onSubmits={this.onSubmits} loadings={this.state.loading}/> : ""}
      </div>

    );
  }
}

const TopShixuninformation = Form.create({name: 'newshixun'})(Shixuninformation);

export default TopShixuninformation;



