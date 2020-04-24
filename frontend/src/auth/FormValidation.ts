export const validateName = (value: string) => {
    let error
    if (!value) {
        error = 'Name is Required'
    }
    return error
}

export const validateEmail = (value: string) => {
    const regex = /^\S+@\S+\.\S+$/
    let error
    if (!value) {
        error = 'Email is Required'
    } else if (regex.test(value) === false) {
        error = 'Please Enter a Valid Email'
    }
    return error
}

export const validatePassword = (value: string) => {
    let error
    if (!value) {
        error = 'Password is Required'
    } else if (value.length < 7) {
        error = 'Password must be at least 7 characters'
    }
    return error
}

export const validatePasswordLogin = (value: string) => {
    let error
    if (!value) {
        error = 'Password is Required'
    }
    return error
}