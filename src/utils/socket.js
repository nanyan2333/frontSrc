import { getCurrentFormattedTime } from './time';

class SocketApi {
    constructor(myId, myRole, msgdict) {
        this.url = `ws://8.138.127.170:8080/chat/${myId}/${myRole}`;
        this.messages = msgdict;
        this.id = myId;
        this.role = myRole;
        this.connect();
    }

    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onclose = () => {
            console.log('WebSocket closed, attempting to reconnect...');
        };
        this.socket.onopen = () => {
            console.log('WebSocket connected:' + this.url);
        }
        this.socket.onmessage = (event) => {
           
            // event.data 是接收到的消息字符串
            let data = event.data;
            try {
                // 将字符串解析为 JSON 对象
                let res = JSON.parse(data);
                res.toId = this.id
                res.toRole = this.role
                res.chatTime = getCurrentFormattedTime();
                console.log(res);
                if (res.fromId) {
                    console.log("has data:" + this.messages[res.fromId]);
                    if (!this.messages[res.fromId]) {
                        this.messages[res.fromId] = [];
                    }
                    this.messages[res.fromId].push(res);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };
    }
    sendMessage(_toId, _toRole, _msg) {
        const data = {
            toId: _toId,
            toRole: _toRole,
            message: _msg,
            chatTime: getCurrentFormattedTime()
        };
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not open. readyState: ' + this.socket.readyState);
            setTimeout(() => this.socket.send(JSON.stringify(data)), 1000);

        }
    }

    closeSocket() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

export default SocketApi;
