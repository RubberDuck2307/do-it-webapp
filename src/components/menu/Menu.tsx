import {ReactElement} from "react";
import MenuContainer, {menuContainerProps,} from "./menu_container/MenuContainer";
import {useNavigate} from "react-router";
import {calendar_icon, home_icon, logout_icon, sticker_icon, tasks_icon} from "../../css/css";
import {EventListContainer} from "../event_list/EventListContainer";
import {EventList} from "../../entities/eventList";
import {logout} from "../../server_connection/authentication/authentication";

const menuTasksProps: menuContainerProps = {
  heading: "",
  items: [
    { name: "Home", link: "../", icon: home_icon },
    { name: "All tasks", link: "../allTasks/", icon: tasks_icon },
    { name: "Calendar", link: "../calendar/week", icon: calendar_icon },
    { name: "Sticky wall", link: "../stickyWall/", icon: sticker_icon },
  ],
};




const Menu = (): ReactElement => {
  const navigate = useNavigate();
  
  const eventList : EventList[] = [{id:1, name:"test", color:"red"}, {id:2, name:"test2", color:"blue"}, {id:3, name:"test3", color:"red"}]

  
  return (
    <div className="w-1/5 bg-gray-100 rounded-2xl h-full p-3 flex flex-col">
      <h2 className=" text-3xl font-bold">Menu</h2>
      <MenuContainer {...menuTasksProps}></MenuContainer>
      <hr className= "my-3"></hr>
      <EventListContainer lists={eventList} events={[]}></EventListContainer>

      <div className="hover:bg-gray-200 mt-auto hover:cursor-pointer rounded-md flex flex-row" onClick={ async () => {
        if(await logout())
        navigate("/login")
      }}>
      <img className=" w-7 h-7 p-1 mr-3" src={logout_icon}></img>
      <p className="text-left text-xl "> Sign Off</p>
      </div>
    </div>
  );
};
export default Menu;
