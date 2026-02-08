const {user} = require('../models/UserSchema')
const {message} = require('../models/MessageSchema')
const { friendRrequest } = require('../models/FriendRequestSchema')

exports.dashboard = async(req,res) => {

   const friendlist = await friendRrequest.find( {$or: [
       {sender_id:req.user._id},
       {receiver_id:req.user._id}
   ]})

   const users = await user.find({_id:{$ne : req.user._id}})
   for (let i = 0; i < users.length; i++) {
    const lastMessage = await message
      .findOne({
        $or: [
          { sender_id: req.user._id, receiver_id: users[i]._id },
          { sender_id: users[i]._id, receiver_id: req.user._id }
        ]
      })
      .sort({ createdAt: -1 });

    users[i] = {
      ...users[i].toObject(),
      lastMessage
    };
  }

   res.render('dashboard',{loggedInUser:req.user,users:users})
} 

exports.getuser = async(req,res) => {
   try{
      const id = req.body.id
      const chat = await user.findOne({_id:id})
      return res.status(200).json({success:true,data:chat})
   }catch (error) {
      console.log(error.message)
   }
}

exports.sendMessage = async(req,res) => {

   try{

   const newMessage = await message.create({
       sender_id : req.body.sender_id,
       receiver_id : req.body.receiver_id,
       message : req.body.message
   })

   return res.status(200).json({success:true,data:newMessage})

   }catch(error){ 
      console.log(error.message)
   }
}

exports.search = async()=>{

}