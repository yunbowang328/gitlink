import React, { Component } from 'react';

import RFB from '@novnc/novnc/lib/rfb.js';

const $ = window.$;
// const showIframeContent = window.location.search.indexOf('vnc=1') != -1;
class VNCDisplay extends Component {
	componentDidMount() {
		console.log('vnc init')
		console.log(RFB)

        let rfb;
        let desktopName;
        // When this function is called we have
        // successfully connected to a server
        function connectedToServer(e) {
            $('#top_bar').hide()
            status("Connected to " + desktopName);
        }
        // This function is called when we are disconnected
        function disconnectedFromServer(e) {
            if (e.detail.clean) {
                status("Disconnected");
            } else {
                status("Something went wrong, connection is closed");
            }
        }
        // When this function is called, the server requires
        // credentials to authenticate
        function credentialsAreRequired(e) {
            const password = prompt("Password Required:");
            rfb.sendCredentials({ password: password });
        }
        // When this function is called we have received
        // a desktop name from the server
        function updateDesktopName(e) {
            desktopName = e.detail.name;
        }
        // Since most operating systems will catch Ctrl+Alt+Del
        // before they get a chance to be intercepted by the browser,
        // we provide a way to emulate this key sequence.
        function sendCtrlAltDel() {
            rfb.sendCtrlAltDel();
            return false;
        }
        // Show a status text in the top bar
        function status(text) {
            document.getElementById('status').textContent = text;
        }
        // This function extracts the value of one variable from the
        // query string. If the variable isn't defined in the URL
        // it returns the default value instead.
        function readQueryVariable(name, defaultValue) {
            // A URL with a query parameter can look like this:
            // https://www.example.com?myqueryparam=myvalue
            //
            // Note that we use location.href instead of location.search
            // because Firefox < 53 has a bug w.r.t location.search
            const re = new RegExp('.*[?&]' + name + '=([^&#]*)'),
                match = document.location.href.match(re);
            if (typeof defaultValue === 'undefined') { defaultValue = null; }
            if (match) {
                // We have to decode the URL since want the cleartext value
                return decodeURIComponent(match[1]);
            }
            return defaultValue;
        }
        document.getElementById('sendCtrlAltDelButton')
            .onclick = sendCtrlAltDel;
        // Read parameters specified in the URL query string
        // By default, use the host and port of server that served this file

        // const host = readQueryVariable('host', window.location.hostname);
        // let port = readQueryVariable('port', window.location.port);
        // const password = readQueryVariable('password', '');

        const { vnc_url } = this.props;
        // http://117.50.12.63:43149/vnc_lite.html?password=headless
        let _ar1 = vnc_url.split('/');
        let ipAndPort = _ar1[2].split(':')
        let passwordAr = _ar1[3].split('password=')
        const host = ipAndPort[0]
        let port = ipAndPort[1]
        const password = passwordAr[1].split('&')[0]

        const path = readQueryVariable('path', 'websockify');
        // | | |         | | |
        // | | | Connect | | |
        // v v v         v v v
        status("Connecting");
        // Build the websocket URL used to connect
        let url;
        if (vnc_url.indexOf("https:") != -1) {
            url = 'wss';
        } else {
            url = 'ws';
        }
        url += '://' + host;
        if(port) {
            url += ':' + port;
        }
        url += '/' + path;
        // Creating a new RFB object will start a new connection
        rfb = new RFB(document.getElementById('screen'), url,
                    { credentials: { password: password } });
        // Add listeners to important events from the RFB module
        rfb.addEventListener("connect",  connectedToServer);
        rfb.addEventListener("disconnect", disconnectedFromServer);
        rfb.addEventListener("credentialsrequired", credentialsAreRequired);
        rfb.addEventListener("desktopname", updateDesktopName);
        // Set parameters that can be changed on an active connection
        rfb.viewOnly = readQueryVariable('view_only', false);
        // TODO scale
        // https://github.com/novnc/noVNC/issues/1181
        // http://localhost:3007/tasks/et8zqfkh9lsn
        /**
            https://www.shiyanlou.com/courses/?fee=free&page_size=20&category=Linux%E8%BF%90%E7%BB%B4&tag=%E5%85%A8%E9%83%A8&sort=default&preview=false
            参考实验楼实现方式：
            div position: relative; width: 744.9px; height: 558.675px;
            div position: relative; width: 1152px; height: 864px; transform-origin: 0px 0px; transform: scale(0.646615, 0.646615);
            div width: 1152px; height: 864px; position: absolute; left: 0px; top: 0px; overflow: hidden;
            canvas
         */
        rfb.scaleViewport = readQueryVariable('scale', false);
        rfb.resizeSession = true
        window.__rfb == rfb;

	}
	
  	render() {
  		const { challenge,  vnc_url } = this.props

  		
	    return (
	      	<div className="vncDisply" style={{height: '100%'}}>
                <style>{`
                    .vncDisply #top_bar {
                        position: absolute;
                        background-color: #6e84a3;
                        color: white;
                        font: bold 12px Helvetica;
                        padding: 6px 5px 4px 5px;
                        border-bottom: 1px outset;
                        width: 100%;
                    }
                    .vncDisply #status {
                        text-align: center;
                    }
                    .vncDisply #sendCtrlAltDelButton {
                        position: fixed;
                        top: 0px;
                        right: 0px;
                        border: 1px outset;
                        padding: 5px 5px 4px 5px;
                        cursor: pointer;
                    }
                    .vncDisply #screen {
                        height: 100%;
                        flex: 1; /* fill remaining space */
                        overflow: hidden;
                        background: #666;
                    }
                    .vncDisply #screen > div {
                        background: #666 !important;
                    }
                `}</style>
		        <div id="top_bar">
                    <div id="status">Loading</div>
                    {/* <div id="sendCtrlAltDelButton">Send CtrlAltDel</div> */}
                    <div id="sendCtrlAltDelButton" style={{ opacity: 0, display: 'none' }}></div>
                </div>
                <div id="screen" style={{ height: 'calc(100vh - 140px)' }}>
                    
                </div>
                {this.props.children}
		    </div>
	    );
  	}
}

export default VNCDisplay;
