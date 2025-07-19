import { Dimensions, StyleSheet } from "react-native";

import { colors } from "@/src/styles/colors";

const width = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    wrapper: {
        position: "relative",
        borderWidth: 1,
        borderColor: colors.gray[800],
        borderRadius: 8,
        padding: 8,
        width: 0.8 * width,
        maxWidth: 360,
        alignItems: "center",
        backgroundColor: colors.gray[900]
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: colors.green[300],
        marginVertical: 4
    },
    description: {
        fontSize: 16,
        color: colors.gray[500],
        textAlign: "center",
        marginBottom: 18
    },
    actions: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    btn: {
        padding: 12,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    outline: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.gray[800],
    },
    cancel: {
        borderRadius: 8,
        backgroundColor: colors.red[500],
        alignItems: "center",
        justifyContent: "center",
    },
    ghost: {},
    text: {
        fontSize: 18,
        color: colors.gray[200]
    },
})