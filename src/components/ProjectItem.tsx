import * as React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { ProjectType } from "../../types";
import { deleteProject } from "../db/projects";
import { StoreContext } from "../state/Store";
import MessageBox from "./MessageBox";
import TextP from "./TextP";
import TextTitle from "./TextTitle";

export interface ProjectItemProps {
  item: ProjectType;
  navigation: any;
}

const ProjectItem: React.FunctionComponent<ProjectItemProps> = ({
  item,
  navigation,
}) => {
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
      onLongPress={() =>
        navigation.navigate("Add Project", {
          mod: true,
          current: item,
        })
      }
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
