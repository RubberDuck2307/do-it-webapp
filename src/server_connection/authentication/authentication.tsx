import {
    changePasswordRequest,
    checkAuthRequest,
    confirmEmailRequest,
    loginRequest,
    logOutRequest,
    registerRequest,
    resendEmailRequest,
    resendEmailRequestByEmail,
    sendChangePasswordEmailRequest
} from "../requests"
import {
    CONFIRMATION_TOKEN_EXPIRED,
    EMAIL_ALREADY_TAKEN_RESPONSE,
    EMAIL_NOT_CONFIRMED_RESPONSE,
    EXPIRED_PASSWORD_TOKEN,
    INVALID_CONFIRMATION_TOKEN,
    INVALID_PASSWORD_TOKEN,
    USERACCOUNT_NOT_FOUND
} from "../responseExceptionTypes"

export const login = async (email: string, password: string): Promise<String> => {
    try {
        const response = await loginRequest(email, password)
    }
    catch (error: any) {
        if (error.response?.status === 403)
            return "unauthorized"
        else if (error.response?.data?.type == EMAIL_NOT_CONFIRMED_RESPONSE)
            return EMAIL_NOT_CONFIRMED_RESPONSE
        else
            return "error"
    }
    return "success"

}

export const logout = async () => {

    try {
        await logOutRequest()
    }
    catch (error) {
        return false
    }
    return true

}

export const checkAuth = async () => {
    try {
        await checkAuthRequest()
    }
    catch (error) {
        return false
    }
    return true

}

export const register = async (email: string, password: string) => {
    try {
        await registerRequest(email, password)
    }
    catch (error: any) {
        if (error.response?.data?.type == EMAIL_ALREADY_TAKEN_RESPONSE)
            return EMAIL_ALREADY_TAKEN_RESPONSE
        else
            return "error"
    }
    return "success"
}

export const confirmEmail = async (token: string) => {
    let response
    try {
        response = await confirmEmailRequest(token)
    }
    catch (error: any) {
        if (error?.response?.data.type === INVALID_CONFIRMATION_TOKEN)
            return INVALID_CONFIRMATION_TOKEN
        else if (error?.response?.data.type === CONFIRMATION_TOKEN_EXPIRED)
            return CONFIRMATION_TOKEN_EXPIRED
        else
            return "error"
    }
    return "success"

}

export const resendEmail = async (token: string) => {
    try {
        await resendEmailRequest(token)
    }
    catch (error) {
        return false
    }
    return true
}

export const resendEmailByEmail = async (email: string) => {
    try {
        await resendEmailRequestByEmail(email)
    }
    catch (error) {
        return false
    }
    return true
}

export const sendChangePasswordEmail = async (email: string) => {
    try {
        await sendChangePasswordEmailRequest(email)
    }
    catch (error: any) {

        if (error?.response?.data?.type === USERACCOUNT_NOT_FOUND)
            return USERACCOUNT_NOT_FOUND
        else
            return "error"
    }
    return "success"

}

export const changePassword = async (token: string, password: string) => {
    try {
        await changePasswordRequest(token, password)
    }
    catch (error: any) {
        switch (error?.response?.data?.type) {
            case INVALID_PASSWORD_TOKEN:
                return INVALID_PASSWORD_TOKEN
            case EXPIRED_PASSWORD_TOKEN:
                return EXPIRED_PASSWORD_TOKEN
            default: return "error"
        }
    }
    return "success"

}
