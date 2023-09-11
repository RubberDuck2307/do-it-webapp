import {useNavigate} from "react-router-dom";
import {up_arrow_icon} from "../../css/css";
import {addDays} from "../../utils";
import {YellowButton} from "../utils/YellowButton";

interface SwitchProps {
    buttonChosen: number;
    setDate: (dateOrUpdater: Date | ((prevState: any) => Date)) => void;
    month? :string
}

const Switch = ({ buttonChosen, setDate, month }: SwitchProps) => {
    let dayChosen = false;
    let weekChosen = false;
    let monthChosen = false;
    const navigate = useNavigate();

    const buttonStyle ="rounded-md bg-white m-1 text-center w-16 hover:bg-gray-300 disabled:bg-yellow-300 disabled:hover:bg-yellow-400"


    if (buttonChosen === 0)
        dayChosen = true;
    else if (buttonChosen === 1)
        weekChosen = true;
    else if (buttonChosen === 2)
        monthChosen = true;

    return (

        <div className="flex rounded-md w-full flex-row mb-1
         ">
            <button disabled={dayChosen} onClick={() => navigate("../calendar/day")} className= {buttonStyle}>Day</button>
            <button disabled={weekChosen} onClick={() => navigate("../calendar/week")} className= {buttonStyle}>Week</button>
            <button disabled={monthChosen} onClick={() => navigate("../calendar/month")} className= {buttonStyle}>Month</button>
            <div className="ml-3 flex">
                <img src={up_arrow_icon} className=" h-5 w-5 p-1 -rotate-90 rounded-full hover:bg-gray-200 my-auto hover:cursor-pointer" onClick={() => {
                    let amountOfDays = 0;
                    if (buttonChosen === 0)
                        amountOfDays = -1;
                    else if (buttonChosen === 1)
                        amountOfDays = -7;
                    else if (buttonChosen === 2)
                        setDate((prevState: any) => prevState.setMonth(prevState.getMonth() - 1));
                    setDate((prevState: Date) => addDays(amountOfDays, prevState))
                }}></img>
                <img src={up_arrow_icon} className=" h-5 w-5 p-1 rotate-90 rounded-full hover:bg-gray-200 my-auto hover:cursor-pointer"
                    onClick={() => {
                        let amountOfDays = 0;
                        if (buttonChosen === 0)
                            amountOfDays = 1;
                        else if (buttonChosen === 1)
                            amountOfDays = 7;
                        else if (buttonChosen === 2)
                            setDate((prevState: any) => prevState.setMonth(prevState.getMonth() + 1));
                        setDate((prevState: Date) => addDays(amountOfDays, prevState))
                    }}></img>

            </div>

            <p className="ml-auto mr-auto font-bold text-3xl">{month}</p>

            <div className=" ml-auto">
            <YellowButton text="Today" onClick={() => setDate(new Date)} width={128} height={30}></YellowButton>
            <YellowButton text="Add event" onClick={() => navigate("../calendar/event")} width={128} height={30}></YellowButton>
            </div>
            
        </div>
    );

}
export default Switch;