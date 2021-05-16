import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ProjectType } from "../../types";
import { deleteProject } from "../db/projects";
import { StoreContext } from "../state/Store";
import TextP from "./TextP";
import TextTitle from "./TextTitle";

export interface ProjectItemProps {
  item: ProjectType;
}

const ProjectItem: React.FunctionComponent<ProjectItemProps> = ({ item }) => {
  console.log("item", item);

  const {
    store: {
      appState: {
        theme: { colors },
        auth,
      },
      appData: { projects },
    },
    dispatch,
  } = React.useContext(StoreContext);

  const handleDelete = async () => {
    await deleteProject(auth?.uid as string, item.id);

    const arrayFiltered = projects.filter((project) => project.id !== item.id);

    dispatch({ type: "SET_PROJECTS", payload: arrayFiltered });
  };

  return (
    <TouchableOpacity
      style={{
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colors.secondary,
        padding: 20,
        marginVertical: 20,
        width: 300,
      }}
      onLongPress={handleDelete}
    >
      <TextTitle
        text={`🔻${item.name}`}
        style={{ color: colors.alternative, textAlign: "left", fontSize: 20 }}
      />
      <TextP
        text={item.description}
        style={{ color: colors.primary, fontSize: 15, textAlign: "left" }}
      />
    </TouchableOpacity>
  );
};

export default ProjectItem;
