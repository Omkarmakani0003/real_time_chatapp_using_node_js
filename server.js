const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const dotenv = require('dotenv');
dotenv.config()

const { connection } = require('./config/connection')
const {user} = require('./models/UserSchema')
const {message} = require('./models/MessageSchema')
const user_routes = require('./routes/user.route')

connection();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
   secret:'thisissecret',
   resave: false,
   saveUninitialized: true,
}))

app.use(flash())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',user_routes)


let namespace = io.of('/user')

namespace.on('connection',async function(socket){
  console.log('connected')
  
  const token = socket.handshake.auth.token
  const User = await user.findById({_id:token})
  User.is_online = true
  User.save()
  
  socket.broadcast.emit('OnlineStatus',{userId : token})

  socket.on('disconnect',async function(){
    console.log('disconnected')

    const token = socket.handshake.auth.token
    const User = await user.findById({_id:token})
    User.is_online = false
    User.save()
    socket.broadcast.emit('OfflineStatus',{userId : token})
  })

  socket.on('newChat',function(data){
     socket.broadcast.emit('renderChat',data)
  })

  socket.on('oldchat',async function(response){
      var chats = await message.find({
         $or : [
            {sender_id: response.sender_id, receiver_id: response.receiver_id},
            {sender_id: response.receiver_id, receiver_id: response.sender_id}
         ]
      })
      socket.emit('loadOldChat',chats)
  })

})



http.listen(process.env.PORT,()=>{
  console.log('server is running on port',process.env.PORT)
})


