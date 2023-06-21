import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as redis from './redis.js';
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('static'));

var errorEmit=(socket)=>{
   return(err)=>{
      console.log(err);
      socket.broadcast.emit('user.events','something went wrong!');
   };
};

io.on('connection', (socket) => {
      // broadcast changes the emit so it goes out to everyone except the socket
      socket.broadcast.emit('user.events','someone has joined');
      socket.on('name',(name)=>{
      redis.storeUser(socket.id,name)
      .then(()=>{
      console.log(name + 'says hello!');
      socket.broadcast.emit('name',name);
      },errorEmit(socket))
      
     });

     socket.on('disconnect',()=>{
      redis.getUser(socket.id)
      .then((user)=>{
        if(user===null) return 'Someone'
        else return user
      })
      .then((user)=>{
            console.log(user+'left');
            socket.broadcast.emit('user.events',user+'left');
      },
      errorEmit(socket));
     })
 
});

server.listen(8080, () => {
console.log('Server listening on port 8080');
});

export default app;