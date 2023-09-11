import TaskComponent, {TaskProps} from "./TaskComponent"

export const TaskCalendar = ({task, notRedirectToTaskPage} :TaskProps) =>{
    const TaskProps = {task, notRedirectToTaskPage}
    return <div className="absolute">
        <TaskComponent {...TaskProps}></TaskComponent>
    </div>

}