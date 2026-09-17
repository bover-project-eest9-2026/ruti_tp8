import { Stack } from "expo-router";
import { ProductosProvider } from "./productoscontext";

export default function RootLayout() {
  return (
    <ProductosProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          contentStyle: {
            backgroundColor: "#000",
          },
        }}
      />
    </ProductosProvider>
  );
}
