import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const url = 'https://www.cenabast.cl/lista-de-medicamentos-ley-cenabast/';

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const medicamentos = [];

    $('table tr').each((index, row) => {
      const cols = $(row).find('td');

      if (cols.length >= 2) {
        const nombre = $(cols[0]).text().trim();
        const precioTexto = $(cols[1]).text().trim();

        if (nombre && precioTexto) {
          medicamentos.push({
            id: String(index),
            nombre,
            precioTexto,
            fuente: 'CENABAST',
          });
        }
      }
    });

    if (medicamentos.length === 0) {
      return res.status(200).json({
        mensaje: 'No se encontraron datos en la tabla',
        fuente: url,
      });
    }

    return res.status(200).json(medicamentos);
  } catch (error) {
    return res.status(500).json({
      error: 'No se pudieron obtener los medicamentos',
      detalle: error.message,
    });
  }
}
}
