import {Time} from "../../../components/calendar/Time";
import {Event, hasEventMoreDays} from "../../../entities/event";
import {addDays, datesAreOnSameDay, getWeekDays, isEventOnDate} from "../../../utils";
import Switch from "../../../components/calendar/Switch";
import {WeekDay, WeekDayProps} from "../../../components/calendar/WeekDay";
import React, {useEffect, useRef, useState} from "react";
import {FullDayEventContainer} from "../../../components/event/FullDayEventContainer";
import {useGlobalContext} from "../../../context";
import {useFilterEvents} from "../../../customHooks";
import {
    EventChosenInterface,
    PopUpDescriptionEvent,
    useShowPopUpEvent
} from "../../../components/event/PopUpDescriptionEvent";


const sortEventsWeek = (events: Array<Event>, date:Date): { sortedEvents: Map<number, Array<Event>>, multipleDaysEvent: number, fullDayEvents:Event[] } => {
  const today = date;

  let dayOfWeek = addDays(- getWeekDays(today), today);
  const sortedEvents: Map<number, Array<Event>> = new Map();
  let multipleDaysEvent: number = 0;
  const fullDayEvents: Event[] = []
  const foundEvents: Array<number> = [];
  for (let i = 0; i < 7; i++) {
    const dayEvents = events.filter((event, index) => {
      if ( datesAreOnSameDay(event.startTime, dayOfWeek) && !hasEventMoreDays(event))
        return true;
      else if (isEventOnDate(event, dayOfWeek) && hasEventMoreDays(event) && !foundEvents.includes(index)) {
        multipleDaysEvent++;
        fullDayEvents.push(event)
         foundEvents.push(index) 
      }
    });
    sortedEvents.set(i, dayEvents);
    dayOfWeek = addDays(1, dayOfWeek);
  }
  
  return { sortedEvents, multipleDaysEvent, fullDayEvents };
};

export const WeekPageContent = () => {
  const timeRef = React.useRef<HTMLDivElement>(null);
  const gapRef = React.useRef<HTMLDivElement>(null);
  const dayRef = React.useRef<HTMLDivElement>(null);
  const fullDayEventsRef = React.useRef<HTMLDivElement>(null);

  const [dayWidth, setDayWidth] = useState(0);
  const [allDaysEventGap, setAllDaysEventGap] = useState(0)
  const [fullDayEventsExpanded, setFullDayEventsExpanded] = useState(false)
  const [fullDayEventsHeight, setFullDayEventsHeight] = useState(0)
  const [date, setDate] = useState(new Date())
  const [dataLoading, setDataLoading] = useState(true)

  const [eventChosen, setEventChosen] = useState<EventChosenInterface>({ event: null, top: 0, left: 0, screenLeft:0, screenTop:0})
  const [descriptionShown, setDescriptionShown] = useState(false)

  const [sortedEvents, setSortedEvents] = useState<Map<number, Array<Event>>>(new Map())
  const [multipleDaysEvent, setMultipleDaysEvent] = useState(0)
  const [fullDayEvents, setFullDayEvents] = useState<Event[]>([])

  const {getEvents} = useGlobalContext()
 
  let mondayDate = addDays(- getWeekDays(date), date);
  useEffect(() => {
    setDataLoading(true)
    let events:Event[] = []
    const load = async () => {
      events = await getEvents(date)
      const returnedObject = sortEventsWeek(events, mondayDate)
      setSortedEvents(returnedObject.sortedEvents)
      setMultipleDaysEvent(returnedObject.multipleDaysEvent)
      setFullDayEvents(returnedObject.fullDayEvents)
      setDataLoading(false)
      setFullDayEventsExpanded(false)
      setEventChosen({event:null, top:0, left:0, screenLeft:0, screenTop:0})
      setDescriptionShown(false)
    }
    load()
    }, [date])


  useEffect(() => {
    function handleResize() {
    
      if (timeRef.current === null || gapRef.current === null) return
      setAllDaysEventGap(timeRef.current?.offsetWidth as number + gapRef.current?.offsetWidth as number)
      setDayWidth(dayRef.current?.offsetWidth as number)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    

    return () => window.removeEventListener("resize", handleResize)
  }, [dayRef.current, timeRef.current, gapRef.current, date])

  useEffect(() => {
    if( fullDayEventsRef.current === null) return
    const resizeObserver = new ResizeObserver( () => {
          setFullDayEventsHeight(fullDayEventsRef.current?.offsetHeight as number)
    })
    resizeObserver.observe(fullDayEventsRef.current as Element)
    return () => resizeObserver.disconnect()
  }, [dataLoading] )

  useShowPopUpEvent(eventChosen, setDescriptionShown)

  const daysLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const days = new Map()
  for (let i = 0; i < 7; i++) {
    const day = {} as WeekDayProps
    day.day = daysLabels[i]
    day.events = sortedEvents.get(i) as Array<Event>
    day.date = addDays(i, mondayDate)
    day.gap = fullDayEventsHeight
    day.setEventChosen = setEventChosen
    if (i ===1) day.dayRef = dayRef
    else day.dayRef = useRef(null)
    days.set(i, day)
  }

  const context = useGlobalContext()
  const filteredFullDayEvents = useFilterEvents(fullDayEvents, context.selectedLists)
  const popUpDescriptionProps = { eventChosen ,shown: descriptionShown, setShown: setDescriptionShown, setSortedEvents, setEvents: setFullDayEvents}
  return (
    <>
          <Switch buttonChosen={1} setDate={setDate}></Switch>
          {dataLoading ? null:
          <>
          <div  className="grid grid-cols-17 bg-white overflow-y-scroll overflow-x-clip relative mt-1 min-w-[800px]">
          <PopUpDescriptionEvent {...popUpDescriptionProps}></PopUpDescriptionEvent>
             <FullDayEventContainer {...{left:allDaysEventGap, columnWidth:dayWidth, events:filteredFullDayEvents, fullDayEventsExpanded, setFullDayEventsExpanded, containerRef:fullDayEventsRef, date, setChosenEvent:setEventChosen}}></FullDayEventContainer>
            <Time   {...{ multipleDaysEvent, timeRef, gap: fullDayEventsHeight }}  ></Time>
            <div ref={gapRef} className="h-auto bottom-0 col-span-1 border-r border-gray-200" style={{ marginTop: 56 + fullDayEventsHeight }}></div>{/* Space between time and days*/}

             <>
            { 
            daysLabels.map((dayLabel, index) => {
              return (
                <WeekDay key={index} {...days.get(index)}></WeekDay>
              )
          })
            }
            </>
          
          </div></>}
    </>
  );
};
