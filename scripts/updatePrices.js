
  function limpiarPrecio(valor) {
  if (!valor) return null;
  const limpio = String(valor).replace(/[^\d]/g, '');
  if (!limpio) return null;
  return `$${Number(limpio).toLocaleString('es-CL')}`;
}

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extraerPrecio(html, farmacia, producto) {
  const texto = html.replace(/\s+/g, ' ');

  if (farmacia === 'Salcobrand') {
    // Busca explícitamente "Precio Internet" del producto principal
    const match =
      texto.match(/Precio Internet[^$]{0,40}\$\s?(\d{3,10})/i) ||
      texto.match(/\$\s?(\d{3,10})\s*Precio Internet/i);

    return match ? limpiarPrecio(match[1]) : null;
  }

  if (farmacia === 'Ahumada') {
    // Ancla en el nombre del producto y luego toma el precio que viene justo después
    const nombre = escaparRegex(producto.nombre);
    const presentacion = escaparRegex(producto.presentacion || '');

    const patron1 = new RegExp(
      `${nombre.replace(/\s+/g, '\\s+')}[^$]{0,120}\\$\\s?(\\d{3,10})`,
      'i'
    );

    const patron2 = new RegExp(
      `${presentacion.replace(/\s+/g, '\\s+')}[^$]{0,120}\\$\\s?(\\d{3,10})`,
      'i'
    );

    const match = texto.match(patron1) || texto.match(patron2);
    return match ? limpiarPrecio(match[1]) : null;
  }

  if (farmacia === 'Cruz Verde') {
    // Cruz Verde es más difícil; intenta schema price si existe
    const match =
      texto.match(/"price"\s*:\s*"?(\\?[\d.]+)"?/i) ||
      texto.match(/price["':\s>]+(\d{3,10})/i);

    return match ? limpiarPrecio(match[1]) : null;
  }

  return null;
}
