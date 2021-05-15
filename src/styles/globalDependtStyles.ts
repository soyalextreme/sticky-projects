import { StyleSheet } from "react-native"
import { ColorEnumType } from "../../types";

export function genDependentGlobalStyleSheet(colorTheme: ColorEnumType) {
    return StyleSheet.create({
        Screen__Main: {
            backgroundColor: colorTheme.background,
            flex: 1,
            alignItems: "center",
        },
    });
}