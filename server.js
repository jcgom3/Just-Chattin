const express = require('express');
const path = require('path');
const http = require('http');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const formatMessage = require('./utils/messages');
require('dotenv').config();
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app);
const io = require('socket.io').listen(server);

const sess = {
  secret: process.env.CK_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const sessionMiddleware  = session(sess);

app.use(sessionMiddleware);
io.use((socket,next)=>{
  sessionMiddleware (socket.request,{},next);
})

// Set static folder
app.use(express.static(path.join(__dirname, '/public')));

const botName = 'Just Chattin Bot ';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({  room }) => {
    // Get username from session
    const username = socket.request.session.username;
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Just Chattin!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });

       // destroy cookie
       if (socket.request.session.loggedIn) {
        socket.request.session.destroy() ;
      };
    }
  });
});

// Routes, break out to path folders later
// Include routes
// app.use(routes)

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/:room',(req,res)=>{
  if (req.session.loggedIn) res.sendFile(path.join(__dirname, './public/chat.html'));
})

app.post('/api/join', (req,res)=>{
  req.session.username=req.body.username;
  req.session.loggedIn = true;
  req.session.save();
})

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});