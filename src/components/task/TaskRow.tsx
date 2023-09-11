import {Task} from "../../entities/task";

export interface TaskRowProps {
    task: Task;
}

export const TaskRow = ({ task }: TaskRowProps) => {
    return <div className="w-full my-2 h-8 flex bg-blue-200 rounded-md">
        <p className="font-semibold self-center pl-3 truncate">{task.name} </p>
    </div>

}