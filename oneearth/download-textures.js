const https = require('https');
const fs = require('fs');
const path = require('path');

// Make sure public folder exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

// Texture URLs (free textures from NASA/other sources)
const textures = [
  {
    url: 'https://planetpixelemporium.com/images/earthmap1k.jpg',
    filename: 'earth_daymap.jpg',
  },
  {
    url: 'https://planetpixelemporium.com/images/earthbump1k.jpg',
    filename: 'earth_bump.jpg',
  },
  {
    url: 'https://planetpixelemporium.com/images/earthspec1k.jpg',
    filename: 'earth_specular.jpg',
  },
];

textures.forEach(({ url, filename }) => {
  const filePath = path.join(publicDir, filename);
  const file = fs.createWriteStream(filePath);

  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`${filename} downloaded to public/`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {});
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
