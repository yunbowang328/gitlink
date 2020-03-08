import React , { Component } from 'react';
import { getImageUrl } from 'educoder';
import { Link } from 'react-router-dom';
import '../css/index.css'
import './list.css';
import img_parise from '../Images/parise.png';
class IndexItem extends Component{
  // constructor(props){
  //   super(props);
  // }

  TurnToDetail=(login,url)=>{
    this.props.history.push({
      pathname:url,
      state:login
    })
  }
  render(){ 
    const { projects } = this.props;
    // item.author.login
    const renderList = (
      projects && projects.length >0 ? projects.map((item,key)=>{
        return(
          <div className="p-r-Item" key={key}>
            <img className="p-r-photo" alt="" src={getImageUrl(`images/${item.author && item.author.image_url}`)} ></img>
            <div className="p-r-Infos">
              <div className="p-r-name">
                <a onClick={()=>this.TurnToDetail(`${item.author && item.author.login}`,`/projects/${item.identifier}/coder`)} className="hide-1 font-16 color-grey-3" style={{whiteSpace:"wrap"}}>{item.name}</a>
              </div>
              <div className="p-r-content">
                <p className="break_word task-hide flex1" style={{maxHeight:"40px"}}>{item.description}</p>
                <span className="p-r-tags">
                  {/* { item.forked_count ? <span><label>Fork</label><span>{ item.forked_count}</span></span>:"" } */}
                  <span className="pariseTag"><img src={img_parise} alt="" className="pariseImg"/>点赞 ({ item.praises_count })</span>
                  { item.language && item.language.id ? <span><label>{ item.language.name }</label></span>:"" }
                </span>
              </div>
              <div className="p-r-about">
                <span className="p-r-detail">
                  <span><label>浏览量：</label>{item.visits}</span>
                  { item.category && item.category.id && <span><label>项目类别：</label>{item.category.name}</span>}
                  {item.last_update_time ? <span ><label>更新于</label>{item.time_ago}</span> : "" }
                </span>
              </div>
            </div>
          </div>
        )
      }):""
    )
    return(
      <div className="project-list">
        { renderList }
      </div>
    )
  }
}
export default IndexItem;