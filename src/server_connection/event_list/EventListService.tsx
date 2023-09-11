import {createEventListRequest, deleteEventListsRequest, getAllEventListsRequest} from "../requests"
import {EventListCreateDTO, EventListShortGetDTO} from "./EventListDTOS"

export const getAllEventLists =  async () => {
    let eventLists: EventListShortGetDTO[] = []

        eventLists = (await getAllEventListsRequest()).data

    return eventLists
}


export const saveEventList = async (name: string, color:string) => {
    const eventListDTO : EventListCreateDTO = {
        name: name,
        color: color
    }
    let data
 
        data =  (await createEventListRequest(eventListDTO)).data
    return data

}

export const deleteEventLists = async (ids: number[]) => {
    try{
        await deleteEventListsRequest({ids})
    }
    catch(error){
        return false
    }
    return true

}