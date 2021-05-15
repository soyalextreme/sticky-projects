import { configureFonts } from "react-native-paper"
import { validateEmail } from "./validateEmail"

export default function (email: string, password: string, name: string, confirmPassword: string) {
    let errors = {
        emailActive: false,
        passwordActive: false,
        nameActive: false,
    }

    if (!email || !password || !name) {
        errors.emailActive = true
        errors.passwordActive = true
        errors.nameActive = true
    }

    if (password.length < 7) {
        errors.passwordActive = true
    }

    if (!validateEmail(email)) {
        errors.emailActive = true
    }

    if (password !== confirmPassword) {
        errors.passwordActive = true
    }

    let msg = "";

    if (errors.emailActive) {
        msg += "verify the email";
    }

    if (errors.passwordActive) {
        msg += " verify the password";
    }
    if (errors.nameActive) {
        msg += "verifica el nombre";
    }

    return msg;
}