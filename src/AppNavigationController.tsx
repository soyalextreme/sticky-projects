import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppHome from "./screens/AppHome";

export interface AppNavigationControllerProps {}

const AppNavigationController: React.FunctionComponent<AppNavigationControllerProps> =
  () => {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "red" },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="AppHome" component={AppHome} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default AppNavigationController;
