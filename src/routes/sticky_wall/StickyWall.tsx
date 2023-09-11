import Menu from "../../components/menu/Menu";
import {font} from "../../css/css";
import {StickerContainer} from "../../components/sticker/StickerContainer";
import {useEffect, useState} from "react";
import {Sticker} from "../../components/sticker/Sticker";
import {getStickers} from "../../server_connection/sticker/StickerService";

export const StickyWall = () => {
  const [loaded, setLoaded] = useState<boolean>(false)

  const [stickers, setStickers] = useState<Sticker[]>([])

  useEffect(() => {
    const load = async () => {

    setStickers(await getStickers())
}
    load()
    setLoaded(true)
  }, []
  )

  return (
    <>
      <div className={`${font} flex text-xl p-3 h-screen `}>
        <Menu />
        <div className="flex flex-col p-5 w-4/5">
          <h1 className="text-5xl font-bold "> Sticky Wall </h1>
          { loaded &&
            <StickerContainer {...{stickers, setStickers}} />
          }
        </div>
      </div>
    </>
  );
};
