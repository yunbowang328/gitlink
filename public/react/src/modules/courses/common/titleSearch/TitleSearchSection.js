import React,{ Component } from "react";
import {publicSearchs} from 'educoder';
class Titlesearchsection extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render(){
    let { addGroup } = this.state;
    const { firstRowRight, secondRowLeft,firstRowMid, secondRowBotton,thirdRow, title, onInputSearchChange
        , searchValue, onPressEnter, searchPlaceholder, allowClearonChange } = this.props;
    return(
      <React.Fragment>
        <style>{`
          .titleSearch .titleBar {
            display: flex;
          }
          .titleSearch .titleBar .toolbar {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }


          /*list style*/ 
          .boardsList {
            display: flex;
            align-items: center;
            
            padding-top: 8px;
            padding-bottom: 10px;
            padding-left: 0px;
            padding-right: 0px;
          }
          .boardsList .homepagePostSetting {
            position: absolute;
            width: 20px;
            height: 20px;
          }
          
          .boardsList .contentSection {
            flex: 1;
          }
        `}</style>
        <div className="titleSearch edu-back-white">
          {/* <div className="titleBar bor-bottom-greyE">
            <p className="title padding30 font-18 color-dark-21">{title}</p>
            <div className="toolbar">
              <button>123</button>
              <button>456</button>

            </div>
          </div> */}

          <p className="clearfix padding30 bor-bottom-greyE">
            <p style={{height: '20px'}}>
            {/* title={title} */}
              <span className="font-18 fl color-dark-21 filesnameslist" >{title}</span>
              <li className="fr font-16">
                { firstRowRight }
              </li>
            </p>

            {firstRowMid&&firstRowMid?
              <p style={{marginTop:'10px'}}>{firstRowMid}</p>
              :""}
          </p>

          <div className="clearfix pl30 pr30">
            { secondRowLeft }
            {/* <span className="fl mt22">共<label className="color-orange-tip ml3 mr3">6</label>名教师</span> */}
            
            {/* (searchValue || showSearchInput) &&  */}
            { <div className="fr mt16 mb16 searchView" >
              {publicSearchs(searchPlaceholder || "请输入姓名进行搜索",onPressEnter,onInputSearchChange,allowClearonChange)}
              {/*<Search */}
              {/*  onSearch={onPressEnter}*/}
              {/*  // value={searchValue}*/}
              {/*  placeholder= { searchPlaceholder || "请输入姓名进行搜索" }*/}
              {/*  onInput={onInputSearchChange}*/}
              {/*  onChange={allowClearonChange}*/}
              {/*  allowClear={true}*/}
              {/*></Search>*/}
            </div> }

            {secondRowBotton}
          </div>

          {/*<div className="clearfix pl30 pr30" style={{ paddingBottom: '16px' }}>*/}
            {/*{thirdRow}*/}
          {/*</div>*/}
        </div>
      </React.Fragment>
      )
    }
}
export default Titlesearchsection;