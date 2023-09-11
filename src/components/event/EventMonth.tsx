import {getBGColor300} from "../../css/tailwindColorsDynamic"
import {Event} from "../../entities/event"
import React from "react";
import {EventChosenInterface, setPopUpDescription} from "./PopUpDescriptionEvent";

export interface EventMonthProps {
    event: Event
    setEventChosen: (event: EventChosenInterface) => void
}

export const EventMonth = ({ event, setEventChosen }: EventMonthProps) => {
    const eventRef = React.useRef<HTMLDivElement>(null);
    return (
        <div ref={eventRef} className={`w-full h-6 rounded-md m-1 ${getBGColor300(event.color)}`} onClick={(click) => { setPopUpDescription(click, eventRef, setEventChosen, event, false) }}>
            <p className="text-base font-semibold capitalize pl-1 text-ellipsis overflow-hidden truncate">{event.name}</p>
        </div>
    )

}