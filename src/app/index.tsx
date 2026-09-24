import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProductos } from "./productoscontext";

export default function Home() {
  const { productos } = useProductos();

  // Cantidad total de productos
  const cantidadProductos = productos.length;

  // Stock total
  const stockTotal = productos.reduce(
    (total, producto) => total + producto.stock,
    0
  );

  // Valor total del stock
  const valorStock = productos.reduce(
    (total, producto) =>
      total + producto.precio * producto.stock,
    0
  );

  // Productos con 5 unidades o menos
  const productosStockBajo = productos.filter(
    (producto) => producto.stock <= 5
  ).length;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>Mi App</Text>

      <Text style={styles.subtitle}>
        Gestión de productos
      </Text>

      {/* ESTADÍSTICAS */}

      <View style={styles.statsContainer}>
        {/* PRODUCTOS */}

        <View style={styles.card}>
          <Text style={styles.cardIcon}>📦</Text>

          <Text style={styles.cardTitle}>
            Productos
          </Text>

          <Text style={styles.cardValue}>
            {cantidadProductos}
          </Text>
        </View>

        {/* STOCK */}

        <View style={styles.card}>
          <Text style={styles.cardIcon}>📊</Text>

          <Text style={styles.cardTitle}>
            Stock total
          </Text>

          <Text style={styles.cardValue}>
            {stockTotal}
          </Text>
        </View>

        {/* VALOR */}

        <View style={styles.card}>
          <Text style={styles.cardIcon}>💰</Text>

          <Text style={styles.cardTitle}>
            Valor del stock
          </Text>

          <Text style={styles.cardValue}>
            ${valorStock.toLocaleString("es-AR")}
          </Text>
        </View>

        {/* STOCK BAJO */}

        <View style={styles.card}>
          <Text style={styles.cardIcon}>⚠️</Text>

          <Text style={styles.cardTitle}>
            Stock bajo
          </Text>

          <Text style={styles.cardValue}>
            {productosStockBajo}
          </Text>

          <Text style={styles.cardDescription}>
            5 unidades o menos
          </Text>
        </View>
      </View>

      {/* BOTONES */}

      <Pressable
        style={styles.button}
        onPress={() => router.push("/productos")}
      >
        <Text style={styles.buttonText}>
          Ver productos
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/formulario")}
      >
        <Text style={styles.buttonText}>
          Agregar producto
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#000",
    alignItems: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 17,
    color: "#aaa",
    marginTop: 5,
    marginBottom: 30,
  },

  statsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 25,
  },

  card: {
    width: "48%",
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 18,
    minHeight: 145,
  },

  cardIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  cardTitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 8,
  },

  cardValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  cardDescription: {
    color: "#888",
    fontSize: 11,
    marginTop: 5,
  },

  button: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});