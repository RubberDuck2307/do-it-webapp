import {ReactElement, ReactNode, useEffect, useState} from "react";
import {EventList} from "../../entities/eventList";
import {getBGColor400} from "../../css/tailwindColorsDynamic";
import {useGlobalContext} from "../../context";

export const EventListComponent = ({ list, amount }: { list: EventList, amount: number }): ReactElement => {
    const [active, setActive] = useState(false);
    const bgColor = getBGColor400(list.color);
    const { selectedLists, setSelectedLists } = useGlobalContext()
    const toogle = () => {
        if (active) {
            setSelectedLists(selectedLists.filter((id) => id !== list.id))
            setActive(false)
        }
        else {
            setSelectedLists([...selectedLists, list.id])
            setActive(true)
        }
    }

    useEffect(() => {
        if (selectedLists.includes(list.id)) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [selectedLists])

    return (
        <span onClick={
            toogle}>
            <EventListDiv active={active}>
                <div className={`rounded-md w-5 h-5 ${bgColor}`}></div>
                <p className="first-letter:capitalize ml-3">{list.name}</p>
                <p className=" ml-auto w-7 h-5 bg-white rounded-md flex items-center justify-center">{amount}</p>
            </EventListDiv>
        </span>
    )

}


export const EventListDiv = (props: { active: boolean, children: ReactNode }) => {
    return (<div className={`mb-1 flex flex-row rounded-lg h-10 px-4 hover:bg-gray-300 hover:cursor-pointer text-center items-center group ${props.active ? "bg-gray-300 shadow-sm shadow-black" : "bg-gray-100"}`}>
        {props.children}
    </div>
    )
} 