import {createContext, ReactElement, useContext, useEffect, useState,} from "react";

import {TaskProps} from "./components/task/TaskComponent";
import {EventList} from "./entities/eventList";
import {Task} from "./entities/task";
import {addMonths} from "./utils";
import {getEventsInYearRange} from "./server_connection/event/EventService";
import {Event} from "./entities/event";
import {getAllEventLists} from "./server_connection/event_list/EventListService";
import { ACCESS_URLS } from "./routes/router";

const GlobalContext = createContext({});

export interface AppContext {
  selectedTask: Task
  setSelectedTask(task: Task | null): void
  selectedLists: number[]
  setSelectedLists(lists: number[]): void
  setEventLists(lists: EventList[]): void
  getEvents: (currentDate?: Date) => Promise<Event[]>
  resetEvents: () => Promise<void>
  resetEventsLists: () => Promise<void>
  logOut: () => void
  eventLists: EventList[]
}

interface ContextProps {
  children: ReactElement;
}

export const useGlobalContext = (): AppContext =>
  useContext(GlobalContext) as AppContext;

const AppContext = ({ children }: ContextProps) => {
  const [selectedLists, setSelectedLists] = useState<number[]>([])
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>();
  const [eventLists, setEventLists] = useState<EventList[]>([]);
  const [events, setEvents] = useState<Event[]>();
  const [date, setDate] = useState(new Date());
  

  const getEvents = async (currentDate = date) => {
    if (!events) {
      const events = await getEventsInYearRange(currentDate)
      setEvents(events)
      return events
    }
    if (addMonths(date, 6) > currentDate && addMonths(date, -6) < currentDate) return events
    else {
      setDate(currentDate)
      const events = await getEventsInYearRange(currentDate)
      setEvents(events)
      return events
    }
  }

  const resetEvents = async () => {
    setDate(new Date())
    const events = await getEventsInYearRange(new Date())
    setEvents(events)

  }

  const resetEventsLists = async () => {
    const lists = await getAllEventLists()
    setEventLists(lists)
  }



  const load = async () => {
    resetEventsLists()
    getEvents()
  }


  // TODO find a better solution - this is a workaround for the fact that the context is loaded before the user is logged in

  useEffect(() => {
    if (!ACCESS_URLS.includes(window.location.pathname)) {
    load()}
  }, [])



  return (
    <GlobalContext.Provider value={{ selectedTask, setSelectedTask, selectedLists, setSelectedLists, setEventLists, getEvents, resetEvents, eventLists, resetEventsLists }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
