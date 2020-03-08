import React, { Component } from 'react';
export const STATUS_UN_PUBLISH = "未发布"
// homework_status: ["提交中", "未开启补交"]
export const STATUS_SUBMIT = "提交中"
// export const STATUS_UN_PUBLISH = "未发布"

// homework_status: ["提交中"]  未发布   未开启补交


export function RouteHOC(options = {}) {
	return function wrap(WrappedComponent) {
    return class Wrapper extends Component {
      constructor(props) {
        super(props);

        this.state = {

        }
      }
      toCreateProject = () => {
        let url = '/projects/new'
        if (window.location.port == 3007) {
					// window.location.href
          url = '/testbdweb.educoder.net/projects/new'
        }
        window.open(
          url,
          '_blank' // <- This is what makes it open in a new window.
        );
      }
      // common_homework   group_homework
      // 是否是分组作业
      isGroup = () => {
        return window.location.pathname.indexOf('group_homeworks') != -1
      }
      getModuleName = (isChinese) => {
        const isGroup = this.isGroup()
        if (isChinese) {
          let chName = isGroup ? '分组作业' : '普通作业'
          return chName;
        }
        const secondName = isGroup ? 'group_homeworks' : 'common_homeworks'
        return secondName;
      }
      getModuleType = () => {
        const isGroup = this.isGroup()
        return isGroup ? 3 : 1
      }
      toDetailPage = (_courseId, workId, topicId) => {
        if (typeof _courseId == "object") {
          const topicId = _courseId.topicId
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/boards/${workId}/messages/${topicId}`)
        } else {
          this.props.history.push(`/courses/${_courseId}/boards/${workId}/messages/${topicId}`)
        }

			}
      toEditPage = (_courseId, _workId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/${secondName}/${_workId || workId}/edit`)
        } else {
          this.props.history.push(`/courses/${_courseId}/${secondName}/${_workId}/edit`)
        }
      }
      toWorkDetailPage = (_courseId, _workId, _studentWorkId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          const studentWorkId = _courseId.studentWorkId
					window.open(`/courses/${courseId}/${secondName}/${_workId || workId}/${_studentWorkId || studentWorkId}/appraise`);
        } else {
					window.open(`/courses/${_courseId}/${secondName}/${_workId}/${_studentWorkId}/appraise`);
        }
      }
			toWorkDetailPage2 = (e, _courseId, _workId, _studentWorkId) => {
				console.log("鼠标中键点击了")
				console.log(_studentWorkId)
				const secondName = this.getModuleName()
				if (typeof _courseId == "object") {
					const workId = _courseId.workId
					const courseId = _courseId.coursesId
					const studentWorkId = _courseId.studentWorkId
					window.open(`/courses/${courseId}/${secondName}/${_workId || workId}/${_studentWorkId || studentWorkId}/appraise`);
				} else {
					window.open(`/courses/${_courseId}/${secondName}/${_workId}/${_studentWorkId}/appraise`);
				}
			}
      toNewPage = (courseId) => {
        const secondName = this.getModuleName()
        this.props.history.push(`/courses/${courseId.coursesId}/${secondName}/${courseId.category_id}/new`)
      }
      toListPage = (_courseId, _workId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/${secondName}/${_workId || workId}`)
        } else {
          this.props.history.push(`/courses/${_courseId}/${secondName}${_workId ? '/' + _workId : ''}`)
        }
      }


      toWorkPostPage = (_courseId, _workId, isEdit, _studentWorkId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          const studentWorkId = _courseId.studentWorkId
          this.props.history.push(`/courses/${courseId}/${secondName}/${_workId || workId}/${isEdit? `${_studentWorkId || studentWorkId}/post_edit` : 'post'}`)
        } else {
          this.props.history.push(`/courses/${_courseId}/${secondName}/${_workId}/${isEdit? `${_studentWorkId}/post_edit` : 'post'}`)
        }
      }
      toWorkListPage = (_courseId, _workId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/${secondName}/${_workId || workId}/list`)
        } else {
          this.props.history.push(`/courses/${_courseId}/${secondName}/${_workId}/list`)
        }
      }
      toWorkAnswerPage = (_courseId, _workId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/${secondName}/${workId}/answer`)
        } else {
          this.props.history.push(`/courses/${_courseId}/${secondName}/${_workId}/answer`)
        }
      }

			toWorkQuestionPage = (_courseId, _workId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _workId || _courseId.workId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/${secondName}/${workId}/question`)
        } else {
          this.props.history.push(`/courses/${_courseId}/${secondName}/${_workId}/question`)
        }
      }

      toWorkSettingPage = (_courseId, _workId) => {
        const secondName = this.getModuleName()
        if (typeof _courseId == "object") {
          const workId = _courseId.workId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/${secondName}/${_workId || workId}/setting`)
        } else {
          this.props.history.push(`/courses/${_courseId}/${secondName}/${_workId}/setting`)
        }
      }


			render() {
        const { snackbarOpen} = this.state;
        return (
          <React.Fragment>
						<WrappedComponent {...this.props}
															toDetailPage={this.toDetailPage}
															toEditPage={this.toEditPage}
															toNewPage={this.toNewPage}
															toListPage={this.toListPage}
															toWorkDetailPage={this.toWorkDetailPage}
															toWorkDetailPage2={this.toWorkDetailPage2}
															toWorkPostPage={this.toWorkPostPage}
															toWorkListPage={this.toWorkListPage}
															toWorkAnswerPage={this.toWorkAnswerPage}
															toWorkQuestionPage={this.toWorkQuestionPage}
															toWorkSettingPage={this.toWorkSettingPage}

															toCreateProject={this.toCreateProject}

															isGroup={this.isGroup}
															getModuleName={this.getModuleName}
															getModuleType={this.getModuleType}

            >

						</WrappedComponent>
          </React.Fragment>
        )
      }
    }
	}
}
