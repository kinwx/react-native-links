import { StyleSheet } from "react-native";

import { colors } from "@/src/styles/colors";

export const styles = StyleSheet.create({
    container: {
        height: 52,
        width: '100%',
        backgroundColor: colors.green[300],
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: colors.gray[900],
        fontWeight: "600",
        fontSize: 16
    }
})