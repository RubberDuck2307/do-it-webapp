import {useEffect, useRef, useState} from "react"
import {
    AccessDiv,
    AccessHeadline,
    AccessInput,
    AccessMainButton,
    AccessPasswordInput,
    AccessText,
    ErrorAccess
} from "../confirm_email/ConfirmEmailPage"


import {useNavigate, useSearchParams} from "react-router-dom"
import {validateEmail, validatePassword} from "../../../utils"
import {Loader} from "../../../components/utils/Loader"
import {changePassword, sendChangePasswordEmail} from "../../../server_connection/authentication/authentication"
import {
    EXPIRED_PASSWORD_TOKEN,
    INVALID_PASSWORD_TOKEN,
    USERACCOUNT_NOT_FOUND
} from "../../../server_connection/responseExceptionTypes"

export const ResetPasswordPage = () => {

    const [state, setState] = useState<string>("")
    const [params, setParams] = useSearchParams()
    const token = useRef<string | null>(null)
    useEffect(() => {
        token.current = params.get("token")
        if (token.current === null) {
            setState("")
            return
        }
        else {
            setState("change")
            return
        }
    }, [])
    const setContent = () => {
        switch (state) {
            case "request":
                return <RequestState setState={setState} />;
            case "error":
                return <ErrorAccess />;
            case "success":
                return <SuccessState />;
            case "change":
                return <ChangeState token={token.current} setState={setState}/>
            case "expired":
                return <ExpiredToken />
            case "invalid":   
                return <InvalidToken />
            case "changed":
                return <ChangedPassword />  
            default:
                return <RequestState setState={setState} />;
        }
    }

    return <AccessDiv>{setContent()}</AccessDiv>

}

const RequestState = (props: { setState: React.Dispatch<React.SetStateAction<string>> }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const accessInpuptProps = {
        value: email,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
        },
        placeholder: "Email"
    }
    const [error, setError] = useState<string>("")

    return (
        <>
            <AccessHeadline headline="Reset Password"></AccessHeadline>
            <AccessText text="Enter your email address"></AccessText>
            <AccessInput {...accessInpuptProps}></AccessInput>
            <p className={`text-red-400 mb-5 mt-auto `}> {error}</p>
            { loading ? <div className="mt-auto mb-20">{Loader()}</div> :
            <AccessMainButton text="Send Reset Request" handleClick={async () => {
                setLoading(true)
                setError("")
                if (!validateEmail(email)){
                    setError("Invalid email")
                    return}
                const response = await sendChangePasswordEmail(email)
                if (response === "success")
                    props.setState("success")
                else if (response === USERACCOUNT_NOT_FOUND)
                    setError("An account with inserted email does not exist")
                else
                    props.setState("error")
                setLoading(false)

            }}></AccessMainButton>}
        </>
    )

}

const SuccessState = () => {
    return (
        <>
            <AccessHeadline headline="Success"></AccessHeadline>
            <AccessText text="An email to change your password has been sent to your email address"></AccessText>
        </>
    )
}

const ChangeState = (props: { setState: React.Dispatch<React.SetStateAction<string>>, token: string| null }) => {
    const token = props.token as string
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const passwordInputProps = {
        value: password,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
        },
        placeholder: "Password"
    }

    return (
        <>
            <AccessHeadline headline="Change Password"></AccessHeadline>
            <AccessText text="Enter your new password"></AccessText>
            <AccessPasswordInput {...passwordInputProps}></AccessPasswordInput>
            <p className="text-red-400">{error}</p>
            <AccessMainButton text="Change Password" handleClick={async () => {
                setError("")
                const passwordInput = password
                if (!validatePassword(passwordInput)){
                    setError("Password cannot be empty")
                    return
                } 
                const response = await changePassword(token, password)
                switch (response) {
                    case "success":
                        props.setState("changed")
                        break;
                    case "error":
                        props.setState("error")
                        break;
                    case EXPIRED_PASSWORD_TOKEN:
                        props.setState("expired")
                        break;
                    case INVALID_PASSWORD_TOKEN:
                        props.setState("invalid")
                        break;
                    default:
                        props.setState("error")

                }
            }}></AccessMainButton>
        </>
    )
}


export const ExpiredToken = () =>
{
    const navigate = useNavigate()
    return (
        <>
            <AccessHeadline headline="Expired Link" />
            <AccessText text="The link you are trying to use for changing your password has expired"></AccessText>
            <AccessMainButton text="Request new link" handleClick={() => { navigate("../resetPassword")}}/>
        </>
    )
}

export const InvalidToken = () =>
{
    const navigate = useNavigate()
    return (
        <>
            <AccessHeadline headline="Invalid Link" />
            <AccessText text="The link you are trying to use for changing your password is invalid"></AccessText>
            <AccessMainButton text="Request new link" handleClick={() => { navigate("../resetPassword")}}/>
        </>
    )
}

export const ChangedPassword = () =>
{
    const navigate = useNavigate()
    return (
        <>
            <AccessHeadline headline="Success" />
            <AccessText text="Your password has been changed"></AccessText>
            <AccessMainButton text="login" handleClick={() => { navigate("../login")}}/>
        </>
    )
}