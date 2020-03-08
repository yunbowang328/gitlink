import React, {Component} from 'react';

import {TPMIndexHOC} from '../TPMIndexHOC';

import {SnackbarHOC,appendFileSizeToUploadFileAll, getUploadActionUrl} from 'educoder';

import {Input, Select, Radio, Checkbox, Modal, Icon, DatePicker,Upload,Button,message,Form,notification,Tooltip} from 'antd';

// import "antd/dist/antd.css";

import locale from 'antd/lib/date-picker/locale/zh_CN';

import axios from 'axios';

import './css/Newshixuns.css';

import {getUrl} from 'educoder'

import moment from 'moment';

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
function md_rec_data(k, mdu, id, editor) {
    if (window.sessionStorage.getItem(k + mdu) !== null) {
        editor.setValue(window.sessionStorage.getItem(k + mdu));
        md_clear_data(k, mdu, id);
    }
}

// 保存数据
function md_add_data(k, mdu, d) {
    window.sessionStorage.setItem(k + mdu, d);
}

// 清空保存的数据
function md_clear_data(k, mdu, id) {
    window.sessionStorage.removeItem(k + mdu);
    var id1 = "#e_tip_" + id;
    var id2 = "#e_tips_" + id;
    if (k == 'content') {
        $(id2).html("");
    } else {
        $(id1).html("");
    }
}

function md_elocalStorage(editor, mdu, id) {
    if (window.sessionStorage) {
        var oc = window.sessionStorage.getItem('content' + mdu);
        if (oc !== null) {
            $("#e_tips_" + id).data('editor', editor);
            var h = '您上次有已保存的数据，是否<a style="cursor: pointer;" class="link-color-blue" onclick="md_rec_data(\'content\',\'' + mdu + '\',\'' + id + '\')">恢复</a> ? / <a style="cursor: pointer;" class="link-color-blue" onclick="md_clear_data(\'content\',\'' + mdu + '\',\'' + id + '\')">不恢复</a>';
            $("#e_tips_" + id).html(h);
        }
        setInterval(function () {
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            if (editor.getValue().trim() != "") {
                md_add_data("content", mdu, editor.getValue());
                var id1 = "#e_tip_" + id;
                var id2 = "#e_tips_" + id;

                $(id1).html(" 数据已于 " + h + ':' + m + ':' + s + " 保存   ");
                $(id2).html("");
            }
        }, 10000);

    } else {
        $("#e_tip_" + id).after('您的浏览器不支持localStorage.无法开启自动保存草稿服务,请升级浏览器！');
    }
}


function create_editorMD(id, width, high, placeholder, imageUrl, callback) {
    var editorName = window.editormd(id, {
        width: width,
        height: high,
        path: path,   // "/editormd/lib/"

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
        placeholder: placeholder,
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

            md_elocalStorage(editorName, `memoNew_${id}`, "memoNew");

            callback && callback()
        }
    });
    return editorName;
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
class Newshixuns extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            newshixunlist: undefined,
            departmentslist: undefined,
            name: "",
            main_type: "",
            small_type: "",
            trainee: "",
            webssh: 0,
            use_scope: 0,
            can_copy: "",
            scope_partment: undefined,
            vnc: "",
            scopetype: false,
            postapplyvisible: false,
            sendsure_applyvalue: undefined,
            postapplytitle: false,
            shixun_nametype: false,
            main_types: false,
            trainee_types: false,
            SelectTheCommandtype: false,
            opers: false,
            operss: false,
            TimePickervalue: "",
            opensmail: false,
            onSearchvalue: "",
            scope_partmenttype: false,
            languagewrite: undefined,
            systemenvironment:undefined,
            testcoderunmode:undefined,
            file:undefined,
            deleteisnot:true,
						languagewritetype:false,
						systemenvironmenttype:false,
						testcoderunmodetype:false,
					  attachmentidstype:false,
				  	datalisttype:false,
					  bottonloading:false
        }
    }

    initMD(initValue) {
        this.contentChanged = false;
        const placeholder = "";
        // amp;
        // 编辑时要传memoId
        const imageUrl = `getUploadActionUrl`;
        // 创建editorMd

        const taskpass_editormd = create_editorMD("memoMD", '100%', 400, placeholder, imageUrl, () => {
            setTimeout(() => {
                taskpass_editormd.resize()
                taskpass_editormd.cm && taskpass_editormd.cm.refresh()
            }, 500)

            if (initValue) {
                taskpass_editormd.setValue(initValue)
            }
            taskpass_editormd.cm.on("change", (_cm, changeObj) => {
                // console.log('....contentChanged')
                this.contentChanged = true;
            })
        });
        this.taskpass_editormd = taskpass_editormd;
        window.taskpass_editormd = taskpass_editormd;

    }

    componentDidMount() {
        let newshixunUrl = `/shixuns/new.json`;
        axios.get(newshixunUrl).then((response) => {
            if (response.status === 200) {
                if (response.data.message===undefined) {
                    this.setState({
                        newshixunlist: response.data
                    });
                    this.initMD(response.data.sample[0][1]);
                }

            }
        }).catch((error) => {
            console.log(error)
        });

        let departmentsUrl = `/shixuns/departments.json`;
        axios.get(departmentsUrl).then((response) => {
            if (response.status === 200) {
							if (response.data.message===undefined) {
								this.setState({
									departmentslist: response.data.shools_name
								});
							}
            }
        }).catch((error) => {
            console.log(error)
        });
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
    shixunname = (e) => {
        this.setState({
            name: e.target.value,
            shixun_nametype: false
        });
    }

    bigClass = (value) => {
        this.setState({
            main_type: value
        })
    }

    littleClass = (value) => {
        this.setState({
            small_type: value
        })
    }

    Selectthestudent = (value) => {
        this.setState({
            trainee: value
        })
    }

    SelectTheCommand = (e) => {
        this.setState({
            webssh: e.target.value,
        });

        if (e.target.value === 2) {
            this.setState({
                SelectTheCommandtype: true,
                multi_webssh: false
            });
        } else {
            this.setState({
                SelectTheCommandtype: false,
                multi_webssh: false
            });
        }
    }

    Selectpublic = (e) => {
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

    Teacherscopy = (e) => {
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

    TeachersUbuntu = (e) => {
        let sum = ""
        if (e.target.checked === false) {
            sum = 0
        } else if (e.target.checked === true) {
            sum = 1
        }
        this.setState({
            vnc: sum,
        });
    }

    adduse_scopeinput = () => {
        let {scope_partment} = this.state;
        let array = scope_partment;
        let newarray = ""
        array.push(newarray)
        this.setState({
            scope_partment: array,
        });
    }

    shixunScopeInput = (e, id) => {
       let types=false
        let {scope_partment} = this.state;
        let datalist = scope_partment;
        if (datalist === undefined) {
            datalist = []
        }

				datalist.map((item,key)=>{
					if(e===item){
						types=true
						 this.setState({
							 datalisttype:true
						 })
						return
					}
				})

			 if(types===false){
				 datalist.push(e)
				 this.setState({
					 scope_partment: datalist,
					 onSearchvalue: ""
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

    //提交数据
    submit_new_shixun = () => {
        const mdVal = this.taskpass_editormd.getValue();
        let {can_copy, main_type, name, scope_partment, small_type, trainee, use_scope, vnc, webssh, multi_webssh, TimePickervalue} = this.state;
        let Url = `/shixuns.json`
        if (name === "") {
            this.setState({
                shixun_nametype: true
            })
            this.props.showSnackbar("实训名称为空");
            $('html').animate({
                scrollTop: 10
            }, 1000);
            return
        }
        if (main_type === "") {
            this.setState({
                main_types: true
            })
            $('html').animate({
                scrollTop: 700
            }, 1000);
            this.props.showSnackbar("请选择技术平台大类别");

            return
        }

        if (use_scope === 1) {
            if (scope_partment === undefined || scope_partment.length === 0) {
                this.setState({
                    scope_partmenttype: true
                })
                $('html').animate({
                    scrollTop: 900
                }, 1000);
                this.props.showSnackbar("公开程度，指定单位为空");
                return
            }
        }
        if (trainee === "") {
            this.setState({
                trainee_types: true
            })
            // $('html').animate({
            //     scrollTop: 700
            // }, 1000);
            this.props.showSnackbar("请选择发布信息");
            return
        }
        let newmulti_webssh = multi_webssh;
        if (newmulti_webssh === true) {
            newmulti_webssh = 1
        } else {
            newmulti_webssh = ""
        }
			this.setState({
				bottonloading:true
			})
        axios.post(Url, {
                name: name,
                can_copy: can_copy,
                description: mdVal,
                main_type: main_type,
                scope_partment: scope_partment,
                small_type: small_type,
                trainee: trainee,
                use_scope: use_scope,
                vnc: vnc,
                webssh: webssh,
                multi_webssh: newmulti_webssh,
                task_pass: 1,
                opening_time: TimePickervalue
            }
        ).then((response) => {
            if (response.status === 200) {
                window.location.href = "/shixuns/" + response.data.shixun_identifier + "/challenges";
                // window.open("/shixuns/"+response.data.shixun_identifier+"/challenges");
            }else{
            	this.setState({
								bottonloading:false
							})
						}
        }).catch((error) => {
            console.log(error)
					this.setState({
						bottonloading:false
					})
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
							if (response.data.message===undefined) {
								callback(response.data.shools_name);
							}
            }).catch((error) => {
                console.log(error)
            });
        }

        timeout = setTimeout(fake, 300);
    }

    shixunHandleSearch = (value) => {

        this.shixunsfetch(value, departmentslist => this.setState({departmentslist}));

        this.setState({
            onSearchvalue: ""
        })
    }

    post_apply = () => {
        this.setState({
            postapplyvisible: true
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
    sendsure_applyvalues = (e) => {
        this.setState({
            sendsure_applyvalue: e.target.value
        })
    }
    yeshidemodel = () => {
        this.setState({
            postapplytitle: false
        })
    }

    SelectTheCommandonChange = (e) => {
        this.setState({
            multi_webssh: e.target.checked
        })
    }


    bigopen = (e) => {
        this.setState({
            opers: true
        })

    }

    bigopens = (e) => {
        this.setState({
            opers: false,
            operss: false,
            opensmail: false
        })

    }

    bigopensmal = (e) => {
        this.setState({
            opensmail: true
        })

    }

    sbigopen = (e) => {
        this.setState({
            operss: true
        })

    }

    // sbigopens=()=>{
    //     this.setState({
    //         operss:false
    //     })
    // }

    onChangeTimePicker = (value, dateString) => {
        this.setState({
            TimePickervalue: dateString=== ""?"":moment(handleDateStrings(dateString))
        })
    }

	// 附件相关 START
    handleChange = (info) => {
			if(info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
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


    handleSubmit=()=>{
        // console.log(this.state.languagewrite)
        // console.log(this.state.systemenvironment)
        // console.log(this.state.testcoderunmode)
        var  attachment_ids;
        if (this.state.fileList) {
            attachment_ids = this.state.fileList.map(item => {
                return item.response ? item.response.id : item.id
            })
        }
        // console.log(attachment_ids);
        // var data={
        //     language:"",
        //     runtime:"",
        //     run_method:"",
        //     attachment_id:"",
        // }
        // axios.post(url,data
        // ).then((response) => {
        //     if (response.data) {
        //         // const { id } = response.data;
        //         // if (id) {
        //             this.props.showNotification('提交成功！');
        //             // this.props.history.push(`/courses/${cid}/graduation_topics`);
        //         // }
        //     }
        // })



    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let {testcoderunmode ,systemenvironment,languagewrite,deleteisnot, fileList,TimePickervalue, scope_partmenttype, opensmail, newshixunlist, name, scope_partment, departmentslist, postapplyvisible, sendsure_applyvalue, postapplytitle, shixun_nametype, main_types, trainee_types, SelectTheCommandtype, opers, datalisttype, onSearchvalue} = this.state;
        let options
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
        // const uploadProps = {
        //     width: 600,
        //     fileList,
        //     multiple: true,
        //     // https://github.com/ant-design/ant-design/issues/15505
        //     // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
        //     // showUploadList: false,
        //     action:  `${getUrl()}/api/attachments.json`,
        //     onChange: this.handleChange,
        //     onRemove: this.onAttachmentRemove,
        //     beforeUpload: (file) => {
        //         // console.log('beforeUpload', file.name);
        //         const isLt50M = file.size / 1024 / 1024 < 50;
        //         if (!isLt50M) {
        //             this.props.showNotification('文件大小必须小于150MB!');
        //         }
        //         return isLt50M;
        //     },
        // };

        return (

            <div className="newMain clearfix" onClick={this.bigopens}>
                <div className="educontent mt20 mb60 clearfix">
                    <div className="new_shixun">

                        <div className="mb10 edu-back-white">
                            <p className="padding10-20 bor-bottom-greyE color-grey-3 clearfix">
                                <span className="fl font-18 lineh-35">创建实训</span>
															{this.props.user&&this.props.user.main_site===true?<a className="fr font-16 mt3 color-blue" href="/forums/2943"
                                   target="_blank">实训制作指南</a>:""}
                            </p>

                            <div className="padding30-20">
                                <p className="color-grey-6 font-16 mb15">实训名称</p>
                                <div className="df">
                                    <span className="mr30 color-orange pt10">*</span>
                                    <div className="flex1">
                                        <input
                                            className={shixun_nametype === true ? "input-100-45 greyInput bor-red" : "input-100-45 greyInput"}
                                            id="shixun_name" maxLength="60"
                                            name="shixun[name]"
                                            value={name}
                                            onInput={this.shixunname}
                                            placeholder="请输入实训名称，最多60个字符"
                                            size="60"
                                            type="text"
                                            style={{width: shixun_nametype === false ? '1123px' : '93%'}}
                                        />
                                        <span
                                            className={shixun_nametype === true ? "color-orange fr mt10" : "color-orange fr none"}
                                            id="shixun_name_notice">
                                                <i className="fa fa-exclamation-circle mr3"></i>必填项
                                            </span>
                                    </div>

                                </div>
                            </div>

                        </div>


                        <div className="mb10 edu-back-white padding30-20">

                            <p className="color-grey-6 font-16 mb15">简介</p>

                            <div className="df">
                                <div className="flex1 break_word show_content_grey new_li" id="memoMD">
                                    <textarea style={{display: 'none'}} id="evaluate_script_shows"
                                              name="content"></textarea>
                                </div>
                            </div>
                            <p id="e_tip_memoNew" className="edu-txt-right color-grey-cd font-12"></p>
                            <p id="e_tips_memoNew" className="edu-txt-right color-grey-cd font-12"></p>
                        </div>

                        <div className="mb10 edu-back-white padding30-20">
                            <p className="color-grey-6 font-16 mb15">技术平台</p>
                            <div className="clearfix mb20">
                                <span className="mr30 color-orange pt5 fl">*</span>
                                <div className="width15 fl mr20"
																		 // onMouseLeave={this.bigopens}
																>
                                    <Select placeholder="请选择主类别"
                                            style={{width: 180}}
                                            onChange={this.bigClass}
                                            // onMouseEnter={this.bigopen}
                                            onSelect={this.bigopens}
                                            defaultOpen={false}
                                            // open={opers}
                                    >
                                        {
                                            newshixunlist === undefined ? "" : newshixunlist.main_type.map((item, key) => {
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
                                    <p className="edu-txt-left font-12">
                                        列表中没有？
                                        <a className="color-blue" onClick={this.post_apply}> 申请新建</a>
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
                                        {/*<Form  onSubmit={this.handleSubmit}>*/}
                                        <div>
                                            <li className="clearfix ml82" >
                                                <label className="fl mt10 "><span
                                                    className="color-red fl mt3">*</span>语言：&nbsp;&nbsp;</label>
                                                <textarea className="fl task-form-80 task-height-150"
																													style={{width:'89%',height:'100px'}}
                                                          onInput={this.setlanguagewrite}
                                                          value={languagewrite}
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
                                                          value={systemenvironment}
                                                          placeholder="请填写该镜像是基于什么linux系统环境,代码运行环境"
                                                          id="demand_info"></textarea>
                                            </li>
																					<div className={"color-red shixunspanred"}>{this.state.systemenvironmenttype===true?"请填写该镜像语言系统环境":""}</div>
                                            <li className="clearfix">
                                                <label className="fl mt10" ><span
                                                    className="color-red fl mt3">*</span>测试代码运行方式：&nbsp;&nbsp;</label>

                                                <textarea className="fl task-form-80 task-height-150 "
                                                          onInput={this.settestcoderunmode}
                                                          value={testcoderunmode}
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
																									<Upload {...uploadProps}>
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
                                        {/*</Form>*/}
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
                                                <a className="task-btn task-btn-orange"
                                                   onClick={this.yeshidemodel}>知道啦</a>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                                <div className=" fl pr mr20"
																		 // onMouseLeave={this.bigopens}
																>
                                    <Select mode="multiple" placeholder="请选择小类别"
                                            style={{minWidth: 180}}
                                            onChange={this.littleClass}
                                            // onMouseEnter={this.bigopensmal}
                                            onSelect={this.bigopens}
                                            defaultOpen={false}
                                            // open={opensmail}
                                    >
                                        {
                                            newshixunlist === undefined ? "" : newshixunlist.small_type.map((item, key) => {
                                                return (
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
                                <p className="fl ml10 color-grey-9 mt5">请在配置页面完成后续的评测脚本设置操作</p>
                                <div style={{width: '57px'}} className="ml20 fl">
                                    <span className={main_types === true ? "color-orange fl" : "color-orange fl none"}
                                          id="shixun_tech_platform_notice"><i
                                        className="fa fa-exclamation-circle mr3"></i>必填项</span>
                                </div>
                            </div>
                        </div>


                        <div className="mb10 edu-back-white padding30-20">
                            <p className="color-grey-6 font-16 mb20">命令行</p>
                            <div className="pl25">
                                <RadioGroup onChange={this.SelectTheCommand} value={this.state.webssh}>
                                    <Radio className="radioStyle" value={0}><span>无命令行窗口</span> <span
                                      className="color-grey-9">（选中则不给学员的实践任务提供命令窗口）</span></Radio>
                                    <Radio className="radioStyle" value={1}><span>命令行练习窗口</span> <span
                                      className="color-grey-9">（选中则给学员提供用于练习操作的命令行窗口）</span></Radio>
                                    <Radio className="radioStyle" value={2}><span>命令行评测窗口</span> <span
                                      className="color-grey-9">（选中则给学员提供用于关卡评测的命令行窗口）</span></Radio>
                                    <Checkbox style={{display: SelectTheCommandtype ? "block" : "none"}}
                                              className={"ml36"} checked={this.state.multi_webssh}
                                              onChange={this.SelectTheCommandonChange}>
                                        多个命令行窗口<span className="color-grey-9">（选中则允许学员同时开启多个命令行窗口）</span>
                                    </Checkbox>
                                </RadioGroup>
                            </div>
                        </div>


                        <div className="mb10 edu-back-white padding30-20">
                            <p className="color-grey-6 font-16 mb20">公开程度</p>
                            <div className="pl25">
                                <RadioGroup onChange={this.Selectpublic} value={this.state.use_scope}>
                                    <Radio className="radioStyle" value={0}><span>对所有公开</span> <span
                                      className="color-grey-9">(选中则所有已被试用授权的用户可以学习)</span></Radio>
                                    <Radio className="radioStyle" value={1}><span>对指定单位公开</span> <span
                                      className="color-grey-9">(选中则下方指定单位的已被试用授权的用户可以学习)</span></Radio>
                                </RadioGroup>

                                <div className="clearfix none" id="unit-all"
                                     style={{display: this.state.scopetype === false ? 'none' : 'block'}}>
                                    <div className="fl ml25">
                                        <div className="fl" id="unit-input-part" style={{width: '100%'}}>
                                            <div id="person-unit" className="fl pr mr10">
                                                <div className="shixunScopeInput fl">
                                                    <Select
                                                        style={{width: '200px'}}
                                                        placeholder="请输入并选择单位名称"
                                                        onChange={(value) => this.shixunScopeInput(value)}
                                                        onSearch={this.shixunHandleSearch}
                                                        showSearch
                                                        defaultActiveFirstOption={false}
                                                        showArrow={false}
                                                        filterOption={false}
                                                        notFoundContent={null}
                                                        value={onSearchvalue}
                                                        className={scope_partmenttype === true ? "bor-red" : ""}
                                                        // ifd={key}
                                                    >
                                                        {options}
                                                    </Select>
                                                </div>
                                                <span className="color-grey-9">(搜索选中添加单位名称)</span>
																							{this.state.datalisttype===true?<span className="color-red ml10">请勿选择重复单位</span>:""}
                                                {/*<a className="white-btn orange-btn fl mt1 use_scope-btn" onClick={this.adduse_scopeinput}>+ 添加</a>*/}
                                            </div>
                                        </div>

                                        <div style={{width: '100%'}}>
                                            <div className="mt20 clearfix" id="task_tag_content">
                                                {
                                                    scope_partment === undefined ? "" : scope_partment.map((item, key) => {
                                                        return (
                                                            <li className="task_tag_span" key={key}><span>{item}</span>
                                                                <a style={{color: 'rgba(0,0,0,.25)'}}
                                                                   onClick={() => this.deleteScopeInput(key)}>×</a>
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

                                        <span className={scope_partmenttype === true ? "color-orange ml20 fl" : "none"}
                                              id="public_unit_notice">
                                        <i className="fa fa-exclamation-circle mr3"></i>
                                    请选择需要公开的单位
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="mb10 edu-back-white padding30-20">
                            <p className="color-grey-6 font-16 mb20">发布信息</p>
                            <div className="clearfix"
																 // onMouseLeave={this.bigopens}
														>
                                <div className="clearfix mb20 pl25">
                                    <span className="fl color-grey-6 lineh-30 mr20"><span
                                        className="mr10 color-orange mt2 fl">*</span>面向学员：</span>
                                    <div className="with15 fl pr">
                                        <Select placeholder="请选择学员类别"
                                                style={{width: 180}}
                                                onChange={this.Selectthestudent}
                                                // onMouseEnter={this.sbigopen}
                                                onSelect={this.bigopens}
                                                // open={operss}
                                        >
                                            <Option value={1}>初级学员</Option>
                                            <Option value={2}>中级学员</Option>
                                            <Option value={3}>高级学员</Option>
                                            <Option value={4}>顶级学员</Option>
                                        </Select>
                                    </div>
                                    <span className="fl ml20 mt3 color-grey">实训难易度定位，不限定用户群体</span>
                                    <div style={{width: '57px'}} className="ml20 mt2 fl">
                                        <span
                                            className={trainee_types === true ? "color-orange fl" : "color-orange fl none"}
                                            id="shixun_tech_platform_notice"><i
                                            className="fa fa-exclamation-circle mr3"></i>必填项</span>
                                    </div>
                                </div>
                            </div>
                            <li className="mb20 pl25">
                                <span className="fl edu-txt-right color-grey-6 mr20"
                                      style={{"width": "86px"}}>复制：</span>
                                <Checkbox onChange={this.Teacherscopy}></Checkbox>
                                <label style={{top: '6px'}} className="color-grey-6 ml10">勾选则允许已认证的教师复制该实训</label>
                            </li>
                            <div className="clearfix pl25">
                                <span className="fl edu-txt-right color-grey-6 lineh-30 mr20"
                                      style={{"width": "86px"}}>开启时间：</span>
                                <li className="fl">
                                    <DatePicker
                                        showToday={false}
                                        locale={locale}
																				showTime={{ format: 'HH:mm' }}
																				style={{"width": "184px"}}
																				format="YYYY-MM-DD HH:mm"
                                        placeholder="请选择开启时间"
                                        onChange={this.onChangeTimePicker}
																				value={TimePickervalue && moment(TimePickervalue, "YYYY-MM-DD HH:mm")}
																				disabledDate={disabledDate}
																				disabledTime={disabledDateTime}
																				dropdownClassName="hideDisable"
                                    />
                                    <label style={{top: '6px'}} className="color-grey-6 ml10">
                                        （为空，则学员在实训发布后，能随时开启实训挑战；否则，学员在开启时间后，才能开启实训挑战）
                                    </label>
                                </li>
                            </div>
                        </div>
                        {/*<div className="mb10 edu-back-white padding30-20">*/}
                        {/*<p className="color-grey-6 font-16 mb10">VNC图形化</p>*/}
                        {/*<li className="mb20">*/}
                        {/*<Checkbox onChange={this.TeachersUbuntu}></Checkbox>*/}
                        {/*<label style={{top:'6px'}}  className="color-grey-6 ml10">勾选则给学员的实践任务提供Ubuntu系统图形化实践窗口，否则不提供</label>*/}
                        {/*</li>*/}
                        {/*</div>*/}


                        <div className="clearfix mt30">
														<Button className="defalutSubmitbtn fl mr20" loading={this.state.bottonloading}  onClick={this.submit_new_shixun}>
															提交
														</Button>
                            <a href="/shixuns" className="defalutCancelbtn fl">取消</a>
                        </div>


                    </div>
                </div>
            </div>

        );
    }
}
const NewshixunsNew = Form.create({ name: 'newshixunsnew' })(Newshixuns);
export default SnackbarHOC()(TPMIndexHOC(NewshixunsNew));






