require('dotenv').config();
const cloudinay = require('cloudinary').v2;

cloudinay.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

module.exports = {
    cloudinay,
};
