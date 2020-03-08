// 分班列表 加入分班

import React, { useState, useEffect, useRef } from 'react'

import { Input,Checkbox,Table, Pagination, Modal,Menu ,Spin, Tooltip , Divider, Popconfirm } from "antd";
import ClipboardJS from 'clipboard'
import axios from 'axios'
import _ from 'lodash'

import '../css/Courses.css'
import '../css/members.css'

import CourseLayoutcomponent from '../common/CourseLayoutComponent'
import Titlesearchsection from '../common/titleSearch/TitleSearchSection'
import ColorCountText from '../common/titleSearch/ColorCountText'

import { WordsBtn, trigger, on, off, getUrl, downloadFile , getRandomcode, NoneData } from 'educoder'
import Modals from "../../modals/Modals";

import DownloadMessageysl from "../../modals/DownloadMessageysl";
import CreateGroupByImportModal from './modal/CreateGroupByImportModal'
import ChangeRolePop from './ChangeRolePop'
import CourseGroupListTable from './CourseGroupListTable'

import './studentsList.css'
/**
    角色数组, CREATOR: 创建者, PROFESSOR: 教师, ASSISTANT_PROFESSOR: 助教, STUDENT: 学生
*/
function CourseGroupList(props) {
    const [searchValue, setSearchValue] = useState('')
    const [isSpin, setIsSpin] = useState(true)

    const [DownloadType, setDownloadType] = useState()
    const [DownloadMessageval, setDownloadMessageval] = useState()

    const [listRes, setListRes] = useState({})
    const createGroupModalEl = useRef(null);

    const courseId = props.match.params.coursesId

    useEffect(() => {
        fetchAll()
        on('updateNavSuccess', onOperationSuccess)
        return () => {
            off('updateNavSuccess', onOperationSuccess)
        }
    }, [])
    function onOperationSuccess() {
        fetchAll()
        props.updataleftNavfun()
    }
    async function fetchAll() {
        const url = `/courses/${courseId}/course_groups.json`
        setIsSpin(true)
        const response = await axios.get(url, { params: {
            search: searchValue
        }});

        setIsSpin(false)
        if (response) {
            setListRes(response.data)
        }
    }
    const onConfirm = async () => {
    }

    function createGroupImportSuccess() {

    }
    function addDir() {
        trigger('groupAdd', props.coursesids)
    }
    function deleteDir() {

    }
    function onPressEnter() {
        fetchAll()
    }
    function onInputSearchChange(e) {
        setSearchValue(e.target.value)
    }
    function Downloadcal() {

    }
    const confirmysl = (url) => {
        axios.get(url + '&export=true').then((response) => {
            if(response === undefined){
                return
            }
            if(response.data.status&&response.data.status===-1){

            }else if(response.data.status&&response.data.status===-2){
                if(response.data.message === "100"){
                    // 已超出文件导出的上限数量（100 ），建议：
                    setDownloadType(true)
                    setDownloadMessageval(100)
                }else {
                    //因附件资料超过500M
                    setDownloadType(true)
                    setDownloadMessageval(500)
                }
            }else {
                props.slowDownload(getRandomcode(url))
            }
        }).catch((error) => {
        console.log(error)
        });
    }

    const isAdmin = props.isAdmin();
    const isSuperAdmin = props.isSuperAdmin();
    const isParent = true;
    // const searchValue = '';
    const isCourseEnd= props.isCourseEnd();

    const course_group_id= '';


    const total_count = listRes.group_count;
    const none_group_member_count = listRes.none_group_member_count;
    const course_groups = listRes.course_groups
    const current_group_id = listRes.current_group_id

    let exportUrl = `/courses/${courseId}/export_member_scores_excel.xlsx`; //总成绩
    let exportUrltwo = `/courses/${courseId}/export_couser_info.xlsx`; //课堂信息
    let exportUrlthree = `/courses/${courseId}/export_member_act_score.xlsx`; //活跃度
    return (
        <React.Fragment>
            <DownloadMessageysl
                {...props}
                value={DownloadMessageval}
                modalCancel={Downloadcal}
                modalsType={DownloadType}
            />
            <Titlesearchsection
                title={
                    <ul className="course_publicNav">
                        <li className="active">分班列表</li>
                        <li onClick={() => {props.history.push(`/courses/${courseId}/course_groups/0`)}}>未分班</li>
                    </ul>
                }
                searchValue={ searchValue }
                onInputSearchChange={onInputSearchChange}
                allowClearonChange={onInputSearchChange}
                showSearchInput={total_count >= 10}
                searchPlaceholder={ '请输入分班名称进行搜索' }
                firstRowRight={
                    <React.Fragment>
                    {  // pageType !== TYPE_STUDENTS &&
                        isSuperAdmin && <React.Fragment>
                        {/* ref="createGroupByImportModal"  */}
                        <CreateGroupByImportModal {...props}
                            ref={createGroupModalEl}
                            createGroupImportSuccess={createGroupImportSuccess}
                        ></CreateGroupByImportModal>
                        {/* this.refs['createGroupByImportModal'].setVisible(true) */}
                        <WordsBtn style="blue" className="mr30" onClick={()=> {createGroupModalEl.current.setVisible(true)}}>导入创建分班</WordsBtn>
                    </React.Fragment> }
                    {
                        // pageType !== TYPE_STUDENTS &&
                        !isCourseEnd && isAdmin && <WordsBtn style="blue" className="mr30" onClick={()=>addDir()}>新建分班</WordsBtn> }
                    {/* {
                        isAdmin && !isParent && course_group_id != 0 && <WordsBtn style="blue" className="mr30" onClick={()=>deleteDir()}>删除分班</WordsBtn> } */}
              {/* {
                  isAdmin && !isParent && course_group_id != 0 && <WordsBtn style="blue" className="mr30" onClick={()=>this.renameDir()}>分班重命名</WordsBtn> } */}
                <style>{`
                    .drop_down_menu li a {
                        padding: 0px;
                        font-size: 14px;
                    }
                    .drop_down_menu {
                        /*width: 93px;*/
                    }
                    .drop_down_menu li {
                        width:100%;
                        box-sizing:boder-box;
                        float:unset;
                        line-height:30px!important;
                        flex: 0 0 30px;
                    }
                    .drop_down_menu, .drop_down_normal {
                        padding-top: 10px;
                        padding-bottom: 8px;
                    }
                    .drop_down_menu .drop_down_btn{
                        border-top:none;
                    }
                    .dividerStyle.ant-divider-horizontal{
                        margin: 0px;
                    }
                    .courseGroupList .ant-table-tbody tr:last-child td {
                        border-bottom: none;
                    }
                `}</style>
                { isAdmin &&
                <li className="li_line drop_down fr color-blue font-16">
                    导出<i className="iconfont icon-xiajiantou font-12 ml2"></i>
                    <ul className="drop_down_menu" style={{"right": "-20px", "left": "unset", "height": "auto"}}>
                        <li><a
                            onClick={(i) => confirmysl(exportUrltwo)}>课堂信息</a>
                        </li>
                        <li><a
                            onClick={(i) => confirmysl(exportUrlthree)}>活跃度</a>
                        </li>
                        <li><a
                            onClick={(i) => confirmysl(exportUrl)}>总成绩</a>
                        </li>
                    </ul>
                </li>
                    }
                </React.Fragment>
                }
                secondRowLeft={
                    total_count ? <ColorCountText count={total_count} name="个分班"></ColorCountText> : ''
                }
                onPressEnter={onPressEnter}
            ></Titlesearchsection>

            {/* {!!none_group_member_count && <div className="mt20 E9F8FF padding20-30 pointer" onClick={() => {props.history.push(`/courses/${courseId}/course_groups/0`)}}>
                <span>未分班：</span>
                <span style={{color: '#999999'}}>{none_group_member_count}个学生</span>

                <WordsBtn style="blue" className="fr">查看</WordsBtn>
            </div>} */}

            <Spin size="large" spinning={isSpin}>
                {course_groups && !!course_groups.length ?
                <div className="mt20 edu-back-white padding20 courseGroupList">

                    <CourseGroupListTable
                        course_groups={course_groups}
                        onOperationSuccess={onOperationSuccess}
                        current_group_id={current_group_id}
                        {...props}
                    ></CourseGroupListTable>

                </div>:
                <NoneData></NoneData>}
            </Spin>
        </React.Fragment>
    )
}
export default CourseGroupList