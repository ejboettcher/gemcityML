const environment = process.env.ELEVENTY_ENV;
const DEV_ENV = 'dev';
const devUrl = 'https://localhost:8000';
const prodUrl = 'https://gemcityml.com';
const isProd = true;
const url = isProd ? prodUrl : devUrl;

module.exports = {
    environment,
    isProd,
    url,
    tracking: {
        gtag: 'G-20DLMMRF2G',
        pixelId: 'MY-PIXEL-ID',
    },    
};