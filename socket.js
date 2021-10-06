

class SocketHandler{     

    constructor(){
      
        this.onConnection=this.onConnection.bind(this);
    }

    async onConnection(socket){
       console.log("New Socket Connected");
       socket.on('send-message-all',(msg)=>{
            global.io.emit('msg',msg);
       });

       socket.on('send-message-room',(body)=>{
           if(typeof body=='string'){
               body=JSON.parse(body);
           }
          socket.broadcast.to(body.room).emit('msg',body.msg);
       });

       socket.on('join-room',(d,cb)=>
        {
            try{
                if(typeof d=='string'){
                    d=JSON.parse(d);
                }
                let {room}=d;     
                socket.join(room);
            }catch(err){
                console.log(err);
            } 
        });

       
       socket.on("leave-room",(room)=>{
            socket.leave(room);
       });


       socket.on("disconnect",async ()=>{ 
            console.log("Socket Disconnected")
       });
    }
}





module.exports=(t)=>t?SocketHandler:new SocketHandler();