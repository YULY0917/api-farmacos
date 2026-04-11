import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'productos.json');

function limpiarPrecio(valor) {
  if (!valor) return null;
  const limpio = String(valor).replace(/[^\d]/g, '');
  if (!limpio) return null;
  return `$${Number(limpio).toLocaleString('es-CL')}`;
}

function escaparRegex(texto) {
  return String(texto || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extraerPrecio(html, farmacia, producto) {
  const texto = html.replace(/\s+/g, ' ');

  if (farmacia === 'Salcobrand') {
    const match =
      texto.match(/Precio Internet[^$]{0,80}\$\s?(\d{3,10})/i) ||
      texto.match(/\$\s?(\d{3,10})\s*Precio Internet/i);

    return match ? limpiarPrecio(match[1]) : null;
  }

  if (farmacia === 'Ahumada') {
    const nombre = escaparRegex(producto.nombre || '');
    const presentacion = escaparRegex(producto.presentacion || '');

    const patron1 = new RegExp(
      `${nombre.replace(/\s+/g, '\\s+')}[^$]{0,200}\\$\\s?(\\d{3,10})`,
      'i'
    );

    const patron2 = new RegExp(
      `${presentacion.replace(/\s+/g, '\\s+')}[^$]{0,200}\\$\\s?(\\d{3,10})`,
      'i'
    );

    const match =
      texto.match(patron1) ||
      texto.match(patron2) ||
      texto.match(/paracetamol[^$]{0,200}\$\s?(\d{3,10})/i);

    return match ? limpiarPrecio(match[1]) : null;
  }

  if (farmacia === 'Cruz Verde') {
    const match =
      texto.match(/"price"\s*:\s*"?(\\?[\d.]+)"?/i) ||
      texto.match(/"price":\s*"?(\d{3,10})"?/i) ||
      texto.match(/price["':\s>]+(\d{3,10})/i);

    return match ? limpiarPrecio(match[1]) : null;
  }

  return null;
}

async function actualizar() {
  const raw = fs.readFileSync(filePath, 'utf8');
  const productos = JSON.parse(raw);

  const actualizados = [];

  for (const producto of productos) {
    try {
      const response = await fetch(producto.linkCompra, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });

      const html = await response.text();
      const nuevoPrecio = extraerPrecio(html, producto.farmacia, producto);

      actualizados.push({
        ...producto,
        precioTexto: nuevoPrecio || producto.precioTexto,
      });

      console.log(
        `OK: ${producto.nombre} - ${producto.farmacia} -> ${nuevoPrecio || producto.precioTexto}`
      );
    } catch (error) {
      console.log(
        `ERROR: ${producto.nombre} - ${producto.farmacia}: ${error.message}`
      );
      actualizados.push(producto);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(actualizados, null, 2), 'utf8');
}

actualizar();
