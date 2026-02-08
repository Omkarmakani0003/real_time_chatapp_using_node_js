const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    contact: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_online: {
        type: Boolean,
        default: false
    },
    
    blockedUser: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ]
},

{ timestamps: true }

);

module.exports.user = mongoose.model("user", UserSchema);
