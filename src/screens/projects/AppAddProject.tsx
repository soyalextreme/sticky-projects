import * as React from "react";
import { View } from "react-native";
import { ProjectType } from "../../../types";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import MainScreenContainer from "../../components/MainScreenContainer";
import TextP from "../../components/TextP";
import TextTitle from "../../components/TextTitle";
import { v4 as uuidv4 } from "uuid";
import { StoreContext } from "../../state/Store";
import { AlertType } from "../../../types";
import { addProject, deleteProject, updateProject } from "../../db/projects";

export interface AppAddProjectProps {
  navigation: any;
  route: any;
}

const AppAddProject: React.FunctionComponent<AppAddProjectProps> = ({
  navigation,
  route,
}) => {
  const [data, setData] = React.useState<ProjectType>({
    description: "",
    name: "",
    id: uuidv4(),
  });

  const { store, dispatch } = React.useContext(StoreContext);
  const { mod, current } = route.params;

  React.useEffect(() => {
    if (mod) {
      setData({
        name: current.name,
        description: current.description,
        id: current.id,
      });
    }
  }, []);

  const validateErrors = (): boolean => {
    if (!data.name) {
      let alert: AlertType = {
        active: true,
        error: true,
        title: "Missing Value",
        msg: "Missing the Name for the Project",
      };

      dispatch({ type: "OPEN_ALERT", payload: alert });
      return true;
    }
    if (!data.description) {
      let alert: AlertType = {
        active: true,
        error: true,
        title: "Missing Value",
        msg: "Missing the Description for the Project",
      };

      dispatch({ type: "OPEN_ALERT", payload: alert });
      return true;
    }

    return false;
  };

  const handleAddProject = async () => {
    const errors = validateErrors();

    if (!errors) {
      // peticon al servidor
      dispatch({ type: "SET_LOADING", payload: { loading: true } });
      await addProject(store.appState.auth?.uid as string, data, data.id);
      navigation.navigate("Projects");
      dispatch({ type: "ADD_PROJECT", payload: data });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  };

  const handleUpdateProject = async () => {
    const errors = validateErrors();

    if (!errors) {
      // peticon al servidor
      dispatch({ type: "SET_LOADING", payload: { loading: true } });
      await updateProject(store.appState.auth?.uid as string, data, data.id);
      const arrayFiltered = store.appData.projects.filter(
        (project) => project.id !== data.id
      );
      arrayFiltered.push(data);

      dispatch({ type: "SET_PROJECTS", payload: arrayFiltered });
      navigation.navigate("Projects");
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }
  };

  const handleDeleteProject = async () => {
    await deleteProject(store.appState.auth?.uid as string, data.id);

    const arrayFiltered = store.appData.projects.filter(
      (project) => project.id !== data.id
    );

    dispatch({ type: "SET_PROJECTS", payload: arrayFiltered });

    navigation.navigate("Projects");
  };

  return (
    <MainScreenContainer>
      <View style={{ marginVertical: 25 }}>
        <TextP text="We are creating a new project" />
      </View>
      <View>
        <TextTitle text="Project Name:" />
        <InputText
          placeholder="[example] My new react native project"
          keybordType="default"
          onChange={(text) => {
            setData({ ...data, name: text });
          }}
          controlledValue={data.name}
        />
      </View>
      <View>
        <TextTitle text="Description of the project:" />
        <InputText
          placeholder="Some creative description."
          keybordType="default"
          particularStyles={{ height: "40%" }}
          onChange={(text) => {
            setData({ ...data, description: text });
          }}
          controlledValue={data.description}
        />
      </View>
      <View
        style={{
          width: "60%",
          height: "20%",
          justifyContent: "space-between",
        }}
      >
        <Button
          title={mod ? "Update" : "Save Project"}
          onPress={mod ? handleUpdateProject : handleAddProject}
        />
        {mod && <Button title="Eliminar" onPress={handleDeleteProject} />}
      </View>
    </MainScreenContainer>
  );
};

export default AppAddProject;
