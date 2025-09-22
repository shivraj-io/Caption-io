const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const file = req.file;
        if (!file || !file.buffer) {
            return res.status(400).json({ message: 'Image file is required (field name: image)' });
        }

        const base64Image = Buffer.from(file.buffer).toString('base64');
        const caption = await generateCaption(base64Image);

        const result = await uploadFile(file.buffer, `${uuidv4()}`);

        const post = await postModel.create({
            caption,
            image: result.url,
            user: req.user._id,
        });

        return res.status(201).json({
            message: 'Post created successfully',
            post,
        });
    } catch (err) {
        console.error('Create post error:', err);
        return res.status(500).json({ message: 'Failed to create post' });
    }
}

module.exports = { createPostController };