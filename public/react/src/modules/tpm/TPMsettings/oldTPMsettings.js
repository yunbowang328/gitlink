import React, { Component } from 'react';

import MonacoEditor from 'react-monaco-editor';

//MonacoDiffEditor  对比模式
import {Input, Select, Radio, Checkbox, Popconfirm, message, Modal,Icon,DatePicker,Breadcrumb,Upload,Button,notification, Tooltip} from 'antd';

// import "antd/dist/antd.css";

import locale from 'antd/lib/date-picker/locale/zh_CN';

import moment from 'moment';

import axios from 'axios';

import './css/TPMsettings.css';

import { getImageUrl, toPath, getUrl ,getUploadActionUrl} from 'educoder';

let origin = getUrl();

let path = getUrl("/editormd/lib/")

const $ = window.$;

let timeout;

let currentValue;

const Option = Select.Option;

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
// 处理整点 半点
// 取传入时间往后的第一个半点
export function handleDateStrings(dateString) {
  if (!dateString) return dateString;
  const ar = dateString.split(':')
  if (ar[1] == '00' || ar[1] == '30') {
    return dateString
  }
  const miniute = parseInt(ar[1]);
  if (miniute < 30 || miniute == 60) {
    return [ar[0], '30'].join(':')
  }
  if (miniute < 60) {
    // 加一个小时
    const tempStr = [ar[0], '00'].join(':');
    const format = "YYYY-MM-DD HH:mm";
    const _moment = moment(tempStr, format)
    _moment.add(1, 'hours')
    return _moment.format(format)
  }

  return dateString
}

// 恢复数据
function md_rec_data(k,mdu,id, editor){
  if(window.sessionStorage.getItem(k+mdu) !== null){
    editor.setValue(window.sessionStorage.getItem(k+mdu));
    md_clear_data(k,mdu,id);
  }
}

// 保存数据
function md_add_data(k,mdu,d){
  window.sessionStorage.setItem(k+mdu,d);
}

// 清空保存的数据
function md_clear_data(k,mdu,id){
  window.sessionStorage.removeItem(k+mdu);
  var id1 = "#e_tip_"+id;
  var id2 = "#e_tips_"+id;
  if(k == 'content'){
    $(id2).html("");
  }else{
    $(id1).html("");
  }
}

function md_elocalStorage(editor,mdu,id){
  if (window.sessionStorage){
    var oc = window.sessionStorage.getItem('content'+mdu);
    if(oc !== null ){
      $("#e_tips_"+id).data('editor', editor);
      var h = '您上次有已保存的数据，是否<a style="cursor: pointer;" className="link-color-blue" onclick="md_rec_data(\'content\',\''+ mdu + '\',\'' + id + '\')">恢复</a> ? / <a style="cursor: pointer;" className="link-color-blue" onclick="md_clear_data(\'content\',\''+ mdu + '\',\'' + id + '\')">不恢复</a>';
      $("#e_tips_"+id).html(h);
    }
    setInterval(function() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      if(editor.getValue().trim() != ""){
        md_add_data("content",mdu,editor.getValue());
        var id1 = "#e_tip_"+id;
        var id2 = "#e_tips_"+id;

        $(id1).html(" 数据已于 " + h + ':' + m + ':' + s +" 保存   ");
        $(id2).html("");
      }
    },10000);

  }else{
    $("#e_tip_"+id).after('您的浏览器不支持localStorage.无法开启自动保存草稿服务,请升级浏览器！');
  }
}

function create_editorMD(id, width, high, placeholder, imageUrl,initValue, callback) {
  var editorName = window.editormd(id, {
    width: width,
    height: high,
    path: path,   // "/editormd/lib/"
    markdown : initValue,
    syncScrolling: "single",
    tex: true,
    tocm: true,
    emoji: true,
    taskList: true,
    codeFold: true,
    searchReplace: true,
    htmlDecode: "style,script,iframe",
    sequenceDiagram: true,
    autoFocus: false,
    placeholder: placeholder,
    toolbarIcons: function () {
      // Or return editormd.toolbarModes[name]; // full, simple, mini
      // Using "||" set icons align right.
      return ["bold", "italic", "|", "list-ul", "list-ol", "|", "code", "code-block", "|", "testIcon", "testIcon1", '|', "image", "table", '|', "watch", "clear"]
    },
    toolbarCustomIcons: {
      testIcon: "<a type=\"inline\" class=\"latex\" ><div class='zbg'></div></a>",
      testIcon1: "<a type=\"latex\" class=\"latex\" ><div class='zbg_latex'></div></a>"
    },
    //这个配置在simple.html中并没有，但是为了能够提交表单，使用这个配置可以让构造出来的HTML代码直接在第二个隐藏的textarea域中，方便post提交表单。
    saveHTMLToTextarea: true,
    // 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
    dialogMaskOpacity: 0.6,
    imageUpload: true,
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp", "JPG", "JPEG", "GIF", "PNG", "BMP", "WEBP"],
    imageUploadURL: imageUrl,//url
    onload: function () {
      // this.previewing();
      $("#" + id + " [type=\"latex\"]").bind("click", function () {
        editorName.cm.replaceSelection("```latex");
        editorName.cm.replaceSelection("\n");
        editorName.cm.replaceSelection("\n");
        editorName.cm.replaceSelection("```");
        var __Cursor = editorName.cm.getDoc().getCursor();
        editorName.cm.setCursor(__Cursor.line - 1, 0);
      });

      $("#" + id + " [type=\"inline\"]").bind("click", function () {
        editorName.cm.replaceSelection("`$$$$`");
        var __Cursor = editorName.cm.getDoc().getCursor();
        editorName.cm.setCursor(__Cursor.line, __Cursor.ch - 3);
        editorName.cm.focus();
      });
      $("[type=\"inline\"]").attr("title", "行内公式");
      $("[type=\"latex\"]").attr("title", "多行公式");

      callback && callback()
    }
  });
  return editorName;
}


function updatamakedown(id){
  setTimeout(()=>{
    var shixunDescr = window.editormd.markdownToHTML(id, {
      htmlDecode: "style,script,iframe",
      taskList: true,
      tex: true,
      flowChart: true,
      sequenceDiagram: true
    });
    $("#"+id+" p:first").addClass("ReactMarkdown");
    $('#collaborators_list_info').show()
  }, 200)
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDateTime() {
  return {
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(1, 30).concat(range(31, 60)),
    // disabledSeconds: () => [0, 60],
  };
}

function disabledDate(current) {
  return current && current < moment().endOf('day').subtract(1, 'days');
}
export default class TPMsettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      commandLine: 0,
      Openpublic: 0,
      settingsData: undefined,
      webssh: 0,
      use_scope: 0,
      shixunsstatus: 0,
      shixunsID: undefined,
      exec_time: undefined,
      trainee: undefined,
      can_copy: undefined,
      task_pass: undefined,
      test_set_permission: undefined,
      code_edit_permission: undefined,
      hide_code: undefined,
      code_hidden: undefined,
      forbid_copy: undefined,
      vnc: undefined,
      name: undefined,
      scope_partment: undefined,
      scopetype: false,
      departmentslist: undefined,
      description: '',
      evaluate_script:undefined,
      standard_scripts: undefined,
      choice_main_type: "",
      choice_small_type: [],
      choice_standard_scripts:undefined,
      editordescriptios: undefined,
      editorevaluate_scripts: undefined,
      choice_standard_scriptssum: undefined,
      visibleTemplate: false,
      Executiveordervalue: "",
      Compilecommandvalue: "",
      Executivetyoe: false,
      postapplyvisible: false,
      sendsure_applyvalue: undefined,
      postapplytitle: false,
      shixunnametype: false,
      shixunmaintype: false,
      evaluate_scripttype: false,
      exec_timetype: false,
      traineetype: false,
      standard_scriptsModal:false,
      standard_scriptsModals:false,
      SelectTheCommandtype:false,
      multi_webssh:false,
      status:0,
      opers:false,
      operss:false,
      testscripttiptype:false,
      opersss:false,
      operateshixunstype:false,
      opening_time:"",
      opensmail:false,
      scope_partmenttype:false,
      newuse_scope:undefined,
      scope_partments:0,
      shixun_service_configs:undefined,
      shixun_service_configlist:undefined,
      pod_exist_time: undefined,
      pod_exist_timetype: false,
      shixunmemoMDvalue:"",
      language:"",
      deleteisnot:true
    }
  }
  descriptionMD=(initValue, id)=> {

    this.contentChanged = false;
    const placeholder = "";
// amp;
// 编辑时要传memoId
    const imageUrl = `${getUploadActionUrl()}`;
// 创建editorMd

    const description_editormd =create_editorMD(id, '100%', 400, placeholder, imageUrl,  initValue,()=> {
      setTimeout(() => {
        description_editormd.resize()
        description_editormd.cm && description_editormd.cm.refresh()
      }, 500)

      if (initValue != undefined) {
        description_editormd.setValue(initValue)
      }
      description_editormd.cm.on("change", (_cm, changeObj) => {
        console.log('....contentChanged')
        this.contentChanged = true;
      })
    });
    md_elocalStorage(description_editormd, `MemoQuestion_${id}`, `${id}Question`);
    this.description_editormd = description_editormd;
    window.description_editormd = description_editormd;
  }

  evaluate_scriptMD=(initValue, id)=> {
    this.contentChanged = false;
    const placeholder = "";
// amp;
// 编辑时要传memoId
    const imageUrl = `${getUploadActionUrl()}`;
// 创建editorMd

    const evaluate_script_editormd =create_editorMD(id, '100%', 400, placeholder, imageUrl,  initValue,()=> {
      setTimeout(() => {
        evaluate_script_editormd.resize()
        evaluate_script_editormd.cm && evaluate_script_editormd.cm.refresh()
      }, 500)

      if (initValue != undefined) {
        evaluate_script_editormd.setValue(initValue)
      }
      evaluate_script_editormd.cm.on("change", (_cm, changeObj) => {
        console.log('....contentChanged')
        this.contentChanged = true;
      })
    });
    md_elocalStorage(evaluate_script_editormd, `MemoQuestion_${id}`, `${id}Question`);
    this.evaluate_script_editormd = evaluate_script_editormd;
    window.evaluate_script_editormd = evaluate_script_editormd;

  }



  componentDidMount() {

    let id=this.props.match.params.shixunId;

    let Url=`/shixuns/`+id+`/settings.json`;

    axios.get(Url).then((response)=> {
      // alert(response.data.shixun.choice_standard_scripts)
      if(response.status===200){
        this.setState({
          shixunsID: id,
          settingsData: response.data,
          webssh: response.data.shixun.webssh,
          use_scope: response.data.shixun.use_scope,
          shixunsstatus: response.data.shixun.status,
          exec_time: response.data.shixun.exec_time,
          trainee: response.data.shixun.trainee,
          can_copy: response.data.shixun.can_copy,
          task_pass: response.data.shixun.task_pass,
          test_set_permission: response.data.shixun.test_set_permission,
          hide_code: response.data.shixun.hide_code,
          code_edit_permission: response.data.shixun.code_edit_permission,
          code_hidden: response.data.shixun.code_hidden,
          is_secret_repository: response.data.shixun.is_secret_repository,
          init_is_secret_repository: response.data.shixun.is_secret_repository,
          forbid_copy: response.data.shixun.forbid_copy,
          vnc: response.data.shixun.vnc,
          vnc_evaluate: response.data.shixun.vnc_evaluate,
          name: response.data.shixun.name,
          scope_partment: response.data.shixun.scope_partment,
          description: response.data.shixun.description,
          evaluate_script: response.data.shixun.evaluate_script,
          choice_main_type: response.data.shixun.choice_main_type,
          choice_small_type: response.data.shixun.choice_small_type,
          choice_standard_scripts: response.data.shixun.choice_standard_scripts,
          standard_scripts:response.data.shixun.standard_scripts,
          multi_webssh:response.data.shixun.multi_webssh,
          status:response.data.shixun.status,
          opening_time:response.data.shixun.opening_time,
          newuse_scope:response.data.shixun.use_scope,
          scope_partments: response.data.shixun.scope_partment.length,
          shixunmemoMDvalue:response.data.shixun.evaluate_script,
          shixun_service_configs:response.data.shixun.shixun_service_configs,
          shixun_service_configlist:response.data.shixun.shixun_service_configs,
        })

        // if(response.data.status===403){
        //     message: "您没有权限进行该操作"
        //     this.setState({
        //         :true
        //         message403:response.data.message
        //     })
        // }


        if(response.data.shixun.multi_webssh===true){
          this.setState({
            SelectTheCommandtype:true
          })
        }else{
          this.setState({
            SelectTheCommandtype:false
          })
        }
        if (response.data.shixun.scope_partment.length > 0) {
          this.setState({
            scopetype: true
          })
        }
        // console.log(response.data.shixun.description)
        // console.log(response.data.shixun.evaluate_script)
        // console.log(response.data.shixun.description)
        // this.props.identity<4&&this.props.status==0||this.props.identity===1&&this.props.status==2


        // this.evaluate_scriptMD(response.data.shixun.evaluate_script, "shixunmemoMD");

        this.descriptionMD(response.data.shixun.description, "shixundescription");

        // this.bigClass()
        // if (response.data.shixun.status === 2) {
        //
        // } else if (response.data.shixun.status === 1) {
        //     this.props.showSnackbar("这个实训已发布不能修改！");
        // } else if (response.data.shixun.status === 3) {
        //     this.props.showSnackbar("这个实训已关闭不能修改！");
        // }
      }

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

  SelectshixunCommand=(e)=>{
    // console.log( e.target.value)
    const webssh = e.target.value
    if (webssh == 2) {
      this.setState({
        webssh: webssh,
        SelectTheCommandtype: true,
        multi_webssh:false
      });
    } else {
      if (this.state.init_is_secret_repository && !this.state.vnc && this.state.is_secret_repository == true) {
        this.confirmDeleteSecretRepo({
          onOk: () => {
            this.setState({
              webssh: webssh,
              SelectTheCommandtype: false,
              multi_webssh:false
            });
          }
        })
      } else {
        if (!this.state.vnc) {
          this.setState({
            is_secret_repository: false,
          })
        }
        this.setState({
          webssh: webssh,
          SelectTheCommandtype: false,
          multi_webssh:false
        });
      }
    }

    // this.setState({
    //   webssh: webssh,
    // });
    // if(webssh===2){
    //   this.setState({
    //     SelectTheCommandtype: true,
    //     multi_webssh:false
    //   });
    // }else{
    //   this.setState({
    //     SelectTheCommandtype: false,
    //     multi_webssh:false
    //   });
    // }
  }

  SelectOpenpublic=(e)=>{
    this.setState({
      Openpublic: e.target.value
    });
  }

  can_copy=(e)=>{
    let sum = ""
    if (e.target.checked === false) {
      sum = 0
    } else if (e.target.checked === true) {
      sum = 1
    }
    this.setState({
      can_copy: sum,
    });

  }

  task_pass=(e)=>{

    let sum = ""
    if (e.target.checked === false) {
      sum = 0
    } else if (e.target.checked === true) {
      sum = 1
    }
    this.setState({
      task_pass: sum,
    });
  }

  test_set_permission=(e)=>{
    let sum = ""
    if (e.target.checked === false) {
      sum = 0
    } else if (e.target.checked === true) {
      sum = 1
    }
    this.setState({
      test_set_permission: sum,
    });

  }

  hide_code=(e)=>{
    let sum = ""
    if (e.target.checked === false) {
      sum = 0
    } else if (e.target.checked === true) {
      sum = 1
    }
    this.setState({
      hide_code: sum,
    });

  }
  code_edit_permission = (e) => {
    this.setState({
      code_edit_permission: e.target.checked
    })
  }
  code_hidden=(e)=>{
    let sum = ""
    if (e.target.checked === false) {
      sum = 0
    } else if (e.target.checked === true) {
      sum = 1
    }
    this.setState({
      code_hidden: sum,
    });

  }
  confirmDeleteSecretRepo = ({title, onOk}) => {
    confirm({
      title: title || <div>
        <div>已创建的私密版本库及其内容，将在“保存”时被删除。</div>
        <div>是否确认取消勾选？</div>
      </div>,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.setState({ is_secret_repository: false })
        onOk && onOk()
      },
      onCancel() {
      },
    });
  }
  is_secret_repository = (e) => {
    const checked = e.target.checked
    if (!checked) {
      if (this.state.init_is_secret_repository) {
        this.confirmDeleteSecretRepo({
        })
      } else {
        this.setState({ is_secret_repository: false })
      }
    } else {
      this.setState({ is_secret_repository: true })
    }
  }
  forbid_copy = (e) => {
    let sum = ""
    if (e.target.checked === false) {
      sum = 0
    } else if (e.target.checked === true) {
      sum = 1
    }
    this.setState({
      forbid_copy: sum,
    });
  }
  shixun_vnc_evaluate=(e) => {
    this.setState({
      vnc_evaluate: e.target.checked,
    });

  }

  shixun_vnc=(e)=>{
    // let sum = ""
    // if (e.target.checked === false) {
    //   sum = 0
    // } else if (e.target.checked === true) {
    //   sum = 1
    // }
    const vnc = e.target.checked;
    if (!vnc) {
      if (this.state.init_is_secret_repository && this.state.webssh != 2 && this.state.is_secret_repository == true) {
        this.confirmDeleteSecretRepo({
          onOk: () => {
            this.setState({
              vnc: e.target.checked,
              vnc_evaluate: false,
            });
          }
        })
      } else {
        if (this.state.webssh != 2) {
          this.setState({
            is_secret_repository: false
          })
        }
        this.setState({
          vnc: e.target.checked,
          vnc_evaluate: false,
        });
      }
    } else {
      this.setState({
        vnc: e.target.checked,
        vnc_evaluate: false,
      });
    }
  }
  shixunsname = (e) => {
    // let {shixunsstatus}=this.state;
    // if(shixunsstatus>0){
    //     return
    // }
    this.setState({
      name: e.target.value,
      shixunnametype:false
    })
  }

  bigClass = (value) => {
    // choice_main_type
    // 	choice_small_type
    let {settingsData,shixun_service_configs,choice_main_type,choice_small_type}=this.state;

    let list=[]
    list.push(choice_main_type)
    choice_small_type.map((item,key)=>{
      list.push(item)
    })

    let newshixun_service_configs=shixun_service_configs;

    let newshixun_service_configsagin=[]

    newshixun_service_configs.map((item,key)=>{
      list.map((its,index)=>{
        if(item.mirror_repository_id===its){
          newshixun_service_configsagin.push(item)
        }
      })
    })


    settingsData.shixun.main_type.some((item,key)=> {
        if (item.id === value) {
          newshixun_service_configsagin[0]={
            mirror_repository_id:value,
            name:item.type_name,
            cpu_limit:1,
            lower_cpu_limit:0.1,
            memory_limit:1024,
            request_limit:10
          }
          return true
        }
      }
    )
    let url = `/shixuns/get_mirror_script.json?mirror_id=`+value;
    axios.get(url).then((response) => {
      if (response.status === 200) {
        // console.log(response.data)
        this.setState({
          choice_main_type: value,
          standard_scripts:response.data,
          choice_standard_scripts:null,
          shixun_service_configs:newshixun_service_configsagin,
          shixun_service_configlist:newshixun_service_configsagin,
        })
      }
    }).catch((error) => {
      console.log(error)
    });



  }
  Deselectlittle=(value)=>{

    let {shixun_service_configs,choice_small_type}=this.state;
    let newshixun_service_configs=shixun_service_configs;
    let newchoice_small_type=choice_small_type;

    newshixun_service_configs.some((item,key)=> {
        if (item.mirror_repository_id === value) {
          newshixun_service_configs.splice(key, 1)
          return true
        }
      }
    )

    newchoice_small_type.some((item,key)=> {
        if (item === value) {
          newchoice_small_type.splice(key, 1)
          return true
        }
      }
    )


    this.setState({
      choice_small_type: newchoice_small_type,
      shixun_service_configs:newshixun_service_configs,
      shixun_service_configlist:newshixun_service_configs,
    })
  }
  littleClass = (value) => {

    let {settingsData,shixun_service_configs,choice_small_type,choice_main_type}=this.state;
    let newshixun_service_configs=shixun_service_configs;
    let newchoice_small_type=choice_small_type;
    // if(Array.isArray(value)===true){
    // 	value.map((item,key)=>{
    // 		settingsData.shixun.small_type.some((items,keys)=> {
    // 				if (items.id === item) {
    // 					newshixun_service_configs.push({
    // 						mirror_repository_id:value,
    // 						name:items.type_name,
    // 						cpu_limit:1,
    // 						lower_cpu_limit:0.1,
    // 						memory_limit:1024,
    // 						request_limit:10
    // 					})
    // 					return true
    // 				}
    // 			}
    // 		)
    // 	})
    // }

    let list=[]
    list.push(choice_main_type)
    choice_small_type.map((item,key)=>{
      list.push(item)
    })

    let newshixun_service_configsagin=[]

    newshixun_service_configs.map((item,key)=>{
      list.map((its,index)=>{
        if(item.mirror_repository_id===its){
          newshixun_service_configsagin.push(item)
        }
      })
    })

    settingsData.shixun.small_type.some((items,keys)=> {
        if (items.id === value) {
          newshixun_service_configsagin.push({
            mirror_repository_id:value,
            name:items.type_name,
            cpu_limit:1,
            lower_cpu_limit:0.1,
            memory_limit:1024,
            request_limit:10
          })
          return true
        }
      }
    )

    newchoice_small_type.push(value)

    this.setState({
      choice_small_type: newchoice_small_type,
      shixun_service_configs:newshixun_service_configsagin,
      shixun_service_configlist:newshixun_service_configsagin,
    })
  }
  onPodExistTimeChange = (e) => {
    this.setState({
      pod_exist_time: e.target.value,
      pod_exist_timetype: false,
    })
  }
  Timevalue = (e) => {
    this.setState({
      exec_time: e.target.value
    })
  }
  SelectOpenpublic = (e) => {
    this.setState({
      scopetype: false,
      use_scope: e.target.value,
    });
    if (e.target.value === 1) {
      this.setState({
        scopetype: true
      });
    }

  }
  deleteScopeInput = (key) => {
    let {scope_partment} = this.state;
    let datalist = scope_partment;
    datalist.splice(key, 1);
    this.setState({
      scope_partment: datalist
    });
  }

  shixunScopeInput = (e) => {
    let {scope_partment} = this.state;
    let datalist = scope_partment;
    if (datalist===undefined) {
      datalist=[]
    }

    datalist.push(e)
    // else {
    //     datalist[id] = e
    // }
    this.setState({
      scope_partment: datalist
    });
  }
  // adduse_scopeinput = () => {
  //     let {scope_partment} = this.state;
  //     let array = scope_partment;
  //     let newarray = ""
  //     array.push(newarray)
  //     this.setState({
  //         scope_partment: array,
  //     });
  // }
  submit_edit_shixun = () => {
    if (this.saving == true) return;
    this.saving = true;
    if(this.state.status===-1){
      this.props.showSnackbar("该实训已被删除，保存失败！");
      return
    }

    let {
      name, choice_main_type, choice_small_type, choice_standard_scripts, scope_partment, choice_standard_scriptssum, vnc_evaluate,
      evaluate_script, webssh, use_scope, trainee, can_copy, task_pass, test_set_permission, hide_code, code_hidden, forbid_copy, vnc,multi_webssh,
      opening_time,shixunmemoMDvalue,shixun_service_configlist, is_secret_repository, code_edit_permission
    } = this.state;

    let newshixun_service_configlist = shixun_service_configlist.map(v => {
      let v1 = Object.assign({},v);
      delete v1.name;
      return v1
    });

    // let operateauthority=
    // 	this.props.identity===1?true:this.props.identity<5&&this.state.status==0?true:false;
    // this.props.identity<5&&this.state.status==0||this.props.identity===1&&this.state.status==2||this.props.identity===1&&this.state.status==1;

    const description_editormd = this.description_editormd.getValue();

    let evaluate_script_editormd;

    if(this.state.status==0||this.state.status==1||this.state.status==2&&this.props.identity===1){
      // evaluate_script_editormd = this.evaluate_script_editormd.getValue();
      evaluate_script_editormd = shixunmemoMDvalue
    }else{
      evaluate_script_editormd = evaluate_script;
    }



    if (name === "") {
      this.setState({
        shixunnametype: true
      })
      $('html').animate({
        scrollTop: 10
      }, 1000);
      return
    }
    if (choice_main_type === "") {
      this.setState({
        shixunmaintype: true
      })
      $('html').animate({
        scrollTop: 800
      }, 1000);
      return
    }
    if (evaluate_script_editormd === "") {
      this.setState({
        evaluate_scripttype: true
      })
      $('html').animate({
        scrollTop: 1200
      }, 1000);
      return
    }
    if(use_scope===1){

      if(scope_partment===undefined||scope_partment.length===0){
        this.setState({
          scope_partmenttype: true
        })
        $('html').animate({
          scrollTop: 2500
        }, 1000);
        this.props.showSnackbar("公开程度，指定单位为空");
        return
      }
    }
    // if (exec_time === "") {
    //   this.setState({
    //     exec_timetype: true
    //   })
    //   $('html').animate({
    //     scrollTop: 1500
    //   }, 1000);
    //   return
    // }

    // if (!pod_exist_time) {
    //   this.setState({
    //     pod_exist_timetype: true
    //   })
    //   $("html, body").animate({ scrollTop: $('#pod_exist_time').offset().top - 100 }, 1000)
    //   return
    // }

    if (trainee === "") {
      this.setState({
        traineetype: true
      })
      return
    }

    let id = this.props.match.params.shixunId;

    let newmulti_webssh=multi_webssh;


    if(newmulti_webssh===null){
      newmulti_webssh=false
    }

    //exec_time: exec_time,
    let Url = `/shixuns/` + id + `.json`;
    let data = {
      shixun:{

        name: name,
        webssh: webssh,
        use_scope: use_scope,
        can_copy: can_copy,
        vnc: vnc===null?undefined:vnc,
        vnc_evaluate: vnc_evaluate===null?undefined:vnc_evaluate,
        test_set_permission: test_set_permission,
        code_hidden: code_hidden,
        code_edit_permission: code_edit_permission,
        trainee: trainee,
        task_pass: task_pass,
        hide_code: hide_code,
        forbid_copy: forbid_copy,
        multi_webssh:newmulti_webssh,
        opening_time:opening_time,
        mirror_script_id:choice_standard_scriptssum===undefined?choice_standard_scripts:choice_standard_scriptssum,
      },
      shixun_info:{
        description: description_editormd,
        evaluate_script: evaluate_script_editormd,
      },
      is_secret_repository: is_secret_repository,
      main_type: choice_main_type,
      small_type: choice_small_type,
      scope_partment: scope_partment,
      shixun_service_configs:newshixun_service_configlist
    }

    axios.put(Url, data).then((response) => {
      // console.log(response)
      this.saving = false;
      if(response.status){
        if (response.data.status === -1) {
          this.props.showSnackbar(response.data.message);
          return
        } else {
          window.location.href = "/shixuns/" + response.data.shixun_identifier + "/challenges";
        }
      }

    }).catch((error) => {
      console.log(error)
      this.saving = false;
    })


  }
  shixunsfetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    function fake() {
      let departmentsUrl = `/shixuns/departments.json?q=` + currentValue;
      axios.get(departmentsUrl).then((response) => {
        callback(response.data.shools_name);
      }).catch((error) => {
        console.log(error)
      });
    }

    timeout = setTimeout(fake, 300);
  }
  shixunHandleSearch = (value) => {
    this.shixunsfetch(value, departmentslist => this.setState({departmentslist}));
  }




  shixunsclose = () => {
    let id = this.props.match.params.shixunId;
    let cul = `/shixuns/` + id + `/close.json`;
    axios.post(cul).then((response) => {
      if(response.data.status===1){
        this.props.showSnackbar("操作成功");
        this.setState({
          operateshixunstype: false,
        });

        window.location.href = "/shixuns/" + id + "/challenges";
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  shixunsdel= () => {
    let id = this.props.match.params.shixunId;
    let cul = `/shixuns/` + id +`.json`;

    axios.delete(cul).then((response) => {
      if(response.data.status===1){
        this.props.showSnackbar("操作成功");
        this.setState({
          operateshixunstype: false,
        });

        window.location.href = "/shixuns";
      }
    }).catch((error) => {
      console.log(error)
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

    if (Executiveordervalue === "") {
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
        shixunmemoMDvalue:response.data.shixun_script
      })
    }).catch((error) => {
      console.log(error)
    });
    this.setState({
      visibleTemplate: false
    })
  }

  showModal = () => {
    this.setState({
      visibleTemplate: true,
    });
  }
  Selecttrainee = (value) => {
    this.setState({
      trainee: value,
    });
  }

  post_apply = () => {
    this.setState({
      postapplyvisible: true
    })
  }

  sendsure_applyvalues = (e) => {
    this.setState({
      sendsure_applyvalue: e.target.value
    })
  }

  setlanguagewrite = (e)=>{
    this.setState({
      languagewrite: e.target.value
    })
  }

  setsystemenvironment = (e) => {
    this.setState({
      systemenvironment: e.target.value
    })
  }

  settestcoderunmode = (e) => {
    this.setState({
      testcoderunmode: e.target.value
    })

  }

  sendsure_apply = () => {
    let {languagewrite,systemenvironment,testcoderunmode} = this.state;
    // console.log("点击确定")
    // console.log("languagewrite"+languagewrite);
    // console.log("systemenvironment"+systemenvironment);
    // console.log("testcoderunmode"+testcoderunmode);

    // let attachment_ids = undefined
    // if (this.state.fileList) {
    //     attachment_ids = this.state.fileList.map(item => {
    //         return item.response ? item.response.id : item.id
    //     })
    // }
    if(languagewrite === undefined || languagewrite === "" ){
      // this.props.showNotification(`请填写该镜像是基于什么语言`);
      this.setState({
        languagewritetype:true
      })
      return
    }
    if(systemenvironment === undefined || systemenvironment === ""){
      // this.props.showNotification(`请填写该镜像是基于什么语言系统环境`);
      this.setState({
        systemenvironmenttype:true
      })
      return;

    }
    if(testcoderunmode === undefined ||  testcoderunmode === "") {
      // this.props.showNotification(`请填写该镜像中测试代码运行方式`);
      this.setState({
        testcoderunmodetype:true
      })
      return;
    }
    var  attachment_ids=undefined;
    if (this.state.fileList) {
      attachment_ids = this.state.fileList.map(item => {
        return item.response ? item.response.id : item.id
      })
    }

    if( attachment_ids === undefined ||  attachment_ids.length===0){

      // notification.open(
      // 	{
      // 		message: '提示',
      // 		description:
      // 			'请上传附件！',
      //
      // 	}
      // )
      this.setState({
        attachmentidstype:true
      })
      return;
    }
    // console.log("attachment_ids"+attachment_ids);

    // alert(languagewrite +"  "+systemenvironment +"   "+testcoderunmode + "   "+attachment_ids);

    var data={
      language:languagewrite,
      runtime:systemenvironment,
      run_method:testcoderunmode,
      attachment_id:attachment_ids[0],
    }
    var url =`/shixuns/apply_shixun_mirror.json`;
    axios.post(url,data
    ).then((response) => {

      try {
        if (response.data) {
          // const { id } = response.data;
          // if (id) {
          if(this.state.file !== undefined){
            console.log("549");
            // this.deleteAttachment(this.state.file);
            this.setState({
              file:undefined,
              deleteisnot:true,
              languagewrite:"",
              systemenvironment:"",
              testcoderunmode:"",
              fileList:[]
            })
          }else {
            this.setState({
              file:undefined,
              deleteisnot:true,
              languagewrite:"",
              systemenvironment:"",
              testcoderunmode:"",
              fileList:[]
            })
          }
          // this.props.showNotification('提交成功！');
          notification.open(
            {
              message: '提示',
              description:
                '提交成功！',

            }
          )
          this.sendhideModaly()
          // this.props.history.push(`/courses/${cid}/graduation_topics`);
          // }
        }
      }catch (e) {

      }

    })

  }

  sendhideModaly = () => {
    this.setState({
      postapplyvisible: false,
    })
    if(this.state.file !== undefined){
      console.log("580");
      // this.deleteAttachment(this.state.file);
      this.setState({
        file:undefined,
        deleteisnot:true,
        languagewrite:"",
        systemenvironment:"",
        testcoderunmode:"",
        fileList:[]
      })
    }else {
      this.setState({
        file:undefined,
        deleteisnot:true,
        languagewrite:"",
        systemenvironment:"",
        testcoderunmode:"",
        fileList:[]
      })
    }
  }

  yeshidemodel = () => {
    this.setState({
      postapplytitle: false
    })
  }

  SelectScput = (value, e) => {
    this.setState({
      choice_standard_scriptssum: value,
      language:e.props.name,
      choice_standard_scripts: {id:e.props.value,value:""},
      standard_scriptsModal:true
    })
  }

  hidestandard_scriptsModal=()=>{
    this.setState({
      standard_scriptsModal:false,
      standard_scriptsModals:false
    })
  }

  get_mirror_script=()=>{
    let {choice_standard_scriptssum}=this.state;
    let id = this.props.match.params.shixunId;
    let pul = "/shixuns/" + id + "/get_script_contents.json?script_id=" + choice_standard_scriptssum;
    axios.get(pul).then((response) => {
      if(response.status===200){
        // this.evaluate_scriptMD(response.data.content, "shixunmemoMD");
        this.setState({
          standard_scriptsModal:false,
          standard_scriptsModals:true,
          shixunmemoMDvalue:response.data.content
        })
      }

    }).catch((error) => {
      console.log(error)
    })
  }


  SelectTheCommandonChange=(e)=>{
    this.setState({
      multi_webssh:e.target.checked
    })
  }

  bigopen=()=>{
    this.setState({
      opers:true
    })

  }

  bigopens=()=>{
    this.setState({
      opers:false,
      operss:false,
      opersss:false,
      opensmail:false
    })

  }
  bigopensmal=(e)=>{
    this.setState({
      opensmail:true
    })

  }
  sbigopen=(e)=>{
    this.setState({
      operss:true
    })

  }

  sbigopens=()=>{
    this.setState({
      operss:false
    })
  }
  sbigopenss=(e)=>{
    this.setState({
      opersss:true
    })

  }

  sbigopensss=()=>{
    this.setState({
      opersss:false
    })
  }
  testscripttip=(val)=>{
    if(val===0){
      this.setState({
        testscripttiptype:true
      })
    }else if(val===1){
      this.setState({
        testscripttiptype:false
      })
    }
  }

  operateshixuns=(value)=>{
    this.setState({
      operateshixunstype:true,
      delType:value
    })
  }

  hideoperateshixuns=()=>{
    this.setState({
      operateshixunstype:false
    })
  }
  onChangeTimePicker =(value, dateString)=> {
    this.setState({
      opening_time: dateString=== ""?"":moment(handleDateStrings(dateString))
    })
  }

  getshixunmemoMDvalue=(value, e)=>{

    this.setState({
      shixunmemoMDvalue:value
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

  handleChange = (info) => {
    let {fileList}=this.state;

    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      console.log("handleChange1");

      // if(fileList.length===0){
      let fileLists = info.fileList;
      this.setState({ fileList:fileLists,
        deleteisnot:false});
      // }
    }
  }

  onAttachmentRemove = (file) => {
    if(!file.percent || file.percent == 100){
      confirm({
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
    let id=file.response ==undefined ? file.id : file.response.id
    const url = `/attachments/${id}.json`
    axios.delete(url, {
    })
      .then((response) => {
        if (response.data) {
          const { status } = response.data;
          if (status == 0) {
            // console.log('--- success')

            this.setState((state) => {

              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
                deleteisnot:true
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
    let {
      postapplyvisible,
      postapplytitle,
      shixunnametype,
      shixunmaintype,
      evaluate_scripttype,
      traineetype,
      standard_scripts,
      name,
      settingsData,
      webssh,
      is_secret_repository,
      use_scope,
      shixunsID,
      can_copy,
      choice_standard_scripts,
      Executiveordervalue,
      Executivetyoe,
      Compilecommandvalue,
      task_pass,
      test_set_permission,
      hide_code,
      forbid_copy,
      code_edit_permission,
      code_hidden,
      vnc,
      vnc_evaluate,
      scopetype,
      scope_partment,
      departmentslist,
      trainee,
      choice_main_type,
      choice_small_type,
      standard_scriptsModal,
      standard_scriptsModals,
      SelectTheCommandtype,
      testscripttiptype,
      operateshixunstype,
      opening_time,
      scope_partmenttype,
      newuse_scope,
      scope_partments,
      shixunmemoMDvalue,delType,
      shixun_service_configs,
      fileList,
    } = this.state;

    let options;

    if (departmentslist != undefined) {
      options = this.state.departmentslist.map((d, k) => {
        return (
          <Option key={d} id={k}>{d}</Option>
        )
      })
    }
    const uploadProps = {
      width: 600,
      fileList,
      multiple: true,
      // https://github.com/ant-design/ant-design/issues/15505
      // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
      // showUploadList: false,
      action:  `${getUploadActionUrl()}`,
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
          notification.open(
            {
              message: '提示',
              description:
                '文件大小必须小于50MB',

            }
          )
        }
        if(this.state.file !== undefined){
          console.log("763")
          this.setState({
            file:file
          })
        }else {
          this.setState({
            file:file
          })
        }

        console.log("handleChange2");
        return isLt150M;
      },
    }
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    let operateauthority=this.props.identity===1?true:this.props.identity<5&&this.state.status==0?true:false;

    return (
      <div className="educontent mt30 mb50" id="shixun_settings_show" onClick={this.bigopens}>
        <Breadcrumb separator=">" className={"mb20"}>
          <Breadcrumb.Item href={"/shixuns/"+this.props.match.params.shixunId+"/challenges"}>实训详情</Breadcrumb.Item>
          <Breadcrumb.Item>配置</Breadcrumb.Item>
        </Breadcrumb>

        <div className="edu-back-white mb10">
          <div className="padding30 bor-bottom-greyE clearfix">
            <span className="fl font-16">配置</span>
            {
              this.props.identity===1&&this.state.status==2?
                <a className="edu-default-btn edu-blueline-btn ml20 fr"
                   onClick={()=>this.operateshixuns(2)}>
                  永久关闭
                </a>:""
            }
            {
              this.props.identity < 5 && this.state.status==0?
                <a className="edu-default-btn edu-blueline-btn ml20 fr"
                   onClick={()=>this.operateshixuns(1)}>
                  删除实训
                </a>:""
            }
            {
              this.props.identity == 1 && this.state.status == 2 ?
                <a className="edu-default-btn edu-blueline-btn ml20 fr"
                   onClick={()=>this.operateshixuns(1)}>
                  删除实训
                </a>:""
            }

            <Modal
              keyboard={false}
              title="提示"
              visible={operateshixunstype}
              closable={false}
              footer={null}
            >
              <div className="task-popup-content">
                {delType===1?<p className="task-popup-text-center font-16 pb20">是否确认删除 ？</p>:<p className="task-popup-text-center font-16 pb20">关闭后,<br/>用户不能再开始挑战了是否确认关闭 ？</p>}
              </div>
              <div className="task-popup-submit clearfix">
                <a onClick={this.hideoperateshixuns} className="task-btn fl">取消</a>
                {delType===1?<a className="task-btn task-btn-orange fr" onClick={this.shixunsdel}>确定</a>:<a className="task-btn task-btn-orange fr" onClick={this.shixunsclose}>确定</a>}
              </div>
            </Modal>

          </div>

          <div className="padding40-20">

            <p className="color-grey-6 font-16 mb30">实训名称</p>

            <div className="df">
              <span className="mr30 color-orange pt10">*</span>
              <div className="flex1">
                <div>
                  {settingsData === undefined ? "" :
                    <Input placeholder="请输入实训名称，最多60个字符" className={shixunnametype === true ? "input-100-45 greyInput bor-red" : "input-100-45 greyInput"} maxLength="60" value={name}
                           onInput={this.shixunsname}/>}
                </div>
                <div  className={shixunnametype === true ? "color-orange fl" : "color-orange fl none"}>
                  <span id="shixun_name_notice"><i className="fa fa-exclamation-circle mr3"></i>必填项</span>
                </div>
              </div>


            </div>

          </div>
        </div>

        <div className="edu-back-white mb10 padding40-20">

          <p className="color-grey-6 font-16 mb30">简介</p>

          <div className="padding10-20 edu-back-greyf5 radius4" id="shixundescription">
            <textarea style={{display: 'none'}} id="evaluate_script_shows" name="content"> </textarea>
            <div className="CodeMirror cm-s-defualt">
            </div>
          </div>
          <p id="e_tip_shixundescriptionQuestion" className="edu-txt-right color-grey-cd font-12"></p>
          <p id="e_tips_shixundescriptionQuestion" className="edu-txt-right color-grey-cd font-12"></p>
        </div>

        <div className="edu-back-white mb10 padding40-20 clearfix"  >
          <div className="clearfix">
            <p className="color-grey-6 font-16 mb30">技术平台</p>


            <div className="clearfix mb20">
              <span className="color-orange fl mr20">*</span>
              <div className="width15 fl mr20"
                // onMouseLeave={operateauthority?this.bigopens:""}
              >
                <Select placeholder="请选择主类别" value={choice_main_type === "" ? undefined : choice_main_type}
                        style={{width: 180}}
                        onChange={operateauthority?this.bigClass:""}
                  // onMouseEnter={this.bigopen}
                  // onMouseLeave={this.bigopens}
                        disabled={operateauthority?false:true}
                  // onMouseEnter={operateauthority?this.bigopen:""}
                        onSelect={operateauthority?this.bigopens:""}
                  // open={opers}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                >

                  {
                    settingsData === undefined ? "" : settingsData.shixun.main_type.map((item, key) => {
                      return (
                        <Option value={item.id} key={key} >
                          <Tooltip placement="right" title={item.description=== ""?"无描述":item.description} >
                            {item.type_name}
                          </Tooltip>
                        </Option>
                      )
                    })
                  }
                </Select>
                <p
                  className="edu-txt-left font-12"
                  style={{display:operateauthority?"block":'none'}}
                >
                  列表中没有？
                  <a className="color-blue" onClick={this.post_apply}>申请新建</a>
                </p>

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
                    <li className="clearfix ml82" >
                      <label className="fl mt10 "><span
                        className="color-red fl mt3">*</span>语言：&nbsp;&nbsp;</label>
                      <textarea className="fl task-form-80 task-height-150"
                                style={{width:'89%',height:'100px'}}
                                onInput={this.setlanguagewrite}
                                value={this.state.languagewrite}
                                placeholder="请填写该镜像是基于什么语言：示例：Python"
                                id="demand_info"></textarea>
                    </li>
                    <div className={"color-red shixunspanred"}>{this.state.languagewritetype===true?"请填写该镜像语言":""}</div>
                    <li className="clearfix ml1">
                      <label className="panel-form-label fl ml50"><span
                        className="color-red fl mt3">*</span>系统环境：&nbsp;&nbsp;</label>
                      <textarea className="fl task-form-80 task-height-150 "
                                onInput={this.setsystemenvironment}
                                style={{height:'100px'}}
                                value={this.state.systemenvironment}
                                placeholder="请填写该镜像是基于什么linux系统环境,代码运行环境"
                                id="demand_info"></textarea>
                    </li>
                    <div className={"color-red shixunspanred"}>{this.state.systemenvironmenttype===true?"请填写该镜像语言系统环境":""}</div>
                    <li className="clearfix">
                      <label className="fl mt10" ><span
                        className="color-red fl mt3">*</span>测试代码运行方式：&nbsp;&nbsp;</label>

                      <textarea className="fl task-form-80 task-height-150 "
                                onInput={this.settestcoderunmode}
                                value={this.state.testcoderunmode}
                                style={{height:'100px'}}
                                placeholder="请填写该镜像中测试代码运行方式"
                                id="demand_info"></textarea>
                    </li>
                    <div className={"color-red shixunspanred"}>{this.state.testcoderunmodetype===true?"请填写该镜像测试代码运行方式":""}</div>
                    <li className="clearfix ml50">
                      <label className="panel-form-label fl mt-5"><span
                        className="color-red fl">*</span>测试代码：&nbsp;&nbsp;</label>
                      <div  className="mt10" style={{
                        display: "inline-block"
                      }}>
                        <Upload {...uploadProps} >
                          <Icon type="upload"  className="fl mt3" > </Icon>
                          <span className="color-blue fl cdefault">上传附件</span>
                          <span className="color-grey-c fl ml10 ">(单个文件50M以内)</span>
                        </Upload>
                      </div>
                    </li>
                    <div className={"color-red shixunspanred"}>
                      {this.state.attachmentidstype===true?"请上传附件":""}
                    </div>
                    <li className="edu-txt-center clearfix ">
                      <a className="pop_close task-btn  mr30"
                         onClick={() => this.sendhideModaly()}
                      >取消</a>
                      <Button type="primary"  onClick={()=>this.sendsure_apply()}
                              className="task-btn task-btn-orange">确定</Button>
                    </li>
                    <div className="cl"></div>
                  </div>

                </Modal>




                <Modal
                  keyboard={false}
                  title="提示"
                  visible={postapplytitle}
                  closable={false}
                  footer={null}
                >
                  <div>
                    <div className="task-popup-content"><p
                      className="task-popup-text-center font-16"><span
                      className="font-17 mt10">新建申请已提交，请等待管理员的审核</span></p>
                      <li className="font-14 mt15 color-grey-6 edu-txt-center">我们将在1-2个工作日内与您联系
                      </li>
                    </div>
                    <div className="task-popup-OK clearfix">
                      <a className="task-btn task-btn-orange" onClick={this.yeshidemodel}>知道啦</a>
                    </div>
                  </div>
                </Modal>
              </div>

              <div className="width15 fl pr mr20"
                // onMouseLeave={operateauthority?this.bigopens:""}
              >
                <Select mode="multiple" placeholder="请选择小类别"
                        value={choice_small_type.length===0||choice_small_type[0]===""||choice_small_type===[]?undefined:choice_small_type}
                        style={{width: 180,height:30}}
                        disabled={operateauthority?false:true}
                  // onChange={operateauthority?this.littleClass:""}
                        onDeselect={operateauthority?this.Deselectlittle:""}
                  // onMouseEnter={operateauthority?this.bigopensmal:""}
                        onSelect={operateauthority?this.littleClass:""}
                        defaultOpen={false}
                  // open={opensmail}
                >
                  {
                    settingsData === undefined ? "" : settingsData.shixun.small_type.map((item, key) => {
                      return(
                        <Option value={item.id} key={key}>
                          <Tooltip placement="right" title={item.description=== ""?"无描述":item.description} >
                            {item.type_name}
                          </Tooltip>
                        </Option>
                      )
                    })
                  }
                </Select>
              </div>
              <div style={{width: ' 57px '}} className="fl">
												<span className={shixunmaintype === true ? "color-orange mt8" : "color-orange mt8 none"}
                              id="shixun_name_notice"><i
                          className="fa fa-exclamation-circle mr3"></i>必填项</span>
              </div>
              {/*<p className="fl ml10 color-grey-9 mt5">请在配置页面完成后续的评测脚本设置操作</p>*/}

            </div>
          </div>
          {/*</div>*/}
          {/*<div className="edu-back-white mb10 padding40-20 clearfix" >*/}
          <div className="clearfix"
            // onMouseLeave={operateauthority?this.bigopens:""}
          >
            <p className="color-grey-6 font-16 mb30">评测脚本</p>
            <div className="pl35">
              <Select placeholder="请选择选择脚本"
                      style={{width: 180}}
                      className="fl"
                      disabled={operateauthority?false:true}
                // onMouseEnter={operateauthority?this.sbigopen:""}
                      onSelect={operateauthority?this.bigopens:""}
                // open={operss}
                      value={choice_standard_scripts === undefined||choice_standard_scripts === null ? undefined :choice_standard_scripts.id===undefined?choice_standard_scripts:choice_standard_scripts.id}
                      onChange={operateauthority?this.SelectScput:""}>
                {
                  standard_scripts === undefined ? "" : standard_scripts.map((item, key) => {
                    return (
                      <Option value={parseInt(item.id)} name={item.scptname} key={key}>{item.scptname}</Option>
                    )

                  })
                }
              </Select>
              <Modal
                keyboard={false}
                title="提示"
                visible={standard_scriptsModal}
                closable={false}
                footer={null}
              >
                <div className="task-popup-content">
                  <p className="task-popup-text-center font-16">原有脚本将被新的脚本覆盖，无法撤销</p>
                  <p className="task-popup-text-center font-16">是否确认执行覆盖操作</p>
                </div>

                <div className="task-popup-submit clearfix mt10">
                  <a onClick={()=>this.hidestandard_scriptsModal()} className="task-btn fl">取消</a>
                  <a className="task-btn task-btn-orange fr" onClick={()=>this.get_mirror_script()}>确定</a>
                </div>
              </Modal>

              <Modal
                keyboard={false}
                title="提示"
                visible={standard_scriptsModals}
                closable={false}
                footer={null}
              >
                <div className="task-popup-content"><p className="task-popup-text-center font-16">评测脚本生成成功！</p></div>
                <div className="task-popup-sure clearfix">
                  <a className="task-btn task-btn-orange" onClick={()=>this.hidestandard_scriptsModal()} >确定</a>
                </div>
              </Modal>

              {
                this.props.identity<5||this.props.power==true?
                  <a onClick={this.showModal} id="define_template"
                     className="color-orange-tip ml20 mt1 fl">使用自定义脚本</a> : ""
              }
              <div className="ml6 fl pr"
                   style={{display:operateauthority?'block':"none"}}
              >
                <a onClick={()=>this.testscripttip(0)}><img
                  src={getImageUrl("images/educoder/problem.png") }/></a>
                <div className="invite-tip clearfix none " id="test_script_tip"
                     style={{top: '33px', right: '-6px',width: '322px',zIndex: '10',display: testscripttiptype===true?'block':"none"}}>
                  <span className="top-black-trangle"></span>
                  <div className="padding20 invitecontent clearfix">
                    <p className="font-12 edu-txt-left">
                      使用自定义模板，平台无法自动更新脚本，<br/>
                      请在关卡创建完后手动更新脚本中的必填参<br/>
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
                    <a onClick={()=>this.testscripttip(1)}>知道了</a>
                  </p>
                </div>
              </div>

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
                              value={Executiveordervalue}
                              style={{width:'100%'}}
                              id="executive_command"
                    >
														</textarea>
                    <p className="-text-danger fl mt5"
                       id="executive_command_notice"
                       style={{display: Executivetyoe === false ? "none" : "block"}}
                    >执行命令不能为空</p>
                  </li>

                  <li className="clearfix mb15">
                    <label className="panel-form-label fl">编译命令：</label>
                    <textarea className="task-form-80 task-height-150 panel-box-sizing fl mt10"
                              value={Compilecommandvalue}
                              onInput={this.Compilecommand}
                              id="compile_command"
                              style={{width:'100%'}}
                    >
														</textarea>
                  </li>
                </div>
              </Modal>
            </div>
          </div>

          <div className="mt30 clearfix df">
            <div
              className={operateauthority===false?'nonemodel':""}
            ></div>
            <span className="color-orange fl mr30">*</span>
            <div className="flex1">


              <div className="fl"  style={{border:'1px solid #ccc'}}>
                {/*<textarea className={"shixunmemoMDdiv"} value={shixunmemoMDvalue} onInput={this.getshixunmemoMDvalue}  name="content">*/}
                {/*</textarea>*/}
                <MonacoEditor
                  height="450"
                  width="1100"
                  language={this.state.language}
                  value={shixunmemoMDvalue}
                  options={ {
                    selectOnLineNumbers: true
                  }}
                  onChange={operateauthority===true?this.getshixunmemoMDvalue:""}
                  // onChange={this.getshixunmemoMDvalue}
                />
              </div>


              {/*<div className="padding10-20 edu-back-greyf5 radius4 fl "*/}
              {/*id="shixunmemoMDs"*/}
              {/*style={{display:operateauthority?'none':"block"}}*/}
              {/*>*/}
              {/*{evaluate_script===undefined?"":evaluate_script}*/}

              {/*</div>*/}



            </div>

          </div>
          <div className="clearfix"
               style={{display:operateauthority?'block':"none"}}
          >
            <div className="fl">
															<span className={evaluate_scripttype === true ? "color-orange fl" : "color-orange fl none"} id="shixun_name_notice">
															<i className="fa fa-exclamation-circle mr3"></i>必填项</span>
            </div>
            <p id="e_tip_shixunmemoMDQuestion" className="edu-txt-right color-grey-cd font-12 pdr20 fr"
               style={{display:operateauthority?'block':"none"}}
            ></p>
            <p id="e_tips_shixunmemoMDQuestion" className="edu-txt-right color-grey-cd font-12 pdr20 fr"
               style={{display:operateauthority?'block':"none"}}
            ></p>
          </div>
        </div>

        {/*<div className="edu-back-white mb10 padding40-20 clearfix">*/}
        {/*<span className="color-orange fl mr20">*</span>*/}

        {/*<p className="color-grey-6 font-16 mb30">程序最大执行时间</p>*/}

        {/*<Input className="mr10 fl" placeholder="请输入程序最大执行时间" maxLength="60" style={{width: '20%'}}*/}
        {/*onInput={this.Timevalue} value={exec_time === undefined ? "" : exec_time}/> <span*/}
        {/*className="fl mr10 ml20">秒</span>*/}

        {/*<div style={{width: ' 57px '}} className="fl">*/}
        {/*<span className={exec_timetype === true ? "color-orange mt8" : "color-orange mt8 none"}*/}
        {/*id="shixun_name_notice"><i*/}
        {/*className="fa fa-exclamation-circle mr3"></i>必填项</span>*/}
        {/*</div>*/}
        {/*</div>*/}

        {/* <div className="edu-back-white mb10 padding40-20 clearfix" id="pod_exist_time">
						<span className="color-orange fl mr20">*</span>

						<p className="color-grey-6 font-16 mb30">Pod存活时间</p>

						<Input className="mr10 fl" placeholder="请输入pod存活时间" maxLength="60" style={{width: '20%'}}
									 onInput={this.onPodExistTimeChange} value={pod_exist_time === undefined ? "" : pod_exist_time}/> <span
						className="fl mr10 ml20">秒</span>

						<div style={{width: ' 57px '}} className="fl">
												<span className={pod_exist_timetype === true ? "color-orange mt8" : "color-orange mt8 none"}
															id="shixun_name_notice"><i
													className="fa fa-exclamation-circle mr3"></i>必填项</span>
						</div>
					</div> */}


        <div className="edu-back-white mb10 padding40-20">
          <p className="color-grey-6 font-16 mb30">命令行</p>
          <RadioGroup onChange={this.SelectshixunCommand} value={webssh}>
            <Radio className="radioStyle" value={0}><span>无命令行窗口</span> <span  className="color-grey-9">（选中则不给学员的实践任务提供命令窗口）</span></Radio>
            <Radio className="radioStyle" value={1}><span>命令行练习窗口</span> <span  className="color-grey-9">（选中则给学员提供用于练习操作的命令行窗口）</span></Radio>
            <Radio className="radioStyle" value={2}><span>命令行评测窗口</span> <span  className="color-grey-9">（选中则给学员提供用于关卡评测的命令行窗口）</span></Radio>
            <Checkbox style={{display:SelectTheCommandtype||webssh===2?"block":"none"}} className={"ml36"} checked={this.state.multi_webssh} onChange={this.SelectTheCommandonChange}>
              多个命令行窗口<span className="color-grey-9">（选中则允许学员同时开启多个命令行窗口）</span>
            </Checkbox>
          </RadioGroup>
        </div>

        <div className="edu-back-white mb10 padding40-20" style={{display:this.props.identity===1?"block":this.state.status===2&&newuse_scope===0||this.state.status===1&&newuse_scope===0?"none":"block"}}>
          <p className="color-grey-6 font-16 mb30">公开程度</p>
          <RadioGroup onChange={this.SelectOpenpublic} value={use_scope}>
            <Radio className="radioStyle" value={0}><span>对所有公开</span> <span  className="color-grey-9">(选中则所有已被试用授权的用户可以学习)</span></Radio>
            <Radio className="radioStyle" value={1}><span>对指定单位公开</span> <span  className="color-grey-9">(选中则下方指定单位的已被试用授权的用户可以学习)</span></Radio>
          </RadioGroup>

          <div className="clearfix none" id="unit-all" style={{display: scopetype === false ? 'none' : 'block'}}>
            <div className="fl ml25">
              <div className="fl" id="unit-input-part"  style={{width:'100%'}}>
                <div id="person-unit" className="fl pr mr10">
                  <div className="shixunScopeInput fl" >
                    <Select
                      style={{width:'200px'}}
                      placeholder="请输入并选择单位名称"
                      onChange={(value)=>this.shixunScopeInput(value)}
                      onSearch={this.shixunHandleSearch}
                      showSearch
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      notFoundContent={null}
                      className={scope_partmenttype===true?"bor-red":""}
                      // ifd={key}
                    >
                      {options}
                    </Select>
                  </div>
                  <span className="color-grey-9">(搜索并选中添加单位名称)</span>
                </div>
                {/*<a className="white-btn fl mt1 use_scope-btn newuse_scope-btn"*/}
                {/*onClick={this.adduse_scopeinput}>+*/}
                {/*添加</a>*/}
              </div>

              <div style={{width:'100%'}}>
                <div className="mt20 clearfix" id="task_tag_content">
                  {
                    scope_partment===undefined?"":scope_partment.map((item,key)=>{

                      return(
                        <li className="task_tag_span" key={key}><span>{item}</span>
                          <a  style={{ color: 'rgba(0,0,0,.25)' }}
                              onClick={(key)=>this.deleteScopeInput(key)}
                            // style={{display:this.props.status===2&&this.props.identity>1||this.props.status===1&&this.props.identity>1===true?"none":"block"}}
                          >
                            {this.props.identity===1?"x":this.state.status===2&&scope_partment===scope_partments||this.state.status===1&&scope_partment===scope_partments?"":"×"}
                          </a>
                        </li>
                      )
                    })
                  }
                </div>
                {/*{*/}
                {/*scope_partment===undefined?"":scope_partment.map((item,key)=>{*/}
                {/*return(*/}
                {/*<div className="shixunScopeInput fl" key={key}>*/}
                {/*<Input*/}
                {/*style={{width:'200px'}}*/}
                {/*key={key}*/}
                {/*className=""*/}
                {/*suffix={<Icon type="close-circle" onClick={(key)=>this.deleteScopeInput(key)} style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                {/*value={item}*/}
                {/*/>*/}
                {/*</div>*/}

                {/*)*/}
                {/*})*/}
                {/*}*/}
              </div>
              <span className={scope_partmenttype===true?"color-orange ml20 fl":"color-orange ml20 fl none"} id="public_unit_notice">
																			<i className="fa fa-exclamation-circle mr3"></i>
																	请选择需要公开的单位
													</span>
            </div>
          </div>
        </div>

        <div className="edu-back-white mb10 padding40-20 clearfix">
          <p className="color-grey-6 font-16 mb30">发布信息</p>

          <div className="clearfix"
            // onMouseLeave={this.bigopens}
          >
            <span className="color-orange fl mr20">*</span>
            <span className="color-grey-6 fl" style={{minWidth: '95px'}}>面向学员：</span>

            <div className="with15 fl pr ">
              <Select placeholder="请选择学员类别"
                      style={{width: 180}}
                      value={trainee}
                      onChange={this.Selecttrainee}
                // onMouseEnter={this.sbigopenss}
                      onSelect={this.sbigopensss}
                // open={opersss}
              >
                <Option value={1}>初级学员</Option>
                <Option value={2}>中级学员</Option>
                <Option value={3}>高级学员</Option>
                <Option value={4}>顶级学员</Option>
              </Select>
            </div>
            <span className="fl ml20 color-grey">实训难易度定位，不限定用户群体</span>
            <div style={{width: ' 57px '}} className="fl ml15">
												<span className={traineetype === true ? "color-orange mt8" : "color-orange mt8 none"}
                              id="shixun_name_notice"><i
                          className="fa fa-exclamation-circle mr3"></i>必填项</span>
            </div>

          </div>
          <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>复制:</span>
            <span className="fl mt5">
															<Checkbox checked={can_copy === undefined ? false : can_copy} onChange={this.can_copy}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9 ml10">(勾选则允许已认证的教师复制该实训)</label>
														</span>
          </div>

          <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>跳关:</span>
            <span className="fl mt5">
															<Checkbox checked={task_pass === undefined ? false : task_pass} onChange={this.task_pass}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9  ml10">(勾选则允许学员跳关挑战实训)</label>
														</span>
          </div>
          <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>测试集解锁:</span>
            <span className="fl mt5">
															<Checkbox checked={test_set_permission === undefined ? false : test_set_permission}
                                        onChange={this.test_set_permission}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9 ml10">勾选则允许学员通过金币解锁查看测试集内容</label>
													</span>
          </div>

          {!code_hidden && !hide_code && <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>代码开放修改:</span>
            <span className="fl mt5">
															<Checkbox checked={code_edit_permission === undefined ? false : code_edit_permission}
                                        onChange={this.code_edit_permission}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9 ml10" >勾选则学员可以修改版本库目录中的任意文件内容</label>
													</span>
          </div>}

          <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>隐藏代码窗口:</span>
            <span className="fl mt5">
															<Checkbox checked={hide_code === undefined ? false : hide_code} onChange={this.hide_code}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9 ml10">勾选则对学员隐藏代码窗口</label>
													</span>
          </div>

          <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>代码目录隐藏:</span>
            <span className="fl mt5">
															<Checkbox checked={code_hidden === undefined ? false : code_hidden}
                                        onChange={this.code_hidden}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9 ml10" >勾选则对学员隐藏版本库目录</label>
													</span>
          </div>

          { (vnc || webssh == 2) && <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>私密版本库:</span>
            <span className="fl mt5">
															<Checkbox checked={is_secret_repository === undefined ? false : is_secret_repository}
                                        onChange={this.is_secret_repository}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9 ml10" >勾选则启用私密版本库，学员页面不能查看该版本库目录</label>
													</span>
          </div>}

          <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>禁用复制粘贴:</span>
            <span className="fl mt5">
															<Checkbox checked={forbid_copy === undefined ? false : forbid_copy}
                                        onChange={this.forbid_copy}></Checkbox>
															<label style={{top:'6px'}} className="color-grey-9 ml10" >勾选则对学员页面不能使用复制和粘贴功能</label>
													</span>
          </div>

          <div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>开启时间:</span>
            <span className="fl mt5">
														<DatePicker
                              showToday={false}
                              showTime={{ format: 'HH:mm' }}
                              format="YYYY-MM-DD HH:mm"
                              width={178}
                              locale={locale}
                              disabledTime={disabledDateTime}
                              disabledDate={disabledDate}
                              placeholder="请选择开启时间"
                              value={opening_time===null||opening_time===""?"":moment(opening_time, dateFormat)}
                              onChange={this.onChangeTimePicker}
                              dropdownClassName="hideDisable"
                            />
															<label style={{top:'6px'}} className="color-grey-9 ml10" >（为空，则学员在实训发布后，能随时开启实训挑战；否则，学员在开启时间后，才能开启实训挑战）</label>
													</span>
          </div>

          {this.props.identity<3?<div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>VNC图形化:</span>
            <span className="fl mt5">
								<Checkbox checked={vnc === undefined ? false : vnc} onChange={this.shixun_vnc}></Checkbox>
								<label style={{top:'6px'}} className="color-grey-9 ml10" >勾选则给学员的实践任务提供Ubuntu系统图形化实践窗口，否则不提供</label>
							</span>
          </div>:""}
          {this.props.identity<3 && vnc ?<div className="clearfix mt20 ml30">
            <span className="color-grey-6 mt5 fl" style={{minWidth: '95px'}}>VNC图形化评测:</span>
            <span className="fl mt5 ml5">
								<Checkbox checked={vnc_evaluate === undefined ? false : vnc_evaluate} onChange={this.shixun_vnc_evaluate}></Checkbox>
								<label style={{top:'6px'}} className="color-grey-9 ml10" >勾选则在学员的VNC图形化页面中，开启评测功能</label>
							</span>
          </div>:""}



        </div>

        {this.props.identity<3?<div className="edu-back-white padding40-20 mb20">
          <p className="color-grey-6 font-16 mb30">服务配置</p>
          { shixun_service_configs&&shixun_service_configs.map((item,key)=>{

            return(
              <div key={key}>
                <div id="5">
                  <div className="color-grey-6 font-16 mt30 mb20" id="shixun_scenario_type_name">
                    <span className={"fl"}>{item.name}</span>
                    {/*<span className={"fr mr40"} onClick={()=>this.Deselectlittle(item.mirror_repository_id)}><i className="fa fa-times-circle color-grey-c font-16 fl"></i></span>*/}
                  </div>
                  <div className="clearfix mb5">
                    <label className="panel-form-label fl">CPU(核)：</label>
                    <div className="pr fl with80 status_con">
                      <input type="text"  value={item.cpu_limit} onInput={(e)=>this.setConfigsInputs(e,key,1)}
                             className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称" />
                    </div>
                    <div className="cl"></div>
                  </div>
                  <div className="clearfix mb5">
                    <label className="panel-form-label fl">最低CPU(核)：</label>
                    <div className="pr fl with80 status_con">
                      <input type="text" value={item.lower_cpu_limit}  onInput={(e)=>this.setConfigsInputs(e,key,2)}
                             className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称" />
                    </div>
                    <div className="cl"></div>
                  </div>
                  <div className="clearfix mb5">
                    <label className="panel-form-label fl">内存限制(M)：</label>
                    <div className="pr fl with80 status_con">
                      <input type="text"  value={item.memory_limit}  onInput={(e)=>this.setConfigsInputs(e,key,3)}
                             className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称" />
                    </div>
                    <div className="cl"></div>
                  </div>
                  <div className="clearfix mb5">
                    <label className="panel-form-label fl">内存要求(M)：</label>
                    <div className="pr fl with20 status_con">
                      <input type="text" value={item.request_limit}   onInput={(e)=>this.setConfigsInputs(e,key,4)}
                             className="panel-box-sizing task-form-100 task-height-40" placeholder="请输入类别名称" />
                    </div>
                    <label className="panel-form-label fl" style={{width: '48%'}}>温馨提示：纯编程类型实训建议使用默认值，对于大数据等建议使用最大内存的30%</label>
                    <div className="cl"></div>
                  </div>
                </div>
              </div>
            )

          })}
        </div>	:""}

        <p>
          {
            // this.props.identity<4&&this.props.status==0?
            this.props.identity<5?
              <div className="clearfix mt30">
                <a className="defalutSubmitbtn fl mr20"
                   onClick={this.submit_edit_shixun}>保存</a>
                <a href={"/shixuns/" + shixunsID + "/challenges"} className="defalutCancelbtn fl">取消</a>
              </div> :""
          }

        </p>

      </div>
    );
  }
}


