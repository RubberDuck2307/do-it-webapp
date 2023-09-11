import { useState } from "react"
import { animated, useSpring } from '@react-spring/web'
import { Event } from "../../entities/event"
import { bin_icon, clock_icon, location_icon, minus_icon, pencil_icon, plus_icon } from "../../css/css"
import { datesAreOnSameDay, MakePrettyDate, MakePrettyTime } from "../../utils"
import { useNavigate } from "react-router"
import { getBGColor50, getBorderColor400 } from "../../css/tailwindColorsDynamic"
import { useGlobalContext } from "../../context"
import { deleteEventRequest } from "../../server_connection/requests"

export const EventRowExpandable = (event: Event) => {

    const [expanded, setExpanded] = useState(false)
    const [containerSprings, containerApi] = useSpring(() => ({
    }))
    const [animationFinished, setAnimationFinished] = useState(false)
    const navigate = useNavigate()
    const [deleted, setDeleted] = useState(false)
    const context = useGlobalContext()
    const handleClick = () => {
        setAnimationFinished(false)


        if (!expanded) {
            setExpanded(true)
            containerApi.start({
                from: { maxHeight: 0 },
                to: {
                    maxHeight: 160,

                },
                config: { duration: 250 },
                onRest: () => {
                    setAnimationFinished(true)
                }

            })
        }
        else {
            containerApi.start({
                from: { maxHeight: 160 },
                to: {
                    maxHeight: 0,

                },
                config: { duration: 250 },
                onRest: () => {
                    setAnimationFinished(true)
                    setExpanded(false)
                }

            })
        }
    }
    return (
        <>
        { deleted  ? null : <>
        <div className="flex flex-col mb-1">
            <div className={` flex flex-row items-center rounded-md h-12 w-[calc(100%-1rem)] mx-2 border-l-5 ${getBorderColor400(event.color)} pl-2 ${getBGColor50(event.color)} z-10 ${expanded && "rounded-bl-none"} hover:cursor-pointer`} onClick={handleClick}>
                {expanded ? <img src={minus_icon} className="w-5 h-5"></img> : <img src={plus_icon} className="w-5 h-5"></img>}
                <h3 className=" ml-3 font-semibold">{event.name}</h3>
                <img className="w-8 h-8 ml-auto mr-2 hover:bg-gray-200 rounded-full p-1 hover:cursor-pointer" src={pencil_icon} onClick={() => { navigate(`/calendar/event/${event.id}`) }} />
                <img className="w-8 h-8 mr-2 hover:bg-gray-200 rounded-full p-1 hover:cursor-pointer" src={bin_icon} onClick={() => { 
                if (event.id) {
                    setDeleted(true)
                    deleteEventRequest(event.id).then(() => {
                        context.resetEventsLists()
                        context.resetEvents()
                    });}
            }}/>
            </div>
            {expanded &&
                <animated.div className={` w-[calc(100%-1rem)] mx-auto -mt-3  pt-4 pb-2 pl-2 rounded-md ${getBGColor50(event.color)} z-0 border-l-5 ${getBorderColor400(event.color)} ${animationFinished ? "overflow-y-auto" : "overflow-hidden"}`} style={containerSprings}>
                    <div className=" flex flex-row items-center">
                        <img src={clock_icon} className="w-4 h-4"></img> <p className="ml-3">
                            {datesAreOnSameDay(event.startTime, event.endTime) ?
                                MakePrettyTime(event.startTime) +
                                " - " +
                                MakePrettyTime(event.endTime) : MakePrettyDate(event.startTime) + "  " + MakePrettyTime(event.startTime) + " - " + MakePrettyTime(event.endTime) + "  " + MakePrettyDate(event.endTime)}
                        </p>
                    </div>
                    <div className=" flex flex-row items-center">
                        <img src={location_icon} className="w-4 h-4"></img> <p className="ml-3">
                            {event.location}</p>
                    </div>
                    <div className="overflow-y-auto">
                        <p className="ml-2">
                            {event.description}
                        </p>
                    </div>
                </animated.div>}
        </div>
        </>  } </>)
}
