import {Task} from "../../entities/task"

export interface TaskGetDTO {
    id: number
    name: string
    description: string
    isImportant: boolean
    isFinished: boolean
    date: string
    eventId?: number
}




export interface TaskCreateDTO {
    name: string
    description: string
    isImportant: boolean
    isFinished: boolean
    date: string
    eventId?: number
}

export interface TaskModifyDTO extends TaskCreateDTO {
    id: number
}

export const parseTaskGetDTO = (tasks: TaskGetDTO[]): Task[] => {
    const tasksToReturn: Task[] = []
    tasks.forEach((task) => {
        const taskToReturn: Task = {
            id: task.id,
            name: task.name,
            description: task.description,
            isImportant: task.isImportant,
            isFinished: task.isFinished,
            date: new Date(task.date),
            list: undefined
        }
        tasksToReturn.push(taskToReturn)
    })
    return tasksToReturn
}

export const createTaskDTOFromStrings = (name: string, description: string, isImportant: boolean, isFinished: boolean, date: string, eventId: number | undefined) => {
    const taskDTO: TaskCreateDTO = {
        name: name,
        description: description,
        isImportant: isImportant,
        isFinished: isFinished,
        date: date,
        eventId: eventId
    }
    return taskDTO
}

export const modifyTaskDTOFromAttributes = (name: string, description: string, isImportant: boolean, isFinished: boolean, date: string, eventId: number | undefined, id: number) => {
    const taskDTO: TaskModifyDTO = { ...createTaskDTOFromStrings(name, description, isImportant, isFinished, date, eventId), id: id }
    return taskDTO
}