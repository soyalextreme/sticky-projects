import * as React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import MainScreenContainer from "../../components/MainScreenContainer";
import ProjectsList from "../../components/ProjectsList";
import TextP from "../../components/TextP";
import TextTitle from "../../components/TextTitle";
import { getProjects } from "../../db/projects";
import { StoreContext } from "../../state/Store";

export interface AppProjectsProps {
  navigation: any;
}

const AppProjects: React.FunctionComponent<AppProjectsProps> = ({
  navigation,
}) => {
  const {
    store: {
      appState: { auth },
      appData: { projects },
    },
    dispatch,
  } = React.useContext(StoreContext);

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    const projectsFetch = await getProjects(auth?.uid as string);
    dispatch({ type: "SET_PROJECTS", payload: projectsFetch });
    dispatch({ type: "SET_LOADING", payload: { loading: false } });
  };

  return (
    <MainScreenContainer>
      <Button
        title="Add new Project"
        onPress={() => navigation.navigate("Add Project", { update: false })}
      />
      <TextTitle
        text="Your projects"
        style={{ fontSize: 20, marginVertical: 40 }}
      />
      <View>
        {projects.length === 0 && (
          <TextTitle text="Add your first project now!" />
        )}
        <ProjectsList navigation={navigation} />
      </View>
    </MainScreenContainer>
  );
};

export default AppProjects;
