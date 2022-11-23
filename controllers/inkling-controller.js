const { Inkling } = require('../models');

const inklingController = {
    // get all inklings aka GET /api/inklings
    getAllInkling(req, res) {
        Inkling.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbInklingData => res.json(dbInklingData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one inkling by id
    getInklingById({ params }, res) {
        Inkling.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbInklingData => {
                // if no pizza is found, send 404
                if (!dbInklingData) {
                    res.status(404).json({ message: 'No inkling found with this id!'});
                    return;
                }
                res.json(dbInklingData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create Inkling
    // destructure 'body' out of Express.js req object
    createInkling({ body }, res) {
        Inkling.create(body)
            .then(dbInklingData => res.json(dbInklingData))
            .catch(err => res.status(400).json(err));
    },

    // update inkling by id PUT api/inklings/:id
    updateInkling({ params, body }, res) {
        // find single inkling and update
        // using { new: true }, return updated document, not original
        Inkling.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbInklingData => {
                if (!dbInklingData) {
                    res.status(404).json({ message: 'No inkling found with this id!'});
                    return;
                }
                res.json(dbInklingData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete inkling DELETE /api/inklings/:id
    deleteInkling({ params }, res) {
        Inkling.findOneAndDelete({ _id: params.id })
            .then(dbInklingData => {
                if (!dbInklingData) {
                    res.status(404).json({ message: 'No inkling found with this id!'});
                    return;
                }
                res.json(dbInklingData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = inklingController;