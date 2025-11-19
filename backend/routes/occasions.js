const express = require('express');
const router = express.Router();
const { 
    getAllOccasions,
    createOccasion,
    updateOccasion,
    deleteOccasion,
} = require('../controllers/occasionsController.js');
const { verifyAdminToken } = require('../middleware/verifyAdminToken.js');

router.get('/', getAllOccasions);
router.post('/', verifyAdminToken, createOccasion);
router.put('/:id', verifyAdminToken, updateOccasion);
router.delete('/:id', verifyAdminToken, deleteOccasion);

module.exports = router;
