const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const user_id = document.getElementById('chat-window').dataset.id;

const room = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

const socket = io();

// Join chatroom
socket.emit('joinRoom', { room });

socket.on('already joined',() => {
  document.location.replace('/?redirect=true');
  // Added query to let the homepage (select room page) knows
})

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', message => {
  // console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('user logout',id =>{
  if (id.toString() === user_id) {
    setTimeout(()=>{
      document.location.replace('/')
  },300);
  }
})

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  
  msg = msg.trim();
  
  if (!msg){
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
let lastID = 0;
const chatWindow = document.querySelector('.chat-messages');
function outputMessage(message) {
  let newMessage;
  if (user_id === message.user_id.toString()){
     newMessage =`<div class="message" style="background-color:#d3acdf; width:85%;" data-id="${message.user_id}" >
                    <p class="meta"  style="color:#3e1d69"> ${message.username} <span>${message.time}</span></p>
                    <p class="text">${message.text}</p>
                  </div>`
  } else{
    newMessage =`<div class="message" style="background-color:#dfc9e6; width:85%; margin-left:auto;" data-id="${message.user_id}" >
                    <p class="meta"> ${message.username} <span>${message.time}</span></p>
                    <p class="text">${message.text}</p>
                  </div>`
  }
  if (chatWindow.lastChild){
    if (lastID === message.user_id) chatWindow.lastChild.innerHTML += `<p class="text" style="margin-top:10px;">${message.text}</p>`;
    else chatWindow.innerHTML += newMessage;
    // console.log(chatWindow.lastChild.dataset.id);
  }
  else chatWindow.innerHTML += newMessage;
  lastID = message.user_id;
  if (lastID === 0 ){
    // Remove width for bot message
    chatWindow.lastChild.style.width = null;
  }
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
 }
