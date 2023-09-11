import { ReactElement, useEffect, useState } from "react";
import TaskContainer, { TaskContainerProps, } from "../../components/task/task_container/TaskContainer";
import { Task } from "../../entities/task";
import { getSortedTasks, SortedTasks } from "../../server_connection/task/TaskService";

const Home = (): ReactElement => {

  const [loaded, setLoaded] = useState<boolean>(false)
  let upcomingTasksContainerProps = {}
  let todayTasksContainerProps = {}
  let imporantTasksContainerProps = {}

  const [tasks, setTasks] = useState<{ importantTasks: Task[], todayTasks: Task[], restTasks: Task[] }>({ importantTasks: [], todayTasks: [], restTasks: [] })


  useEffect(() => {
    const load = async () => {
      setTasks(await getSortedTasks() as SortedTasks);
    }
    load()
    setLoaded(true)
  }, [])


  imporantTasksContainerProps = {
    heading: "Important",
    className: "h-full w-1/2",
    tasks: tasks.importantTasks,
    isAllTasksPage: false,
  };

  todayTasksContainerProps = {
    heading: "Today",
    className: "h-full",
    tasks: tasks.todayTasks,
    isAllTasksPage: false,
  };

  upcomingTasksContainerProps = {
    heading: "Upcoming",
    className: "h-full w-1/2",
    tasks: tasks.restTasks,
    isAllTasksPage: false,
  };


  return (
    <>
      {loaded && <>
          <div className=" h-[calc(50%-17px)] mb-4">
            <TaskContainer {...todayTasksContainerProps as TaskContainerProps}></TaskContainer>
          </div>
          <div className="flex flex-row w-full h-[calc(50%-17px)]">
            <TaskContainer {...imporantTasksContainerProps as TaskContainerProps}></TaskContainer>
            <TaskContainer {...upcomingTasksContainerProps as TaskContainerProps}></TaskContainer>
          </div>
      </>
      }
    </>
  );
};

export default Home;
