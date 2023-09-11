import {ReactElement} from "react";
import Card, {CardProps} from "../Card";

export interface CardListProps{
    cards:Array<CardProps>
}


const CardList = ({cards}:CardListProps):ReactElement => {
    return(<div className="flex">
    {cards.map((card) =>{
        return(<Card {...card} key={card.id}></Card>)
    })}
    </div>
    )


}

export default CardList