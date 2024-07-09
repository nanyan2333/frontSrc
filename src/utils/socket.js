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
        this.socket.onmessage = (msg) => {
            let res = JSON.parse(msg.data);
            if (res.fromId) {
                if (!this.messages[res.fromId]) {
                    this.messages[res.fromId] = [];
                }
                this.messages[res.fromId].push(res.message);
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
