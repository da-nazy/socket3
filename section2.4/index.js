import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as redis from './redis.js';
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('static'));

var namespaceHandler=(namespace)=>{
   return(socket)=>{
      socket.emit('event','You joined'+ namespace.name);
      // just resend it

      socket.on('event',(data)=>{
         socket.broadcast.emit('event',data);
      });
   }
}
  
var one=io.of('/namespace1');
var two=io.of('/namespace2');

one.on('connection',namespaceHandler(one));
two.on('connection',namespaceHandler(two));


server.listen(8080, () => {
console.log('Server listening on port 8080');
});

export default app;