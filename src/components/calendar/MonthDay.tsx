import {EventMonth} from "../event/EventMonth";
import {Event} from "../../entities/event";
import {datesAreOnSameDay} from "../../utils";
import React, {useEffect, useState} from "react";
import {close_icon} from "../../css/css";
import {EventChosenInterface} from "../event/PopUpDescriptionEvent";
import {useFilterEvents} from "../../customHooks";
import {useGlobalContext} from "../../context";

export interface MonthDayProps {
    date: Date;
    events: Event[] | undefined;
    setEventChosen: (event: EventChosenInterface) => void
    month: number
}

export const MonthDay = ({ date, events, setEventChosen, month }: MonthDayProps) => {

    const [dayExpanded, setDayExpanded] = useState(false);
    const [eventsExpandedHeight, setEventsExpandedHeight] = useState(0);
    const eventsExpandedRef = React.useRef<HTMLDivElement>(null);



    useEffect(() => {

        if (eventsExpandedRef.current) {
            setEventsExpandedHeight(eventsExpandedRef.current.offsetHeight);
        }
    }, [dayExpanded]);


    const event = {
        color: "red",
        name: "test",
    }

    let eventsToShow: Event[] = []

    
    const context = useGlobalContext()

    let filteredEvents: Event[] = []

    if (events) {

        filteredEvents = useFilterEvents(events, context.selectedLists)

        if (filteredEvents.length < 4)
            eventsToShow = filteredEvents
        else {
            eventsToShow = filteredEvents.slice(0, 3)
        }
    }


    let color
    
    if (datesAreOnSameDay(date, new Date())) {
        color = "text-yellow-400"
    }
    else if (date.getMonth() != month){
        color = "text-gray-400"
        if (date.getDay() == 0) {
            color = "text-red-300"}
    }
    else if (date.getDay() == 0) {
        color = "text-red-400"
    }


    return (
        <>
            {dayExpanded ?
                <div className="row-span-1 overflow-visible rounded-lg border-2 bg-white z-10 border-black flex flex-col pr-2" style={{ height: eventsExpandedHeight + 40 }} >
                    <div className="self-center grid grid-cols-3 w-full justify-center">
                        <p className=" col-start-2 col-end-2 text-center text-2xl"> {date.getDate()} </p>
                        <div className="flex justify-center"><img src={close_icon} className=" p-2 h-8 w-8  rounded-full hover:bg-gray-300 hover:cursor-pointer" onClick={() => { setDayExpanded(false) }}></img>
                        </div>
                        <div ref={eventsExpandedRef} className="col-span-3 ">
                            {filteredEvents.map((event, index) => {
                                return (
                                    <EventMonth event={event} key={index} setEventChosen={setEventChosen}></EventMonth>
                                )
                            })}
                        </div>
                    </div>

                </div>
                :
                <div className={`col-span-1 row-span-1 p-1 `} >
                    <p className={`${color} mb-1 font-semibold text-xl`}>{date.getDate()}</p>
                    {eventsToShow.map((event, index) => {
                        return (
                            <EventMonth event={event} key={index} setEventChosen={setEventChosen}></EventMonth>
                        )
                    })}
                    {
                    
                    filteredEvents.length > 3 &&
                        <div className="bg-gray-200 w-full h-3 rounded-md hover:bg-gray-300 ml-1 hover:cursor-pointer" onClick={() => setDayExpanded(true)}>

                        </div>

                    }
                </div>
            }
        </>
    )
}