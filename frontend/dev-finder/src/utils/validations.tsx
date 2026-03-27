export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(emailRegex.test(email))
    return emailRegex.test(email);
}

export const validatePassword = (password: string) => {
    if (password.length > 6 && password.length < 15) {
        return true;
    } else {
        return false;
    }
}