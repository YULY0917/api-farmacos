import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'productos.json');

function limpiarPrecio(valor) {
  if (!valor) return null;
  const limpio = String(valor).replace(/[^\d]/g, '');
  if (!limpio) return null;
  return `$${Number(limpio).toLocaleString('es-CL')}`;
}

function extraerPrecio(html) {
  const texto = html.replace(/\s+/g, ' ');
  const match = texto.match(/\$\s?(\d{1,3}(?:\.\d{3})*|\d+)/);
  return match ? limpiarPrecio(match[1]) : null;
}

async function actualizar() {
  const raw = fs.readFileSync(filePath, 'utf8');
  const productos = JSON.parse(raw);

  const actualizados = [];

  for (const producto of productos) {
    try {
      const response = await fetch(producto.linkCompra, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });

      const html = await response.text();
      const nuevoPrecio = extraerPrecio(html);

      actualizados.push({
        ...producto,
        precioTexto: nuevoPrecio || producto.precioTexto,
      });

      console.log(`OK: ${producto.nombre} -> ${nuevoPrecio}`);
    } catch (error) {
      console.log(`ERROR: ${producto.nombre}`);
      actualizados.push(producto);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(actualizados, null, 2));
}

actualizar();
