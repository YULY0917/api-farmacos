export default async function handler(req, res) {
  try {
    // Simulación + estructura lista para datos reales
    const medicamentos = [
      {
        id: "1",
        nombre: "Paracetamol 500mg",
        precioTexto: "$1.000",
        farmacia: "Cruz Verde",
      },
      {
        id: "2",
        nombre: "Paracetamol 500mg",
        precioTexto: "$1.200",
        farmacia: "Salcobrand",
      },
      {
        id: "3",
        nombre: "Paracetamol 500mg",
        precioTexto: "$900",
        farmacia: "Ahumada",
      }
    ];

    return res.status(200).json(medicamentos);

  } catch (error) {
    return res.status(500).json({
      error: "Error en API",
      detalle: error.message,
    });
  }
}
