import React, { Component } from 'react';

import PathSearch from './ShixunPathSearch.js';
import { configShareForPaths } from 'educoder'

class ShixunPath extends Component{
  constructor(props) {
      super(props)
  }
  componentDidMount() {
    console.log('configShareForPaths')
    configShareForPaths()
  }
  
  render(){
    return(
      <div>
         <div className="newMain clearfix">
              <PathSearch
								{...this.state}
								{...this.props}
							></PathSearch>
          </div>
          
      </div>
    )
  }
}
export default ShixunPath;