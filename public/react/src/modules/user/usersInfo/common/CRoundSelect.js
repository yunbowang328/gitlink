import React, { useState, useEffect, useContext, useRef, memo } from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'antd'
import { getUrl2, isDev, ThemeContext } from 'educoder'
import axios from 'axios'


function CRoundSelect (props) { 
    const [open, setOpen] = useState(false)
    const theme = useContext(ThemeContext);
    const { category, changeCategory, categories, right, width, items,
            sortKey, onSortChange } = props;
    const username = props.match.params.username
    
    useEffect(() => {

    }, [])
    function onToggleOpen(over) {
        if (over) {
            console.log('over')
            setOpen(true)

        } else {
            console.log('out')
            setOpen(false)

        }
    }
    function findIndexByKey(key) {
        let _index = -1
        items && items.some((item, index) => {
            if (item.key == key) {
                _index = index
                return true;
            }
        }) 
        return _index
    }
    function _onSortChange(key, index) {
        if (index == 0) {
            return;
        }
        setOpen(false)
        onSortChange(key, index)
    }
    let index = findIndexByKey(sortKey)
    return (
        <React.Fragment>
        <div className="" style={{position: 'relative', lineHeight: '24px'}}>

            {/* onMouseOut={onToggleOpen} */}
            <div className="trigger" onMouseOver={() => onToggleOpen(true)} >
                <style>{`
                    .trigger, .droplist {
                        padding: 0px 6px;
                        border: 1px solid ${theme.foreground_select};
                        color: ${theme.foreground_select};
                        border-radius: 6px; 
                    }   
                    .trigger {
                        width: ${width || 'fit-content'};

                        cursor: pointer;
                    }
                    .droplist {
                        width: ${width || 'fit-content'};
                        position: absolute;
                        z-index: 2;
                        top: 0px;
                        background: #fff;
                        
                        cursor: pointer;
                        
                    }
                `}</style>
                <div className="currentItem">
                    {items[index].name} <Icon type="down" />
                </div>
            </div>
            {true && <ul className="droplist" onMouseLeave={() => onToggleOpen(false)}
                style={{display: open ? 'block' : 'none'}}
            >   
                {items.map((item, index) => 
                    <li key={item.key} className="" 
                        onClick={() => _onSortChange(item.key, index)}>{item.name}</li> 
                )}
                {/* <li className="">AAAAAAAA</li>
                <li className="">BBBBBBB</li>
                <li className="">CCCCCCC</li> */}
            </ul> }
        </div>
        </React.Fragment>
    )
}

export default CRoundSelect
