import React, { useState, useEffect } from 'react'
import { trigger } from 'educoder'
import { Input, Checkbox } from "antd";

/** 
    arg_course_groups   选中的id数组
    joinCourseGroup     选中时触发   joinCourseGroup(checkedValues, item, index)  传入item：数据对象，index： 数据对象index
    checkAllValue       是否全选
    onCheckAllChange    全选     onCheckAllChange(e, item, index)
    course_groups   所有的group

*/
function CourseGroupChooser({ course_groups, isAdminOrCreator = true, item, index, arg_course_groups, checkAllValue, alwaysShow
        , onCheckAllChange, joinCourseGroup }) {
    const [state, setState] = useState({counter: 0})
    const [search, setSearch] = useState('')
    // useEffect(() => {
    //     console.log(' cdm')
    //     return () => {
    //         console.log(' cwum')
    //     };
    //     // , [state.counter]  加了这个后，onClick就消失了  加错位置了？
    // }, [state.counter] )
    // TODO 为什么每次onClick都会执行 cwum

    // const add1ToCounter = () => {
    //     const newCounterValue = state.counter + 1
    //     setState({ counter: newCounterValue })
    // }

    /**
        that.state.groupSearchValue
        that.setState({groupSearchValue: e.target.value})

        that.onCheckAllChange(e, item, index)    -    onCheckAllChange(e, item, index)
        that.joinCourseGroup(checkedValues, item, index)    -    joinCourseGroup(checkedValues, item, index)  

        that.state.checkAllArray[index] - checkAllValue
     */

     console.log('arg_course_groups', arg_course_groups)
     

    const urlStyle = {"left":"unset", minWidth: '262px'};
    if (alwaysShow == true) {
        urlStyle.display = 'block'
    }
    return (
        <ul className="drop_down_menu" style={urlStyle}>
            {
            course_groups && course_groups.length > 10?
            (<p className="drop_down_search">
                <Input placeholder="搜索" value={search} onChange={(e) => {setSearch(e.target.value)}} allowClear/>
            </p>):
            ''
            }
            
            <Checkbox.Group onChange={(checkedValues) => joinCourseGroup(checkedValues, item, index)} 
                value={arg_course_groups.length && arg_course_groups[0].id ? arg_course_groups.map(item => item.id): arg_course_groups}
                disabled={!isAdminOrCreator} className="mainGroup"
            >
                {course_groups && course_groups.length > 1 && <li key={'_all' + index} >
                {/* 防止被外面group包裹 */}
                <Checkbox.Group onChange={(e) => onCheckAllChange(e, item, index)} value={[checkAllValue]}>
                    <Checkbox 
                        value={true}
                        style={{ marginRight: '6px' }} onClick={() => {}} 
                    >全选</Checkbox>
                </Checkbox.Group>
                </li>}
            {
            course_groups && course_groups.filter((item) => {
                return (!search || item.name.indexOf(search) != -1)
            }).map((item,key)=>{
                return(
                    <li key={item.id} value={item.id} >
                    <Checkbox value={item.id}
															key={item.id}
                        id={`check${item.id}`}
                        style={{ marginRight: '6px' }}
                    ></Checkbox>
                        <label for={`check${item.id}`}>{item.name}</label>
                    </li>
                )
            })
            }
            
            </Checkbox.Group>
            <p className="drop_down_btn">
                <a href="javascript:void(0)" className="color-grey-6"
                    onClick={() => trigger('groupAdd')}
                >新建分班</a>
            </p>
        </ul>
    )
}
export default CourseGroupChooser