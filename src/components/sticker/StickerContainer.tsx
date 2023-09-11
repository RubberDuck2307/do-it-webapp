import {useNavigate} from "react-router-dom";
import {AVAILABLE_COLORS, getBGColor200} from "../../css/tailwindColorsDynamic";
import {Sticker, StickerProps} from "./Sticker";
import {createSticker} from "../../server_connection/sticker/StickerService";

export interface StickerContainerProps {
    stickers: Sticker[],
    setStickers: (stickers: Sticker[]) => void;


}


export const StickerContainer = ({ stickers, setStickers }: StickerContainerProps) => {
    const navigate = useNavigate();


    const stickerProps: StickerProps[] = []
    stickers.forEach((sticker) => {
        stickerProps.push({ sticker, className: getBGColor200(sticker.color) })
    })



    return (
        <div className=" mx-2 my-4 grid md:grid-cols-2 gap-2 sm:grid-cols-1 xl:grid-cols-3 border-gray-100 border-2 rounded-xl p-3 overflow-y-auto">
            {stickerProps.map((sticker, index) => <Sticker {...sticker} key={index} />)}
            <button onClick={async () => {
                const color = AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)]
                const newSticker = { id: 0, color: color, text: "", headline: "" }
                setStickers([...stickers, newSticker])
                const id = await createSticker(newSticker.color)
                newSticker.id = id
            }
            } className="w-full h-[24rem] rounded-lg text-center bg-gray-200 my-2 ml-1 text-6xl"> + </button>
        </div>

    );
};