import { validateEmail } from "./validateEmail"

export default function (email: string, password: string) {
    let errors = {
        emailActive: false,
        passwordActive: false,
    }

    if (!email || !password) {
        errors.emailActive = true
        errors.passwordActive = true
    }

    if (password.length < 7) {
        errors.passwordActive = true
    }

    if (!validateEmail(email)) {
        errors.emailActive = true
    }

    return errors
}