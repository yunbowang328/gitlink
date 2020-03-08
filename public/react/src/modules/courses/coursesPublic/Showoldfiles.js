import React,{ Component } from "react";
import { Modal,Checkbox,Select,Input} from "antd";
import axios from'axios';

import Modals from '../../modals/Modals';

const Option = Select.Option;
const Search = Input.Search;

function formatDate(date) {
	var dateee = new Date(date).toJSON();
	return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

class Showoldfiles extends Component{
	constructor(props){
		super(props);
		this.state={
			Searchvalue:undefined,
			type:'all',
			category_id:0,
			page:1,
			Resourcelist:undefined,

			getallfiles:false,
			searchtype:'getallfiles'
		}
	}
	componentDidMount() {

	}

	componentDidUpdate = (prevProps) => {

		if ( prevProps.visible != this.props.visible ) {

		}

	}

	cloasshanchudiao=()=>{
   this.props.closaoldfilesprops()
	}

	showfiless=(url)=>{
		this.props.ShowOnlinePdf(url)
	}
	render(){
		let {visible,allfiles}=this.props;

		return(
			<div>
				{/*提示*/}
				<Modals
					modalsType={this.state.Modalstype}
					modalsTopval={this.state.Modalstopval}
					modalCancel={this.state.ModalCancel}
					modalSave={this.state.ModalSave}
					loadtype= {this.state.loadtype}

				/>
				{visible===true?
					<Modal
						title="选择版本"
						visible={visible}
						closable={false}
						footer={null}
						width="600px"
						destroyOnClose={true}
						keyboard={false}
					>
						<a id='closeIcon' onClick={this.cloasshanchudiao}><i className='iconfont icon-shanchudiao'></i></a>
						<style>
							{
								`
							.ant-modal-body{
                  padding: 30px 0px;
							}
							`
							}
						</style>

							<style>{`
                .newupload_conboxtop{
                   margin-top: -30px;
                }
                #shixun_tab_div{
                   padding: 0 30px;
                   padding-top:30px;
                }

                .selectfiles{
							    width: 600px;
							    height: 48px;
							    background: rgba(255,104,0,0.1);
							    line-height: 48px;
							    text-align: center;
                }

                .selectfilesfont{
									font-size:14px;
									font-family:Microsoft YaHei;
									font-weight:400;
									line-height:25px;
									color:rgba(255,104,0,1);
                }
              `}</style>

							<div className="newupload_conbox newupload_conboxtop">
								<div className="clearfix  cdefault" style={{"marginRight":"4px"}}>

						     <div className={"selectfiles"}>
											<span className={"selectfilesfont"}>
												注：该文件有历史版本，请选择您需要的文件，点击文件名 下载。
											</span>
						     </div>
								</div>


								<style>{`
                .greybackHead{
                  padding:0px 30px;
                }
                .fontlefts{
                  width: 300px;
							    text-align: center;
							    }

							    .filesves{
							      width: 220px;
                    text-align: center;
							    }
              `}</style>
								<ul className="clearfix greybackHead edu-txt-center">
									<li className="fl paddingleft22 fontlefts">资源名称</li>
									<li className="fl filesves"  >版本</li>
								</ul>



								<div className="over210 pl20 pr20"
								     onScroll={this.contentViewScroll}
								     style={{"Height":"204px"}}>

									<style>{`
                   .color-grey-9a{color: #9A9A9A !important;}
                   .datastyle{
                      width: 120px;
									    overflow: hidden;
									    height: 37px;
                   }
                `}</style>

									<style>{`

                .fontlefts{
                  width: 340px;
							    text-align: center;
							    }

							    .filesves{
							      width: 200px;
                    text-align: center;
							    }
							    .isabox{
							        max-width: 280px;
									    overflow: hidden;
									    text-overflow: ellipsis;
									    white-space: nowrap;
									    display: inline-block;
									    float: left;
							    }
              `}</style>
									{
										allfiles === undefined ? "":
											<div>

												<div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE" id={allfiles.id}>

													<li className="fl fontlefts">
														<a className={"isabox"} href={allfiles.url} target="_blank" >{allfiles.title}</a>
														{/*{allfiles.is_pdf===false?*/}
														{/*<a className={"isabox"} href={allfiles.url} >{allfiles.title}</a>:*/}
															{/*<a className={"isabox"} onClick={()=>this.showfiless(allfiles.url)} >{allfiles.title}</a>*/}
														{/*}*/}
														<span className={"newcolor-orange fl"}>当前版本</span>
													</li>

													<li className="fl filesves ">
														{formatDate(allfiles.created_on)}
													</li>

												</div>
													{
														allfiles.attachment_histories.length===0?"":allfiles.attachment_histories.map((item,key)=>{
															return(

																<div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE" id={item.id} key={key}>

																	<li className="fl fontlefts">
																		<a  className={"isabox"} href={item.url} target="_blank" >{item.title}</a>
																		{/*{item.is_pdf===false?*/}
																			{/*<a  className={"isabox"} href={item.url}>{item.title}</a>:*/}
																			{/*<a className={"isabox"} onClick={()=>this.showfiless(item.url)} >{item.title}</a>*/}
																		{/*}*/}
																	</li>

																	<li className="fl filesves ">
																		{formatDate(item.created_on)}
																	</li>

																</div>
															)
														})
													}
											</div>
									}
								</div>

							</div>

					</Modal>:""}
			</div>
		)
	}
}
export default Showoldfiles;