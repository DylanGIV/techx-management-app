import axios from './axiosConfig';

export const postLogin = async (email : string, password : string) => {
    return new Promise((resolve, reject) => {
        axios.post('Accounts/authenticate', {
            email: email,
            password: password
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

export const postRegister = async (company : string, firstName: string, lastName : string, email : string, password : string, confirmPassword : string, acceptTerms : Boolean) => {
    return new Promise((resolve, reject) => {
        axios.post('Accounts/register', {
            company: company,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            acceptTerms: acceptTerms
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

// export const postCreateCompany = async (company : string, firstName: string, lastName : string, email : string, password : string) {
//     return new Promise((resolve, reject) => {
//         axios.post('Company')
//     })

// }
