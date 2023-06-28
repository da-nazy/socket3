import process from 'process';
import { config } from './config.js';
import socketIoEmitter from 'socket.io-emitter';

var io=socketIoEmitter({host:config.redis_host,port:config.redis_port});

io.to(process.argv[2]).emit('event',process.argv[3]);
setTimeout(()=>{process.exit(0)},1000)