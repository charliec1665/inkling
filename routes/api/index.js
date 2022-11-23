const router = require('express').Router();
const reactionRoutes = require('./reaction-routes');
const inklingRoutes = require('./inkling-routes');
// const squidRoutes = require('./squid-routes');
const userRoutes = require('./user-routes');

// add prefix '/users' to routes created in 'user-routes'
router.use('./users', userRoutes);
// add prefix '/squids' to routes created in 'squid-routes'
// router.use('./squids', squidRoutes);
// add prefix '/inklings' to routes created in 'inkling-routes'
router.use('./inklings', inklingRoutes);
// add prefix '/reactions' to routes created in 'reaction-routes'
router.use('./reactions', reactionRoutes);

module.exports = router;