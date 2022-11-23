const router = require('express').Router();
const { addReaction,
        removeReaction,
        addReply,
        removeReply
} = require('../../controllers/reaction-controller');

// /api/reactions/<inklingId>
router.route('/:inklingId').post(addReaction);

// /api/reactions/<inklingId>/<reactionId>
router
    .route('/:inklingId/:reactionId')
    .put(addReply) // this is PUT instead of POST because we're not creating a new reply resource, just updating the reaction resource
    .delete(removeReaction);

router.route('/:inklingId/:reactionId/:replyId').delete(removeReply);

module.exports = router;