import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// @ts-ignore: No tiene tipos
import pngToIco from 'png-to-ico';

const inputPath = path.resolve(__dirname, 'input.png');  // Cambia esto si tu imagen tiene otro nombre
const outputPath = path.resolve(__dirname, 'favicon.ico');

async function convertToFavicon(input: string, output: string) {
  try {
    const sizes = [16, 32, 48, 64, 128, 256];

    const resizedBuffers = await Promise.all(
      sizes.map((size) =>
        sharp(input)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    const icoBuffer = await pngToIco(resizedBuffers);
    fs.writeFileSync(output, icoBuffer);

    console.log(`✅ Favicon generado: ${output}`);
  } catch (error) {
    console.error('❌ Error al convertir la imagen:', error);
  }
}

convertToFavicon(inputPath, outputPath);
