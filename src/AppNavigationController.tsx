import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppHome from "./screens/AppHome";
import { StoreContext } from "./state/Store";
import AppQuickNotes from "./screens/quickNotes/AppQuickNotes";
import AppProjects from "./screens/projects/AppProjects";
import AppCategories from "./screens/categories/AppCategories";
import AddCategories from "./screens/categories/AppAddCategories";
import AppAddProject from "./screens/projects/AppAddProject";
import AppNotes from "./screens/notes/AppNotes";
import AddNotes from "./screens/notes/AddNotes";

export interface AppNavigationControllerProps {}

const AppNavigationController: React.FunctionComponent<AppNavigationControllerProps> =
  () => {
    const Stack = createStackNavigator();

    const { store } = React.useContext(StoreContext);

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: store.appState.theme.colors.primary,
              borderColor: store.appState.theme.colors.alternative,
            },
            headerTitleAlign: "center",
            headerTintColor: store.appState.theme.colors.alternative,
          }}
        >
          <Stack.Screen name="Home" component={AppHome} />
          <Stack.Screen name="Quick Notes" component={AppQuickNotes} />
          <Stack.Screen name="Projects" component={AppProjects} />
          <Stack.Screen name="Add Project" component={AppAddProject} />
          <Stack.Screen name="Categories" component={AppCategories} />
          <Stack.Screen name="Add Category" component={AddCategories} />
          <Stack.Screen name="Notes" component={AppNotes} />
          <Stack.Screen name="Add Note" component={AddNotes} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default AppNavigationController;
