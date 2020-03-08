import React from 'react';
import PropTypes from 'prop-types';
import { Tag, message } from 'antd';
import axios from 'axios';

class MajorManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schoolId: props.schoolId,
      majorId: props.majorId,
      canManage: props.canManage,
      managers: props.managers
    }

    this.deleteManager = this.deleteManager.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.managers.length !== prevProps.managers.length){
      this.setState({ managers: this.props.managers });
    }
  }

  deleteManager(managerId){
    axios.delete(`/ec_major_schools/${this.state.majorId}/major_managers/${managerId}.json`).then(result => {
      if(result.status === 200){
        message.success('操作成功');
      }
    }).catch(e => { console.log(e) })
  }

  render() {
    let { canManage, managers } = this.state;

    return (
      <div className="manager-box-content">
        {
          managers && managers.map(manager => {
            return (
              <Tag key={manager.id} closable={canManage} onClose={() => { this.deleteManager(manager.id) }} color="blue">
                { manager.name }
              </Tag>
            )
          })
        }
      </div>
    )
  }
}

MajorManager.propTypes = {
  schoolId: PropTypes.string,
  majorId: PropTypes.number,
  canManage: PropTypes.bool,
  managers: PropTypes.array
}

export default MajorManager