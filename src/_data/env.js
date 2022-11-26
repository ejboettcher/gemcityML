const environment = process.env.ELEVENTY_ENV;
const DEV_ENV = 'dev';
const devUrl = 'https://gemcityml.com';
const prodUrl = 'https://gemcityml.com';
const isProd = environment !== DEV_ENV;
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