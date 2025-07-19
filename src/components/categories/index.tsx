import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/src/utils/categories";
import { Category } from "../category";

interface CategoriesProps {
  selected: string;
  onChange: (category: string) => void;
}

export function Categories({ selected, onChange }: CategoriesProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(category) => category.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          icon={item.icon}
          isSelected={item.name === selected}
          onPress={() => onChange(item.name)}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  );
}
