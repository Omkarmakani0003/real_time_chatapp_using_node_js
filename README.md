# 💬 Real-Time Chat Application  

A real-time messaging application built using **Node.js & Socket.IO** that enables instant communication between multiple users.

This project demonstrates WebSocket-based communication, JWT authentication, real-time user status tracking, and secure messaging architecture.

---

## 🚀 Tech Stack  

### 🖥 Backend  
<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express" />
  <img src="https://cdn.simpleicons.org/socketdotio/010101" height="50" alt="Socket.IO"/>
</p>

### 🗄 Database  
<p align="left">
  <img src="https://skillicons.dev/icons?i=mongodb" />
</p>

### 🎨 Frontend  
<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,bootstrap" />
</p>

### 🗄 Template Engine  
- EJS  

### 🔐 Authentication  
- JWT-Based Authentication  

---

## ✨ Core Features  

### 🔐 Secure Authentication
- JWT-based login system  
- Protected chat routes  
- Secure token verification  

### 💬 Real-Time Messaging
- Instant message delivery using WebSockets  
- One to one chat support  
- Real-time communication powered by Socket.IO  

### 🟢 Live User Status
- Online/Offline user indicators  
- Real-time connection tracking  

### ⚡ Instant Updates
- No page refresh required  
- Bidirectional communication between client & server  

---

## 🏗 Architecture  

This project follows a clean backend structure:

- Models → User Schema  
- Views → EJS Templates  
- Controllers → Authentication & Chat Logic  
- Routes → Application Routing  

Designed for scalability and efficient real-time performance.

---

## 🌐 Live Demo  

🔗 **Live Application:**  
👉 https://real-time-chatapp-using-node-js.onrender.com/login  

---

* You can register a new user as well to test multi-user chat functionality 

---

## ⚙️ Environment Variables  

Create a `.env` file and configure:

<pre>
  PORT = 3000
  DBURI = mongodb+srv://makaniomkar3141_db_user:zseDccxMyQJRqPNH@cluster0.se9rcfz.mongodb.net/e-shop
  JWTSECRET = myjwtsecret
</pre>

## ⚙️ Install Dependencies 

npm install

## ⚙️ Run the Application

npm run dev


