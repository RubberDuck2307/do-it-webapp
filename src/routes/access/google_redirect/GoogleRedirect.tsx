import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { googleLoginRequest } from "../../../server_connection/requests"
import { Loader } from "../../../components/utils/Loader";
import { YellowButton } from "../../../components/utils/YellowButton";

export const GoogleRedirect = () => {
    let response;
    const [params, setParams] = useSearchParams()
    const [loading, setLoading] = useState<boolean>(true)
    console.log(params.get("code"))
    useEffect(() => {
        const method = async () => {
            const code = params.get("code")
            if (code) {
                try {
                    response = await googleLoginRequest(code)
                    if (response.status === 200) {
                        window.location.href = "../../"
                    }
                }
                catch (error) {
                    setLoading(false)
                }
            }
        }
        method()
    })

    return (
        <div className="flex justify-center items-center w-full h-[100vh] flex-col">
            {loading ? <><h1 className=" text-5xl mb-5">Wait please,</h1>
            <p className="text-3xl mb-5">it may take up a minute to get everything running on the server side.</p>
                <Loader size={70}/> </> : <>
                <h1 className="text-5xl font-bold mb-5">Well... This is embarrassing</h1>
                <p className="text-3xl mb-5">The OAuthorization has failed. If you are using addblock, disabling it might help.</p>
                <YellowButton text="Login" width={192} height={40} onClick={()=> window.location.href = "../../login"}></YellowButton>
            </>}
        </div>
    )

}

