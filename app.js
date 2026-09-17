import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Formulario from "./screens/formulario";
import Home from "./screens/home";
import Productos from "./screens/productos";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Productos" component={Productos} />

        <Stack.Screen name="Formulario" component={Formulario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
