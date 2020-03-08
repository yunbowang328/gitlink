import React, { Component } from 'react';
import { TEST_HOST } from 'educoder'
export function loadSshScript(callback) {
    let _url_origin = ``;
    let prefix = 'react/build'
    if (window.location.port == 3007) {
        // prefix = ''
        _url_origin  = TEST_HOST + '/' // 'https://newweb.educoder.net/';
    } else {
        // _url_origin = `https://testeduplus2.educoder.net/`;
			  _url_origin  = '/';
    }
    const $ = window.$;
    // 未加载过
    if (!window['Terminal']) {
        // /js/js_min_all.
        $('head').append($('<link rel="stylesheet" type="text/css" />')
            .attr('href', `${_url_origin}${prefix}/js/xterm/xterm.css`));

        // $.getScript(
        // `${_url_origin}${prefix}/js/xterm/xterm.js`,
        //     (data, textStatus, jqxhr) => {
        // });
        // $.getScript(
        // `${_url_origin}${prefix}/js/jsFromMiddleLayer/base64.js`,
        //     (data, textStatus, jqxhr) => {
        // });
        // $.getScript(
        //     `${_url_origin}${prefix}/js/jsFromMiddleLayer/ws.js`,
        //     (data, textStatus, jqxhr) => {
        //         $.getScript(
        //             `${_url_origin}${prefix}/js/jsFromMiddleLayer/main.js`,
        //                 (data, textStatus, jqxhr) => {
        //             callback && callback()
        //         });
        // });

        $.when(
            $.getScript( `${_url_origin}${prefix}/js/xterm/xterm.js` ),
            $.getScript(  `${_url_origin}${prefix}/js/jsFromMiddleLayer/base64.js` ),
            $.getScript( `${_url_origin}${prefix}/js/jsFromMiddleLayer/ws.js` ),
            $.getScript( `${_url_origin}${prefix}/js/jsFromMiddleLayer/main.js` ),
            $.Deferred(function( deferred ){
                $( deferred.resolve );
            })
        ).done(function(){
            //place your code here, the scripts are all loaded
            callback && callback()
        });
    } else {
        callback && callback()
    }
}

export function openTerminal(props, parentDomId) {
    const { game_id, host, password, port, username, webssh_url, ws_url,
            rows, cols, width, height} = props;

    var options = {
        host: host,
        port: port,
        username: username,
        secret: password,
        gameid: game_id,
        rows: rows,
        columns: cols,
        width,
        height,
        parentDomId,
        // tab: $("#terminalTab").val(),
    }
    window.g_websocket_url = ws_url;
    // TODO 加一个parentDomId 来做多ssh tab
    window.openTerminal(options)
}

