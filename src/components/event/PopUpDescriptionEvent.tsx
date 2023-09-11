import {bin_icon, close_icon, pencil_icon, up_arrow_icon} from "../../css/css";
import {datesAreOnSameDay, MakePrettyDate, MakePrettyTime} from "../../utils";
import {getBGColor200} from "../../css/tailwindColorsDynamic";
import {useNavigate} from "react-router-dom";
import {Event} from "../../entities/event";

import {animated, useSpring} from "@react-spring/web";
import React, {useEffect, useState} from "react";
import {Icon} from "../utils/Icon";
import {PopUpDescriptionEventTasks} from "./PupUpDescriptionEventTasks";
import {deleteEventRequest} from "../../server_connection/requests";
import {useGlobalContext} from "../../context";

export interface PopUpDescriptionEventProps {
  eventChosen: EventChosenInterface;
  shown: boolean;
  setShown: (shown: boolean) => void;
  setEvents?: React.Dispatch<React.SetStateAction<Event[]>>
  setSortedEvents?: React.Dispatch<React.SetStateAction<Map<number, Event[]>>>
}

export interface EventChosenInterface { top: number, left: number, event: Event | null, screenTop: number, screenLeft: number }

export const PopUpDescriptionEvent = ({
  eventChosen,
  shown,
  setShown,
  setEvents,
  setSortedEvents
}: PopUpDescriptionEventProps) => {

  if (!eventChosen.event || eventChosen.event == null) return null;


  const navigate = useNavigate();
  const mainRef = React.useRef<HTMLDivElement>(null);
  const [tasksExpanded, setTasksExpanded] = useState(false);
  const [tasksSprings, tasksApi] = useSpring(() => ({}))
  const [springs, api] = useSpring(() => ({
  }))
  const [expandingDown, setExpandingDown] = useState(!(eventChosen.screenTop > window.innerHeight - 380));
  const event = eventChosen.event;
  const top = eventChosen.screenTop > window.innerHeight - 224 ? eventChosen.top - 100 : eventChosen.top
  const left = eventChosen.screenLeft > window.innerWidth / 2 ? eventChosen.left - 384 : eventChosen.left
  const color = getBGColor200(event.color);
  const context = useGlobalContext();

  useEffect(() => {
    setTasksExpanded(false);
  }, [shown])

  useEffect(() => {

    if (!mainRef.current) return;
    if (!eventChosen.event || eventChosen.event == null) return;
    if (eventChosen.event.relatedTasks && eventChosen.event.relatedTasks.length < 1) setTasksExpanded(false);
    setExpandingDown(!(eventChosen.screenTop > window.innerHeight - 380));
    const currentExpanding = !(eventChosen.screenTop > window.innerHeight - 380);
    api.start({
      to: { top: top, left: left },
      config: { tension: 170, friction: 26 }
    })
    if (!mainRef.current) return;
    if (tasksExpanded) {
      if (currentExpanding) {
        tasksApi.start({
          to: { top: top + mainRef.current?.clientHeight - 2, left: left },
          config: { tension: 170, friction: 26 }
        })
      }
      else {
        tasksApi.start({
          to: { top: top - 106, left: left },
          config: { tension: 170, friction: 26 }
        })
      }
    }
    else {
      tasksApi.start({
        to: { top: top, left: left },
        config: { tension: 170, friction: 26 }
      })
    }
  }, [eventChosen])


  const handleTasksExpanded = () => {
    if (!mainRef.current) return;
    if (!tasksExpanded) {
      setTasksExpanded(true)
      if (expandingDown) {

        tasksApi.start({
          to: { top: top + mainRef.current?.clientHeight - 2, left: left },
          config: { tension: 170, friction: 26 }
        })
      }
      else {
        tasksApi.start({
          to: { top: top - 106, left: left },
          config: { tension: 170, friction: 26 }
        })
      }
    }

    else {
      if (expandingDown) {
        tasksApi.start({
          to: { top: top, left: left },
          config: { duration: 200 },
          onRest: () => {
            setTasksExpanded(false)
          }
        })
      }
      else {
        tasksApi.start({
          to: { top: top, left: left },
          config: { duration: 200 },
          onRest: () => {
            setTasksExpanded(false)
          }
        })
      }
    }
  }


  return (
    <>

      <animated.div ref={mainRef}
        className={`flex flex-col absolute w-96 max-h-56 min-h-[110px] bg-white rounded-xl  border-2 border-black z-[100] ${shown ? 'block' : 'hidden'}`}
        style={springs}
      >
        <div className="flex">
          <div className=" flex-row flex mt-2 w-full">
            <p className="mt-2 ml-3 capitalize font-bold max-w-[200px] truncate " id="title">
              {event.name}
            </p>{" "}

            <div className="ml-auto flex mr-3">
              <div className={`${color} mr-1 mt-2 w-4 h-4 rounded-md`}></div>
              <Icon src={pencil_icon} onClick={() => { navigate(`/calendar/event/${event.id}`) }}></Icon>
              <Icon src={bin_icon} onClick={async () => {
                if (event.id) {
                  deleteEventRequest(event.id).then(() => {
                    context.resetEventsLists()
                    context.resetEvents()                    
                  });
                  setShown(false)
                  if (setEvents)
                    setEvents((events) => events.filter((e) => e.id !== event.id));
                  if (setSortedEvents)
                    setSortedEvents((events) => {
                      events.forEach((value, key) => {
                        events.set(key, value.filter((e) => e.id !== event.id))
                      })
                      return events
                    })
                }
              }}></Icon>
              <Icon src={close_icon} onClick={() => {
                setShown(false);
              }}></Icon>

            </div>
          </div>
        </div>
        <p className="ml-3">
          {datesAreOnSameDay(event.startTime, event.endTime) ?
            MakePrettyTime(event.startTime) +
            " - " +
            MakePrettyTime(event.endTime) : MakePrettyDate(event.startTime) + "  " + MakePrettyTime(event.startTime) + " - " + MakePrettyTime(event.endTime) + "  " + MakePrettyDate(event.endTime)}
        </p>
        <div className="p-3 overflow-auto">
          <p className="text-sm min">
            {event.description}
          </p>
        </div>
        {eventChosen.event.relatedTasks && eventChosen.event.relatedTasks.length > 0 &&
          <img className={`h-8 w-8 p-2 hover:cursor-pointer ${tasksExpanded ? "" : "rotate-180"} hover:bg-gray-200 rounded-full m-2`} src={up_arrow_icon} onClick={handleTasksExpanded}>
          </img>
        }
      </animated.div>
      <PopUpDescriptionEventTasks tasksExpanded={tasksExpanded} eventChosen={eventChosen} tasksSprings={tasksSprings} width={""} />
    </>
  );
};



export const setPopUpDescription = (click: React.MouseEvent, eventRef: React.RefObject<HTMLDivElement>, setEventChosen: (event: EventChosenInterface) => void, chosenEvent: Event, fullDay: boolean) => {
  if (eventRef) {
    let target = click.target as HTMLDivElement;
    let bounds = target.getBoundingClientRect();
    let x = click.clientX - bounds.left;
    let y = click.clientY - bounds.top;
    if (eventRef?.current === null) return;
    fullDay ? setEventChosen({ top: eventRef.current.offsetTop + y + 50, left: eventRef.current?.offsetLeft + x + 5, event: chosenEvent, screenTop: click.clientY, screenLeft: click.clientX }) :
      setEventChosen({ top: eventRef.current.offsetTop + y, left: eventRef.current?.offsetLeft + x + 5, event: chosenEvent, screenTop: click.clientY, screenLeft: click.clientX })

  }
}

export const useShowPopUpEvent = (eventChosen: EventChosenInterface, setDescriptionShown: (boolean: boolean) => void) => useEffect(() => {
  if (eventChosen?.event !== null) setDescriptionShown(true)
}, [eventChosen])