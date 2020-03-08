import React, {Component} from "react";
import moment from 'moment';
import { SnackbarHOC,getImageUrl } from 'educoder';
import '../courses/css/members.css';
import "../courses/common/formCommon.css"
import '../courses/css/Courses.css';
import beijintulogontwo from '../../../src/images/login/beijintulogontwo.png';
import educodernet from '../../../src/images/login/educodernet.png';
import LoginRegisterComponent from '../user/LoginRegisterComponent';
import FindPasswordComponent from '../user/FindPasswordComponent';
import passopen from "../../images/login/passopen.png";
//educoder登入页面
var sectionStyle = {
    "height": "100%",
    "width": "100%",
    "min-width": "1000px",
// makesure here is String确保这里是一个字符串，以下是es6写法


};
var imgback = {
   " background-size":"cover",
"background-repeat":"no-repeat",
    backgroundImage: `url(${beijintulogontwo})`,
}
var imgmian ={
     width: "100%",
     background: `url(${beijintulogontwo})`,
     position: "relative",

}

var newContainer={
    background: `url(${beijintulogontwo})`,
    backgroundPosition: "center" ,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "100% 100%",
    height:" 100%",
    width:" 100%",
    position: "absolute",
    top: "0px",
    bottom: "0px",
     minHeight: "100%",
    paddingTop: "40px",

}
class EducoderLogin extends Component {
    constructor(props) {
        super(props);
        if(  props.match.url === "/changepassword" ){
            this.state = {
                showbool: 3,
                logini:3,
                namezh:"",
                passmm:"",
                loginstatus:true,
            }
        }else {
            if(props.match.url === "/login"){
                this.state = {
                    showbool: 1,
                    loginstatus:true,
                    logini:1,
                    namezh:"",
                    passmm:""

                }
            }else if(props.match.url === "/register"){
                // showbool: 1,
                  this.state = {
                    showbool: 1,
                    loginstatus:false,
                    logini:2,
                    namezh:"",
                    passmm:""
                }
            }else{
                this.state = {
                    showbool: 1,
                    logini:1,
                    namezh:"",
                    passmm:"",
                    loginstatus:true,
                }
            }

        }

    }

    componentDidMount() {
     // console.log("EducoderLogin");
     // console.log(this.props);
    }

    Setlogins=(i)=>{
        console.log("96ye");
        console.log(i)
        this.setState({
            logini:i
        })

    }
    gohome=()=>{
        window.location.href="/"
    }
    Setshowbool = (e,name,pass) => {
        if (e===1) {
            this.setState({
                showbool: 1
            })
        } else if(e===3){
            this.setState({
                showbool: 3
            })
        }
    }


    render() {
        let {showbool,loginstatus,logini} = this.state;
        // console.log("EducoderLogingetHelmetapi");
        // console.log(this.props);
        // console.log(this.props.mygetHelmetapi);
        return (
            <div style={newContainer} className=" clearfix" >

                <div >
                    <div style={{
                        "display": "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        "width": "100%"
                    }}>
                        <div style={{cursor:"pointer"}}>
                            {this.props.mygetHelmetapi === null ? ""
                              :
                                this.props.mygetHelmetapi===undefined||this.props.mygetHelmetapi.login_logo_url===null|| this.props.mygetHelmetapi.login_logo_url===undefined?
                                  <img style={{cursor:"pointer"}} onClick={()=>this.gohome()} src={educodernet}/>
                                  :
                                  <img style={{cursor:"pointer"}} onClick={()=>this.gohome()} src={getImageUrl(this.props.mygetHelmetapi.login_logo_url)}/>
                            }

                        </div>


                    </div>
                    {
                        showbool === 1 ?
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                marginTop: "25px",
                            }}>
                                <div>

                                    <LoginRegisterComponent {...this.props} {...this.state}
                                                            Setshowbool={(e)=>this.Setshowbool(e)} ></LoginRegisterComponent>

                                </div>

                            </div>
                        :
                          <div style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                              marginTop: "25px",
                          }}>
                              <div >
                                  <FindPasswordComponent {...this.props} {...this.state}
                                                         Setshowbool={(e)=>this.Setshowbool(e)}></FindPasswordComponent>

                              </div>
                          </div>
                    }
									{this.props.mygetHelmetapi === null ? 	<div style={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
									}}>
										<div className="font-14 color-grey-9 " style={{marginTop:"20px"}}><span className="font-18">©</span>&nbsp;{moment().year()}&nbsp;EduCoder<span className="ml15 mr15">湘ICP备17009477号</span><a href="https://team.trustie.net" style={{"color":"#888"}} target="_blank">Trustie</a>&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;IntelliDE inside.</div>
									</div>:
									this.props.mygetHelmetapi===undefined||this.props.mygetHelmetapi.main_site===null|| this.props.mygetHelmetapi.main_site===undefined?	<div style={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
									}}>
										<div className="font-14 color-grey-9 " style={{marginTop:"20px"}}><span className="font-18">©</span>&nbsp;{moment().year()}&nbsp;EduCoder<span className="ml15 mr15">湘ICP备17009477号</span><a href="https://team.trustie.net" style={{"color":"#888"}} target="_blank">Trustie</a>&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;IntelliDE inside.</div>
									</div>:this.props.mygetHelmetapi.main_site===true?
										<div style={{
											display: "flex",
											justifyContent: "center",
											width: "100%",
										}}>
											<div className="font-14 color-grey-9 " style={{marginTop:"20px"}}><span className="font-18">©</span>&nbsp;{moment().year()}&nbsp;EduCoder<span className="ml15 mr15">湘ICP备17009477号</span><a href="https://team.trustie.net" style={{"color":"#888"}} target="_blank">Trustie</a>&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;IntelliDE inside.</div>
										</div>
										:""
									}

                </div>
            </div>
        )
    }

}
export default  EducoderLogin ;
// showbool === 2 ?
//   <div style={{
//       display: "flex",
//       justifyContent: "center",
//       width: "100%",
//       height: "630px",
//       marginTop: "44px",
//   }}>
//       <InterestpageComponent {...this.props} {...this.state}>
//       </InterestpageComponent>
//   </div>
//   :
