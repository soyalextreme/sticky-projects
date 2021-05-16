import * as React from "react";
import { Text } from "react-native";
import InputText from "../../components/InputText";
import MainScreenContainer from "../../components/MainScreenContainer";
import TextTitle from "../../components/TextTitle";
import { ColorPicker } from "react-native-color-picker";
import Button from "../../components/Button";
import { v4 as uuidv4 } from "uuid";
import { StoreContext } from "../../state/Store";
import { AlertType } from "../../../types";
import { addCategories } from "../../db/categories";

export interface AddCategoriesProps {
  navigation: any;
}

const AddCategories: React.FunctionComponent<AddCategoriesProps> = ({
  navigation,
}) => {
  const [data, setData] = React.useState({
    desc: "",
    color: "",
    id: uuidv4(),
  });

  const { store, dispatch } = React.useContext(StoreContext);

  const handleAddCategory = async () => {
    if (!data.desc) {
      let msg: AlertType = {
        active: true,
        error: true,
        title: "Missing Value",
        msg: "Missing the Name for the category",
      };

      dispatch({ type: "OPEN_ALERT", payload: msg });
      return;
    }
    if (!data.color) {
      let msg: AlertType = {
        active: true,
        error: true,
        title: "Missing Value",
        msg: "Missing the Color for the category",
      };

      dispatch({ type: "OPEN_ALERT", payload: msg });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: { loading: true } });

    await addCategories(store.appState.auth?.uid as string, data, data.id);

    dispatch({ type: "ADD_CATEGORY", payload: data });

    navigation.navigate("Categories");

    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    }, 2000);
  };

  return (
    <MainScreenContainer>
      <TextTitle text="Category Name:" style={{ fontSize: 26 }} />
      <InputText
        placeholder="Category Name"
        keybordType="default"
        onChange={(text) => setData({ ...data, desc: text })}
      />
      <ColorPicker
        onColorSelected={(color) => setData({ ...data, color })}
        style={{ flex: 1, width: 200 }}
      />
      <Button title="Add Category" onPress={handleAddCategory} />
    </MainScreenContainer>
  );
};

export default AddCategories;
