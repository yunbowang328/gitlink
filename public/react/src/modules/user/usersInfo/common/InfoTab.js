import React, { useState, useEffect, useContext, useRef, memo } from 'react';
import {Link} from 'react-router-dom';

import { getUrl2, isDev, ThemeContext } from 'educoder'
import axios from 'axios'


function InfoTab(props) {

    const theme = useContext(ThemeContext);
    const { category, changeCategory, categories, right } = props;
    const username = props.match.params.username

    useEffect(() => {

    }, [])

    return (
        <div className="white-panel edu-back-white pt20 pb20 clearfix ">
          {categories && categories.map(item => {
            return (
							item.id === 1 ?
								<li key={item.key}
										className={category == item.key ? "active whitepanelysllisyt" : 'whitepanelysllisyt'}><a
									href="javascript:void(0)" onClick={() => changeCategory(item.key)}
									style={{width: "70px"}}>{item.name}</a></li>
								:
								<li key={item.key}
										className={category == item.key ? "active whitepanelysllisyts" : 'whitepanelysllisyts'}><a
									href="javascript:void(0)" onClick={() => changeCategory(item.key)}
									style={{width: "80px"}}>{item.name}</a></li>
            )
          })}
          {/* <li className={category ? "" : "active"}><a href="javascript:void(0)" onClick={()=>this.changeCategory()}>全部</a></li>
          <li className={category=="manage" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeCategory("manage")}>{is_current ? "我":"TA"}管理的</a></li>
          <li className={category=="study" ? "active" : ""}><a href="javascript:void(0)" onClick={()=>this.changeCategory("study")}>{is_current ? "我":"TA"}学习的</a></li> */}
          <div className="fr">
          {right}
          </div>
        </div>
    )
}

export default InfoTab
