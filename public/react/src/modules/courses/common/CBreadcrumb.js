import React,{ Component } from "react";
import { WordsBtn } from "educoder";

class CBreadcrumb extends Component{
  constructor(props){
    super(props);
    
  }
  
  render(){
    let { items, className, separator }=this.props;
    return(
      <p className={`clearfix mb10 ${className} cBreadcrumb`}>
        { items && items.map( (item, index) => {
          if (!item.name) {
            return ''
          }
          if (item.to) {
            return <React.Fragment key={index}>
              <WordsBtn style="grey" className="fl hovercolorblue" to={item.to}>{item.name}</WordsBtn>
              {separator ? 
                <span className="color-grey-9 fl ml3 mr3">{separator}</span> :
                <span className="color-grey-9 fl ml3 mr3">&gt;</span>
              }
            </React.Fragment>
          } else {
            return <span key={index}>{item.name}</span>
          }
        })}
      </p>
    )
  }
}
export default CBreadcrumb;