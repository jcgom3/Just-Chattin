const path = require('path');
const http = require('http');
const routes = require('./controllers/');
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();
const app = express();
const exphbs = require('express-handlebars');

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

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
  socket.on('joinRoom', ({ room }) => {
    // Find index of the room inside user's cookie
    const index = socket.request.session.inRoom.findIndex(joinedRoom => joinedRoom === room)

    // If the user already joined the room, send message to client to redirect
    if (index !== -1){
      socket.emit('already joined');
    }else {
      // If user haven't joined, add room into cookie list
      socket.request.session.inRoom.push(room);
      socket.request.session.save();
      console.log(socket.request.session);

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
    }
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

      // get index of room to be removed
      const index = socket.request.session.inRoom.findIndex(joinedRoom => joinedRoom === user.room);
      if (index !== -1) {
        socket.request.session.inRoom.splice(index, 1)[0];
        socket.request.session.save();
      }
      
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });

    }
  });
  
  socket.on('logout',()=>{
    user_id = socket.request.session.user_id;
    console.log(user_id);
    io.emit('user logout', user_id);
  })
});

app.use(routes)

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});

