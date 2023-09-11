import {Task} from "../../entities/task";
import {
    createEventRequest,
    getEventsByDate as getEventsByDateRequest,
    getEventsByMonth as getEventsByMonthRequest,
    getEventsInYearRangeRequest,
    getFullEventsRequest,
    getWeekEvents,
    modifyEventRequest
} from "../requests";
import {
    createEventCreateDTOFromStrings,
    createEventModifyDTOFromStrings,
    GetFullEventDTO,
    GetShortEventDTO,
    parseEventFullGetDTOs,
    parseEventShortGetDTO
} from "./EventDTOs";
import {Event} from "../../entities/event";
import {AxiosResponse} from "axios";

export const saveEvent = async (
  title: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  location: string,
  description: string,
  color: string,
  tasks: Task[],
  listId: number
): Promise<Event> => {
  const event = createEventCreateDTOFromStrings(
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    description,
    color,
    tasks,
    listId
  );
  const response = await createEventRequest(event);
  return parseEventShortGetDTO(response.data as GetShortEventDTO);
};

export const modifyEvent = async (
  id: number,
  title: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  location: string,
  description: string,
  color: string,
  tasks: Task[],
  listId: number
): Promise<Event> => {

  let eventDTO = createEventModifyDTOFromStrings(
    id,
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    description,
    color,
    tasks,
    listId
  )
  const response = (await modifyEventRequest(eventDTO)).data as GetShortEventDTO;
    return parseEventShortGetDTO(response);
};




export const getEventsOfWeek = async (date: Date): Promise<Event[]> => {
  return getEventsInDateRange(date, getWeekEvents);
}

export const getEventsByDay = async (date: Date): Promise<Event[]> => {
  return getEventsInDateRange(date, getEventsByDateRequest);

}

export const getEventsByMonth = async (date: Date): Promise<Event[]> => {
  return getEventsInDateRange(date, getEventsByMonthRequest);

}

const getEventsInDateRange = async (date: Date, request: (date: Date) => Promise<AxiosResponse<GetFullEventDTO[], any>>): Promise<Event[]> => {

  let events: GetFullEventDTO[] = [];

    events = (await request(date)).data;

  return parseEventFullGetDTOs(events);

}

export const getEventById = async (id: number): Promise<Event> => {
  const eventDTO = (await getFullEventsRequest(id)).data as GetFullEventDTO;
  return parseEventFullGetDTOs([eventDTO])[0];
}

export const getEventsInYearRange = async (date: Date): Promise<Event[]> => {
  let events: GetFullEventDTO[] = [];
  const response = await getEventsInYearRangeRequest(date);
  events = response.data;
  return parseEventFullGetDTOs(events);
}