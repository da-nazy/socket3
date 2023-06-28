import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as Sockets from "socket.io";
import session from 'express-session';
import * as sockets from './sockets.js'
import router from './routes.js';
import {config} from './config.js';
import pkg from 'ioredis'
import { createAdapter } from '@socket.io/redis-adapter';
const {createClient}=pkg;
const app = express();
const server = app.listen(process.argv[2]);
const io = new Server(server);


// setup express to use middleware
app.use(express.static('static'));


// interserver communication
// this connects to redis and use redis to share 
// state between each server

const pubClient = createClient({host:config.redis_host,port:config.redis_port});
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

io.on('connection',(socket)=>{
 // we need specific events for each
 //cubs and bears  
 socket.on('room.join',(room)=>{
    console.log(socket.rooms);
    Object.keys(socket.rooms).filter((r)=>r!=socket.id)
    .forEach((r)=>socket.leave(r));

    setTimeout(()=>{
        socket.join(room);
        socket.emit('event','Joined room'+ room);
        socket.broadcast.to(room).emit('event','Someone joined room'+ room);
    },0);
 })

 socket.on('event',(e)=>{
    socket.broadcast.to(e.room).emit('event',e.name+'says hello!'); 
 })

});

   




export default app;