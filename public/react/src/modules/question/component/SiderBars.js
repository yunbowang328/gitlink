import React, { Component } from 'react';
import { getImageUrl} from 'educoder';
import {Tooltip} from 'antd';
import '../../tpm/TPMIndex.css';

const $ = window.$;
const poiindex=0;
$(window).resize(function(){
	rightSlider();
});

$(window).scroll(function(){
	if($(".gotop").length>0){
		if($(document).scrollTop()>0){
			$(".-task-sidebar .gotop").show();
			$(".gotop").click(function(){
				$("html,body").scrollTop(0);
			});
		}
		if($(document).scrollTop()==0){
			$(".-task-sidebar .gotop").hide();
		}
	}
});

function rightSlider(){
	var poi=parseInt((parseInt($(window).width())- 1200 )/2)-81;
	// //console.log(parseInt($(window).width())+"  "+poi);
	if(poi>0){
		$(".-task-sidebar").css("right",poi);
	}else{
		$(".-task-sidebar").css("right","0px");
	}
	$(".-task-sidebar").show();
}


function _initSider() {
	var $descSide = $("<div class='-task-desc'></div>").appendTo("body");
	$(".-task-sidebar>div").hover(function(){
		//移入显示二维码
		if($(this).hasClass("scan")){
			$(".scan_ewm").show().css({right:"75px",opacity:0}).stop().animate({
				right:"45px",opacity:1
			})
			return;
		}
		var $tool = $(this).attr("tooltips");
		$descSide.html($tool+"<div><img src='/images/edu_user/jt.png'></div>");
		$descSide.data('_dom', this)
		$descSide.show().css({
			left:$(this).offset().left - $descSide.width()-30,
			opacity:0,
			top:$(this).offset().top
		}).stop().animate({
			left:$(this).offset().left - $descSide.width()-5,
			opacity:1
		},400);
	},function(){
		if($(this).hasClass("scan")){
			$(".scan_ewm").stop().animate({right:"75px",opacity:0},200).hide();
		}
		$descSide.stop().animate({
			left:$(this).offset().left - $descSide.width()-30,
			opacity:0
		},200).hide();
	});
	rightSlider();

	$(window).scroll(function() {
		if ($descSide.height()) {
			var hoverIcon = $descSide.data('_dom')
			$descSide.css('top', $(hoverIcon).offset().top)
		}
	})
}

class SiderBars extends Component {
	constructor(props) {
		super(props)

	}

	componentDidMount() {
		// _initSider()

	}

	render() {


		// //console.log("SiderBar");
		// //console.log(this.props);

		var mypath= this.props&&this.props.match&&this.props.match.path;
		let{myvisible,Datacount,animateStyle}=this.props;
		return (

			<div className={myvisible===true?"-task-sidebar mystask-sidebar":Datacount&&Datacount>0?"-task-sidebar mystask-sidebars":"-task-sidebar mystask-sidebarss"} >

				{this.props.mygetHelmetapi&&this.props.mygetHelmetapi.main_site===true?<div>

					{
						mypath&&mypath==="/question"?
							<Tooltip placement="left" title={"试题库"}>

								<div className="feedback feedbackdivcolor xiaoshou shitikus"  onClick={()=>this.props.showDrawer()} >

									{
										Datacount&&Datacount>0?
											<div className="shitikussmys maxnamewidth30">
												{Datacount}
											</div>
											:""
									}

									<a target="_blank" className="color_white xiaoshou" >
										<i className="iconfont icon-shitilan color-white xiaoshou"></i>
									</a>
									<p className="color-white font-12 xiaoshou">试题库</p>
								</div>
							</Tooltip>
							:""

					}

					<Tooltip placement="right" title={"返回顶部"}>
						<div className="gotop">
							<a>
								<i className="iconfont icon-shangjiantou color-white"></i>
							</a>
						</div>
					</Tooltip>



					<Tooltip placement="right" title={"意见反馈"}>
						<div className="feedback">
							<a target="_blank" className="color_white" href="/help/feedback">
								<i className="iconfont icon-yijianfankui color-white font-22"></i>
							</a>
						</div>
					</Tooltip>


					<div className="scan pr">
						<Tooltip placement="right" title={
							<pre>
                    <p className="scan_ewm">
                        <p className="pr padding10">
                          <style>
                            {
															`
                            .WeChatstyle{
                               margin-bottom: 0 !important;
                            }
                            `
														}
                          </style>
                          <img src={getImageUrl("images/educoder/EWM.jpg")} width="158px" height="158px" />
                          <p className={"WeChatstyle wechatcenter"}>微信扫一扫</p>
                          <p className={"WeChatstyle wechatcenter"}>关注公众号</p>
                        </p>
                      </p>
                    </pre>
						}>
							<span className="inline erweima"><i className="iconfont icon-erweima color-white font-22 fl"></i></span>
						</Tooltip>
					</div>

					<Tooltip placement="right" title={"在线咨询"}>
						<div className="consult">
							<a target="_blank" className="color_white" href="//shang.qq.com/wpa/qunwpa?idkey=2f2043d88c1bd61d182b98bf1e061c6185e23055bec832c07d8148fe11c5a6cd">
								<i className="iconfont icon-qqzaixianzixun color-white font-22"></i>
							</a>
						</div>
					</Tooltip>

				</div>:""}
			</div>
		);
	}
}

export default SiderBars;
