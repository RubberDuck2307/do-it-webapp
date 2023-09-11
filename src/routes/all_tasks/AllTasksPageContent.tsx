import TaskDetail from "../../components/task/task_detail/TaskDetail";
import TaskContainer from "../../components/task/task_container/TaskContainer";
import {useEffect, useState} from "react";
import {Task} from "../../entities/task";
import {getSortedTasks} from "../../server_connection/task/TaskService";


export const AllTasksPageContent = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      const data = await getSortedTasks()

      const { todayTasks, importantTasks, restTasks, pastTasks } = data


      const allTasks = [
        ...todayTasks,
        ...restTasks,
        ...pastTasks,
        ...importantTasks
      ];



      allTasks.sort((a, b) => - a.date.getTime() + b.date.getTime());
      let sortedTasks: Task[] = []
      const finishedPastTasks: Task[] = []
      allTasks.forEach((task) => {
        if (task.isFinished && task.date.getTime() < new Date().getTime()) {
          finishedPastTasks.unshift(task)
        }
        else {
          sortedTasks.unshift(task)
        }
      })

      setTasks([...sortedTasks, ...finishedPastTasks])
    }
    load()
    setLoaded(true)
  }

    , [])

  const allTasksContainerProps = {
    heading: "",
    tasks: tasks,
    className: "col-start-1 col-end-9 h-[88vh]",
    maximumTasks: 20,
    isAllTasksPage: true
  };

  const taskDetailProps = {
    tasks: tasks,
    setTasks: setTasks,
  };

  return (

    <div className="grid grid-cols-12 gap-4">

          <TaskContainer {...allTasksContainerProps}></TaskContainer>

        <TaskDetail {...taskDetailProps }></TaskDetail>

    </div>

  );
};
