import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Tooltip } from 'antd';
import '../../paths/ShixunPaths.css';
import DetailCardsEditAndAdd from './DetailCardsEditAndAdd';
import axios from 'axios';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const $ = window.$
class DetailCards extends Component{
  constructor(props){
    super(props)
    this.state={
      pathCardsList:undefined
    }
  }

  getPathCardsList(){
    let pathid = this.props.match.params.PathId
    // let pathid= 28;
    let url=`/stages.json?subject_id=`+pathid;
    axios.get(url).then((result)=>{
      if(result.status===200){
        this.setState({
          pathCardsList:result.data.stages
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }


  for_paragraph = (index) =>{
    $("#detail_for_paragraph_"+index).slideToggle(500);
  }

  componentDidMount(){
    this.getPathCardsList();
  }
  onDragEnd = (result, shixunIndex) => {
    // console.log(result)

    // dropped outside the list
    if (!result.destination) {
      console.log('dropped outside the list')

      return;
    }
    if (result.destination.index === result.source.index) {
      console.log('the same')
      return;
    }
    // TODO exchange axios request

    const shixuns_list = reorder(
      this.state.pathCardsList[shixunIndex].shixuns_list,
      result.source.index,
      result.destination.index
    );
    const pathCardsList = this.state.pathCardsList
    pathCardsList[shixunIndex].shixuns_list = shixuns_list;
    this.setState({
      pathCardsList
    });
  }
  render(){
    let { pathCardsList }=this.state;
    return(
      <div>
        <div className="lesson-saved-list">
          {
            pathCardsList && pathCardsList.map((item,key)=>{
              return(
                <div className="lesson-saved-list-item" id={"stage_div_"+key}>
                  <p className="clearfix title-line">
                    <a className="fl ring-blue mr10 mt2">
                      <img src={getImageUrl("images/educoder/icon/charpter-white.svg")} className="fl ml3 mt3"/>
                    </a>

                    <span className="font-18 font-bd">{item.stage_name}</span>

										<Tooltip placement="bottom" title={"编辑"}>
												<a className="fr mtf3">
													<i className="iconfont icon-bianjidaibeijing font-22 color-green"></i>
												</a>
										</Tooltip>

										<Tooltip placement="bottom" title={"向下移动"}>
                    <a href="" className="fr ring-op-green mr20">
                      <img src={getImageUrl("images/educoder/icon/movedown.svg")} className="fl mt2 ml4"/>
                    </a>
										</Tooltip>

										<Tooltip placement="bottom" title={"向上移动"}>
											<a href="" className="fr ring-op-green mr20">
												<img src={getImageUrl("images/educoder/icon/moveup.svg")} className="fl mt2 ml4"/>
											</a>
										</Tooltip>
                  </p>
                  <div className="detail_for_paragraph clearfix" id={"detail_for_paragraph_"+key}>
                    <p className="color-dark-grey mt20 mb25 ml20 mr20 pl28 justify font-15">{item.stage_description}</p>

                    {/*
                      两个  ref={provided.innerRef}
                      item 加 {...provided.draggableProps}
                      handler 加 {...provided.dragHandleProps} 
                   */}
                    <DragDropContext onDragEnd={(result) => this.onDragEnd(result, key)}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef}>
                            {
                              item.shixuns_list && item.shixuns_list.map((line,index)=>{
                                return(
                                  <Draggable key={line.identifier} draggableId={line.identifier} index={index}>
                                    {(provided, snapshot) => (
                                      <div className="clearfix paragraph lineh-30" ref={provided.innerRef} {...provided.draggableProps}>
                                        <li className="fl li-width63">
                                    <span className="progressRing mr10">
                                      {
                                        line.complete_status === 1 ?<i className="iconfont icon-wancheng progressRing-over font-18 mt10"></i>
                                          :<i className="iconfont icon-bofang progressRing-part font-18 mt10"></i>
                                      }
                                      
                                    </span>
                                          <span className="paragraph_name color-grey3"><span className="subject_stage_shixun_index">{key+1}</span>-{index+1}&nbsp;&nbsp;{line.shixun_name}</span>
                                        </li>
                                        {
                                          line.shixun_status==="暂未公开"?
                                            <li className="fr status_li"><span className="fr color-grey-9">暂未公开</span></li>
                                            :

                                            <li className="fr status_li" >
                                              <a href={"javascript:void(0)"} {...provided.dragHandleProps}
                                                 className="mr30 color-blue_4C shixun_detail pointer fl none" target="_blank">drag</a>

                                              <a href={line.shixun_path} className="mr30 color-blue_4C shixun_detail pointer fl none" target="_blank">查看详情</a>
                                              <a href={line.tpi_path} className="btn_auto user_bluebg_btn fl none" id="shixun_operation" target="_blank">开始实战</a>
                                            </li>

                                        }
                                      </div>
                                    )}
                                  </Draggable>
                                )
                              })
                            }
                          </div>
                        )}

                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
              )
            })
          }
        </div>
        <DetailCardsEditAndAdd 	{...this.props}></DetailCardsEditAndAdd>
      </div>
    )
  }
}
export default DetailCards;