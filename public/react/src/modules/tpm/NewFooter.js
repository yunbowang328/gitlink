import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


class NewFooter extends Component {
  constructor(props) {
    super(props)

  }

  componentWillReceiveProps(newProps, newContext) {

  }


  render() {
    return (
      <div className="newFooter edu-txt-center ">

				<style>
					{
						`
						.newFooter {
								max-height: 140px !important;
								padding-bottom: 20px !important;
						}
						p {
								margin-top: 0;
								margin-bottom:0px !important;
						}
						`
					}
				</style>

				{/*newContainers*/}
        <div className="inner-footer_con">
					{this.props.user&&this.props.user.main_site===true?<div className="footercon">
            {/* <div className="inline mt40 mb5">
              <a href="/" className="fl" style={{height:'70px'}}>
                <img alt="高校智能化教学与实训平台" src={getImageUrl(`images/educoder/headNavLogo.png?1526520218`)} width="70px">
                </img>
              </a>
              <span className="fl color-grey-c cdefault font-28 ml22" style={{lineHeight:'74px'}}>EduCoder.net</span>
            </div> */}
            <ul className="clearfix inner-footernav">
              <li><a href="/" className="fl" target="_blank">网站首页</a></li>
              <li><Link to="/help/about_us" className="fl" target="_blank">关于我们</Link></li>
              <li><Link to="/help/contact_us" className="fl" target="_blank">联系我们</Link></li>
              <li><Link to="/help/cooperatives" className="fl" target="_blank">合作伙伴</Link></li>
              <li><Link to="/help/agreement" className="fl" target="_blank">服务协议</Link></li>
              <li><Link to="/help/help_center" className="fl" target="_blank">帮助中心</Link></li>
              <li><Link to="/help/feedback" className="fl" target="_blank">意见反馈</Link></li>
            </ul>
          </div>:""}
          <div>
            {this.props.mygetHelmetapi === null ? "" :
							this.props.mygetHelmetapi===undefined|| this.props.mygetHelmetapi.footer===null||this.props.mygetHelmetapi.footer===undefined?
								<p className="footer_con-p inline lineh-30  font-14">
									<span className="font-18 fl">©</span>&nbsp;{moment().year()}&nbsp;EduCoder
									<a style={{"color":"#888"}}  target="_blank" href="http://beian.miit.gov.cn/" className="ml15 mr15">湘ICP备17009477号</a>
									<a style={{"color":"#888"}}  target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43019002000962"  className="mr15">
										<img className="vertical4" src={require('./beian.png')}/>湘公网安备43019002000962号
									</a>
									<a href="https://team.trustie.net" style={{"color":"#888"}}
										 target="_blank">Trustie</a>&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;IntelliDE inside. <span
									className="mr15">版权所有 湖南智擎科技有限公司</span>
								</p>
								:
								<div dangerouslySetInnerHTML={{__html: this.props.mygetHelmetapi.footer}}></div>

						}

          </div>
          <div className="cl"></div>
        </div>
      </div>
    );
  }
}

export default NewFooter;
