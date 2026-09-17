import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi App</Text>

      <Text style={styles.subtitle}>Bienvenido a mi aplicación</Text>

      <Link href="/productos" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ver productos</Text>
        </Pressable>
      </Link>

      <Link href="/formulario" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Agregar producto</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 30,
  },

  button: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "white",
    width: 220,
    alignItems: "center",
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
