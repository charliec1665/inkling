const { response } = require('express');
const { User } = require('../models');

const userController = {
    // GET all Users aka /api/users
    getAllUser(req, res) {
        User.find({})
            .populate([
                {
                    path: 'inklings',
                    select: '-__v'
                },
                {
                    path: 'squids',
                    select: '-__v'
                }
            ])
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                {
                    path: 'inklings',
                    select: '-__v'
                },
                {
                    path: 'squids',
                    select: '-__v'
                }
            ])
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create User
    // we destructure 'body' out of Express req object
    createUser({ body }, res) {
        // .create() method will handle either .insertOne or .insertMany
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update User by id PUT api/users/:id
    updateUser({ params, body }, res) {
        // find single document and update
        // using {new: true} we return the updated document, not the original
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user DELETE /api/users/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // POST add new User aka Squid aka /api/users/:userId/squids/:squidId
    //////// currently getting 404 even with correct id ////////
    createSquid({ params }, res) {
        User.findOneAndUpdate({ _id: params.id })
            .then(dbSquidData => {
                if (!dbSquidData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbSquidData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete squid DELETE /api/users/:userId/squids/:squidId
    deleteSquid({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbSquidData => {
                if (!dbSquidData) {
                    res.status(400).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbSquidData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;