import {datesAreOnSameDay} from "../utils";
import {Task} from "./task";


export interface Event {
    id?: number;
    name: string;
    startTime: Date;
    endTime: Date;
    color: string;
    description?: string;
    location?: string;
    relatedTasks?: Task[];
    listId?: number;
}

export const isEventInDay = (event: Event, date: Date) => {
    const dateCopy = new Date(date);
    dateCopy.setHours(0, 0, 0, 0);
    date.setHours(23, 59, 59, 59);
    return date.getTime() >= event.startTime.getTime() && dateCopy.getTime() <= event.endTime.getTime();
  
  }
  
  export const hasEventMoreDays = (event: Event) => {
    return !datesAreOnSameDay(event.startTime, event.endTime);
  }
  