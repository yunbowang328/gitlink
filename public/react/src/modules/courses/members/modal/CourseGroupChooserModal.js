import React, { useState, useEffect, useRef, useMemo } from 'react'
import { trigger } from 'educoder'
import { Input, Checkbox } from "antd";
import CourseGroupChooser from '../CourseGroupChooser'
import ModalWrapper from "../../common/ModalWrapper"
import axios from 'axios'
/** 
    arg_course_groups   选中的id数组
    joinCourseGroup     选中时触发   joinCourseGroup(checkedValues, item, index)  传入item：数据对象，index： 数据对象index
    checkAllValue       是否全选
    onCheckAllChange    全选     onCheckAllChange(e, item, index)
    course_groups   所有的group
*/
function CourseGroupChooserModal({ course_groups = [], isAdminOrCreator, item, index,
            setVisible, visible, record = {}, props = {}, fetchAll
         }) {
            // , arg_course_groups, checkAllValue  , onCheckAllChange, joinCourseGroup
    const [checkAllValue, setCheckAllValue] = useState(true)
    const [arg_course_groups, setArg_course_groups] = useState(course_groups.map(item => item.id))
    const modalEl = useRef(null);
    useEffect(() => {
        setCheckAllValue(true)
        setArg_course_groups(course_groups.map(item => item.id))
    }, [course_groups, visible])

    useEffect(() => {
        if (visible != undefined) {
            modalEl.current.setVisible(true)
        }
    }, [visible])

    const joinCourseGroup = (checks) => {
        setArg_course_groups(checks)
    }
    const onCheckAllChange = (e) => {
        if (checkAllValue) {
            setArg_course_groups([])
        } else {
            setArg_course_groups(course_groups.map(item => item.id))
        }
        setCheckAllValue(!checkAllValue)
    }
    const onOk = async () => {
        console.log(checkAllValue, arg_course_groups)
        let approval = 1
        const courseId = props.match.params.coursesId    
        let url = `/courses/${courseId}/teacher_application_review.json`
        const response = await axios.post(url, {
            user_id: record.user_id,
            application_id: record.application_id,
            approval: approval,
            group_id: arg_course_groups
        }).then((result) => {
					if (result.data.status === 0) {
						props.showNotification(`已${approval == 1? '同意' : '拒绝'}`)
						fetchAll(1)
						modalEl.current.setVisible(false)
						window.location.reload();
					}})

    }
    return (
        <ModalWrapper
            ref={modalEl}
            width="600px"
            title={`同意`}
            visible={visible}
            onOk={onOk}
            className="courseGroupChooserModal"
        >   
            <style>{`
                .courseGroupChooserModal .ant-modal-body{
                    padding:20px 30px;
                }
                .courseGroupChooserModal .description {
                    font-size: 16px;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .courseGroupChooserModal .marginauto{
                    margin-top:10px!important;
                }
                .courseGroupChooserModal .drop_down_menu  {
                    position: relative;
                    top: auto;
                    box-shadow: none;
                    padding:0px;
                }
                .courseGroupChooserModal .drop_down_menu .mainGroup{
                    background: #f2f9ff;
                    padding: 0 20px;
                }
                .courseGroupChooserModal .drop_down_menu li:hover,.courseGroupChooserModal  .drop_down_normal li:hover{
                    background: #f2f9ff;
                }
                .courseGroupChooserModal .drop_down_menu .mainGroup.ant-checkbox-group {
                    width: 100%;
                    max-height: 300px!important;
                    height: 300px;
                }
                .courseGroupChooserModal .drop_down_search {
                    margin: 0;
                    margin-bottom: 10px;
                }
                .courseGroupChooserModal .drop_down_menu li {
                    padding: 0px;
                }
                .courseGroupChooserModal .drop_down_menu .drop_down_btn {
                    height: 26px;
                    line-height: 26px;
                    padding: 0px 20px;
                    margin: 0;
                }
                .mainGroup .drop_down_menu .drop_down_btn{
                    height: 26px;
                    line-height: 26px;
                }
            `}</style>
            {/* <React.Fragment>
            <React.Fragment> */}
                <div className="description">确认同意TA的加入，并设置TA的分班管理权限</div>
                <CourseGroupChooser
                    {...{ checkAllValue, isAdminOrCreator, course_groups, arg_course_groups, item, index,
                            joinCourseGroup, onCheckAllChange, alwaysShow: true }}
                ></CourseGroupChooser>
           
        </ModalWrapper>
    )
}
export default (CourseGroupChooserModal)