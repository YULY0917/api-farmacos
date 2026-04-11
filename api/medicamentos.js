import productos from '../data/productos.json' assert { type: 'json' };

export default function handler(req, res) {
  try {
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      error: 'No se pudieron cargar los productos',
      detalle: error.message,
    });
  }
}
