const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createSquid,
    deleteSquid
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// route and dynamic idea for friends similar to line 17-21
// Set up POST and DELETE to add and delete user's from friends (aka squids list)
router
    .route('/:userId/squids/:squidId')
    .post(createSquid)
    .delete(deleteSquid);

module.exports = router;