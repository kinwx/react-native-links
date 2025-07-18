import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";
import { colors } from "@/src/styles/colors";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor={colors.gray[500]}
      {...props}
    />
  );
}
