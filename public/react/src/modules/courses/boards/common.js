import React, { Component } from 'react';

export function RouteHOC(options = {}) {
	return function wrap(WrappedComponent) {
    return class Wrapper extends Component {
      constructor(props) {
        super(props);
        
        this.state = {
          
        }
      }
      toDetailPage = (_courseId, boardId, topicId) => {
        if (typeof _courseId == "object") {
          const topicId = _courseId.topicId
          const boardId = _courseId.boardId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/boards/${boardId}/messages/${topicId}`)
        } else {
          this.props.history.push(`/courses/${_courseId}/boards/${boardId}/messages/${topicId}`)
        }
        
      }
      toEditPage = (_courseId, boardId, topicId) => {
        if (typeof _courseId == "object") {
          const topicId = _courseId.topicId
          const boardId = _courseId.boardId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/boards/${boardId}/messages/${topicId}/edit`)
        } else {
          this.props.history.push(`/courses/${_courseId}/boards/${boardId}/messages/${topicId}/edit`)
        }
      }
      toNewPage = (courseId, boardId) => {
        this.props.history.push(`/courses/${courseId}/boards/${boardId}/messages/new`)
      }
      toListPage = (_courseId, boardId) => {
        if (typeof _courseId == "object") {
          const boardId = _courseId.boardId
          const courseId = _courseId.coursesId
          this.props.history.push(`/courses/${courseId}/boards/${boardId}`)
        } else {
          this.props.history.push(`/courses/${_courseId}/boards${boardId ? '/' + boardId : ''}`)
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
            >
        
            </WrappedComponent>
          </React.Fragment>
        )
      }
    }
	}
}