const fs = require("fs");

const productos = [
  {
    id: "1",
    nombre: "Paracetamol 500mg",
    farmacia: "Cruz Verde",
    precio: "$1.000",
    link: "https://www.cruzverde.cl/paracetamol-500-mg-16-comprimidos/272241.html"
  },
  {
    id: "2",
    nombre: "Paracetamol 500mg",
    farmacia: "Salcobrand",
    precio: "$1.200",
    link: "https://salcobrand.cl/products/kitadol-b-paracetamol-500mg-24-comprimidos?default_sku=430924"
  },
  {
    id: "3",
    nombre: "Paracetamol 500mg",
    farmacia: "Ahumada",
    precio: "$900",
    link: "https://www.farmaciasahumada.cl/paracetamol-500-mg-x-16-comprimidos-84574.html"
  }
];

fs.writeFileSync("./data/productos.json", JSON.stringify(productos, null, 2));

console.log("Datos actualizados");
