type DataType = {
    email: string
    username: string
    password: string
    passwordConf: string
}
export default function ValidateSignup({ email, username, password, passwordConf }: DataType) {
    if (
        email == '' ||
        username == '' ||
        password == '' ||
        passwordConf == ''
    ) {
        return 'All the fields are required'
    }

    if (password !== passwordConf) {
        return 'Passwords do not match'
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        return 'Password should be at least eight characters, and contain at least one letter, number and special character'
    }
    if (!/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
        return 'Username should be at least 4 characters and not contain special characters'
    }

    return ''
}