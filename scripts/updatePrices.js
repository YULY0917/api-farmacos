
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
