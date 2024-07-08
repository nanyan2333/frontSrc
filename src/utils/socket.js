import { getCurrentFormattedTime } from './time';
class SocketApi {
    constructor(myId, myRole, msgdict) {
        this.url = `ws://8.138.127.170/chat/${myId}/${myRole}`
        this.socket = new WebSocket(this.url)
        this.messages = msgdict
        this.id = myId
        this.role = myRole
    }
    listenServer() {
        this.socket.onmessage = (msg) => {
            let res = JSON.parse(msg.data)
            if (res.fromId) {
                if (!this.messages[res.fromId]) {
                    this.messages[res.fromId] = [];
                }
                this.messages[res.fromId].push(res.message);
            }
        }
    }
    sendMessage(_toId, _toRole, _msg) {
        const data = {
            toId: _toId,
            toRole: _toRole,
            message: _msg,
            chatTime: getCurrentFormattedTime()
        }
        this.socket.send(JSON.stringify(data))
    }
    closeSocket() {
        if(this.socket){
            this.socket.close()
        }
    }
}

export default SocketApi;