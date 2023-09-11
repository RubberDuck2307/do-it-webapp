import {useEffect, useRef, useState} from "react";
import {MonthDay} from "../../../components/calendar/MonthDay";
import Switch from "../../../components/calendar/Switch";
import {addDays, getWeekDays, makePrettyDateMonthYear} from "../../../utils";
import {Event, isEventInDay} from "../../../entities/event";
import {
    EventChosenInterface,
    PopUpDescriptionEvent,
    PopUpDescriptionEventProps,
    useShowPopUpEvent
} from "../../../components/event/PopUpDescriptionEvent";
import {useGlobalContext} from "../../../context";
import { Loader } from "../../../components/utils/Loader";


export const MonthPageContent = () => {

    const [date, setDate] = useState(new Date());
    const [sortedEvents, setSortedEvents] = useState(new Map<number, Event[]>)
    const days = useRef<Date[]>([])
    const [loading, setLoading] = useState(true);
    const [eventChosen, setEventChosen] = useState<EventChosenInterface>({ event: null, top: 0, left: 0, screenLeft:0, screenTop:0})
    const [popUpDescriptionShown, setPopUpDescriptionShown] = useState(false)
    const {getEvents} = useGlobalContext()
    useEffect(() => {
        days.current = [];
        setLoading(true);
        const load = async () => {;
            const events = await getEvents(date);
            const sortedEvents = new Map();
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let j = 0;
            for (let i = getWeekDays(firstDay); i > 0; i--) {
                const day = addDays(-i, firstDay);
                days.current.push(day);
                const eventsOfDay = events.filter((event) =>
                    isEventInDay(event, day))
                sortedEvents.set(j, eventsOfDay);
                j++;
            }
            for (let i = 1; i <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++) {
                const day = new Date(date.getFullYear(), date.getMonth(), i);
                days.current.push(day);
                const eventsOfDay = events.filter((event) =>
                    isEventInDay(event, day))
                sortedEvents.set(j, eventsOfDay);
                j++;
            }
            const amountOfDays = days.current.length;
            for (let i = 1; i <= 42 - amountOfDays; i++) {
                const day = new Date(date.getFullYear(), date.getMonth() + 1, i);
                days.current.push(day);

                const eventsOfDay = events.filter((event) =>
                    isEventInDay(event, day))
                sortedEvents.set(j, eventsOfDay);
                
                j++;
            }
            setSortedEvents(sortedEvents);
            setLoading(false);
        }
        load()

    }, [date])


    useShowPopUpEvent(eventChosen, setPopUpDescriptionShown)

    const popUpDescriptionProps:PopUpDescriptionEventProps = {
        eventChosen:eventChosen,
        shown: popUpDescriptionShown,
        setShown: setPopUpDescriptionShown,
        setSortedEvents: setSortedEvents,
    }


    const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
        return (
        <>
        {loading ? <div className="ml-auto mr-auto mt-auto mb-auto"><Loader></Loader></div> : 
        <>
            <PopUpDescriptionEvent {...popUpDescriptionProps}></PopUpDescriptionEvent>
            <Switch buttonChosen={2} setDate={setDate} month={makePrettyDateMonthYear(date)}></Switch>
            <div className="w-full grid grid-cols-7 grid-rows-month px-3 h-full overflow-auto min-w-[800px] min-h-[800px]">
                {dayLabels.map((day, index) => {
                    return (
                        <div className="col-span-1 row-span-1 p-1" key={index}>
                            <p className={`${day === "SUN" && "text-red-400"} mb-1 font-semibold text-xl`}>{day}</p>
                        </div>
                    )
                })}

                {days.current.map((day, index) => {
                    return (
                        <MonthDay date={!loading && day} key={index} events={sortedEvents.get(index)} month={date.getMonth()} setEventChosen = {setEventChosen}></MonthDay>
                    )
                })}
            </div> 
            </>}
        </>);
}