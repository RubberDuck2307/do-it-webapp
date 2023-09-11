import {useRef, useState} from "react"
import {close_icon} from "../../css/css"
import {Icon} from "../utils/Icon"
import {YellowButton} from "../utils/YellowButton"
import {UseClickOutside} from "../../customHooks"
import {Loader} from "../utils/Loader"
import {useGlobalContext} from "../../context"
import {deleteEventLists} from "../../server_connection/event_list/EventListService"

export const DeleteEventListPopUp = (props: { setPopUp: (arg: boolean) => void}) => {
    const wrapperRef = useRef(null);
    UseClickOutside(wrapperRef, () => props.setPopUp(false))
    const [loading, setLoading] = useState<boolean>(false)

    const context = useGlobalContext()

    const handleDelete = async () => {
        setLoading(true)
        context.selectedLists.length > 0 && await deleteEventLists(context.selectedLists) &&
            context.setEventLists(context.eventLists.filter((list) => !context.selectedLists.includes(list.id)))
        context.setSelectedLists([])
        setLoading(false)
        window.location.reload()
    }


    return (
        <>
            <div className="absolute z-[9999] -ml-5 -mt-6 w-[calc(100%-20px)] h-[calc(100%-20px)] opacity-60 bg-gray-50"></div>
            <div ref={wrapperRef} className="z-[10000] absolute shadow-lg border left-[calc(50%-300px)] top-[calc(50%-150px)] h-[300px] w-[600px] bg-white flex flex-col items-center text-center rounded-md">
                <span className="absolute right-4 top-3"><Icon onClick={() => props.setPopUp(false)} src={close_icon}></Icon>
                </span>
                <p className="font-bold text-3xl mt-16 mb-1"> Are you sure you want to delete those categories ?</p>
                <p className="text-red-300 mb-8"> All included events will be deleted too</p>
                {
                    loading ?  <Loader /> :
                        <YellowButton text="Delete" onClick={handleDelete} width={300} height={60}></YellowButton>
                }
            </div>
        </>
    )
}
