import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
    // the socket object is a connection from one browser to another
    // io is server object that knows about all the connection
    
  socket.on('name',(name)=>{
    console.log(name+'Says hello!');
    io.emit('name',name)
  })
});

server.listen(8080, () => {
console.log('Server listening on port 8080');
});

export default app;