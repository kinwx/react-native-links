import { StyleSheet } from "react-native";

import { colors } from "@/src/styles/colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 52,
        backgroundColor: colors.gray[900],
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray[800],
        padding: 10,
        color: colors.gray[100],
        fontSize: 16
    }
})