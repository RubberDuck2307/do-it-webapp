import {getBGColor200} from "../../css/tailwindColorsDynamic";
import {Event, isEventInDay} from "../../entities/event";
import {addDays, getWeekDays} from "../../utils";
import {EventChosenInterface, setPopUpDescription} from "./PopUpDescriptionEvent";
import {useRef} from "react";

export interface FullDayEventProps {
    columnWidth: number;
    event: Event;
    date:Date
    setChosenEvent: (event: EventChosenInterface) => void
}

const calculateWidth = (columnWidth: number, event: Event, currentDate:Date) => {
    const days = []

    const today = currentDate
    const monday = new Date (addDays( - getWeekDays(today), today))
    let date = monday
    for (let i = 0; i < 7; i++) {
        if (isEventInDay(event, date))
        {
            days.push(i)
        }
        date = addDays(1, date)
    }
    const min = Math.min(...days)
    const max = Math.max(...days)

    if (min === Infinity){
        return {leftMargin: 0, width: 0}
    }
    const width = (max - min + 1) * columnWidth
    const leftMargin = min * columnWidth

    return {leftMargin, width}
}


export const FullDayEvent = ({columnWidth, event, date, setChosenEvent}: FullDayEventProps) => {
    const eventRef = useRef<HTMLDivElement>(null)
    const {leftMargin, width} = calculateWidth(columnWidth, event,date)
        if (width === 0){
            return null
        }

        return(
            <div ref = {eventRef} className={`${getBGColor200( event.color)} rounded-md mb-1 h-7 flex justify-center `} style={{width:width, marginLeft: leftMargin}} onClick={(click) => setPopUpDescription(click, eventRef, setChosenEvent ,event, true)}>
                <p className="text-sm font-semibold text-center self-center truncate">{event.name}</p>
            </div>
        )

}