let express = require('express');
let app = express();
let Message = require('./model/Message');

/*let http = require ('http');
let server = http.createServer(app);
*/

app.use('/',express.static('public'));
app.use(express.json());


let dotenv = require('dotenv');
let mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true}, 
    ()=>console.log('Connected to db')
    );

app.post('/send',async (req,res)=>{
    console.log(req.body);
    const message = new Message({
        message: req.body.message,
        date: req.body.date
        
    });
    console.log(message);
    try{
        
        await message.save();
        res.json({task:"success"});
    }catch(err){
        res.status(400).send(err);
    }


});

app.get('/find', async(req, res)=> {
    try{
        await Message.find().exec(function(err, doc) {
        
            res.json(doc)});
        
    }
    catch(err){
        res.status(400).send(err);
    }
 
  });





/*
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
*/
let PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("listening at localhost:3000");
});
