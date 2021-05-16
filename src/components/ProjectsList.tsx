import * as React from "react";
import { View, Text, ScrollView } from "react-native";

export interface ProjectsListProps {}

const ProjectsList: React.FunctionComponent<ProjectsListProps> = () => {
  return (
    <ScrollView>
      <Text>Empezando</Text>
    </ScrollView>
  );
};

export default ProjectsList;
