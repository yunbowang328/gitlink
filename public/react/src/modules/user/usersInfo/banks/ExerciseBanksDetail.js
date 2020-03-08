import React, { Component } from 'react';
import axios from 'axios'

import ExerciseDisplay from '../../../courses/exercise/ExerciseDisplay'

class ExerciseBanksDetail extends Component{
  constructor(props){
    super(props);
    this.state={
        
    }
  }

  componentDidMount = () =>{
      
  }
  detailFetchCallback = (result) => {
    let Id=this.props.match.params.Id;

    const crumbData={
        title: result.data.exercise && result.data.exercise.name,
        is_public: result.data.exercise && result.data.exercise.is_public,
        crumbArray:[
            {content:'详情'},
        ]
    }
    const menuData={
        tab:'0',//tab选中的index
        menuArray:[//tab以及tab路由
            {to:`/banks/exercise/${Id}/${this.props.match.params.type}?tab=0`,content:'内容详情'}
        ],
        category:'exercise',//
        tos: `/banks/exercise/${Id}/edit/${this.props.match.params.type}`,
        id: Id,
        is_public: result.data.exercise && result.data.exercise.is_public,
        type:this.props.match.params.type,
        authorize:result && result.data && result.data.authorize,
    }
    this.props.initPublic(crumbData,menuData,result.data);
  }

  render(){
    let { pollDetail } = this.state
    
    return(
      <div>
        <ExerciseDisplay {...this.props} {...this.state} 
            urlPath = {'exercise_banks'}
            detailFetchCallback={this.detailFetchCallback}
        >
        </ExerciseDisplay>
      </div>
    )
  }
}
export default ExerciseBanksDetail
