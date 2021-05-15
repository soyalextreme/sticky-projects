import { StyleSheet } from "react-native"
import { ColorEnumType } from "../../types";

export function genDependentGlobalStyleSheet(colorTheme: ColorEnumType) {
    return StyleSheet.create({
        Screen__Main: {
            backgroundColor: colorTheme.background,
            flex: 1,
            alignItems: "center",
        },
        Title: {
            fontSize: 30,
            color: colorTheme.primary,
            textAlign: "center",
            fontWeight: "bold",
        },
        SubTitle: {
            fontSize: 20,
            color: colorTheme.secondary,
            textAlign: "center",
            fontWeight: "normal",
        },
        Text: {
            fontSize: 15,
            color: colorTheme.secondary,
            textAlign: "center",
            fontWeight: "400",
        },


    });
}