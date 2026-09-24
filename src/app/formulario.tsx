import { router, useLocalSearchParams } from "expo-router";
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

export default function Formulario() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const {
    productos,
    agregarProducto,
    editarProducto,
  } = useProductos();

  const productoEditar = id
    ? productos.find(
        (producto) => producto.id.toString() === id
      )
    : undefined;

  const [nombre, setNombre] = useState(
    productoEditar?.nombre || ""
  );

  const [precio, setPrecio] = useState(
    productoEditar?.precio.toString() || ""
  );

  const [descripcion, setDescripcion] = useState(
    productoEditar?.descripcion || ""
  );

  const [stock, setStock] = useState(
    productoEditar?.stock.toString() || ""
  );

  const [categoria, setCategoria] = useState(
    productoEditar?.categoria || ""
  );

  const categorias = [
    "Tradicionales",
    "Chocolate",
    "Combos",
    "Otros",
  ];

  const guardar = () => {
    if (
      !nombre.trim() ||
      !precio.trim() ||
      !descripcion.trim() ||
      !stock.trim() ||
      !categoria
    ) {
      Alert.alert(
        "Campos incompletos",
        "Completá todos los campos."
      );
      return;
    }

    const precioNumero = Number(precio);
    const stockNumero = Number(stock);

    if (isNaN(precioNumero) || precioNumero < 0) {
      Alert.alert(
        "Precio inválido",
        "Ingresá un precio válido."
      );
      return;
    }

    if (isNaN(stockNumero) || stockNumero < 0) {
      Alert.alert(
        "Stock inválido",
        "Ingresá una cantidad de stock válida."
      );
      return;
    }

    if (id && productoEditar) {
      editarProducto(
        productoEditar.id,
        nombre.trim(),
        precioNumero,
        descripcion.trim(),
        stockNumero,
        categoria
      );

      Alert.alert(
        "Producto actualizado",
        "El producto fue actualizado correctamente.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      agregarProducto(
        nombre.trim(),
        precioNumero,
        descripcion.trim(),
        stockNumero,
        categoria
      );

      Alert.alert(
        "Producto agregado",
        "El producto fue agregado correctamente.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        {id ? "Editar producto" : "Agregar producto"}
      </Text>

      <Text style={styles.label}>Nombre</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        placeholderTextColor="#888"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Precio</Text>

      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text style={styles.label}>Descripción</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción del producto"
        placeholderTextColor="#888"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Stock</Text>

      <TextInput
        style={styles.input}
        placeholder="Cantidad disponible"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />

      {/* CATEGORÍAS */}

      <Text style={styles.label}>Categoría</Text>

      <View style={styles.categoriasContainer}>
        {categorias.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.categoriaButton,
              categoria === item &&
                styles.categoriaSeleccionada,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.categoriaText,
                categoria === item &&
                  styles.categoriaTextSeleccionada,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.button}
        onPress={guardar}
      >
        <Text style={styles.buttonText}>
          {id ? "Guardar cambios" : "Guardar producto"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    flexGrow: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#222",
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },

  categoriaButton: {
    backgroundColor: "#222",
    paddingVertical: 12,
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

  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});