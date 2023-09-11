import {Task} from "../../entities/task"
import {isInPast, isToday} from "../../utils"
import {
    createTaskRequest,
    deleteTaskRequest,
    getTasksRequest,
    modifyTaskRequest,
    toggleFinishedTaskRequest
} from "../requests"
import {createTaskDTOFromStrings, modifyTaskDTOFromAttributes, TaskGetDTO} from "./TaskDTOs"

export const saveTask = async (name: string, description: string, isImportant: boolean, isFinished: boolean, date: string, eventId: number | undefined) => {
  const taskDTO = createTaskDTOFromStrings(name, description, isImportant, isFinished, date, eventId)
  const response = await createTaskRequest(taskDTO)
  return response.data.id
}


export const modifyTask = async (id: number, name: string, description: string, isImportant: boolean, isFinished: boolean, date: string, eventId: number | undefined) => {
  const taskDTO = modifyTaskDTOFromAttributes(name, description, isImportant, isFinished, date, eventId, id)
  await modifyTaskRequest(taskDTO)
}

export const deleteTask = async (id: number) => {
  await deleteTaskRequest(id)
}

export const toggleFinishedTask = async (id: number) => {
  await toggleFinishedTaskRequest(id)
}


export interface SortedTasks {
  todayTasks: Array<Task>;
  importantTasks: Array<Task>;
  restTasks: Array<Task>;
  pastTasks: Array<Task>
}


export const getSortedTasks = async (): Promise<SortedTasks> => {

  let pastTasks: Array<Task> = [],
    todayTasks: Array<Task> = [],
    restTasks: Array<Task> = [],
    importantTasks: Array<Task> = [];
  let tasks: TaskGetDTO[] = [];
  tasks = (await getTasksRequest()).data;
  tasks.forEach((task) => {
    const date = new Date(task.date);

    const newTask: Task = {
      name: task.name,
      date,
      id: task.id,
      isImportant: task?.isImportant,
      isFinished: task?.isFinished,
      description: task?.description,
    };
    if (isInPast(date)) {
      pastTasks.push(newTask);
    } else if (isToday(date)) {
      todayTasks.push(newTask);
    }
    else if (newTask.isImportant) {
      importantTasks.push(newTask);
    }
    else {
      restTasks.push(newTask);
    }
  });

  return { todayTasks, pastTasks, restTasks, importantTasks };
};


