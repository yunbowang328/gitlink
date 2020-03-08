import React, { Component } from 'react';

class EffectDisplayContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { typeName, content1, content2, content3 } = this.props;
        return (
            <div className="task-popup-content effectDisplay">
                <style>{`
                    .effectDisplay .content_title {
                        flex: 1 1 0
                    }
                    .effectDisplay .content>div {
                        flex: 1
                    }
                    .effectDisplay .clappr, .effectDisplay .contentWrap {
                        display: flex;
                        justify-content: center;
                    }
                    .effectDisplay .clappr>div {
                        width: 400px !important;
                    }
                `}</style>
                <div className="clearfix df">
                    {content1 && <p className="content_title edu-txt-center fl  mr03precent font-18">原始{typeName}</p>}
                    {content2 && <p className="content_title edu-txt-center fl font-18  mr03precent">实际输出{typeName}</p>}
                    {content3 && <p className="content_title edu-txt-center fl font-18  mr03precent">预期输出{typeName}</p>}
                </div>
                <div className="clearfix df content" >
                    {content1 && <div className="fl  mr03precent pt10 mb50 contentWrap">
                        {content1}
                    </div>}
                    {content2 && <div className="fl  mr03precent pt10 mb50 contentWrap">
                        {content2}
                    </div>}
                    {content3 && <div className="fl  mr03precent pt10 mb50 contentWrap">
                        {content3}
                    </div>}
                </div>
            </div> 
        );
    }
}

export default EffectDisplayContent;