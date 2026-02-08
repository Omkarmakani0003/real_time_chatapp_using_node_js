const mongoose = require('mongoose')

const ThemeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    header_and_footer_color: {
        type: String,
        required: true,
    },
    incoming_color: {
        type: String,
        required: true,
    },
    outgoing_color: {
        type: String,
        required: true,
    },
    font_color: {
        type: String,
        required: true,
    },
    
    send_btn_color: {
        type: String,
        required: true,
    },
},

{ timestamps: true }

);

module.exports = mongoose.model("Theme", ThemeSchema);
