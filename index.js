const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

mergeImages(['/images/dark_back.png', '/images/qr-codes/qr_0001.png'], {
  Canvas: Canvas,
  Image: Image
})
  .then(b64 => document.querySelector('img').src = b64);
  // data:image/png;base64,iVBORw0KGgoAA..

