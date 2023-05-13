const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express()
const server =http.createServer(app)
app.use(cors())
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET",'POST']
    }
})

const users={}
const rooms={'firstRoom':{'usersInChat':[],'roomMessages':[]}} 
const date = new Date();

io.on('connection',socket=>{
    console.log(socket.id);
    socket.on('join server',(userName)=>{
        users[userName] = socket.id
        console.log(users);
        io.emit('new user',{users,rooms})
    })
    socket.on('leave server',({userName})=>{
        delete users[userName];
        io.emit('user left',{users})
        socket.disconnect();
    })

    socket.on('Create New Room',(nameNewRoom)=>{
        rooms[nameNewRoom] = {}
        if(!rooms[nameNewRoom]['usersInChat'])rooms[nameNewRoom]['usersInChat']=[]
        if(!rooms[nameNewRoom]['roomMessages'])rooms[nameNewRoom]['roomMessages']=[]
        io.emit('new room',rooms)
    })

    socket.on('join room',({room,userName})=>{
        socket.join(room)
        if(!rooms[room]['usersInChat'])rooms[room]['usersInChat']=[]
        rooms[room]['usersInChat'].push(userName)
        socket.emit('joined room',rooms[room])
        socket.to(room).emit('someone joined room',rooms[room]['usersInChat'])
    })

    socket.on('leave room',({room,userName})=>{
        socket.leave(room)
        rooms[room]['usersInChat'].splice(rooms[room]['usersInChat'].indexOf(userName),1)
        console.log(rooms[room]);
        socket.to(room).emit('left room',rooms[room])
    })
    
    socket.on('send message',({content,room,sender})=>{
        message={sender,content,time:date.getHours()+':'+date.getMinutes()}
        if(!rooms[room]['roomMessages'])rooms[room]['roomMessages']=[]
        rooms[room]['roomMessages'].push(message)
        socket.to(room).emit("new message",rooms[room]['roomMessages'])
    })

})

server.listen(3005,()=>console.log('socket on port 3005'))
