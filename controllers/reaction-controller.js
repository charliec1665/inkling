const { Reaction, Inkling } = require('../models');

// remember that reactions belong to inklings
const reactionController = {
    // add reaction to inkling
    addReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
            .then(({ _id }) => {
                return Inkling.findOneAndUpdate(
                    { _id: params.inklingId },
                    { $push: { reactions: _id } },
                    { new: true }
                );
            })
            .then(dbInklingData => {
                if (!dbInklingData) {
                    res.status(404).json({ message: 'No inkling found with this id!'});
                    return;
                }
                res.json(dbInklingData);
            })
            .catch(err => res.json(err));
    },

    addReply({ params, body }, res) {
        Reaction.findOneAndUpdate(
            { _id: params.reactionId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then(dbInklingData => {
                if (!dbInklingData) {
                    res.status(404).json({ message: 'No inkling found with this id!'});
                    return;
                }
                res.json(dbInklingData);
            })
            .catch(err => res.json(err));
    },

    // remove reaction
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactionId })
            .then(deletedReaction => {
                if (!deletedReaction) {
                    return res.status(404).json({ message: 'No reaction with this id!' });
                }
                return Inkling.findOneAndUpdate(
                    { _id: params.inklingId },
                    { $pull: { reactions: params.reactionId } },
                    { new: true }
                );
            })
            .then(dbInklingData => {
                if (!dbInklingData) {
                    res.status(404).json({ message: 'No inkling found with this id!'});
                    return;
                }
                res.json(dbInklingData);
            })
            .catch(err => res.json(err));
    },

    // remove reply
    removeReply({ params }, res) {
        Reaction.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
        .then(dbInklingData => res.json(dbInklingData))
        .catch(err => res.json(err));
    }
};

module.exports = reactionController;