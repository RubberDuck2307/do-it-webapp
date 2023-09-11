import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {
    AVAILABLE_COLORS,
    getBGColor200,
    getBGColor300,
    getBGColorActive400,
    getBorderColor200,
    getFocusBorderColor300,
    getTextColor300
} from "../../../css/tailwindColorsDynamic";
import {Task} from "../../../entities/task";
import ShortTaskContainer, {ShortTaskContainerProps} from "../../../components/task/task_container/ShortTaskContainer";
import {convertDateToInputValue, datesAreOnSameDay, MakePrettyTime} from "../../../utils";
import {Event} from "../../../entities/event";
import {useGlobalContext} from "../../../context";
import {Loader} from "../../../components/utils/Loader";
import {deleteEventRequest} from "../../../server_connection/requests";
import {getEventById, modifyEvent, saveEvent} from "../../../server_connection/event/EventService";


/* THIS WHOLE PAGE IS COMPLETE MESS AND NEEDS TO BE RECREATED*/

const deleteEvent = (id: number): void => {
  deleteEventRequest(id);
};

export const EventPageContent = () => {
  const [pageState, setPageState] = useState<"create" | "edit">("create");
  const [title, setTitle] = useState("Hello");
  const [startDate, setStartDate] = useState("2021-10-10");
  const [endDate, setEndDate] = useState("2021-10-11");
  const [eventColor, setEventColor] = useState("green");
  const [startTime, setStartTime] = useState("11:00");
  const [endTime, setEndTime] = useState("13:00");
  const [location, setLocation] = useState("Online");
  const [description, setDescription] = useState("Hello");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nameError, setNameError] = useState('');
  const [listId, setListId] = useState<number>(0);
  const eventId = useRef<string>();
  const modyfing = useRef<boolean>(false);
  const originalList = useRef<number>();
  const [loading, setLoading] = useState<boolean>(true)
  const [handling, setHandling] = useState<boolean>(false)
  const context = useGlobalContext()


  const set = (event: Event) => {
    setTitle(event.name);
    setStartDate(convertDateToInputValue(event.startTime));
    setEndDate(convertDateToInputValue(event.endTime));
    setStartTime(MakePrettyTime(event.startTime));
    setEndTime(MakePrettyTime(event.endTime));
    setLocation(event.location ? event.location : "");
    setDescription(event.description ? event.description : "");
    setListId(event.listId ? event.listId : 0);
    setEventColor(event.color);
    if (event.relatedTasks) {
      setTasks(event.relatedTasks);
    }
    if (originalList.current !== undefined && originalList.current != event.listId) {
      const lists = context.eventLists.map((list) => {
        if (list.id === originalList.current) {
          if (list.amount)
            return { ...list, amount: list.amount - 1 }
          else return { ...list, amount: 1 }
        }
        if (list.id === event.listId) {
          if (list.amount)
            return { ...list, amount: list.amount + 1 }
          else return { ...list, amount: 1 }
        }
        return list
      })
      context.setEventLists(lists)
    }
    originalList.current = event.listId;
  };


  const validate = () => {
    if (title === "") {
      setNameError("Please enter a title");
      return false;
    }
    if (startDate === "" || endDate === "" || startTime === "" || endTime === "") {
      setNameError("Please enter valid times and dates");
      return false;
    }
    setNameError("");
    return true;
  }

  eventId.current = useParams().eventId;

  const handleSave = async () => {
    if (!validate()) return;
    setHandling(true)
    await saveEvent(
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      description,
      eventColor,
      tasks,
      listId
    );
    window.location.href = "/calendar/week";
  };


  const handleModify = async () => {
    if (!validate()) return;
    setHandling(true)
    modyfing.current = true;   
    const newTasks: Task[] = []
    tasks.forEach((task) => {
      if (task.id === undefined) {
        newTasks.push(task)
      }
    })

    if (eventId !== undefined) {
      const response: Event = await modifyEvent(
        parseInt(eventId.current as string),
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        description,
        eventColor,
        newTasks,
        listId
      )
      set(response);
    }
    context.resetEvents()
    setHandling(false)
  }

  // This keeps the color from changing when the color is different than the list color and the event is being only loaded/modified
  useEffect(() => {
    if (!modyfing.current) {
      if (listId)
        context.eventLists.forEach((list) => {
          if (list.id == listId)
            setEventColor(list.color)
        })
    }
    else modyfing.current = false;
  }, [listId])

  const taskContainerProps: ShortTaskContainerProps = {
    tasks: tasks,
    setTasks: setTasks,
    endDate: new Date(endDate),
    className: undefined,
    list: undefined,
    defaultName: title + " task",
  };


  const INPUT_CLASS = `focus:outline-none  ${getFocusBorderColor300(
    eventColor
  )} border-b-4 ${getBorderColor200(eventColor)} bg-white h-12`;

  const INPUT_HEADLINE_CLASS = `${getTextColor300(
    eventColor
  )} font-extrabold text-2xl ml-1`;

  const setStartTimeWithCheck = (startTime: string) => {
    const stDate = new Date(startDate);
    const enDate = new Date(endDate);
    if (datesAreOnSameDay(stDate, enDate) && startTime > endTime) {
      setEndTime(startTime);
    }
    setStartTime(startTime);
  };

  const setEndTimeWithCheck = (endTime: string) => {
    const stDate = new Date(startDate);
    const enDate = new Date(endDate);
    if (datesAreOnSameDay(stDate, enDate) && endTime < startTime) {
      setStartTime(endTime);
    }
    setEndTime(endTime);
  };

  const setStartDateWithCheck = (startDate: string) => {
    const stDate = new Date(startDate);
    const enDate = new Date(endDate);
    if (stDate > enDate) {
      setEndDate(startDate);
    }
    setStartDate(startDate);
  };

  const setEndDateWithCheck = (endDate: string) => {
    const stDate = new Date(startDate);
    const enDate = new Date(endDate);
    if (stDate > enDate) {
      setStartDate(endDate);
    }
    setEndDate(endDate);
  };



  useEffect(() => {
    setLoading(true)
    const load = async () => {
      if (eventId.current !== undefined) {
        setPageState("edit");
        modyfing.current = true;

      }
      if (pageState === "create") {
        
        setTitle("");
        setStartDate(new Date().toISOString().slice(0, 10));
        setEndDate(new Date().toISOString().slice(0, 10));
        setStartTime("12:00");
        setEndTime("13:00");
        setLocation("");
        setDescription("");
        setTasks([]);
        originalList.current = undefined;
      } else {
        const events = await context.getEvents()
        let event = events.find((event) => event.id === parseInt(eventId.current as string))
        if (!event) event = await getEventById(parseInt(eventId.current as string))
        set(event);
        originalList.current = event.listId;
      }

    }
    load();
    setLoading(false)
  }, [pageState]);

  return (
    <>
      {!loading && <>
        <div className=" flex p-2 grow">
          <div className="border-2 rounded-xl border-gray-100 w-full flex">
            <div className="w-1/2 flex flex-col p-10 justify-between">
              <div className="flex flex-col">
                <p className={`${INPUT_HEADLINE_CLASS} `}>Title</p>
                <input
                  value={title}
                  placeholder="Event name"
                  onChange={(e) => setTitle(e.target.value)}
                  className={`${INPUT_CLASS} w-full text-3xl`}
                  maxLength={255}
                ></input>
                <ErrorLabel error={nameError}></ErrorLabel>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col w-5/12">
                  <p className={`${INPUT_HEADLINE_CLASS}  `}>Event Start</p>
                  <input
                    type="date"
                    className={` ${INPUT_CLASS} text-2xl`}
                    value={startDate}
                    onChange={(e) => setStartDateWithCheck(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-5/12">
                  <p className={`${INPUT_HEADLINE_CLASS}  `}>Event End</p>
                  <input
                    type="date"
                    className={`${INPUT_CLASS} text-2xl`}
                    value={endDate}
                    onChange={(e) => setEndDateWithCheck(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col w-5/12">
                  <p className={`${INPUT_HEADLINE_CLASS}  `}>Start Time</p>
                  <input
                    type="time"
                    className={` ${INPUT_CLASS} text-2xl w-full`}
                    value={startTime}
                    onChange={(e) => setStartTimeWithCheck(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-5/12">
                  <p className={`${INPUT_HEADLINE_CLASS}  `}>End Time</p>
                  <input
                    type="time"
                    className={` ${INPUT_CLASS} text-2xl w-full`}
                    value={endTime}
                    onChange={(e) => setEndTimeWithCheck(e.target.value)}
                  />
                </div>
              </div>
              <div className=" flex flex-col">
                <p className={`${INPUT_HEADLINE_CLASS} `}>Location</p>
                <input
                  type="text"
                  value={location}
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  className={`${INPUT_CLASS} w-full text-3xl`}
                  maxLength={255}
                ></input>

              </div>
              <div className=" flex flex-col">
                <p className={`${INPUT_HEADLINE_CLASS} `}>Select Color</p>
                <div className="flex flex-row justify-evenly mt-2">
                  {AVAILABLE_COLORS.map((color, index) => <ColorChoser
                    setEventColor={setEventColor} color={color} key={index}></ColorChoser>)}
                </div>
              </div>
              <div className=" flex flex-col">
                <p className={`${INPUT_HEADLINE_CLASS} `}>Description</p>
                <textarea
                  className={`bg-gray-100 text-2xl w-full h-32 resize-none p-2 rounded-xl`}
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                />
              </div>
            </div>
            <div className="my-10 border-r border-2"></div>
            <div className="w-1/2 flex flex-col p-10 justify-between">
              <div className="flex flex-col h-3/4">
                <p className={`${INPUT_HEADLINE_CLASS} `}>Related Tasks</p>

                <ShortTaskContainer {...taskContainerProps}></ShortTaskContainer>
              </div>

              <div className="flex flex-row mb-auto">
                <p className={`${INPUT_HEADLINE_CLASS} `}>Select Category</p>
                <select className="bg-gray-200 ml-5 rounded-md w-40" value={listId} onChange={(e: any) => setListId(e.target.value)}>
                  <option value={0}>None</option>
                  {context.eventLists.map((list, index) => <option value={list.id} key={index}>{list.name}</option>)}
                </select>
              </div>
              {handling ? <div className="w-full flex justify-center"> <Loader></Loader> </div> : <>
                {pageState === "create" ? (
                  <Button onClick={handleSave} text="Save" color={eventColor} />
                ) : (
                  <div className="flex justify-evenly">
                    <Button onClick={handleModify} text="Modify" color={eventColor} />
                    <Button onClick={async () => {
                      if (eventId !== undefined) {
                        setHandling(true)
                        const id = parseInt(eventId.current as string);
                        await deleteEvent(id);
                      }
                        setHandling(false)
                      window.location.href = "/calendar/week";
                    }} text="Delete" color={eventColor} />
                  </div>
                )} </>}
            </div>
          </div>
        </div>
      </>}
    </>
  );
}

const ErrorLabel = ({ error }: { error: string }) => {
  return <p className="text-red-500 h-0"> {error}</p>
}
const ColorChoser = ({ setEventColor, color }: { setEventColor: (color: string) => void, color: string }) => {
  return <div
    className={`h-8 w-8 ${getBGColor200(color)} rounded-full hover:border-2 border-black cursor-pointer`}
    onClick={() => setEventColor(color)}
  ></div>
}

const Button = ({ text, onClick, color }: { text: string, onClick: () => void, color: string }) => {
  return (
    <button
      onClick={onClick}
      className={`${getBGColor300(
        color
      )} w-full m-2 p-2 rounded-xl text-2xl cursor-pointer hover:outline-2 hover:outline-black hover:outline ${getBGColorActive400(
        color
      )}`}
    >
      {text}
    </button>
  )
}