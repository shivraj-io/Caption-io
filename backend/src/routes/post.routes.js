const express = require('express');
const router = express.Router();
const { createPostController } = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, upload.single('image'), createPostController);

module.exports = router;