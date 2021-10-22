function WSSHClient() {
};

WSSHClient.prototype._generateEndpoint = function () {
    return g_websocket_url;
};

WSSHClient.prototype.connect = function (options) {
    var endpoint = this._generateEndpoint();

    if (window.WebSocket) {
        this._connection = new WebSocket(endpoint);
    }
    else if (window.MozWebSocket) {
        this._connection = MozWebSocket(endpoint);
    }
    else {
        options.onError('WebSocket Not Supported');
        return;
    }

    this._connection.onopen = function () {
        options.onConnect();
    };

    this._connection.onmessage = function (evt) {
        var data = evt.data.toString()
        options.onData(data);
    };


    this._connection.onclose = function (evt) {
        options.onClose();
    };
};

WSSHClient.prototype.close = function () {
    this._connection.close();
};

WSSHClient.prototype.send = function (data) {
    this._connection.send(JSON.stringify(data));
};

WSSHClient.prototype.sendInitData = function (options) {
    var data = {
        hostname: options.host,
        port: options.port,
        username: options.username,
        ispwd: options.ispwd,
        secret: options.secret
    };
    this._connection.send(JSON.stringify({"tp": "init", "data": options}))
    console.log("发送初始化数据：" + options)
}

WSSHClient.prototype.sendClientData = function (data) {
    this._connection.send(JSON.stringify({"tp": "client", "data": data}))
    console.log("发送客户端数据：" + data)
}

WSSHClient.prototype.sendHeartBeat = function (data) {
    this._connection.send(JSON.stringify({"tp": "h"}))
    console.log("发送客户端数据：" + data)
}

var client = new WSSHClient();
