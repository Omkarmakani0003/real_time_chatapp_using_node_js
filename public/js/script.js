
    const chatListEl = document.getElementById('chatList');
    const messagesArea = document.getElementById('messagesArea');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const currentChatName = document.getElementById('currentChatName');
    const currentChatAvatar = document.getElementById('currentChatAvatar');
    const currentChatStatus = document.getElementById('currentChatStatus');
    const currentChatStatusText = document.getElementById('currentChatStatusText');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const searchInput = document.getElementById('searchInput');
    const typingIndicator = document.getElementById('typingIndicator');
    const mainChat = document.getElementById('mainChat');
    const backBtn = document.getElementById('backBtn');
    const emojiBtn = document.getElementById('emojiBtn');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    var avatar = ''

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        if(newTheme === 'dark') {
            themeIcon.classList.remove('bi-moon-stars');
            themeIcon.classList.add('bi-sun');
        } else {
            themeIcon.classList.remove('bi-sun');
            themeIcon.classList.add('bi-moon-stars');
        }
    }
 
    function scrollToBottom() {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
    

    window.openChat = async function(id) {
        receiver_id = id
        
        const user = await fetch(`/getuser`,
           {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({id})
           }
        )
        const response = await user.json()
        
        if(response.success){
            avatar = `/images/uploads/${response.data.avatar}`
            currentChatAvatar.src = `/images/uploads/${response.data.avatar}`
            socket.emit('oldchat',{sender_id:sender_id,receiver_id:receiver_id})
            document.getElementById('currentChatName').innerText = response.data.fullName
            
            const avtiveUser = document.querySelector(`[data-id="${id}"]`)
        
            if(avtiveUser.dataset.id == receiver_id){
                document.querySelectorAll('.chat-item').forEach((e)=>{
                    e.classList.remove('active')
                })
                document.getElementById(`userActive-${receiver_id}`).classList.add('active')
            }
            
            if(response.data.is_online){
                document.getElementById('currentChatStatus').classList.remove('offline')
                document.getElementById('currentChatStatusText').innerText = 'Online'
                
            }else{
                document.getElementById('currentChatStatus').classList.add('offline')
                document.getElementById('currentChatStatusText').innerText = 'Offline'
            }
            document.querySelector('.chat-header').style.display = 'flex'
            document.querySelector('.chat-input-area').style.display = 'flex'
            
            
        }
        
    }

    sendBtn.addEventListener('click',async ()=>{
        const message = messageInput.value

        if(!message){
            return false
        }
        const send = await fetch(`/sendmessage`,
           {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({sender_id: sender_id,receiver_id: receiver_id,message:message})
           }
        )
        const response = await send.json()
        if(response.success){
           messageInput.value = ''
                let chatEle = `<div class="message outgoing" style="animation:none">
                <div>
                     <div class="msg-bubble">
                        ${response.data.message}
                     </div>
                     <span class="msg-time">${new Date(response.data.updatedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})}</span>
                    </div>
               </div>`
               messagesArea.innerHTML += chatEle
               scrollToBottom()
               socket.emit('newChat',response.data)
           }
        
    })

     socket.on('renderChat',function(response){
        
        if(receiver_id == response.sender_id && sender_id == response.receiver_id){
           let chatEle = `<div class="message incoming" style="animation:none">
           
                <div>
                     <div class="msg-bubble">
                        ${response.message}
                     </div>
                     <span class="msg-time">${new Date(response.updatedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})}</span>
                    </div>
               </div>`
          messagesArea.innerHTML += chatEle
          document.getElementById('last-message').innerText = response.message
          scrollToBottom()
        }
      })

      socket.on('loadOldChat',function(response){
         messagesArea.innerHTML = ''
         let Class = ''
         let chatHtml = ''
         response.forEach((chat)=>{
             if(chat.sender_id == sender_id){
                Class = 'outgoing'
             }else{
                Class = 'incoming'
             }

            chatHtml += `<div class="message ${Class}" style="animation:none">
            
                <div>
                     <div class="msg-bubble">
                        ${chat.message}
                     </div>
                     <span class="msg-time">${new Date(chat.updatedAt).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})}</span>
                    </div>
            </div>`
           
           
         })
         messagesArea.innerHTML = chatHtml
         scrollToBottom()
      })

      //search friends
      searchInput.addEventListener('keyup',async function(e){
         const value = e.target.value

         const searchUser = await fetch(`/search-user`,
           {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(value)
           }
        )
        const response = await searchUser.json()

      })
