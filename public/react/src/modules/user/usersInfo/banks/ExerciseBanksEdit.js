import React, { Component } from 'react';
import axios from 'axios'
import { ActionBtn } from 'educoder'


import ExerciseNewCommon from '../../../courses/exercise/ExerciseNewCommon'

class ExerciseBanksEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPublic: undefined,
    //   isGroup: false
    }
  }
  componentDidMount = () =>{
      
    
  }

  initData = (responseData) =>{
      const Id = this.props.match.params.Id;

      const crumbData={
        title:'编辑',
        is_public: responseData && responseData.data && responseData.data.exercise.is_public,
        crumbArray:[
            {to:`/banks/exercise/${Id}/${this.props.match.params.type}`,content:'详情'},
            {content:'编辑'}
        ]
    }
    this.props.initPublic(crumbData,responseData.data);
  }
  
  render(){
    let { Id, type } = this.props.match.params
    const common = {
    //   onCancel:this.onCancel,
    //   isGroup: this.isGroup,
    //   doNew: this.doNew,
    //   doEdit: this.doEdit,
      initData: this.initData
    }
    return(
      <div className="courseForm">
        <style>
          {`
            .courseForm .ant-col-sm-24{
              text-align:left;
            }
          `}
        </style>
        <ExerciseNewCommon 
          {...this.props} 
          {...this.state} 
          {...common} 
          hidePreviewButton={true}
          wrappedComponentRef={(ref) => this.exerciseNewCommonRef = ref}
          isEdit={true}
          shixunsUrl={`/exercise_banks/choose_shixun.json`}
          exercise_url={'exercise_banks'}
          exercise_url_questions={'exercise_bank_questions'}
          bottomSection={<ActionBtn style="blue" className="fr" to={`/banks/exercise/${Id}/${this.props.match.params.type}`}>
            完成
          </ActionBtn>}
        ></ExerciseNewCommon>
      </div>
    )
  }
}
export default ExerciseBanksEdit;