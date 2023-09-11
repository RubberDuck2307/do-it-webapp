import {ReactElement} from "react";
import {EventGap} from "../event/EventGap";

export interface TimeProps {
    timeRef? : React.RefObject<HTMLDivElement>
    gap: number
}


export const Time = ({ timeRef, gap}:TimeProps): ReactElement => {



    const timeBlocks = []
    let time = 0
    for(let i = 0; i < 24; i++){

        const timeBlock = 
        <div key={i} className = {`flex flex-col h-16 w-full border-t border-gray-200  text-right pt-1 pr-2`}>
            <p>{time + ":00"}</p>
        </div>

        time = time + 1
        timeBlocks.push(timeBlock)
    }



    return <div className="flex flex-col col-span-2 mt-14 -ml-1" ref={timeRef}>
    <EventGap gap={gap}></EventGap>
    <div className=" grid grid-cols-1 grid-rows-[24] h-[1584px] rounded-lg">
            {timeBlocks}
    </div></div>

}