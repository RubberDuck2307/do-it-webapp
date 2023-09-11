import {useState} from "react"
import {Event} from "../../entities/event"
import {EventList} from "../../entities/eventList"
import {EventListComponent, EventListDiv} from "./EventListComponent"
import {bin_icon, plus_icon, reload_icon} from "../../css/css"
import {ColorPicker} from "../utils/ColorPicker"
import {YellowButton} from "../utils/YellowButton"
import {useGlobalContext} from "../../context"
import {Icon} from "../utils/Icon"
import {DeleteEventListPopUp} from "./DeleteEventListPopUp"
import {saveEventList} from "../../server_connection/event_list/EventListService"
import {Loader} from "../utils/Loader"

export const EventListContainer = ({ }: { lists: EventList[], events: Event[] }) => {
    const [newList, setNewList] = useState<boolean>(false)
    const [color, setColor] = useState<string>("red")
    const [name, setName] = useState<string>("")
    const [popup, setPopup] = useState<boolean>(false)
    const context = useGlobalContext()
    const [loading, setLoading] = useState<boolean>(false)



    const handleSave = async () => {
        setLoading(true)
        if (validate()) {
            const eventList = await saveEventList(name, color)
            setNewList(false)
            context.setEventLists([...context.eventLists, eventList])
            setName("")
        }
        setLoading(false)
    }

    const validate = () => {
        let valid = true
        if (name.replace(/\s/g, '').length < 1) {
            valid = false
        }
        return valid
    }


    return (
        <>
            {popup && <DeleteEventListPopUp setPopUp={setPopup} ></DeleteEventListPopUp>}
            <div className="flex flex-row ml-auto mr-5">
                <Icon src={bin_icon} onClick={() => {
                    if (context.selectedLists.length > 0) setPopup(true)
                }}></Icon>
                <Icon src={reload_icon} onClick={() => { context.setSelectedLists([]) }}></Icon>

            </div>
            <div className="flex flex-col w-full overflow-y-auto">
                {
                    context.eventLists.map((list) => <EventListComponent list={list} amount={list.amount || 0} key={list.id} />)}

            </div>

            {
                newList ?
                    <div className="w-full bg-gray-100 px-4 flex flex-col justify-center rounded-lg ">
                        <div className="flex flex-row items-center grow h-10">
                            <ColorPicker color={color} setColor={setColor} activeY={110}></ColorPicker>
                            <input className="ml-2 w-[90%] p-1 rounded-lg h-8 " type="text" placeholder="List name" value={name} onChange={(e) => { setName(e.target.value) }} autoFocus />
                        </div>
                        <div className="flex flex-col xl:flex-row items-center ml-auto">
                            {loading ? <div className="-ml-10"><Loader size={30}></Loader></div> : <>
                                <YellowButton text="Cancel" onClick={() => setNewList(false)} width={100} height={30}></YellowButton>
                                <YellowButton text="Save" onClick={handleSave} width={100} height={30}></YellowButton>
                            </>
                            }
                        </div>
                    </div>
                    :
                    <span onClick={() => setNewList((prevState => !prevState))}>
                        <EventListDiv active={false}>
                            <p> Add a new category </p>
                            <img className="w-7 h-7 p-1 ml-auto" src={plus_icon}></img>
                        </EventListDiv>
                    </span>
            }
        </>

    )
}