import {animated} from "@react-spring/web"
import {EventChosenInterface} from "./PopUpDescriptionEvent";
import TaskComponent from "../task/TaskComponent";
import {Task} from "../../entities/task";

export interface PopUpDescriptionEventTasksProps {
    eventChosen: EventChosenInterface;
    tasksExpanded: boolean;
    tasksSprings: any;
    width: string;
}

export const PopUpDescriptionEventTasks = ({eventChosen, tasksSprings, tasksExpanded}:PopUpDescriptionEventTasksProps) => {  
    return (
        <>
        <animated.div className={`absolute w-[376px] z-20  h-28 bg-white flex justify-center ml-1 border-2 border-black rounded-md pt-2`}  style={{...tasksSprings, display: tasksExpanded? "block" :"none"}}>
            <div className="w-full max-h-[100px] overflow-y-auto px-4 ">
            {eventChosen.event?.relatedTasks && eventChosen.event?.relatedTasks.map((task :Task, index:number) => 
                <TaskComponent task={task} notRedirectToTaskPage={false} key={index}></TaskComponent>
            )}
            </div>
        </animated.div>
        </>
    )
}