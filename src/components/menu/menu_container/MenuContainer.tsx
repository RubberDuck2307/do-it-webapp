import {ReactElement} from "react";
import {Link} from "react-router-dom";

interface menuContainerProps {
  heading: string;
  items: Array<{
    name: string;
    link: string;
    icon: string;
  }>;
}

const MenuContainer = ({
  heading,
  items,
}: menuContainerProps): ReactElement => {
  return (
    <div className="border-t-2 border-solid mt-3 pt-2 px-2 border-gray-200">
      <h1 className="mb-2 text-lg font-semibold">{heading}</h1>
      <ul>
        {items.map((item, index) => {

          return <Link key={index} to = {item.link}>  <div className="hover:bg-gray-200 px-4 text-2xl rounded-lg my-2 flex flex-row items-center"> {item.icon && <img className ={"w-8 h-8 p-1 mr-2"} src={item.icon}/>} <li >{item.name} </li></div></Link>;
        })}
      </ul>
    </div>
  );
};

export type { menuContainerProps };
export default MenuContainer;
