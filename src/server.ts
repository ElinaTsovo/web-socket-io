import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import http from 'http'
import { Server } from 'socket.io'


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:'*',
    }
})
const port = process.env.PORT! || 7000
server.listen(port, () => {
    console.log(`listening on ${port}`);
  });

    //servidor para connection com users
    //tudo que fizer sobre sockets ficará dentro dessa função
  io.on('connection',(socket) =>{
    console.log('usuario conectado');
 
    socket.on('msg',(data) => {
        console.log(data);
       // socket.broadcast.emit(`msg`,data);
       socket.broadcast.emit(`${data.to}`,data);
        //io.emit("msg","dados");
    })

    socket.on('msg2',(data) => {
        console.log(data);
        socket.broadcast.emit(`${data.to}`,data);
        //io.emit("msg","dados");
    })
    
    socket.on('disconnect',() => {
        console.log('Usuario desconecatdo!')
    })
});





