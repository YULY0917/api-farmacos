export default async function handler(req, res) {
  try {
    const medicamentos = [
      {
        id: "1",
        nombre: "Paracetamol 500mg",
        precioTexto: "$1.000",
        farmacia: "Cruz Verde"
      },
      {
        id: "2",
        nombre: "Paracetamol 500mg",
        precioTexto: "$1.200",
        farmacia: "Salcobrand"
      },
      {
        id: "3",
        nombre: "Paracetamol 500mg",
        precioTexto: "$900",
        farmacia: "Ahumada"
      },
      {
        id: "4",
        nombre: "Ibuprofeno 400mg",
        precioTexto: "$2.500",
        farmacia: "Cruz Verde"
      },
      {
        id: "5",
        nombre: "Ibuprofeno 400mg",
        precioTexto: "$2.350",
        farmacia: "Salcobrand"
      },
      {
        id: "6",
        nombre: "Ibuprofeno 400mg",
        precioTexto: "$2.600",
        farmacia: "Ahumada"
      },
      {
        id: "7",
        nombre: "Omeprazol 20mg",
        precioTexto: "$3.100",
        farmacia: "Cruz Verde"
      },
      {
        id: "8",
        nombre: "Omeprazol 20mg",
        precioTexto: "$2.990",
        farmacia: "Salcobrand"
      },
      {
        id: "9",
        nombre: "Omeprazol 20mg",
        precioTexto: "$3.250",
        farmacia: "Ahumada"
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
