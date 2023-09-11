import {ReactElement} from "react";

interface CardProps{
    name:string,
    number:number,
    icon:string
    bgColour:string | undefined
    id:number
}
const Card = ({name, number, icon, bgColour}: CardProps):ReactElement => 
{
    name = name.charAt(0).toUpperCase() + name.slice(1);
    name = name.length >= 8 ? name.slice(0,5) + "...": name

    return (
        <div className= {"p-2 w-24 h-28 rounded-xl  text-white m-2 " + bgColour}>
            <img src={icon} alt={name} className="w-8"/>
            <h1 className="py-1">{name}</h1>
            <h1>{number} tasks</h1>
        </div>
    )

}

export type {CardProps}

export default Card