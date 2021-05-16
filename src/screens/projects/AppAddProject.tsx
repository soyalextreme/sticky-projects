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

  const handleAddProject = () => {
    const errors = validateErrors();

    if (!errors) {
      console.log("Todo listo");
    }
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
          particularStyles={{ height: "50%" }}
          onChange={(text) => {
            setData({ ...data, description: text });
          }}
          controlledValue={data.description}
        />
      </View>
      <View style={{ width: "60%" }}>
        <Button title="Save Project" onPress={handleAddProject} />
      </View>
    </MainScreenContainer>
  );
};

export default AppAddProject;
