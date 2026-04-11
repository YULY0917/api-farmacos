import productos from '../data/productos.json';

export default function handler(req, res) {

  // 🔥 PERMITIR CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.status(200).json(productos);
}
