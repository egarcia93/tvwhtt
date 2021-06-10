let express = require('express');
let app = express();

let http = require ('http');
let server = http.createServer(app);

let PORT= process.env.PORT || 3000;
app.use('/',express.static('public'));


server.listen(PORT,()=>{
    console.log("listening at localhost:3000");
});

//Initialize socket.io
let io = require('socket.io')(server);

io.sockets.on('connection', function(socket){
    console.log("A new user has joined!");

   //Event - Listen for the  "position" msg
   socket.on('position', function(data){
        console.log(data);
        io.sockets.emit('positionUpdate',data);
   }); 

    // Event - Listen for the "change" msg
    socket.on("change", function(data){
       socket.broadcast.emit("forceChange",data)
   })

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });    

})