import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const filePath = path.join(process.cwd(), 'data', 'productos.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const productos = JSON.parse(fileContents);

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      error: 'No se pudieron cargar los productos',
      detalle: error.message,
    });
  }
}
