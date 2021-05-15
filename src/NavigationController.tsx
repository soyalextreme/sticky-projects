import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { AuthType } from "../types";
import AppHome from "./screens/AppHome";

export interface NavigationControllerProps {}

const NavigationController: React.FunctionComponent<NavigationControllerProps> =
  () => {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default NavigationController;
