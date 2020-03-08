import React, {Component} from 'react';
import '../css/Courses.css';
import {setImagesUrl} from 'educoder';


class CoursesGuide extends Component {
  constructor(props) {
    super(props)
    this.state={
      step:1
    }
  }
  render(){
    let {step} = this.state;
    return(
      <div className="guidePanel">
        <style>{`
          body{
            overflow:hidden!important;
          }
        `}</style>
        <div className="educontent">
          {
            step ==1 &&
            <div>
              <p className="clearfix"><img className="fr" src="/images/course/guide/1-1.png" width="175px" style={{margin:"205px 38px 0px 0px"}}/></p>
              <p className="clearfix pr"><img src="/images/course/guide/1-2.png" className="fr mt20 guideFirstRight"/></p>
              <p className="clearfix pr" style={{marginTop:"80px"}}>
                <img src="/images/course/guide/1-4.png" className="fl guideFirstLeft"/>
                <img src="/images/course/guide/1-3.png" className="fl" style={{marginLeft:"410px"}}/>
              </p>
              <p className="clearfix">
                <img src="/images/course/guide/1-5.png" className="fl mt50"/>
                <img src="/images/course/guide/1-6.png" className="fl mt40"/>
                <a href="javascript:void(0)"><img src="/images/course/guide/1-7.png" className="fl mt80 ml100"/></a>
              </p>
            </div>
          }
        </div>
      </div>
    )
  }
}
export default CoursesGuide;