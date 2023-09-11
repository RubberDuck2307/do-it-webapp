import {Time} from "../../../components/calendar/Time";
import Switch from "../../../components/calendar/Switch";
import {Event} from "../../../entities/event";
import {EventComponent, EventPosition} from "../../../components/event/EventComponent";
import {useEffect, useState} from "react";

import {datesAreOnSameDay, MakePrettyDate} from "../../../utils";
import {EventsContainer} from "../../../components/event/EventsContainer";
import {useFilterEvents} from "../../../customHooks";
import {useGlobalContext} from "../../../context";
import {
    EventChosenInterface,
    PopUpDescriptionEvent,
    useShowPopUpEvent
} from "../../../components/event/PopUpDescriptionEvent";


export const DayContent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [fullDayEvents, setFullDayEvents] = useState<Event[]>([]); 
  const [descriptionShown, setDescriptionShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  const[eventChosenObject, setEventChosen] = useState<EventChosenInterface>({top: 0, left: 0, event: null, screenLeft: 0, screenTop: 0})

  const {getEvents} = useGlobalContext()

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      let events = await getEvents(date)
      let fullDayEvents : Event[] = []
      events = events.filter((event) => {
        if (event.startTime < date && event.endTime > date && !datesAreOnSameDay(event.startTime, event.endTime) && !datesAreOnSameDay(event.startTime, date) && !datesAreOnSameDay(event.endTime, date)) {
          fullDayEvents.push(event)
        }
        return datesAreOnSameDay(date, event.endTime) || datesAreOnSameDay(date, event.startTime)
        })
      events.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      setEvents(events);
      setFullDayEvents(fullDayEvents)
      setLoading(false);
      setDescriptionShown(false)
      setEventChosen({top: 0, left: 0, event: null, screenLeft: 0, screenTop: 0})
    }

    load()
  }, [date]);

  
  const context = useGlobalContext()
  const filteredEvents = useFilterEvents(events, context.selectedLists)
  const filteredFullDayEvents =  useFilterEvents(fullDayEvents, context.selectedLists)

  useShowPopUpEvent(eventChosenObject, setDescriptionShown)

  const popUpDescriptionProps = {
    shown: descriptionShown,
    eventChosen: eventChosenObject,
    setShown: setDescriptionShown,
    setEvents
  };

  const eventsPosition: EventPosition[] = []



  return (
    <>
      <Switch buttonChosen={0} setDate={setDate}></Switch>
      { loading ? null:
      <>

      <div className="grid grid-cols-17 bg-white overflow-y-scroll">
      <p className="absolute text-3xl font-bold my-auto pl-2 bg-white">{MakePrettyDate(date)}</p>
  
        <Time gap = {0}></Time>
        <div className="h-[1580px] col-span-1 border-r border-gray-200 mt-14 mb-10"></div>
        {/* Space between time and days*/}
       <>
        <div className="col-span-8 relative">
        <PopUpDescriptionEvent {...popUpDescriptionProps}></PopUpDescriptionEvent>
          {filteredEvents.map((event, index) => (
              <EventComponent {...{ event, day: date, gap : 0, eventsPosition, zIndex: index, setEventChosen }} key={index}></EventComponent>
          ))}
        </div>
        
        <div className="col-span-6"><EventsContainer events={filteredFullDayEvents} ></EventsContainer></div>
        </>
        
      </div>
      </>}
    </>
  );
};
