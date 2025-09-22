const ImageKit = require('imagekit');

let imagekit = null;
if (
    process.env.IMAGEKIT_PUBLIC_KEY &&
    process.env.IMAGEKIT_PRIVATE_KEY &&
    process.env.IMAGEKIT_URL_ENDPOINT
) {
    imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
} else {
    console.warn('ImageKit env not set. Using placeholder upload in dev.');
}

async function uploadFile(file, filename) {
    try {
        if (!imagekit) {
            // Dev fallback so the API works in Postman without ImageKit creds
            return {
                url: `https://via.placeholder.com/800x600.png?text=${encodeURIComponent('dev:' + filename)}`,
            };
        }
        const response = await imagekit.upload({
            file: file,
            fileName: filename,
            folder: 'cohort-ai-social',
        });
        return response;
    } catch (err) {
        console.error('Image upload failed:', err?.message || err);
        return {
            url: `https://via.placeholder.com/800x600.png?text=${encodeURIComponent('upload-failed')}`,
        };
    }
}

module.exports = uploadFile;
// This function uploads a file to ImageKit and returns the response