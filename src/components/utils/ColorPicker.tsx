import {useRef, useState} from "react";
import {AVAILABLE_COLORS, getBGColor400} from "../../css/tailwindColorsDynamic";
import {UseClickOutside} from "../../customHooks";

export const ColorPicker = ({ color, setColor, activeY }: { setColor: (color: string) => void, color: string, activeY: number }) => {
    const bgColor = getBGColor400(color);
    const [active, setActive] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    UseClickOutside(wrapperRef, () => setActive(false));

    return (

        <>

            <div className={`w-5 h-5 ${bgColor} hover:border-2  border-black rounded-md hover:cursor-pointer min-w-5`} onClick={() => setActive(true)}></div>
            {active &&
                <div className=" absolute w-12 h-20 overflow-y-auto bg-white mt-6 rounded-md scrollbar-track-amber-500 p-1 -ml-1 border-white" ref={wrapperRef}
                    style={{ marginTop: activeY }} >
                    {AVAILABLE_COLORS.map((color, index) => <ColorPickerItem color={color} setColor={setColor} setActive={setActive} key={index} />)}
                </div>
            }

        </>)
}




const ColorPickerItem = ({ color, setColor, setActive }: { color: string, setColor: (color: string) => void, setActive: any }) => {
    const bgColor = getBGColor400(color);
    return (
        <div className={`w-5 h-5 my-1 rounded-md hover:border-2  border-black hover:cursor-pointer ${bgColor}`} onClick={() => {
            setColor(color)
            setActive(((prevState: any) => !prevState))
        }}></div>
    )
}
