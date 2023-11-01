import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, TodoScreen } from "./app/screen/Screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TodoProvider } from "./app/context/todo.context";
const Stack = createStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <TodoProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen
              name="Todo"
              component={TodoScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#60A5FA",
                },
                headerTintColor: "#fff",
                headerShadowVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </SafeAreaProvider>
  );
}
