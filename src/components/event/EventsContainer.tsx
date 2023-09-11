import {Event} from "../../entities/event"
import {EventRowExpandable} from "./EventRowExpandable"


export interface EventsContainerProps {
    events: Event[]
}

export const EventsContainer = ( {events} :EventsContainerProps) => {
return(


    <div className="w-1/4 ml-4 my-auto h-5/6 justify-start  mt-2 items-start overflow-y-auto border-2 border-gray-100 rounded-lg fixed ">
        <h2 className="font-bold text-3xl m-2">Full Day Events</h2>

        {events.map((event, index) => <EventRowExpandable {...event} key={index}></EventRowExpandable>)}

        </div>

)

}