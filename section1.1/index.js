import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
    socket.on("socketping",()=>{
        console.log("Received socketping, sending socketpong");
        socket.emit('socketpong');
    })
console.log('A socket is now open');
console.log(socket);
});

server.listen(8080, () => {
console.log('Server listening on port 8080');
});

export default app;