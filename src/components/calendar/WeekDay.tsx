import {ReactElement} from "react";
import {EventComponent, EventPosition} from "../event/EventComponent";
import {Event} from "../../entities/event";
import {EventGap} from "../event/EventGap";
import {datesAreOnSameDay, MakePrettyDate} from "../../utils";

import {useGlobalContext} from "../../context";
import {useFilterEvents} from "../../customHooks";
import {EventChosenInterface} from "../event/PopUpDescriptionEvent";

export interface WeekDayProps {
  day: string;
  events: Event[]
  date: Date;
  dayRef: React.Ref<HTMLDivElement>
  gap: number
  setEventChosen: React.Dispatch<React.SetStateAction<EventChosenInterface>>
}

export const WeekDay = ({ day, events, date, dayRef, gap, setEventChosen }: WeekDayProps): ReactElement => {
  const height = 1640 + gap
  events = events.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  const eventsPosition: EventPosition[] = []

  const setEventChosenX = (eventChosen: EventChosenInterface) => {
    dayRef = dayRef as React.RefObject<HTMLDivElement>
    if (dayRef.current?.offsetLeft === undefined) return
    eventChosen = {...eventChosen, left: dayRef.current?.offsetLeft + eventChosen.left}
    setEventChosen(eventChosen)
  }


  
  const context = useGlobalContext()
  const filteredEvents = useFilterEvents(events, context.selectedLists)

  return (
    <>
      <div ref = {dayRef}
       className="col-span-2 bg-white relative px-1" style={{ height: height }}>
        <div className="hover:bg-gray-100 w-full h-full rounded-lg relative ">
          <span className={`text-center ${datesAreOnSameDay(new Date, date) && 'text-yellow-400'}`}>
          <p className="font-bold">{day}</p>
          <p className="text-sm">{MakePrettyDate(date)}</p>
          </span>
          <EventGap gap={gap}></EventGap>
          {filteredEvents.map((event, index) =>
            <EventComponent {...{event, day: date, gap, eventsPosition, zIndex: index, setEventChosen:setEventChosenX}} key={index
            }></EventComponent>)
          }
        </div>
        <div className="absolute bottom-0 right-0 border-r border-gray-200" style={{ top: gap + 56 }}></div>
      </div>
    </>
  );
};


