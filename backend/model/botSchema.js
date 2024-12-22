const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  
    userMessage : {
        type: String, 
        required: true 
    },

    botReply : {
        type: String, 
        required: true 
    },

    Messages_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Chatbot_Users',
        required : true,
    },
    
    timestamp : {
        type: Date, 
        default: Date.now 
    }

});

module.exports = mongoose.model('Chatbot_messages', chatSchema);