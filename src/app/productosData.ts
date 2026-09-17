
export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
};

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Alfajor de membrillo",
    precio: 1500,
    descripcion: "Alfajor artesanal relleno de dulce de membrillo.",
  },
  {
    id: 2,
    nombre: "Alfajor de chocolate",
    precio: 1800,
    descripcion: "Alfajor cubierto de chocolate.",
  },
  {
    id: 3,
    nombre: "Caja de 6 alfajores",
    precio: 8000,
    descripcion: "Caja con 6 alfajores artesanales.",
  },
];

