import React, {ReactElement} from "react";
import {getBGColor200} from "../../css/tailwindColorsDynamic";
import {calculateEventHeight, calculateEventTop, calculateLeft} from "../../routes/calendar/calendarUtils";
import {Event} from "../../entities/event";
import {EventChosenInterface, setPopUpDescription} from "./PopUpDescriptionEvent";

export interface EventPosition {
    top: number,
    bottom: number
  }

export interface EventProps {
    event: Event;
    day: Date;
    gap: number;
    eventsPosition: EventPosition[];
    zIndex: number;
    setEventChosen : (event: EventChosenInterface) => void;
}



export const EventComponent = ({ event, day, gap, eventsPosition, zIndex, setEventChosen}: EventProps): ReactElement => {
    const height = calculateEventHeight(event.startTime, event.endTime, day);
    const top = calculateEventTop(event.startTime, day, gap);
    const color = getBGColor200(event.color);
    const left = calculateLeft(eventsPosition, {top: top, bottom: top + height});
    const eventRef = React.useRef<HTMLDivElement>(null);
    eventsPosition.push({top: top, bottom: top + height})

    const handleClick = (click: React.MouseEvent) => {
        setPopUpDescription(click, eventRef, setEventChosen, event, false)
    }

    return (
        <>
            <div className={`${color} rounded-lg h-full absolute min-h-[30px] `} ref = {eventRef} onClick={ (event) => handleClick(event)} style={{top: top, height:height , zIndex: zIndex, left:left, width: `calc(100% - ${left}px)`}}>
                <p className="font-bold capitalize ml-3 truncate">{event.name}</p>
            </div>
        </>
    );
};

