import {Event} from "../../entities/event"
import {Task} from "../../entities/task"
import {parseTaskGetDTO, TaskCreateDTO, TaskGetDTO} from "../task/TaskDTOs"


export interface GetFullEventDTO{
    id:number
    name:string
    startTime:string
    endTime:string
    color:string
    description:string
    location:string
    relatedTasks:TaskGetDTO[]
    listId?:number
}

export interface GetShortEventDTO{
  id:number
  name:string
  startTime:string
  endTime:string
  color:string
  description:string
  location:string
  listId?:number
}

export interface EventCreateDTO{
    name:string
    startTime:string
    endTime:string
    color:string
    description:string
    location:string
    relatedTasks:TaskCreateDTO[]
    listId?:number
}

export interface EventModifyDTO{
    id:number
    relatedTasks:TaskCreateDTO[]
    name:string
    startTime:string
    endTime:string
    color:string
    description:string
    location:string
    listId?:number
}


export const createEventCreateDTOFromStrings = (
    title: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    location: string,
    description: string,
    color: string,
    tasks: Task[],
    listId? : number
  ): EventCreateDTO => {
    const name = title;
    const start = startDate + " " + startTime + ":00";
    const end = endDate + " " + endTime + ":00";
    const relatedTasks: TaskCreateDTO[] = [];
    tasks.forEach((task) => {
      relatedTasks.push({
        name: task.name,
        description: task.description,
        isImportant: task.isImportant,
        isFinished: task.isFinished,
        date: task.date.toISOString().slice(0, 10)
      });
    });
    const event: EventCreateDTO = {
      name,
      startTime: start,
      endTime: end,
      color,
      location,
      description,
      relatedTasks,
      listId
    };
    return event;
  };
  
export const createEventModifyDTOFromStrings = (
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
    listId? : number
  ) => {
    let eventCreateDTO = {
      ...createEventCreateDTOFromStrings(
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
      ),
    };
    let modifyDTO: EventModifyDTO = {
      name: eventCreateDTO.name,
      id,
      startTime: eventCreateDTO.startTime,
      endTime: eventCreateDTO.endTime,
      color: eventCreateDTO.color,
      description: eventCreateDTO.description,
      location: eventCreateDTO.location,
      relatedTasks: eventCreateDTO.relatedTasks,
      listId: eventCreateDTO.listId
    };
    return modifyDTO;
  };
  

  export const parseEventFullGetDTOs= (eventDTOs: GetFullEventDTO[]):Event[] => {
    if(!eventDTOs) return []
    const events:Event[] = []
    eventDTOs.forEach((event) => {
      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime);
      const newEvent:Event = {
        ...event,
        startTime: startDate,
        endTime: endDate,
        relatedTasks: parseTaskGetDTO(event.relatedTasks)
      };
      events.push(newEvent)
    });
  return events
  }


 export const parseEventShortGetDTO = (eventDTO: GetShortEventDTO): Event => {
    const newStartDate = new Date(eventDTO.startTime);
    const newEndDate = new Date(eventDTO.endTime);
    const relatedTasks:Task[] = []
    const event: Event = {
      ...eventDTO,
      startTime: newStartDate,
      endTime: newEndDate,
      relatedTasks: undefined
    }
    return event;
  
  }