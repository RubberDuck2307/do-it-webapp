import {useEffect, useState} from "react";
import {dateToString} from "../../../utils";
import {useGlobalContext} from "../../../context";
import {YellowButton} from "../../utils/YellowButton";
import {Loader} from "../../utils/Loader";
import {Task} from "../../../entities/task";
import {deleteTask, modifyTask, saveTask} from "../../../server_connection/task/TaskService";

export interface TaskDetailProps {
  className?: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
}

const TaskDetail = ({ className, tasks, setTasks }: TaskDetailProps) => {
  const { selectedTask, setSelectedTask } = useGlobalContext()
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setDescription] = useState<string>("");
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const [selecetdListId, setSelectedListId] = useState<number | string>("");
  const [date, setDate] = useState<string>("")
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [nameError, setNameError] = useState<string>("")
  const [dateError, setDateError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const validate = () => {
    let valid = true
    if (taskName.replace(/\s/g, '').length < 1) {
      setNameError("Please insert name")
      valid = false
    }

    if (date === "") {

      setDateError("Please insert date")
      valid = false
    }
    return valid
  }

  const handleModify = async () => {
    if (validate() && selectedTask.id) {
      setLoading(true)
      await modifyTask(selectedTask?.id, taskName, taskDescription, isImportant, isFinished, date, undefined)
      setLoading(false)
      setSelectedTask({ id: selectedTask.id, name: taskName, description: taskDescription, isImportant, isFinished, date: new Date(date), list: undefined })
      setTasks(tasks.map(task => task.id === selectedTask.id ? { id: selectedTask.id, name: taskName, description: taskDescription, isImportant, isFinished, date: new Date(date), list: undefined } : task))
    }
  }


  const handleCreate = async () => {
    if (validate()) {
      setLoading(true)
      const id = await saveTask(taskName, taskDescription, isImportant, isFinished, date, undefined)
      setSelectedTask({ id, name: taskName, description: taskDescription, isImportant, isFinished, date: new Date(date), list: undefined })
      setLoading(false)
      setTasks([ { id, name: taskName, description: taskDescription, isImportant, isFinished, date: new Date(date), list: undefined }, ...tasks])
    }
  }
  const handleDelete = async () => {
    if (selectedTask.id) {
      setLoading(true)
      await deleteTask(selectedTask?.id)
      setSelectedTask(null)
      setLoading(false)
      setTasks(tasks.filter(task => task.id !== selectedTask.id))
    };
  }

  useEffect(() => {
    setNameError("")
    setDateError("")
    if (selectedTask) {
      setIsImportant(selectedTask.isImportant);
      setTaskName(selectedTask.name);
      setDescription(selectedTask.description);
      setSelectedListId(selectedTask?.list?.id ? selectedTask.list.id : "")
      setDate(dateToString(selectedTask.date))
      setIsFinished(selectedTask.isFinished)
    } else {
      setIsImportant(false);
      setTaskName("");
      setDescription("");
      setSelectedListId("")
      setDate('')
      setIsFinished(false)
    }
  }, [selectedTask]);


  return (
    <div
      className={`${className} col-start-9 col-end-13 flex flex-col bg-gray-100 rounded-2xl p-3 my-4`}
    >
      <h1 className="text-xl font-semibold mb-3">Task:</h1>
      <div className="h-full relative">
        <input
          type="text"
          id="name"
          name="name"
          value={taskName}
          placeholder="Task name"
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full bg-gray-100 border-solid border-2 rounded-lg px-2"
          maxLength={255}
        ></input>
        <p className="text-red-500 mt-1 text-sm ml-2">{nameError}</p>

        <textarea
          rows={5}
          id="description"
          name="description"
          placeholder="Description..."
          value={taskDescription}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-100 border-solid border-2 rounded-lg mb-3 mt-1 px-2 resize-none"
        ></textarea>
        <span className="flex mb-3">

        </span>
        <span className="flex">
          <p className="text-gray-500 w-32">Due Date:</p>
          <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </span>
        <p className="ml-32 text-red-500 mt-2   text-sm ">{dateError}</p>
        <span className="flex mb-3 items-center">
          <p className="text-gray-500 w-32">Important: </p>
          <input
            type="checkbox"
            name="isImportant"
            className="accent-yellow-400 w-4 h-4"
            checked={isImportant}
            onChange={() => {
              setIsImportant((prevState) => !prevState);
            }}
          ></input>
        </span>
        <span className="flex mb-3 items-center">
          <p className="text-gray-500 w-32">Finished: </p>
          <input
            type="checkbox"
            name="isFinished"
            className="accent-yellow-400 w-4 h-4"
            checked={isFinished}
            onChange={() => {
              setIsFinished((prevState) => !prevState);
            }}
          ></input>
        </span>
        <span className="flex w-full bottom-0 absolute justify-center">
          {loading ? <Loader></Loader> : selectedTask ? (
            <>
              <YellowButton text={"Delete task"} onClick={handleDelete} width={192} height={40}></YellowButton>
              <YellowButton text={"Save Changes"} onClick={handleModify} width={192} height={40}></YellowButton>
            </>
          ) : (
            <YellowButton text={"Create task"} onClick={handleCreate} width={192} height={40}></YellowButton>
          )}
        </span>
      </div>
    </div>
  );
};

export default TaskDetail
