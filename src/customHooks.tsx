import {RefObject, useEffect, useState} from "react";
import {Event} from "./entities/event";

export const UseClickOutside = (ref: RefObject<HTMLDivElement>, functionToExecute: () => void) => {

    useEffect(() => {
        function handleClickOutside(event: { target: any } | null) {
            if (event === null) {
                functionToExecute();
                return
            }
            if (ref.current && !ref.current.contains(event.target)) {
                functionToExecute();
            }
        }
        function handleEnter(event: { keyCode: number; preventDefault: () => void }) {
            if (event.keyCode === 13) {
                event.preventDefault();
                handleClickOutside(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEnter);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEnter);
        };
    }, [ref]);

}




export const useFilterEvents = (events: Event[], chosenEventLists: number[]) => {
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    useEffect(() => {
        if (chosenEventLists.length === 0) {
            setFilteredEvents(events)
        }
        else
        setFilteredEvents(events.filter((event) => {
            if (event.listId === undefined) return false
            return chosenEventLists.includes(event.listId)
        }))
    }, [chosenEventLists, events])
    return filteredEvents
}