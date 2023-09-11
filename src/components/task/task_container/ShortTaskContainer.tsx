import {ReactElement, useEffect, useRef, useState} from "react";
import TaskComponent from "../TaskComponent";
import {Task} from "../../../entities/task";

export interface ShortTaskContainerProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
  className: string|undefined;
  endDate: Date;
  defaultName: string;
  list: { name: string; color: string; id: number } | undefined;
}


const ShortTaskContainer = ({
  tasks,
  defaultName,
  className,
  endDate,
  list,
  setTasks
}: ShortTaskContainerProps): ReactElement => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [addingTask, setAddingTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  useEffect(() => {
  
    function handleClickOutside(event: { target: any } | null) {
      if (event === null) return;
      if (wrapperRef.current  && !wrapperRef.current.contains(event.target)) {
        setAddingTask(false);
        let name = taskText.trim();
        setTasks(tasksToShow => [...tasksToShow, { id: undefined, name: (name === "" ? defaultName : taskText) , isImportant: false, date:endDate, isFinished: false, description: "", list: list }]);
        setTaskText("");
      }
    }

    function handleEnter(event: { keyCode: number; preventDefault: () => void }) {
      if (event.keyCode === 13) {
        event.preventDefault();
        handleClickOutside(null);}
      }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEnter);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEnter);
    };
  }, [wrapperRef, taskText, endDate, list, defaultName]);
  
  return (
    <div
      className={` ${className} border-solid py-3 rounded-xl border-2 h-[60vh] border-gray-100 flex flex-col mx-2 my-4 overflow-y-auto px-4`}
    >
      <button
        onClick={() => setAddingTask(true)}
        className="rounded-lg border-2 w-full self-center text-lg text-left font-semibold pl-3 p-1 border-gray-100 text-gray-400 hover:text-white hover:bg-gray-200 hover:border-white"
      >
        Add task
      </button>
      {tasks.map((task, index) => {
        return <TaskComponent task={task} notRedirectToTaskPage={true} key={index}></TaskComponent>;
      })}
      {addingTask ? (
        <div
          ref={wrapperRef}
          className=" pt-2 rounded-lg border-solid border-b-2 border-gray-100 w-11/12 grid grid-cols-3 self-center"
        >
          <input
            type="text"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            id="addTaskText"
            className="w-full rounded-lg col-span-3 px-2 py-1"
          autoFocus
          maxLength={255}></input>
        </div>
      ) : null}
    </div>
  );
};

export default ShortTaskContainer;
