const mongoose = require('mongoose')

const FriendRequestSchema = new mongoose.Schema({
    sender_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    receiver_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status: {
       type: String,
       enum: ["pending", "accepted", "rejected"],
       default: "pending"
    },
},

{ timestamps: true }

);

module.exports.friendRrequest = mongoose.model("friend-request", FriendRequestSchema);
