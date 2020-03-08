import React,{ Component } from "react";
import { Skeleton ,Spin ,PageHeader} from "antd";
class NewStatistics extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){

    return(
      <div className="newContainer">
        <div className="newMain clearfix">
            <div className={"educontent mt20"}>
              <div className="clearfix mb30">

                <PageHeader
                  style={{
                    border: '1px solid rgb(235, 237, 240)',
                  }}
                  title="学习统计"
                  subTitle="|   Android综合实训之物联网移动应用"
                />

              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default NewStatistics;