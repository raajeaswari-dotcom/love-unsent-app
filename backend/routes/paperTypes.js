
const express = require('express');
const router = express.Router();
const {
    getAllPaperTypes,
    createPaperType,
    updatePaperType,
    deletePaperType,
} = require('../controllers/paperTypesController.js');
const { verifyAdminToken } = require('../middleware/verifyAdminToken.js');

router.get('/', getAllPaperTypes);
router.post('/', verifyAdminToken, createPaperType);
router.put('/:id', verifyAdminToken, updatePaperType);
router.delete('/:id', verifyAdminToken, deletePaperType);

module.exports = router;
