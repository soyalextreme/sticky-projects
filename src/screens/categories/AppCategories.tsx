import * as React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AlertType, CategoriesType } from "../../../types";
import Button from "../../components/Button";
import TextP from "../../components/TextP";
import TextTitle from "../../components/TextTitle";
import { deleteCategory, getCategories } from "../../db/categories";
import { StoreContext } from "../../state/Store";
import { genDependentGlobalStyleSheet } from "../../styles/globalDependtStyles";

export interface AppCategoriesProps {
  navigation: any;
}

const AppCategories: React.FunctionComponent<AppCategoriesProps> = ({
  navigation,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const {
    appData: { catergories },
    appState: { auth },
  } = store;

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: { loading: true } });
    const fetchCategories = async () => {
      const arrData = await getCategories(auth?.uid as string);
      dispatch({ type: "REPLACE_CATEGORIES", payload: arrData });
      dispatch({ type: "SET_LOADING", payload: { loading: false } });
    };
    fetchCategories();

    // console.log(catergories);
  }, []);

  const globalStyles = genDependentGlobalStyleSheet(
    store.appState.theme.colors
  );

  const handleDelete = async (item: CategoriesType) => {
    let alertDetete: AlertType = {
      active: true,
      error: false,
      msg: "Borrando la categoria",
      title: `Borrando ${item.desc}`,
    };
    dispatch({ type: "OPEN_ALERT", payload: alertDetete });

    let categoriesFilter = catergories.filter((cat) => cat.id !== item.id);

    await deleteCategory(auth?.uid as string, item.id);

    dispatch({ type: "REPLACE_CATEGORIES", payload: categoriesFilter });
  };

  const handleAdd = () => {
    navigation.navigate("Add Category");
  };

  return (
    <View style={{ ...globalStyles.Screen__Main }}>
      <Text style={{ ...globalStyles.Title, marginVertical: 30 }}>
        Categories
      </Text>
      <View
        style={{
          width: "50%",
          marginVertical: 40,
          paddingBottom: 40,
          borderStyle: "dotted",
          borderBottomWidth: 4,
          borderBottomColor: store.appState.theme.colors.primary,
        }}
      >
        <Button title="Add Category" onPress={handleAdd} />
      </View>
      {catergories.length === 0 && (
        <>
          <TextTitle text="Add your first category" style={{ fontSize: 20 }} />
          <TextP text="Still do not have categories" />
        </>
      )}
      <ScrollView>
        {catergories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              backgroundColor: item.color,
              width: 200,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginVertical: 10,
              borderRadius: 30,
            }}
            onLongPress={() => handleDelete(item)}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {item.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AppCategories;
