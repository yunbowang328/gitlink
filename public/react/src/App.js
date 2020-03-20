import React, {Component} from 'react';
import './public-path';
import logo from './logo.svg';
import './App.css';
import {ConfigProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import axios from 'axios';
import '@icedesign/base/dist/ICEDesignBase.css';

import '@icedesign/base/index.scss';

import LoginDialog from './modules/login/LoginDialog';
import Notcompletedysl from './modules/user/Notcompletedysl';
import Trialapplicationysl from './modules/login/Trialapplicationysl';
import Trialapplicationreview from './modules/user/Trialapplicationreview';
import Addcourses from "./modules/courses/coursesPublic/Addcourses";
import AccountProfile from "./modules/user/AccountProfile";
import Accountnewprofile from './modules/user/Accountnewprofile';
import Trialapplication from './modules/login/Trialapplication';
import Certifiedprofessional from './modules/modals/Certifiedprofessional';
import NotFoundPage from './NotFoundPage'

import Loading from './Loading'

import Loadable from 'react-loadable';


import moment from 'moment'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

// import './AppConfig'

import history from './history';

import {SnackbarHOC} from 'educoder'
import {initAxiosInterceptors} from './AppConfig'
import { Provider } from 'react-redux';
import configureStore from './redux/stores/configureStore';
// ！！！tpi需要这个来加载css
import {TPMIndexHOC} from './modules/tpm/TPMIndexHOC';
const store = configureStore();

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#4CACFF',
			contrastText: 'rgba(255, 255, 255, 0.87)'
		},
		secondary: {main: '#4CACFF'}, // #11cb5f This is just green.A700 as hex.
	},
});
//
// const Trialapplication= Loadable({
//     loader: () =>import('./modules/login/Trialapplication'),
//     loading:Loading,
// })
//登入
const EducoderLogin = Loadable({
	loader: () => import('./modules/login/EducoderLogin'),
	loading: Loading,
})


//微信登录
const Otherlogin=Loadable({
	loader: () => import('./modules/login/Otherlogin'),
	loading: Loading,
})

//微信登录
const  Loginqq=Loadable({
	loader: () => import('./modules/login/Loginqq'),
	loading: Loading,
})


const Otherloginstart=Loadable({
	loader: () => import('./modules/login/Otherloginstart'),
	loading: Loading,
})
const Otherloginsqq=Loadable({
	loader: () => import('./modules/login/Otherloginqq'),
	loading: Loading,
})
// const TestIndex = Loadable({
// 	loader: () => import('./modules/test'),
// 	loading: Loading,
// })

const IndexWrapperComponent = Loadable({
	loader: () => import('./modules/page/IndexWrapper'),
	loading: Loading,
})

const CommentComponent = Loadable({
	loader: () => import('./modules/comment/CommentContainer'),
	loading: Loading,
})

// const TestMaterialDesignComponent = Loadable({
// 	loader: () => import('./modules/test/md/TestMaterialDesign'),
// 	loading: Loading,
// })
// const TestCodeMirrorComponent = Loadable({
// 	loader: () => import('./modules/test/codemirror/TestCodeMirror'),
// 	loading: Loading,
// })

// const TestComponent = Loadable({
// 	loader: () => import('./modules/test/TestRC'),
// 	loading: Loading,
// })
// const TestUrlQueryComponent = Loadable({
// 	loader: () => import('./modules/test/urlquery/TestUrlQuery'),
// 	loading: Loading,
// })

const TPMIndexComponent = Loadable({
	loader: () => import('./modules/tpm/TPMIndex'),
	loading: Loading,
})
const TPMShixunsIndexComponent = Loadable({
	loader: () => import('./modules/tpm/shixuns/ShixunsIndex'),
	loading: Loading,
})

//实训课程（原实训路径）
const ShixunPaths = Loadable({
	loader: () => import('./modules/paths/Index'),
	loading: Loading,
})

//在线课堂
const CoursesIndex = Loadable({
	loader: () => import('./modules/courses/Index'),
	loading: Loading,
})
const SearchPage = Loadable({
	loader: () => import('./search/SearchPage'),
	loading: Loading,
})

// 课堂讨论
// const BoardIndex = Loadable({
//   loader: () => import('./modules/courses/boards/BoardIndex'),
//   loading:Loading,
// })

// //课堂普通作业&分组作业
// const CoursesWorkIndex = Loadable({
//   loader: () => import('./modules/courses/busyWork/Index'),
//   loading:Loading,
// })
//

// const TPMShixunchildIndexComponent = Loadable({
//     loader: () => import('./modules/tpm/shixunchild/ShixunChildIndex'),
//     loading: Loading,
//   })


// const TPMshixunfork_listIndexComponent = Loadable({
//     loader: () => import('./modules/tpm/shixunchild/Shixunfork_list'),
//     loading: Loading,
//   })


const ForumsIndexComponent = Loadable({
	loader: () => import('./modules/forums/ForumsIndex'),
	loading: Loading,
})

const ProjectIndex = Loadable({
	loader: () => import('./forge/Index'),
	loading: Loading,
})

// trustie plus forum
// const TPForumsIndexComponent = Loadable({
//   loader: () => import('./modules/tp-forums/TPForumsIndex'),
//   loading: Loading,
// })


// const TestPageComponent = Loadable({
//   loader: () => import('./modules/page/Index'),
//   loading: Loading,
// })


//新建实训
const Newshixuns = Loadable({
	loader: () => import('./modules/tpm/newshixuns/Newshixuns'),
	loading: Loading,
})


//实训首页
const ShixunsHome = Loadable({
	loader: () => import('./modules/home/shixunsHome'),
	loading: Loading,
})


const CompatibilityPageLoadable = Loadable({
	loader: () => import('./modules/common/CompatibilityPage'),
	loading: Loading,
})

//403页面
const Shixunauthority = Loadable({
	loader: () => import('./modules/403/Shixunauthority'),
	loading: Loading,
})


//404页面
const Shixunnopage = Loadable({
	loader: () => import('./modules/404/Shixunnopage'),
	loading: Loading,
})

//500页面
const http500 = Loadable({
	loader: () => import('./modules/500/http500'),
	loading: Loading,
})

// 登录注册
const LoginRegisterPage = Loadable({
	loader: () => import('./modules/user/LoginRegisterPage'),
	loading: Loading,
})
const AccountPage = Loadable({
	loader: () => import('./modules/user/AccountPage'),
	loading: Loading,
})

// 个人主页
const UsersInfo = Loadable({
	loader: () => import('./modules/user/usersInfo/Infos'),
	loading: Loading,
})
const InfosIndex = Loadable({
	loader: () => import('./modules/user/usersInfo/InfosIndex'),
	loading: Loading,
})
// 题库
const BanksIndex = Loadable({
	loader: () => import('./modules/user/usersInfo/banks/BanksIndex'),
	loading: Loading,
})


// 教学案例
const MoopCases =  Loadable({
	loader: () => import('./modules/moop_cases/index'),
	loading: Loading,
})

// 兴趣页面
const Interestpage = Loadable({
	loader: () => import('./modules/login/EducoderInteresse'),
	loading: Loading,
})

//众包创新
// const ProjectPackages=Loadable({
// 	loader: () => import('./modules/projectPackages/ProjectPackageIndex'),
// 	loading: Loading,
// })

//竞赛
const NewCompetitions=Loadable({
	loader: () => import('./modules/competitions/Competitions'),
	loading: Loading,
})

//黑客松定制竞赛
const Osshackathon=Loadable({
	loader: () => import('./modules/osshackathon/Osshackathon'),
	loading: Loading,
})

const Messagerouting= Loadable({
	loader: () => import('./modules/message/js/Messagerouting'),
	loading: Loading,
})

const Topicbank= Loadable({
	loader: () => import('./modules/topic_bank/Topic_bank'),
	loading: Loading,
})

const Help = Loadable({
	loader: () => import('./modules/help/Help'),
	loading: Loading,
})

const Ecs = Loadable({
	loader: () => import('./modules/ecs/Ecs'),
	loading: Loading,
})

// 添加开发者社区
const Developer = Loadable({
	loader: () => import('./modules/developer'),
	loading: Loading
})
// 试题库
const Headplugselection = Loadable({
	loader: () => import('./modules/question/Question'),
	loading: Loading
})

//试题库新建 //题库编辑
const Questionitem_banks = Loadable({
	loader: () => import('./modules/question/Questionitem_banks'),
	loading: Loading
})

//试卷库
const Testpaperlibrary= Loadable({
	loader: () => import('./modules/testpaper/Testpaperlibrary'),
	loading: Loading
})
//试卷编辑
const Paperlibraryeditid= Loadable({
	loader: () => import('./modules/testpaper/Paperlibraryeditid'),
	loading: Loading
})
//试卷查看
const Paperlibraryseeid= Loadable({
	loader: () => import('./modules/testpaper/Paperlibraryseeid'),
	loading: Loading
})
//人工组卷
const Paperreview= Loadable({
	loader: () => import('./modules/question/Paperreview'),
	loading: Loading
})

//智能组卷
const Integeneration= Loadable({
	loader: () => import('./modules/testpaper/Intecomponents'),
	loading: Loading
})

// 学院统计
const College = Loadable({
	loader: () => import('./college/College'),
	loading: Loading
})

// 开发者编辑模块
const NewOrEditTask = Loadable({
	loader: () => import('./modules/developer/newOrEditTask'),
	loading: Loading
});
// 学员学习
const StudentStudy = Loadable({
	loader: () => import('./modules/developer/studentStudy'),
	loading: Loading
});
// 提交记录详情
const RecordDetail = Loadable({
	loader: () => import('./modules/developer/recordDetail'),
	loading: Loading
});
// jupyter tpi
const JupyterTPI = Loadable({
	loader: () => import('./modules/tpm/jupyter'),
	loading: Loading
});
// 微信代码编辑器
// const WXCode = Loadable({
// 	loader: () => import('./modules/wxcode'),
// 	loading: Loading
// });
// //个人竞赛报名
// const PersonalCompetit = Loadable({
// 	loader: () => import('./modules/competition/personal/PersonalCompetit.js'),
// 	loading: Loading,
// });
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			Addcoursestype:false,
			Addcoursestypes:false,
			mydisplay:false,
			occupation:0,
			mygetHelmetapi: null,
		}

	}
	HideAddcoursestypess=(i)=>{
		console.log("调用了");
		this.setState({
			Addcoursestype:false,
			Addcoursestypes:false,
			mydisplay:true,
			occupation:i,
		})
	};
	hideAddcoursestypes=()=>{
		this.setState({
			Addcoursestypes:false
		})
	};
	ModalCancelsy=()=>{
		this.setState({
			mydisplay:false,
		})
		window.location.href = "/";
	};
	ModalshowCancelsy=()=>{
		this.setState({
			mydisplay:true,
		})
	};

	disableVideoContextMenu = () => {
		window.$( "body" ).on( "mousedown", "video",  function(event) {
			if(event.which === 3) {
				window.$('video').bind('contextmenu',function () { return false; });
			} else {
				window.$('video').unbind('contextmenu');
			}
		});
	}
	componentDidMount() {
		document.title = "loading...";
		this.disableVideoContextMenu();
		// force an update if the URL changes
		history.listen(() => {
			this.forceUpdate()
			const $ = window.$
			// https://www.trustie.net/issues/21919 可能会有问题
			$("html").animate({ scrollTop: $('html').scrollTop() - 0 })
		});

		initAxiosInterceptors(this.props);
		// 顶部和底部的动态设置
		//  this.getAppdata();
		//
		// axios.interceptors.response.use((response) => {
		// 	// console.log("response"+response);
		// 	if(response!=undefined)
		// 		// console.log("response"+response.data.statu);
		// 	if (response&&response.data.status === 407) {
		// 		this.setState({
		// 			isRenders: true,
		// 		})
		// 	}
		// 	return response;
		// }, (error) => {
		// 	//TODO 这里如果样式变了会出现css不加载的情况
		// });

		window.addEventListener('error', (event) => {
			const msg = `${event.type}: ${event.message}`;
			console.log(msg)
		});
	}
	//修改登录方法
	Modifyloginvalue=()=>{
		this.setState({
			isRender:false,
		})
	};

	//获取数据为空的时候
	gettablogourlnull = () => {
		this.setState({
			mygetHelmetapi: undefined
		});
		document.title = "EduCoder";
		var link = document.createElement('link'),
			oldLink = document.getElementById('dynamic-favicon');
		link.id = 'dynamic-favicon';
		link.rel = 'shortcut icon';
		link.href = "/forgeplus-react/build/./favicon.ico";
		if (oldLink) {
			document.head.removeChild(oldLink);
		}
		document.head.appendChild(link);
	};

	//获取数据的时候
	gettablogourldata = (response) => {
		document.title = response.data.setting.name;
		var link = document.createElement('link'),
			oldLink = document.getElementById('dynamic-favicon');
		link.id = 'dynamic-favicon';
		link.rel = 'shortcut icon';
		link.href = '/' + response.data.setting.tab_logo_url;
		if (oldLink) {
			document.head.removeChild(oldLink);
		}
		document.head.appendChild(link);
	}
  //获取当前定制信息
	getAppdata=()=>{
		let url = "/setting.json";
		axios.get(url).then((response) => {
			// console.log("app.js开始请求/setting.json");
			// console.log("获取当前定制信息");
			if(response){
				if(response.data){
					this.setState({
						mygetHelmetapi:response.data.setting
					});
					//存储配置到游览器
					localStorage.setItem('chromesetting',JSON.stringify(response.data.setting));
					localStorage.setItem('chromesettingresponse',JSON.stringify(response));
					try {
						if (response.data.setting.tab_logo_url) {
							this.gettablogourldata(response);
						} else {
							this.gettablogourlnull();
						}
					} catch (e) {
						this.gettablogourlnull();
					}


				} else {

					this.gettablogourlnull();

				}

			} else {
				this.gettablogourlnull();

			}

		}).catch((error) => {
			this.gettablogourlnull();

		});
	};

	render() {
		return (
			<Provider store={store}>
				<ConfigProvider locale={zhCN}>
					<MuiThemeProvider theme={theme}>
						<Accountnewprofile {...this.props}{...this.state}/>
						<LoginDialog {...this.props} {...this.state}  Modifyloginvalue={()=>this.Modifyloginvalue()}></LoginDialog>
						<Notcompletedysl {...this.props} {...this.state}></Notcompletedysl>
						<Trialapplicationysl  {...this.props} {...this.state}></Trialapplicationysl>
						<Trialapplicationreview  {...this.props} {...this.state}></Trialapplicationreview>
						<Addcourses {...this.props} {...this.state}  HideAddcoursestypess={(i)=>this.HideAddcoursestypess(i)}/>
						<AccountProfile {...this.props} {...this.state}   />
						<Certifiedprofessional {...this.props} {...this.state}  ModalCancelsy={this.ModalCancelsy} ModalshowCancelsy={this.ModalshowCancelsy}/>
						<Router>
							<Switch>

								{/* 项目 */}
								<Route path="/projects"
									render={
										(props) => {

											return (<ProjectIndex {...this.props} {...props} {...this.state} />)
										}
									}></Route>

								<Route exact path="/"
									// component={ShixunsHome}
									render={
										(props)=>(<ProjectIndex {...this.props} {...props} {...this.state}></ProjectIndex>)
									}
								/>
								{/*题库*/}
								<Route path="/topicbank/:username/:topicstype"
											render={
												(props) => {

													return (<Topicbank {...this.props} {...props} {...this.state} />)
												}
											}></Route>
								{/*题库*/}
								<Route path="/topicbank/:topicstype"
											render={
												(props) => {

													return (<Topicbank {...this.props} {...props} {...this.state} />)
												}
											}></Route>
								{/*/!*众包创新*!/*/}
								{/*<Route path={"/crowdsourcing"} component={ProjectPackages}/>*/}
								{/*竞赛*/}
								<Route path={"/competitions"}
											render={
												(props) => {

													return (<NewCompetitions {...this.props} {...props} {...this.state} />)
												}
											}></Route>

								{/*黑客松定制竞赛*/}
								<Route
									path={"/osshackathon"}
									render={
										(props)=>{
											return(
												<Osshackathon {...this.props} {...props} {...this.state} />
											)
										}
									}
								/>

								{/*认证*/}
								<Route path="/account" component={AccountPage}/>

								{/*403*/}
								<Route path="/403" component={Shixunauthority}/>

								<Route path="/500" component={http500}/>

								{/*404*/}
								<Route path="/nopage" component={Shixunnopage}/>

								<Route path="/compatibility" component={CompatibilityPageLoadable}/>
								<Route
									path="/login"
									render={
										(props) => {

											return (<EducoderLogin {...this.props} {...props} {...this.state} />)
										}
									}
								/>
								<Route
									path="/register"
									render={
										(props) => {

											return (<EducoderLogin {...this.props} {...props} {...this.state} />)
										}
									}
								/>
								<Route
									path="/otherloginstart" component={Otherloginstart}
								/>
								<Route
									path={"/otherloginqq"} component={Otherloginsqq}
								/>
								<Route
									path="/otherlogin" component={Otherlogin}
								/>
								<Route
									path="/loginqq" component={Loginqq}
								/>

								<Route path="/users/:username"
									render={
										(props) => {

											return (<InfosIndex {...this.props} {...props} {...this.state} />)
										}
								}></Route>

								<Route path="/banks"
									render={
										(props) => {
											return (<BanksIndex {...this.props} {...props} {...this.state} />)
										}
								}></Route>
								{/*<Route*/}
									{/*path="/personalcompetit"*/}
									{/*render={*/}
										{/*(props) => (<PersonalCompetit {...this.props} {...props} {...this.state}></PersonalCompetit>)*/}
									{/*}*/}
								{/*/>*/}
								<Route
									path="/changepassword"
									render={
										(props) => {

											return (<EducoderLogin {...this.props} {...props} {...this.state} />)
										}
									}
								/>
								{/*<Route*/}
								{/*	path="/interesse" component={Interestpage}*/}

								{/*/>*/}
								<Route path="/shixuns/new" component={Newshixuns}>
								</Route>
								<Route path="/colleges/:id/statistics"
											 render={
												 (props) => (<College  {...this.props} {...props} {...this.state} />)
											 }/>
								{/* jupyter */}
								<Route path="/tasks/:identifier/jupyter/"
									render={
										(props) => {
										return (<JupyterTPI {...this.props} {...props} {...this.state}/>)
									}
								}
								/>

								<Route path="/myproblems/record_detail/:id"
											 render={
												 (props) => (<RecordDetail  {...this.props} {...props} {...this.state} />)
											 }
								/>
								<Route
									path="/problems/:id/edit"
									render={
										(props) => (<NewOrEditTask {...this.props} {...props} {...this.state} />)
									} />
								<Route path="/Integeneration/:type/:id"
											 render={
												 (props) => (<Paperreview  {...this.props} {...props} {...this.state} />)
											 }/>
								<Route path="/paperreview/:type"
											 render={
												 (props) => (<Paperreview  {...this.props} {...props} {...this.state} />)
											 }/>
								<Route path="/paperlibrary/edit/:id"
											 render={
												 (props) => (<Paperlibraryeditid  {...this.props} {...props} {...this.state} />)
											 }/>

								<Route path="/paperlibrary/see/:id"
											 render={
												 (props) => (<Paperlibraryseeid  {...this.props} {...props} {...this.state} />)
											 }/>

								<Route path="/myproblems/:id/:tab?"
											 render={
												 (props) => (<StudentStudy  {...this.props} {...props} {...this.state} />)
											 } />
								<Route path="/question/edit/:id"
											 render={
												 (props) => (<Questionitem_banks  {...this.props} {...props} {...this.state} />)
											 } />

								<Route path="/question/newitem"
											 render={
												 (props) => (<Questionitem_banks  {...this.props} {...props} {...this.state} />)
											 } />
								<Route path="/question/:type"
											 render={
												 (props) => (<Headplugselection  {...this.props} {...props} {...this.state} />)
											 } />
								<Route path="/paperlibrary"
											 render={
												 (props) => (<Testpaperlibrary  {...this.props} {...props} {...this.state} />)
											 }/>

								<Route path="/Integeneration"
											 render={
												 (props) => (<Integeneration  {...this.props} {...props} {...this.state} />)
											 }/>

								<Route path="/problems"
											 render={
												 (props) => (<Developer  {...this.props} {...props} {...this.state} />)
											 }/>

								<Route path="/question"
											 render={
												 (props) => (<Headplugselection  {...this.props} {...props} {...this.state} />)
											 }/>
								{/*<Route path="/wxcode/:identifier?" component={WXCode}*/}
								{/*	render={*/}
								{/*		(props)=>(<WXCode {...this.props} {...props} {...this.state}></WXCode>)*/}
								{/*	}*/}
								{/*/>*/}
								<Route exact path="/"
											// component={ShixunsHome}
											render={
												(props)=>(<ShixunsHome {...this.props} {...props} {...this.state}></ShixunsHome>)
											}
								/>
								<Route component={Shixunnopage}/>

							</Switch>
						</Router>
					</MuiThemeProvider>
				</ConfigProvider>
			</Provider>
		);
	}
}

// moment国际化，设置为中文
moment.defineLocale('zh-cn', {
	months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
	longDateFormat: {
		LT: 'Ah点mm分',
		LTS: 'Ah点m分s秒',
		L: 'YYYY-MM-DD',
		LL: 'YYYY年MMMD日',
		LLL: 'YYYY年MMMD日Ah点mm分',
		LLLL: 'YYYY年MMMD日ddddAh点mm分',
		l: 'YYYY-MM-DD',
		ll: 'YYYY年MMMD日',
		lll: 'YYYY年MMMD日Ah点mm分',
		llll: 'YYYY年MMMD日ddddAh点mm分'
	},
	meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	meridiemHour: function (hour, meridiem) {
		if (hour === 12) {
			hour = 0;
		}
		if (meridiem === '凌晨' || meridiem === '早上' ||
			meridiem === '上午') {
			return hour;
		} else if (meridiem === '下午' || meridiem === '晚上') {
			return hour + 12;
		} else {
			// '中午'
			return hour >= 11 ? hour : hour + 12;
		}
	},
	meridiem: function (hour, minute, isLower) {
		var hm = hour * 100 + minute;
		if (hm < 600) {
			return '凌晨';
		} else if (hm < 900) {
			return '早上';
		} else if (hm < 1130) {
			return '上午';
		} else if (hm < 1230) {
			return '中午';
		} else if (hm < 1800) {
			return '下午';
		} else {
			return '晚上';
		}
	},
	calendar: {
		sameDay: function () {
			return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
		},
		nextDay: function () {
			return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
		},
		lastDay: function () {
			return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
		},
		nextWeek: function () {
			var startOfWeek, prefix;
			startOfWeek = moment().startOf('week');
			prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
			return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
		},
		lastWeek: function () {
			var startOfWeek, prefix;
			startOfWeek = moment().startOf('week');
			prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
			return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
		},
		sameElse: 'LL'
	},
	ordinalParse: /\d{1,2}(日|月|周)/,
	ordinal: function (number, period) {
		switch (period) {
			case 'd':
			case 'D':
			case 'DDD':
				return number + '日';
			case 'M':
				return number + '月';
			case 'w':
			case 'W':
				return number + '周';
			default:
				return number;
		}
	},
	relativeTime: {
		future: '%s内',
		past: '%s前',
		s: '几秒',
		m: '1分钟',
		mm: '%d分钟',
		h: '1小时',
		hh: '%d小时',
		d: '1天',
		dd: '%d天',
		M: '1个月',
		MM: '%d个月',
		y: '1年',
		yy: '%d年'
	},
	week: {
		// GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
		dow: 1, // Monday is the first day of the week.
		doy: 4  // The week that contains Jan 4th is the first week of the year.
	}
});
export default SnackbarHOC()(App) ;
