/**
    这里是非iframe版本的openTerminal
    TODO 换一个消息机制，替代iframe情况下使用的postMessage
        消息得种类有：
            发送
            1、postMessage({tp: 'sshWorking'}, "*");                    ssh正在被使用
            2、window.parent.postMessage({tp: 'setSSHConnectStatus', tab: options.tab}, "*");
            
            接收
            1、 if(event.data.tp === 'resize'){   改变命令行窗体大小
            2、 } else if (event.data.tp === 'reload') {            异常中断后重连
            3、 } else if (event.data.tp === 'close_ssh_cocket') {  中断命令行websocket
 */
function openTerminal(options) {
    // 为了多个实例能同时存在
    (function () { 
        var heartBeatInterval;
        var force_close_socket = false;
        //var CONNECT_TIME = 0; // 请求连接次数
        Rows = parseInt(options.rows);
        var parentDomId = options.parentDomId || ''
        var client = new WSSHClient();
        var base64 = new Base64();
        var term = new Terminal({cols: options.columns, rows: Rows, screenKeys: true, useStyle: true
        // TODO 默认是canvas，可能被其他样式影响了 canvas用不了
            , rendererType: 'dom'
            , fontSize: 16
            });
        term.on('data', function (data) {
            console.log("xterm data: ");
            console.log(data);
            client.sendClientData(data);
        
            window.parent.postMessage({tp: 'sshWorking'}, "*");
        });
        term.open();
        $('body>.terminal').detach().appendTo( parentDomId + ' #term' );
        $(parentDomId + " #term").show();
        term.write("Connecting...");
        console.log(options)
        console.debug(options);

        //var interTime = setInterval(client_connect, 1000)
        setTimeout(client_connect, 3000);

        heartBeatInterval = setInterval(function(){
            client.sendHeartBeat()
        }, 30 * 1000)
        /**
        * 重新设置窗口大小
        * @param o
        */
        var resizeTerminal = function (o) {
            if (typeof term === 'object') {
                var rows = term.rows;
                var cols = term.cols;
                if (o.rows > 0) {
                    rows = o.rows;
                }
                if (o.cols > 0) {
                    cols = o.cols;
                }
                term.resize(cols, rows);
            }
        };

        window.addEventListener("message", function (event) {
            console.log("post message: ");
            console.log(event.data);
            if(event.data.tp === 'resize'){
                resizeTerminal(event.data);
            } else if (event.data.tp === 'reload') {
                window.location.reload()
            } else if (event.data.tp === 'close_ssh_cocket') {
                force_close_socket = true;  // 强制关闭socket，用于不开启自动重连
                client && client.close(); 
            }
        }, false);

        var intervalId = null;
        function client_connect() {
            var CONNECTED = false; // 是否连接成功过
            console.log("连接中....");
            console.log(options);

            client.connect({
                onError: function (error) {
                    term.write('Error: ' + error + '\r\n');
                    console.log('error happened');
                },
                onConnect: function () {
                    console.log('connection established');
                    client.sendInitData(options);
                    term.focus();
                },
                onClose: function () {
                    debugger;

                    clearInterval(heartBeatInterval);
                    
                    console.log("连接关闭");
                    term.write("\r\nconnection closed");
                    if (CONNECTED) {
                        console.log('connection reset by peer');
                        $('term').hide();
                    }
                    if (force_close_socket === false) {
                        // $(window).trigger('setSSHConnectStatus');
                        window.parent.postMessage({tp: 'setSSHConnectStatus', tab: options.tab}, "*");
                    } else {
                        // 主动关闭连接时，不自动重连
                        force_close_socket = false;
                    }
                },
                onData: function (data) {
                    if (!CONNECTED) {
                        console.log("first connected.");
                        // 问题重现的实训 带代码tab的 命令行实训 https://www.educoder.net/tasks/83hflni9es7tl
                        setTimeout(function() {
                            // TODO canvas模式下，没有body
                            if ( term && term.body && term.body.innerText 
                                    && term.body.innerText.indexOf('Connecting') != -1 ) {
                                term.clear();   // 有的连上后还出现了“Connecting。。。”
                            }
                        }, 1000)

                        term.write("\r"); //换行
                        term.focus();     //焦点移动到框上
                    }
                    /*if(interTime){
                    clearInterval(interTime);
                    }*/
                    CONNECTED = true;

                    data = base64.decode(data);
                    /* TIMEINIT = 0;*/
                    term.write(data);
                    console.log('get data:' + data);
                }
            })
        }
    }());
}

var charWidth = 6.2;
var charHeight = 15.2;

/**
 * for full screen
 * @returns {{w: number, h: number}}
 */
function getTerminalSize() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    return {
        w: Math.floor(width / charWidth),
        h: Math.floor(height / charHeight)
    };
}


function store(options) {
    window.localStorage.host = options.host
    window.localStorage.port = options.port
    window.localStorage.username = options.username
    window.localStorage.ispwd = options.ispwd;
    window.localStorage.secret = options.secret
}

function check() {
    return validResult["host"] && validResult["port"] && validResult["username"];
}

function connect() {
    var remember = $("#remember").is(":checked")
    var options = {
        host: $("#host").val(),
        port: $("#port").val(),
        username: $("#username").val(),
        secret: $("#password").val(),
        gameid: $("#gameid").val(),
        rows: parseInt( $("#terminalRow").val() ),
        columns: parseInt( $("#terminalColumn").val() ),
        width: parseInt( $("#terminalWidth").val() ),
        height: parseInt( $("#terminalHeight").val() ),
        tab: $("#terminalTab").val(),
    }
    if (remember) {
        store(options)
    }
    if (true) {
        openTerminal(options)
    } else {
        for (var key in validResult) {
            if (!validResult[key]) {
                alert(errorMsg[key]);
                break;
            }
        }
    }
}
