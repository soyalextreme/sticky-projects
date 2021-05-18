import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { StoreContext } from "../state/Store";
import { getCategories } from "../db/categories";

export interface CategoryPickerProps {
  selectedValue: string;
  setSelectedValue: (itemValue: string) => void;
}

const CategoryPicker: React.FunctionComponent<CategoryPickerProps> = ({
  selectedValue,
  setSelectedValue,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const {
    appData: { catergories },
  } = store;

  React.useEffect(() => {
    fetchCategoriesAsync();
  }, []);

  const fetchCategoriesAsync = async () => {
    const arr = await getCategories(store.appState.auth?.uid as string);
    dispatch({ type: "REPLACE_CATEGORIES", payload: arr });
    console.log(catergories);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue as string)}
      >
        <Picker.Item label="Select a category" value={""} />
        <Picker.Item label="No category" value={"no category"} />
        {catergories.map((category) => (
          <Picker.Item label={category.desc} value={category.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: -10,
    backgroundColor: "white",
    alignItems: "center",
  },
});

export default CategoryPicker;
