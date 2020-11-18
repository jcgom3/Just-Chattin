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
    const username = socket.request.session.username;
    // console.log(socket.request.session);
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
      //  if (socket.request.session.loggedIn) {
      //   socket.request.session.destroy() ;
      // };
    }
  });
});


app.post('/api/join', (req,res)=>{
  req.session.username=req.body.username;
  req.session.loggedIn = true;
  console.log(req.session);
  req.session.save();
})
app.use(routes)

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});

