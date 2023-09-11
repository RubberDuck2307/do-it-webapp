import {SetStateAction, useState} from "react"
import {eye_icon, google_icon, yellow_background_image} from "../../../css/css"
import {useNavigate} from "react-router"
import {Loader} from "../../../components/utils/Loader"
import {GOOGLE_OAUTH} from "../../../server_connection/requests"
import {
    EMAIL_ALREADY_TAKEN_RESPONSE,
    EMAIL_NOT_CONFIRMED_RESPONSE
} from "../../../server_connection/responseExceptionTypes"
import {login, register} from "../../../server_connection/authentication/authentication"

export const LoginPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [state, setState] = useState<string>('login')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const changeState = () => {
        setError("")
        if (state == 'login')
            setState('register')
        else
            setState('login')
    }
    const handleClick = async () => {

        let emailInput = email.trim()
        let passwordInput = password.trim()
        if (emailInput == "" || passwordInput == "") {
            setError("Email and password cannot be empty")
            return
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)) {
            setError("Invalid email")
            return
        }
        setLoading(true)
        if (state == 'login') {
            setError("")
            const response = await login(email, password)
            if (response === "success")
                window.location.href = "/"
            else if (response === EMAIL_NOT_CONFIRMED_RESPONSE) {
                navigate("../confirmEmail")
                sessionStorage.setItem("email", email)
            }
            else if (response === "unauthorized")
                setError("Invalid email or password")

            else {
                setError("an unexpected error occured please try again later")
            }
            setLoading(false)
        }
        else {
            setError("")
            sessionStorage.setItem("email", email)
            const response = await register(email, password)
            if (response === "success") {
                navigate("../confirmEmail")

            }
            else if (response === EMAIL_ALREADY_TAKEN_RESPONSE) {
                setError("An account with the email already exists")

            }
            else {
                setError("an unexpected error occured please try again later")

            }
            setLoading(false)
        }
    }


    return (
        <div className="flex h-screen justify-center items-center bg-cover" style={{ backgroundImage: `url(${yellow_background_image})` }}>
            <div className="w-[30vw] flex items-center flex-col lg:h-[80vh] bg-white rounded-lg shadow">
                <h1 className="font-bold text-5xl mb-12 mt-20 first-letter:capitalize"> {state} </h1>
                <div className="flex flex-col items-center w-full grow">
                    <div className=" ">
                        <p className="ml-2 font-semibold text-md"> Email</p>
                        <input className="rounded-xl h-12 p-3  text-2xl w-[25vw]  bg-yellow-100 mt-2  placeholder:text-xl " placeholder={"Write your email here"} type={"text"} value={email} onChange={((e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value))} >
                        </input>
                    </div>

                    <div className="mt-4 flex flex-col">
                        <p className="ml-2 font-semibold text-md"> Password</p>
                        <div className="flex">
                            <input className="peer rounded-l-xl h-12 w-[calc(25vw-4rem)] text-2xl relative border-yellow-100 bg-yellow-100 mt-2 p-1 placeholder:text-xl focus:outline-0 border-l-2 border-y-2 focus:border-black " placeholder={"Write your password here"} type={passwordVisible ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} >
                            </input>
                            <button className="border-r-2 border-y-2 border-yellow-100 peer-focus:border-black w-16 bg-yellow-100 h-12 mt-2 rounded-r-xl" onMouseDown={() => { setPasswordVisible(true) }} onMouseUp={() => setPasswordVisible(false)}>
                                <img className=" ml-4 h-8 w-8" src={eye_icon}></img>
                            </button>
                        </div>
                        {state == 'login' && <a className="text-sm self-end mt-1 hover:cursor-pointer hover:text-blue-300" href="../resetPassword">Forgot your password ?</a>}
                    </div>
                    {loading ? <div className="mt-10 mb-20">{Loader()}</div> :
                        <button className="rounded-3xl bg-yellow-300 w-[20vw] mt-10 h-10 text-xl active:bg-yellow-400 focus:outline hover:bg-yellow-400 first-letter:capitalize "
                        onClick={handleClick}> {state}</button>
                    }
                    <p className="h-4 text-red-400">{error} </p>
                    <div className={`${state === "login" ? "block" : "hidden"} mt-2 w-full flex flex-col justify-center items-center`}>
                        <div className="w-2/3 flex-row flex items-center">
                            <div className="flex grow border-t"></div>
                            <p className="mx-2">OR</p>
                            <div className="flex grow border-t"></div>
                        </div>
                        <a href={GOOGLE_OAUTH} className="mt-4"> <img src={google_icon}></img></a>
                    </div>
                    <p className="mt-auto">{state == "login" ? 'Do not have an account yet ?' : "Do you already have an account"}</p>
                    <button className="shadow mb-10 rounded-2xl py-2 w-32 mt-2 font-bold  hover:scale-110 hover:bg-blue-300 duration-300 active:bg-blue-400 first-letter:capitalize" onClick={changeState}>{state == "login" ? "register" : "login"}</button>
                </div>
            </div>

        </div>
    )


}


