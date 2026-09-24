import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useProductos } from "./productoscontext";

export default function Productos() {
  const { productos, eliminarProducto } = useProductos();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Todas");

  const confirmarEliminar = (
    id: number,
    nombre: string
  ) => {
    Alert.alert(
      "Eliminar producto",
      `¿Seguro que querés eliminar "${nombre}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarProducto(id),
        },
      ]
    );
  };

  // Obtiene automáticamente las categorías que existen
  const categoriasExistentes = Array.from(
    new Set(productos.map((producto) => producto.categoria))
  );

  const categorias = ["Todas", ...categoriasExistentes];

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      producto.categoria === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Productos</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto..."
        placeholderTextColor="#888"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* CATEGORÍAS */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriasScroll}
      >
        <View style={styles.categoriasContainer}>
          {categorias.map((categoria) => (
            <Pressable
              key={categoria}
              style={[
                styles.categoriaButton,
                categoriaSeleccionada === categoria &&
                  styles.categoriaSeleccionada,
              ]}
              onPress={() =>
                setCategoriaSeleccionada(categoria)
              }
            >
              <Text
                style={[
                  styles.categoriaText,
                  categoriaSeleccionada === categoria &&
                    styles.categoriaTextSeleccionada,
                ]}
              >
                {categoria}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* PRODUCTOS */}

      {productosFiltrados.map((producto) => (
        <View
          key={producto.id}
          style={styles.producto}
        >
          <View style={styles.productoHeader}>
            <Text style={styles.nombre}>
              {producto.nombre}
            </Text>

            <View style={styles.categoriaEtiqueta}>
              <Text style={styles.categoriaEtiquetaText}>
                {producto.categoria}
              </Text>
            </View>
          </View>

          <Text style={styles.descripcion}>
            {producto.descripcion}
          </Text>

          <Text style={styles.precio}>
            ${producto.precio}
          </Text>

          <Text style={styles.stock}>
            Stock: {producto.stock} unidades
          </Text>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.editButton}
              onPress={() =>
                router.push({
                  pathname: "/formulario",
                  params: {
                    id: producto.id.toString(),
                  },
                })
              }
            >
              <Text style={styles.buttonText}>
                Editar
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() =>
                confirmarEliminar(
                  producto.id,
                  producto.nombre
                )
              }
            >
              <Text style={styles.buttonText}>
                Eliminar
              </Text>
            </Pressable>
          </View>
        </View>
      ))}

      {productosFiltrados.length === 0 && (
        <Text style={styles.sinProductos}>
          No se encontraron productos.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  searchInput: {
    width: "100%",
    backgroundColor: "#222",
    color: "white",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },

  categoriasScroll: {
    width: "100%",
    marginBottom: 20,
  },

  categoriasContainer: {
    flexDirection: "row",
    gap: 10,
  },

  categoriaButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#555",
  },

  categoriaSeleccionada: {
    backgroundColor: "white",
    borderColor: "white",
  },

  categoriaText: {
    color: "white",
    fontWeight: "bold",
  },

  categoriaTextSeleccionada: {
    color: "black",
  },

  producto: {
    width: "100%",
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#222",
  },

  productoHeader: {
    marginBottom: 8,
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },

  categoriaEtiqueta: {
    alignSelf: "flex-start",
    backgroundColor: "#444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 8,
  },

  categoriaEtiquetaText: {
    color: "#ddd",
    fontSize: 12,
    fontWeight: "bold",
  },

  descripcion: {
    fontSize: 15,
    color: "#ccc",
    marginBottom: 10,
  },

  precio: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },

  stock: {
    fontSize: 16,
    color: "#ccc",
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  editButton: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },

  deleteButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  sinProductos: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 20,
  },
});