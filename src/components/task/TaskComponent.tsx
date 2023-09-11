import {ReactElement, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useGlobalContext} from "../../context";
import {Task} from "../../entities/task";

import {calendar_exclamation_icon} from "../../css/css";
import {toggleFinishedTask} from "../../server_connection/task/TaskService";

export interface TaskProps {
  notRedirectToTaskPage: boolean;
  task: Task;
}


const TaskComponent = ({ task, notRedirectToTaskPage }: TaskProps): ReactElement => {

  let { isImportant, description, date, list, name, id, isFinished } = task;
  const [display, setDisplay] = useState("hidden");
  const [isFinishedState, setIsFinishedState] = useState(isFinished);
  const navigate = useNavigate();
  const { setSelectedTask, selectedTask} = useGlobalContext();

  useEffect(() => {
    setIsFinishedState(isFinished);
  }, [isFinished]);

  const toogle = () => {
    display === "hidden" ? setDisplay("block") : setDisplay("hidden");
  };

  const handleClick = () => {
  
    setSelectedTask({
      name,
      id,
      date,
      isImportant,
      description,
      list,
      isFinished,
    });
    if (!notRedirectToTaskPage) navigate("/allTasks");
  };

  const handleCheckBoxChange = () => {

    if (!id) return;
    toggleFinishedTask(id)
    setIsFinishedState((prevState) => !prevState);
    if (setSelectedTask) {
      isFinished = !isFinishedState;

      setSelectedTask({
        name,
        id,
        date,
        isImportant,
        description,
        list,
        isFinished,
      });
    }
  };
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div
      className="px-3 z-0 py-1 rounded-lg border-solid border-b-2 h-15 border-gray-100 w-full grid grid-cols-3 self-center hover:cursor-pointer hover:bg-gray-200 max-h-10 "
      onMouseEnter={toogle}
      onMouseLeave={toogle}
      onClick={handleClick}
    >
      <div className="col-start-1 col-end-2 flex">
          <input
            type="checkbox"
            name={"checkbox" + id}
            checked={isFinishedState}
            className="accent-yellow-400 z-10"
            onChange={ handleCheckBoxChange}
            onClick={(e) => e.stopPropagation()}
          ></input>
        { isImportant && <img className="h-5 w-5 ml-4 mt-1" src={calendar_exclamation_icon}></img>}
        <div
          className={` ${display} h-3 w-3 bg-${list?.color}-400 self-center rounded`}
        ></div>
      </div>
      <span className=" text-center col-start-2 col-end-3 truncate">{name}</span>
      <p className={`col-start-3 col-end-4 text-right`}>
        {display === "hidden" ? "" : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
      </p>
    </div>
  );
};

export default TaskComponent;
