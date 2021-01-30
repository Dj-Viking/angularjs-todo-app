const router = require('express').Router();
const userRoutes = require('./user');
const todoRoutes = require('./todo');

router.use(userRoutes);
router.use(todoRoutes);

module.exports = router;