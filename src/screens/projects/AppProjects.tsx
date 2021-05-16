import * as React from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import MainScreenContainer from "../../components/MainScreenContainer";
import ProjectsList from "../../components/ProjectsList";
import TextP from "../../components/TextP";
import TextTitle from "../../components/TextTitle";
import { StoreContext } from "../../state/Store";

export interface AppProjectsProps {
  navigation: any;
}

const AppProjects: React.FunctionComponent<AppProjectsProps> = ({
  navigation,
}) => {
  const {
    store: {
      appData: { projects },
    },
    dispatch,
  } = React.useContext(StoreContext);

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
        {projects.length === 0 ? (
          <TextP text="You have not added any project" />
        ) : (
          <ProjectsList />
        )}
      </View>
    </MainScreenContainer>
  );
};

export default AppProjects;
