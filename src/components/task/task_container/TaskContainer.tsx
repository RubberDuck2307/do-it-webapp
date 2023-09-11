import {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import {useGlobalContext} from "../../../context";
import {Task} from "../../../entities/task";
import TaskComponent from "../TaskComponent";

interface TaskContainerProps {
  tasks: Array<Task>;
  heading: string;
  className: string;
  isAllTasksPage: boolean;
}

const TaskContainer = ({
  tasks,
  heading,
  className,
  isAllTasksPage,
}: TaskContainerProps): ReactElement => {



  const navigate = useNavigate()

  const { selectedTask, setSelectedTask } = useGlobalContext()

  const handleAddTaskClick = () => {
    setSelectedTask(null);
    if (!isAllTasksPage)
      return navigate("/allTasks");

  };


  return (
    <div
      className={` border-solid py-3 rounded-xl border-2 border-gray-100 flex flex-col mx-2 my-4 px-6 ${className}`}
    >
      <h1 className="ml-5 mb-5 text-2xl font-bold">{heading}</h1>
      <button
        onClick={handleAddTaskClick}
        className="rounded-lg border-2 w-full self-center text-lg text-left font-semibold pl-3 p-1 border-gray-100 text-gray-400 hover:text-white hover:bg-gray-200 hover:border-white"
      >
        Add task
      </button>
      <div className="overflow-y-auto">
      {tasks.map((task) => {
        return <TaskComponent task={task} notRedirectToTaskPage={isAllTasksPage} key={task.id}></TaskComponent>;
      })}
      </div>
    </div>
  );
};

export type { TaskContainerProps };
export default TaskContainer;
