import React, { useState, useEffect, useContext, memo } from 'react';
import { Progress, Input } from 'antd'
import { getUrl2, isDev, CBreadcrumb, ActionBtn, ThemeContext } from 'educoder'
import axios from 'axios'
import okIcon from './images/ok_border.png'

function VideoProtocol (props) {
    const username = props.match.params.username
    const { search } = props.history.location;    
    const courseId = search && search.split("=")[1];
    return (
        <div className={`educontent videoProtocol`}>
            <CBreadcrumb
                className="mb26 mt16"
                separator=" > "
                items={[
                    { to: `${courseId?`/courses/${courseId}/course_videos?open=new`:`/users/${username}/videos/upload`}`, name:  '视频上传'},
                    { name: '内容上传协议'}
                ]}
            ></CBreadcrumb>
            <style>{`
                .videoProtocol {
                    margin-bottom: 200px;
                }   
                .videoProtocol .title {
                    padding: 4px 16px;
                    background: #fff;
                    margin-bottom: 12px;
                    margin-top: 30px;
                    font-size: 16px;
                    font-weight: bold;
                }         
                .videoProtocol .content {
                    background: #fff;
                    padding: 30px;    
                }
                .videoProtocol .subTitle {
                    font-size: 16px;
                    font-weight: bold;
                }
                .videoProtocol .p_paragraph {
                    font-size: 12px;
                    text-indent: 22.5pt;
                    margin: 10px 0;
                }
                .videoProtocol .p_paragraph.has_child {
                    margin-bottom: 2px;
                }
                .videoProtocol .p_child_paragraph {
                    font-size: 12px;
                    text-indent: 40pt;
                }
            `}</style>
            <div className="title">内容上传协议</div>
            <div className="content">
                <div className="subTitle">
                    一、总则
                </div>
                <p className="p_paragraph">
                    1.1 用户同意本协议的条款并按照页面上的提示完成视频上传流程。用户在点击视频上传的图标时即表示已阅读“内容上传协议”与湖南智擎科技有限公司（以下简称EduCoder平台）达成协议，完全接受本协议项下全部条款。
                </p>
                <p className="p_paragraph">
                    1.2 用户在EduCoder平台上（www.educoder.net）上传视频，应当使用已注册的有效用户名和密码。该用户帐号和密码由用户负责保管，用户不得将帐号和密码转让给任何第三人；用户应当对以其用户帐号进行的所有活动和事件负法律责任。
                </p>
                <p className="p_paragraph">
                    1.3 EduCoder平台用户在上传视频时，除遵守本协议的规定，还同时应当遵守EduCoder平台的其他协议和规定，以及遵守中华人民共和国的法律法规。EduCoder平台上传用户协议及EduCoder平台的其他协议，可由EduCoder平台随时更新，且无需另行通知。用户在使用相关服务时，应关注并遵守其所适用的相关条款。
                </p>

                <div className="subTitle">
                    二、合法使用视频上传服务
                </div>
                <p className="p_paragraph">
                    2.1　用户在使用视频上传服务时，必须遵守中华人民共和国相关法律法规的规定，用户同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于上传包含有下列内容之一的视频内容：
                </p>
                <p className="p_paragraph">
                    1）反对宪法确定的基本原则；2）危害国家统一、主权和领土完整的；3）泄露国家秘密、危害国家安全或者损害国家荣誉和利益的；4）煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯的；5）宣扬邪教、迷信的； 6）扰乱社会秩序，破坏社会稳定的； 7）诱导未成年人违法犯罪和渲染暴力、色情、赌博、恐怖活动的； 8）侮辱或者诽谤他人，侵害公民个人隐私等他人合法权益的；9）危害社会公德，损害民族优秀文化传统的；10）非法的广播电视频道、视听节目网站提供的非法视频内容；11）有关法律、行政法规和国家规定禁止的其他内容。
                </p>
                <p className="p_paragraph">
                    2.2 用户不得对本服务任何部分或本服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的。
                </p>
                <p className="p_paragraph">
                    2.3 用户须对自己在使用EduCoder平台服务过程中的行为承担法律责任。用户承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在EduCoder平台首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予EduCoder平台等额的赔偿。
                </p>

                <div className="subTitle">
                    三、知识产权及其他合法权益保护
                </div>
                <p className="p_paragraph">
                    3.1 EduCoder平台提供视频上传功能专为用户自己创作或享有合法来源的作品提供服务。EduCoder平台尊重他人知识产权和合法权益，请用户在上传视频前确保拥有上传的视频内容的著作权及信息网络传播权或者已经取得上述全部权利人的许可；
                </p>
                <p className="p_paragraph">
                    3.2 用户应确保上传的视频内容，已经获得被拍摄人（如有）的许可，并确保视频内容没有侵犯他人的人身权，包括但不限于名誉权、肖像权、隐私权、姓名权，不存在任何著作权纠纷。
                </p>

                <div className="subTitle">
                    四、服务风险及免费声明
                </div>
                <p className="p_paragraph">
                    4.1 用户完全理解并同意，本服务涉及到互联网及移动通讯等服务，可能会受到各个环节不稳定因素的影响。因此服务存在因上述不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机、GSM网络、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险。使用本服务的用户须承担以上风险，EduCoder平台对服务之及时性、安全性、准确性不作担保，对因此导致用户不能发送和接受阅读消息、或传递错误，个人设定之时效、未予储存或其他问题不承担任何责任。对于不可抗力或非EduCoder平台过错原因导致的用户数据损失、丢失或服务停止，EduCoder平台将不承担任何责任。
                </p>
                <p className="p_paragraph">
                    4.2 对于系统发生故障影响到本服务的正常运行，EduCoder平台承诺及时处理进行修复。但用户因此而产生的经济和精神损失，EduCoder平台不承担责任。此外，EduCoder平台保留不经事先通知为维修保养、升级或其他目的暂停本服务任何部分的权利。
                </p>
                <p className="p_paragraph">
                    4.3 EduCoder平台郑重提请您注意，任何经由本服务上传的视频内容，均由内容提供者承担责任。EduCoder平台无法控制经由本服务上载之内容，也无法对用户的使用行为进行全面控制，因此不保证内容的合法性、正确性、完整性、真实性或品质；您已预知使用本服务时，可能会接触到令人不快、不适当或令人厌恶之内容，并同意将自行加以判断并承担所有风险，而不依赖于EduCoder平台。但在任何情况下，EduCoder平台有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用本服务的全部或部分，保存有关记录，并向有关机关报告。EduCoder平台有权(但无义务)依其自行之考量，拒绝和删除可经由本服务提供之违反本条款的或其他引起EduCoder平台或其他用户反感的任何内容。
                </p>
                <p className="p_paragraph">
                    4.4 用户完全理解并同意，若第三方在您不知情或未经您同意的前提下，将您的视频作品上传于EduCoder平台及由此所产生的任何可能侵害您权益的行为，EduCoder平台均不对任何人承担任何责任。
                </p>
                <p className="p_paragraph">
                    4.5 用户完全理解并同意，第三方可以通过访问EduCoder平台网站而获得educoder平台中的相关信息，并可对信息进行使用行为。对用户或第三方以任何方式进行的使用可能侵害您权益的行为，EduCoder平台均不对任何人承担任何责任。
                </p>
                <p className="p_paragraph has_child">
                    4.6 如发生下列任何一种情形，EduCoder平台有权随时中断或终止向用户提供服务而无需通知该用户：
                </p>
                    <p className="p_child_paragraph">
                        4.6.1 用户提供的个人资料不真实；
                    </p>
                    <p className="p_child_paragraph">
                        4.6.2 用户违反本服务条款的规定；
                    </p>
                    <p className="p_child_paragraph">
                        4.6.3 按照主管部门的要求；
                    </p>
                    <p className="p_child_paragraph">
                        4.6.4 EduCoder平台收到第三方投诉且该第三方出具相应证据的；
                    </p>
                    <p className="p_child_paragraph">
                        4.6.5 其他EduCoder平台认为是符合整体服务需求的特殊情形。
                    </p>
                
                <div className="subTitle">
                    五、违约视频的处理原则 　　
                </div>
                <p className="p_paragraph">
                    5.1 如用户在使用视频上传服务时违反任何上述规定，EduCoder平台或其授权的人有权要求用户改正或不经通知直接采取一切必要的措施（包括但不限于删除上传的视频内容）以减轻和消除用户不当行为造成的影响。
                </p>
                <p className="p_paragraph">
                    5.2 如EduCoder平台认为用户的视频上传行为严重违反了本协议，并给EduCoder平台造成了损害，EduCoder平台无需进行事先通知即可终止用户的密码、帐号或本服务之使用，且EduCoder平台对用户或任何第三人均不承担任何责任。
                </p>
                <p className="p_paragraph">
                    5.3 EduCoder平台有权启动必要的刑事及民事法律程序，维护EduCoder平台的合法权益，追究违法用户的法律责任。
                </p>
                
                <div className="subTitle">
                    六、协议修改 　　
                </div>
                <p className="p_paragraph">
                    6.1 EduCoder平台有权随时修改本协议的任何条款，一旦本协议的内容发生变动，EduCoder平台将会通过适当方式向用户提示修改内容。
                </p>
                <p className="p_paragraph">
                    6.2 如果不同意EduCoder平台对本协议相关条款所做的修改，用户有权停止使用网络服务。如果用户继续使用网络服务，则视为用户接受EduCoder平台对本协议相关条款所做的修改。
                </p>

                <div className="subTitle">
                    七、通知送达　　
                </div>
                <p className="p_paragraph">
                    7.1 本协议项下EduCoder平台对于用户所有的通知均可通过公告、电子邮件、或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。
                </p>
                <p className="p_paragraph">
                    7.2 用户对于EduCoder平台的通知应当通过EduCoder平台网站公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。
                </p>

                <div className="subTitle">
                    八、其他　　
                </div>
                <p className="p_paragraph">
                    8.1　本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
                </p>
                <p className="p_paragraph">
                    8.2 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向EduCoder平台所在地的人民法院提起诉讼。
                </p>
                <p className="p_paragraph">
                    8.3 EduCoder平台未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。
                </p>
                <p className="p_paragraph">
                    8.4 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
                </p>
            </div>
        </div>
    )
}

export default VideoProtocol
