import {up_arrow_icon} from "../../css/css";
import {Event} from "../../entities/event";
import {FullDayEvent} from "./FullDayEvent";
import {EventChosenInterface} from "./PopUpDescriptionEvent";

export interface FullDayEventContainerProps {
    left: number;
    columnWidth: number;
    events: Event[];
    fullDayEventsExpanded: boolean;
    setFullDayEventsExpanded: (expanded: boolean) => void;
    containerRef: React.RefObject<HTMLDivElement>;
    date:Date
    setChosenEvent: (event:EventChosenInterface) => void
}

const showEvent = (event: Event, index: number, columnWidth: number, date:Date, setChosenEvent:(event:EventChosenInterface) => void) => {
    const props = {
        event: event,
        columnWidth: columnWidth,
        date,
        setChosenEvent

    }
    return <FullDayEvent {...props} key={index}></FullDayEvent>
}

export const FullDayEventContainer = ({ left, columnWidth, events, fullDayEventsExpanded, setFullDayEventsExpanded, containerRef, date, setChosenEvent }: FullDayEventContainerProps) => {
    left = left - 5
     const setChosenEventX = (event:EventChosenInterface) => {
        if(!containerRef.current) return
        setChosenEvent({...event, left: containerRef.current?.offsetLeft + event.left as number})}
    let height
    if (events.length > 2 ) {
        height = 80
    }
    else if (events.length > 0) {
        height = events.length * 30}
    else {
        height = 0
    }
    return (
        <>
            {fullDayEventsExpanded ?
                <div ref ={containerRef} className="absolute w-full  z-50 top-14 " style={{ left: left }}>

                    <div className="w-full">
                        {events.map((event, index) => showEvent(event, index, columnWidth, date, setChosenEventX))}
                    </div>
                    <div className="bg-gray-200 rounded-md h-3 text-center p-0 flex justify-center hover:bg-gray-300" style={{ width: columnWidth * 7 }}
                        onClick={() => { setFullDayEventsExpanded(false) }}>
                        <img src={up_arrow_icon}></img>
                    </div>
                </div>
                :


                <div ref={containerRef} className="absolute w-full  z-10 top-14" style={{ left: left, height: height }}>
                    {
                        events.length < 2 ? events.map((event, index) => showEvent(event, index, columnWidth, date, setChosenEventX)) :
                            events.slice(0, 2).map((event, index) => showEvent(event, index, columnWidth, date, setChosenEventX))
                    }
                    {events.length > 2 ? <div className="bg-gray-200 rounded-md h-3 text-center p-0 flex justify-center hover:bg-gray-300" style={{ width: columnWidth * 7 }}
                        onClick={() => { setFullDayEventsExpanded(true) }}>
                        {threeDots()}
                    </div> : null}

                </div>
            }
        </>
    );
}

const threeDots = () => {
    const array = [1, 2, 3]
    return (
        array.map((id) => {
            return <div key = {id} className="h-1  w-1 bg-gray-400 rounded-full mt-auto mb-auto mx-1"></div>
        }
        ))
}