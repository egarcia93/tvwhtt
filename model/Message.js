const mongoose =  require('mongoose');

const messageSchema =  new mongoose.Schema({

    message:{
        type: String,
        min: 0,
        max: 255
    },
    
    date:{
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model('Message',messageSchema);