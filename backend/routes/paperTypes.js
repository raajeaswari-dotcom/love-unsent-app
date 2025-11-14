const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { verifyAdminToken } = require('../middleware/verifyAdminToken.js');

const {
    getAllPaperTypes,
    createPaperType,
    updatePaperType,
    deletePaperType,
} = require('../controllers/paperTypesController.js');


// -----------------------------
// Multer Memory Storage
// -----------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });


// -----------------------------
// Cloudinary Image Upload Route (ADMIN ONLY)
// -----------------------------
router.post('/upload', verifyAdminToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const uploaded = await cloudinary.uploader.upload(dataURI, {
            folder: "paper_types"
        });

        return res.json({ url: uploaded.secure_url });

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ error: "Image upload failed" });
    }
});


// -----------------------------
// CRUD ROUTES
// -----------------------------
// Get all paper types (public)
router.get('/', getAllPaperTypes);

// Create new paper type (ADMIN ONLY)
router.post('/', verifyAdminToken, createPaperType);

// Update paper type (ADMIN ONLY)
router.put('/:id', verifyAdminToken, updatePaperType);

// Delete paper type (ADMIN ONLY)
router.delete('/:id', verifyAdminToken, deletePaperType);


module.exports = router;
