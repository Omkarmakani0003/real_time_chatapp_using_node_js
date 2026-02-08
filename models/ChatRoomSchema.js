const mongoose = require('mongoose')

const ChatRoomSchema = new mongoose.Schema({
    partiparticipated: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
    ],
    theme_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "Theme"
    },
},

{ timestamps: true }

);

module.exports = mongoose.model("chatroom", ChatRoomSchema);
