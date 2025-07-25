import { Text, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/src/styles/colors";

interface CategoryProps extends PressableProps {
  name: string;
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function Category({ name, icon, isSelected, ...props }: CategoryProps) {
  const color = isSelected ? colors.green[300] : colors.gray[400];

  return (
    <Pressable style={styles.container} {...props}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={[styles.name, { color }]} children={name} />
    </Pressable>
  );
}
