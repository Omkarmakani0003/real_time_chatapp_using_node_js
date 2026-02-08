const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    sender_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    receiver_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    chatroom_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "chatroom"
    },
    message: {
        type: String,
    }, 
    date:{
        type:Date,
        default: Date.now
    },
},
   { timestamps: true }
);

module.exports.message = mongoose.model("message", MessageSchema);
