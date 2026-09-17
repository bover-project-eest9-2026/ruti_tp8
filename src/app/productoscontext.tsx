import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
};

type ProductosContextType = {
  productos: Producto[];

  agregarProducto: (
    nombre: string,
    precio: number,
    descripcion: string,
    stock: number
  ) => void;

  eliminarProducto: (id: number) => void;

  editarProducto: (
    id: number,
    nombre: string,
    precio: number,
    descripcion: string,
    stock: number
  ) => void;
};

const ProductosContext = createContext<
  ProductosContextType | undefined
>(undefined);

const productosIniciales: Producto[] = [
  {
    id: 1,
    nombre: "Alfajor de membrillo",
    precio: 1500,
    descripcion:
      "Alfajor artesanal relleno de dulce de membrillo.",
    stock: 25,
  },
  {
    id: 2,
    nombre: "Alfajor de chocolate",
    precio: 1800,
    descripcion: "Alfajor cubierto de chocolate.",
    stock: 18,
  },
  {
    id: 3,
    nombre: "Caja de 6 alfajores",
    precio: 8000,
    descripcion: "Caja con 6 alfajores artesanales.",
    stock: 10,
  },
];

const STORAGE_KEY = "productos";

export function ProductosProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [productos, setProductos] =
    useState<Producto[]>(productosIniciales);

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    if (!cargando) {
      guardarProductos();
    }
  }, [productos, cargando]);

  const cargarProductos = async () => {
    try {
      const productosGuardados =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (productosGuardados) {
        const productosCargados = JSON.parse(
          productosGuardados
        );

        // Agrega stock 0 a productos antiguos que no lo tenían
        const productosActualizados =
          productosCargados.map((producto: Producto) => ({
            ...producto,
            stock: producto.stock ?? 0,
          }));

        setProductos(productosActualizados);
      }
    } catch (error) {
      console.log("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  };

  const guardarProductos = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(productos)
      );
    } catch (error) {
      console.log("Error al guardar productos:", error);
    }
  };

  const agregarProducto = (
    nombre: string,
    precio: number,
    descripcion: string,
    stock: number
  ) => {
    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre,
      precio,
      descripcion,
      stock,
    };

    setProductos((productosActuales) => [
      ...productosActuales,
      nuevoProducto,
    ]);
  };

  const eliminarProducto = (id: number) => {
    setProductos((productosActuales) =>
      productosActuales.filter(
        (producto) => producto.id !== id
      )
    );
  };

  const editarProducto = (
    id: number,
    nombre: string,
    precio: number,
    descripcion: string,
    stock: number
  ) => {
    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              nombre,
              precio,
              descripcion,
              stock,
            }
          : producto
      )
    );
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        agregarProducto,
        eliminarProducto,
        editarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const context = useContext(ProductosContext);

  if (!context) {
    throw new Error(
      "useProductos debe utilizarse dentro de ProductosProvider"
    );
  }

  return context;
}