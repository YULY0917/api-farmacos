export default function handler(req, res) {
  res.status(200).json([
    {
      nombre: "Paracetamol",
      precioTexto: "$1000",
      fuente: "CENABAST"
    },
    {
      nombre: "Ibuprofeno",
      precioTexto: "$1500",
      fuente: "CENABAST"
    }
  ]);
}
