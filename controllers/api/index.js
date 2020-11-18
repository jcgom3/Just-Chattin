const router = require('express').Router();
const userRoutes = require('./user-routes');
const roomRoutes = require('./room-routes');
// const messageRoutes = require('./messages');

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);
// router.use('/messages', messageRoutes);

module.exports = router;