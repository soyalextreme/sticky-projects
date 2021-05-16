import * as React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StoreContext } from "../state/Store";
import ProjectItem from "./ProjectItem";
import TextTitle from "./TextTitle";

export interface ProjectsListProps {}

const ProjectsList: React.FunctionComponent<ProjectsListProps> = () => {
  const {
    store: {
      appData: { projects },
    },
    dispatch,
  } = React.useContext(StoreContext);

  return (
    <ScrollView style={{ width: "120%" }}>
      {projects.map((project) => (
        <>
          <ProjectItem item={project} />
        </>
      ))}
    </ScrollView>
  );
};

export default ProjectsList;
