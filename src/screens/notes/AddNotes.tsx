import * as React from "react";
import { ScrollView, View } from "react-native";
import { AlertType, StickyDefaulNoteType } from "../../../types";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import MainScreenContainer from "../../components/MainScreenContainer";
import TextP from "../../components/TextP";
import TextTitle from "../../components/TextTitle";
import { v4 as uuidv4 } from "uuid";
import { StoreContext } from "../../state/Store";
import { addNote } from "../../db/notes";
import { NavigationContainer } from "@react-navigation/native";
import CategoryPicker from "../../components/CategoryPicker";

export interface AddNotesProps {
  route: any;
}

const AddNotes: React.FunctionComponent<AddNotesProps> = ({ route }) => {
  const { projectId, mod, navigation, projectName } = route.params;
  const { store, dispatch } = React.useContext(StoreContext);
  const [pickerValue, setPickerValue] = React.useState("");

  const [data, setData] = React.useState<StickyDefaulNoteType>({
    body: "",
    title: "",
    done: false,
    id: uuidv4(),
    categoryId: "",
  });

  React.useEffect(() => {
    // mod set data
  }, []);

  const handleSave = async () => {
    const error = validateData();
    if (error) {
      return;
    }

    // add
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    await addNote(data, data.id, projectId);
    dispatch({ type: "ADD_NOTES", payload: data });
    navigation.navigate("Notes", { projectId, projectName });
    dispatch({ type: "SET_LOADING", payload: { loading: false } });
  };

  const handleUpdate = () => {};

  const validateData = () => {
    if (!data.title) {
      let msg: AlertType = {
        active: true,
        error: true,
        title: "Missing Value",
        msg: "Missing the Title for the Note",
      };

      dispatch({ type: "OPEN_ALERT", payload: msg });
      return true;
    }
    if (!data.body) {
      let msg: AlertType = {
        active: true,
        error: true,
        title: "Missing Value",
        msg: "Missing the Body for the Note",
      };
      dispatch({ type: "OPEN_ALERT", payload: msg });
      return true;
    }
    setData({ ...data, categoryId: pickerValue });

    if (!data.categoryId) {
      let msg: AlertType = {
        active: true,
        error: true,
        title: "Missing Value",
        msg: "Missing the Category for the Note",
      };
      dispatch({ type: "OPEN_ALERT", payload: msg });
      return true;
    }
    return false;
  };

  return (
    <MainScreenContainer>
      {/* <ScrollView> */}
      <TextTitle text="Adding a note for this project" />
      <View style={{ marginVertical: 20 }}>
        <TextP text="Title Note: " />
        <InputText
          placeholder="Example: A very good title"
          onChange={(text) => setData({ ...data, title: text })}
          keybordType="default"
          controlledValue={data.title}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <TextP text="Body Note: " />
        <InputText
          placeholder="Example: Information for the note."
          onChange={(text) => setData({ ...data, body: text })}
          keybordType="default"
          particularStyles={{ width: "50%", height: "40%" }}
          controlledValue={data.body}
        />
      </View>
      <View style={{ marginVertical: -100, height: "10%" }}>
        <TextP text="Your category" />
        <CategoryPicker
          selectedValue={pickerValue}
          setSelectedValue={(value: string) => setPickerValue(value)}
        />
      </View>
      <View style={{ width: "100%", marginTop: 150 }}>
        <Button
          title={mod ? "Update Note" : "Save Note"}
          onPress={mod ? handleUpdate : handleSave}
        />
      </View>
      {/* </ScrollView> */}
    </MainScreenContainer>
  );
};

export default AddNotes;
