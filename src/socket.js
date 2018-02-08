import uuid4 from 'uuid/v4';

const uuid = uuid4();

const socket = new WebSocket('wss://' + window.location.hostname + '/wss/'); //+ '?uuid=' + uuid);
socket.uuid = uuid;

export default socket;