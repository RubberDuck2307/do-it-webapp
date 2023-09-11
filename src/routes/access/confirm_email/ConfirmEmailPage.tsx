import {ChangeEvent, ReactNode, useEffect, useState} from "react"
import {eye_icon, yellow_background_image} from "../../../css/css"
import {useNavigate} from "react-router"
import {useSearchParams} from "react-router-dom"
import {Loader} from "../../../components/utils/Loader"
import {CONFIRMATION_TOKEN_EXPIRED, INVALID_CONFIRMATION_TOKEN} from "../../../server_connection/responseExceptionTypes"
import {confirmEmail, resendEmail, resendEmailByEmail} from "../../../server_connection/authentication/authentication"


export const ConfirmEmailPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [state, setState] = useState("")
    const setContent = () => {
        switch (state) {
            case "confirm":
                return <Confirm />
            case "success":
                return <Success />
            case CONFIRMATION_TOKEN_EXPIRED:
                return <ExpiredToken token={searchParams.get("token") as string} />
            case INVALID_CONFIRMATION_TOKEN:
                return <InvalidToken />
            case "error":
                return <ErrorAccess />

        }
    }

    useEffect(() => {

        if (searchParams.get("token") === null) {
            if (sessionStorage.getItem("email") !== null) {
                setState("confirm")
                return
            }
            else {
                setState(INVALID_CONFIRMATION_TOKEN)
                return
            }
        }
        async function sendRequest() {
            setState(await confirmEmail(searchParams.get("token") as string))
        }
        sendRequest()
    }, [])

    return (
        <AccessDiv>{setContent()}</AccessDiv>
    )
}

const InvalidToken = () => {
    const navigate = useNavigate()
    return <>
        <AccessHeadline headline="Invalid Link" />
        <AccessText text="The link you are trying to use for confirming the email address is invalid"></AccessText>
        <AccessMainButton text="register" handleClick={() => { navigate("../login") }} />
    </>
}

const Success = () => {
    const navigate = useNavigate()
    return <>
        <AccessHeadline headline="Success" />
        <AccessText text="Your email address has been confirmed. You can now continue into your account"></AccessText>
        <AccessMainButton text="continue" handleClick={() => { window.location.href = "/" }} />
    </>
}

export const ErrorAccess = () => {
    const navigate = useNavigate()
    return <>
        <AccessHeadline headline="Error" />
        <AccessText text="An error has occured please try it again later"></AccessText>
        <AccessMainButton text="Login" handleClick={() => { navigate("../login") }} />
    </>
}

const ExpiredToken = (props: { token: string }) => {
    const [error, setError] = useState(false)
    const [sent, setSent] = useState(false)
    return <>
        <AccessHeadline headline="Expired Link" />
        <AccessText text="The link you are trying to use for conforming the email address has expired"></AccessText>
        <p className={`mt-auto mb-5 ${error ? "text-yellow-400" : "text-red-400"}`}> {sent && error && "An error has occured please try it again later" || "A new token has been sent to your email adrress"}</p>

        <AccessMainButton text="Send a new Link" handleClick={async () => {
            if (await resendEmail(props.token)) {
                setSent(true)
                setError(false)
            }
            else {
                setSent(false)
                setError(true)

            }
        }} />

    </>
}

const Confirm = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const email = sessionStorage.getItem("email") as string
    const [error, setError] = useState(false)
    const [sent, setSent] = useState(false)
    if (email === null) {
        navigate("../login")
    }
    return <>
        <AccessHeadline headline="Confirm Email" />
        <AccessText text={`An email to confirm your email address has been sent to ${email} please confirm it, so that you can continue`} />
        <p className={`mt-auto ${!error ? "text-yellow-400" : "text-red-400"} ${!sent ? "hidden" : "block"}`}> {error ? "An error has occured please try it again later" : "A new token has been sent to your email address"}</p>
        { loading ? <span className="mt-auto mb-20">{Loader()}</span> :<AccessMainButton text="resend" handleClick={async () => {
            setLoading(true)
            if (await resendEmailByEmail(email)) {
                setSent(true)
                setError(false)
            }
            else {
                setSent(true)
                setError(true)
            }
            setLoading(false)
        }} />}
    </>
}

export const AccessHeadline = (props: { headline: string }) => {
    return <h1 className="font-bold text-5xl mb-12 mt-20 first-letter:capitalize"> {props.headline} </h1>
}

export const AccessText = (props: { text: string }) => {
    return <p className="mt-10 text-xl ">{props.text}</p>
}

export const AccessMainButton = (props: { text: string, handleClick: () => void }) => {
    return <button className="rounded-3xl bg-yellow-300 w-[20vw] mt-auto mb-20 h-10 text-xl active:bg-yellow-400 focus:outline hover:bg-yellow-400 first-letter:capitalize "
        onClick={props.handleClick}> {props.text}</button>
}

export const AccessDiv = (props: { children: ReactNode }) => {
    return <div className="flex h-screen justify-center items-center bg-cover" style={{ backgroundImage: `url(${yellow_background_image})` }}>
        <div className="w-[30vw] flex items-center flex-col h-[80vh] bg-white rounded-lg shadow px-10">
            {props.children}
        </div>
    </div>
}


export const AccessInput = ({ value, placeholder, handleChange }: { value: string, placeholder: string, handleChange: (event: ChangeEvent<HTMLInputElement>) => void }) => {
    return <input className="rounded-xl h-12 p-3  text-2xl w-[25vw]  bg-yellow-100 mt-2  placeholder:text-xl " placeholder={placeholder} type={"text"} value={value} onChange={handleChange} >
    </input>
}

export const AccessPasswordInput = ({value, placeholder, handleChange} :{ value: string, placeholder: string, handleChange: (event: ChangeEvent<HTMLInputElement>) => void }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    
    return(
    <div className="flex">
        <input className="peer rounded-l-xl h-12 w-[calc(25vw-4rem)] text-2xl relative border-yellow-100 bg-yellow-100 mt-2 p-1 placeholder:text-xl focus:outline-0 border-l-2 border-y-2 focus:border-black " placeholder={"Write your password here"} type={passwordVisible ? "text" : "password"} value={value} onChange={handleChange} >
        </input>
        <button className="border-r-2 border-y-2 border-yellow-100 peer-focus:border-black w-16 bg-yellow-100 h-12 mt-2 rounded-r-xl" onMouseDown={() => { setPasswordVisible(true) }} onMouseUp={() => setPasswordVisible(false)}>
            <img className=" ml-4 h-8 w-8" src={eye_icon}></img>
        </button>
    </div>)
}