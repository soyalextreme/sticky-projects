import * as React from "react";
import { View, Text } from "react-native";
import { CategoriesType } from "../../types";
import { getCategoryByIdAsync } from "../db/categories";
import { StoreContext } from "../state/Store";

export interface CategoryLookerProps {
  categoryId: string;
}

const CategoryLooker: React.FunctionComponent<CategoryLookerProps> = ({
  categoryId,
}) => {
  const {
    store: {
      appState: { auth },
    },
  } = React.useContext(StoreContext);

  const [categoryData, setCategoryData] = React.useState<any>();

  React.useEffect(() => {
    fetchCurrentCategoryInformationAsync();
  }, []);

  const fetchCurrentCategoryInformationAsync = async () => {
    const arrInformation = await getCategoryByIdAsync(
      auth?.uid as string,
      categoryId
    );

    if (arrInformation.length === 0) {
      setCategoryData(undefined);
    } else {
      setCategoryData(arrInformation[0]);
    }
  };

  if (categoryData === undefined) {
    return (
      <View>
        <Text>No category to show </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: categoryData.color,
        padding: 10,
        borderRadius: 20,
      }}
    >
      <Text>{categoryData.desc}</Text>
    </View>
  );
};

export default CategoryLooker;
