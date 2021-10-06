const express=require('express');
const app=express();
const PORT=3000;
var server=require('http').createServer(app);
const SocketHandler=require('./socket')();

const io=require('socket.io')(server, {
    cors:{
        origin:"*"
    },
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization, auth",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
}});

global.io=io;
global.io.on('connection',SocketHandler.onConnection);

server.listen(PORT,()=>{
    console.log("Server started on "+PORT);
});