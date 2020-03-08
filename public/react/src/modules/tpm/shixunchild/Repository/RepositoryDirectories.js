import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import axios from 'axios';

import { trace_collapse } from 'educoder'
const $ = window.$;


class RepositoryDirectories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
	}
  componentDidMount() {
  }
  render() {
    const { match, pathArray, fetchRepo
       } = this.props;
    let { RepositoryList } = this.state;
    return (
      <React.Fragment>
      
        { pathArray.length !== 0 && 
        <div className="bor-bottom-greyE padding5-10 font-14 ">
            <a className="color-blue"
            onClick={() => fetchRepo(0)} 
            >
            {match.params.shixunId}
            </a>
            <span className="ml3 mr3">/</span>
            { pathArray.map((item, index) => {
                // /shixuns/3ozvy5f8/repository/3ozvy5f8/master/shixun_show/src
                return (
                <React.Fragment>
                    { this.props.nameTypeMap[item] === 'tree' || item.indexOf('.') === -1 
                    ? <a
                        onClick={() => fetchRepo(index + 1)} 
                        className="color-blue">
                        {item}</a>  
                        :
                        <a >
                        {item}</a>
                    }
                    {index !== pathArray.length - 1 && <span className="ml3 mr3">/</span>}
                </React.Fragment>
                )
            })
            }
        </div> }
        
      </React.Fragment>
      
    );
  }
}
export default RepositoryDirectories;
