import {ReactNode, useEffect, useState} from "react"
import {robot_image} from "../css/css"

export const ScreenCheck = (props: { children: ReactNode }) => {
    const [size, setSize] = useState<[number, number]>([0, 0])


    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
      }


    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }

        window.addEventListener("resize", handleResize)
        handleResize()
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            {isMobile() ? 
            <div className=" p-10 flex justify-center flex-col items-center object-scale-down text-center">
                <p className="font-bold text-3xl mb-3">Sorry, we are not optimized for small screens</p>
                <img src={robot_image}></img>
            </div>
            : props.children}
        </>
    )
}