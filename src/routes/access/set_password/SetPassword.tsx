import {useNavigate} from "react-router"
import {
    AccessDiv,
    AccessHeadline,
    AccessMainButton,
    AccessPasswordInput,
    AccessText,
    ErrorAccess
} from "../confirm_email/ConfirmEmailPage"
import {useEffect, useRef, useState} from "react"

import {ChangedPassword, InvalidToken} from "../reset_password/ResetPasswordPage"
import {useSearchParams} from "react-router-dom"
import {validatePassword} from "../../../utils"
import {changePassword} from "../../../server_connection/authentication/authentication"
import {EXPIRED_PASSWORD_TOKEN, INVALID_PASSWORD_TOKEN} from "../../../server_connection/responseExceptionTypes"

export const SetPasswordPage = () => {
    const [state, setState] = useState("")
    const token = useRef<string | null>(null)
    const [params, setParams] = useSearchParams()

    useEffect(() => {
        const tokenParam = params.get("token")
        if (tokenParam) {
            token.current = tokenParam
            setState("set")
        }
        else {
            setState("invalid")
        }
    }, []
    )


    const setContent = () => {
        switch (state) {
            case "expired":
                return <ExpiredToken />
            case "error":
                return <ErrorAccess />
            case "invalid":
                return <InvalidToken></InvalidToken>
            case "set":
                return <SetState token={token.current} setState={setState}></SetState>
            case "success":
                return <ChangedPassword></ChangedPassword>
        }
    }

    return (
        <AccessDiv>
            <>
                {setContent()}
            </>
        </AccessDiv>
    )
}



const ExpiredToken = () => {
    const navigate = useNavigate()
    return (
        <>
            <AccessHeadline headline="Expired Link" />
            <AccessText text="The link you are trying to use for setting your password has expired"></AccessText>
            <AccessMainButton text="Request new link" handleClick={() => { navigate("../resetPassword") }} />
        </>
    )
}

const SetState = (props: { setState: React.Dispatch<React.SetStateAction<string>>, token: string | null }) => {
    const token = props.token as string
    const [error, setError] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const passwordInputProps = {
        value: password,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value)
        },
        placeholder: "Password"
    }

    return (
        <>
            <AccessHeadline headline="Set Password"></AccessHeadline>
            <AccessText text="Enter your password"></AccessText>
            <AccessPasswordInput {...passwordInputProps}></AccessPasswordInput>
            <p className="text-red-400">{error}</p>
            <AccessMainButton text="Change Password" handleClick={async () => {
                setError("")
                const passwordInput = password
                if (!validatePassword(passwordInput)) {
                    setError("Password cannot be empty")
                    
                }
                const response = await changePassword(token, password)
                switch (response) {
                    case "success":
                        props.setState("success")
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