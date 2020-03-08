import React, {Component} from 'react';
import {Button, Layout, Input, Form} from 'antd';
import axios from 'axios';
import {getImageUrl} from 'educoder';


class Modifytext extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {

	}

	//重新输入教学模式
	Modifytext = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				const url = `/paths/${this.props.pathid}/update_team_title.json`;
				axios.post(url, {
					team_title: values.teachingteam
				}).then((response) => {
					console.log(response);
					if (response) {
						if (response.data) {
							if (response.data.status === 0) {
								try {
									this.props.showNotification("修改成功!");
								} catch (e) {

								}
								try {
									this.props.modifysy(2);
								} catch (e) {

								}


							}
						}
					}

				}).catch((error) => {
					console.log(error)

				})


			}
		})


	}

	//取消
	hideUpdating = () => {
		this.props.modifysy(3);

	}


	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<div className="ml38">
					<style>{`

            .flexRow {
              padding: 20px 0;
            }
              .flexRow .name {
                margin-left: 12px;
                color: #666666;

                text-align: center;
                flex: 0 0 100px;
              }
              .flexRow .description {
                margin-left: 10px;
                flex: 1;
                color: #CDCDCD;
              }
                .description span {
                  margin-right: 20px;
                  color: #05101A;
                }
              .flexRow .status {
                width: 100px;
                color: #28AC7F;
                text-align: right;
              }
            .flexTable .flexTable {
              border-bottom: 1px solid #EBEBEB;
            }
            
            .settingFormsy label{
              color: #666666;
              font-size: 14px !important ; 
            
            }
            .settingFormsy input {
              width: 200px;
                  height: 32px;
            }
            .settingFormsy input.validateInput  {
              width: 220px;
            }
            .settingFormsy .formItemInline button {
              width: 110px;
              margin-left: 10px;
            }
            .settingFormsy .ant-form-item-label {
              width: 60px;
              text-align: left;
            }
            .formItemInline .ant-form-explain{
              position:absolute;
              bottom:-22px;
              left:0px;
              width:100%;
            }
            .yslzxueshi .ant-input{
											height: 40px !important;
											width: 276px !important
											}
											
											// class="ant-col ant-form-item-label"
          `}</style>
					<div className="settingFormsy">
						<React.Fragment>
							<Form>
								<div style={{
									display: "flex",
									flexDirection: "initial",
									lineHeight: " 51px",
								}}>
									<Form.Item
										label=""
										className="formItemInline hideRequireTag mb20 mt20"
									>
										{getFieldDecorator('teachingteam', {
											rules: [{
												// initialValue: this.state.cityDefaultValue,
												required: true,
												message: '请输入模式',
											}],
										})(
											<Input placeholder={`例如：教学团队`}></Input>
										)}
									</Form.Item>
									<div className="flexdirections yslzxueshi ml38 ">
										<p className="fontcolorsyslhui1 font-14  myysllineheight myyslminwidth"></p>
										<div className=" flexdirections ml10" style={{
											display: "flex",
											flexDirection: "initial",
											marginTop: "24px",
										}}>
											<Button style={{
												border: "0.5px solid #C9C9C9",
												background: "#C9C9C9",
												color: "#fff",
											}} type="primary  " onClick={() => this.hideUpdating()}>取消</Button>
											<Button style={{
												marginLeft: "10px",
											}} type="primary" onClick={() => this.Modifytext()}>确定</Button>
										</div>
									</div>
								</div>
							</Form>
						</React.Fragment>
					</div>

				</div>
			</div>
		)
	}
}

const Modifytexts = Form.create({name: 'Modifytext'})(Modifytext);

export default Modifytexts;

