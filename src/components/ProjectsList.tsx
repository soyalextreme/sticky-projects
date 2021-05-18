import * as React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StoreContext } from "../state/Store";
import ProjectItem from "./ProjectItem";
import TextTitle from "./TextTitle";

export interface ProjectsListProps {
  navigation: any;
}

const ProjectsList: React.FunctionComponent<ProjectsListProps> = ({
  navigation,
}) => {
  const {
    store: {
      appData: { projects },
    },
    dispatch,
  } = React.useContext(StoreContext);

  return (
    <ScrollView style={{ width: "120%" }}>
      {projects.map((project) => (
        <ProjectItem key={project.id} item={project} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default ProjectsList;
