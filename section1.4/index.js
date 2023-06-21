import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
      // broadcast changes the emit so it goes out to everyone except the socket
      socket.broadcast.emit('user.events','someone has joined');
      socket.on('name',(name)=>{
      console.log(name + 'says hello!');
      socket.broadcast.emit('name',name);
     })
 
});

server.listen(8080, () => {
console.log('Server listening on port 8080');
});

export default app;