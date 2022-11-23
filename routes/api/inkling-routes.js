const router = require('express').Router();
const {
    getAllInkling,
    getInklingById,
    createInkling,
    updateInkling,
    deleteInkling
} = require('../../controllers/inkling-controller');

// Set up GET all and POST at /api/inklings
router
    .route('/')
    .get(getAllInkling)
    .post(createInkling);

// Set up GET one, PUT, and DELETE at /api/inklings/:id
router
    .route('/:id')
    .get(getInklingById)
    .put(updateInkling)
    .delete(deleteInkling);

module.exports = router;