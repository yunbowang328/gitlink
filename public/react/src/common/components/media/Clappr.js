import React,{ Component } from "react";
import { getUrl2 } from "educoder";
import ReactPlayer from 'react-player'

const $ = window.$
let _url_origin = getUrl2()

class Clappr extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  componentWillUnmount() {
    this['player'+this.props.id] && this['player'+this.props.id].destroy()
  }
  
  componentDidMount() {
    return;
    
    const source = this.props.source || "http://your.video/here.mp4"
    const { id, type } = this.props
    const _id = `#_player${id}`

    if (!window['Clappr'] && window['ClapprLoading'] == true) {
      setTimeout(() => {
        this.componentDidMount()
      }, 300)
      return;
    }
    // && window['clappr-playback-rate-plugin']
    if (window['Clappr'] ) {
      // https://github.com/clappr/clappr/issues/1839
      // http://clappr.github.io/classes/Player.html#method_mute
        this['player'+id] = new window.Clappr.Player({
            source: source, parentId: _id,
            height: type == 'mp3' ? 60 : 360,
            hideMediaControl: type == 'mp3' ? false : true,
            // plugins: {
            //     'core': [window.Clappr.MediaControl, window['clappr-playback-rate-plugin'].default]
            // }
        });
    } else {
        window['ClapprLoading'] = true;
        $.getScript(
            `${_url_origin}/javascripts/media/clappr.min.js`,
            (data, textStatus, jqxhr) => {
                window.clappr = window.Clappr
                // $.getScript(
                //     `${_url_origin}/javascripts/media/clappr-playback-rate-plugin.min.js`,
                //     (data, textStatus, jqxhr) => {
                        this['player'+id] = new window.Clappr.Player({
                            source: source, parentId: _id,
                            height: type == 'mp3' ? 60 : 360,
                            hideMediaControl: type == 'mp3' ? false : true,
                            // plugins: {
                            //     'core': [window.Clappr.MediaControl, window['clappr-playback-rate-plugin'].default]
                            // }
                        });

                // })
            
        });

        //
        // $.when(
        //     $.getScript( `${_url_origin}/javascripts/media/clappr.min.js` ),
        //     // $.getScript( `${_url_origin}/javascripts/media/clappr-thumbnails-plugin.js` ),
        //     $.getScript( `${_url_origin}/javascripts/media/clappr-playback-rate-plugin.min.js` ),
        //     $.Deferred(function( deferred ){
        //         $( deferred.resolve );
        //     })
        // ).done(function(){
        //     //place your code here, the scripts are all loaded
        //     const player = new window.Clappr.Player({
        //         source: source, parentId: _id,
        //         plugins: {
        //             'core': [window.Clappr.MediaControl, window.Clappr.Playback]
        //         }
        //     });
        // }); 
    }
  }
  
  render(){
    
    let { source, id, className, type } = this.props;
    const _id = `_player${id}`
    return(
      <React.Fragment>
        {/* https://github.com/CookPete/react-player/issues/686 */}
        <ReactPlayer url={source} playing={false} controls={true} width={400} height={ type == 'mp3' ? 55 : 290}/>
        
        {/* <style>{`
            .playback_rate {
                margin-right: 16px;
            }
        `}</style>
        <div id={_id} className={className + ' ' + type}></div> */}

        {/* 原生 */}
        {/* { type == 'mp3' ? <audio src={source} preload controls></audio>
        : <video src={source} controls="controls">
          您的浏览器不支持 video 标签。
        </video>} */}
      </React.Fragment>
    )
  }
}
export default Clappr;