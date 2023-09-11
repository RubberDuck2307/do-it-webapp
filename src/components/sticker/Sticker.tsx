import {useEffect, useState} from "react";
import {deleteSticker, modifySticker} from "../../server_connection/sticker/StickerService";

export interface StickerProps {
  className: string;
  sticker: Sticker;
}

export interface Sticker {
  id: number;
  headline: string;
  text: string;
  color: string;
}

export const Sticker = ({ className, sticker }: StickerProps) => {
  const [headline, setHeadline] = useState(sticker.headline || "");
  const [text, setText] = useState(sticker.text || "");
  const [initialRender, setInitialRender] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(true);
      return;
    }
    const timeout = setTimeout(async () => {
      await modifySticker({
        id: sticker.id,
        headline: headline,
        text: text,
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [text, headline]);

  return (<>
    {deleted ? <></> :
      <div
        className={` ${className} w-full h-[24rem] rounded-lg font-notes overflow-y-auto my-2 ml-1 p-2`}
      >
        <input
          type="text"
          placeholder="title"
          name="headline"
          value={headline}
          onChange={(event) => {
            setHeadline(event.target.value);
          }}
          className={`${className} w-11/12 h-12 text-4xl text-gray-500 font-semibold focus:border-white focus:border-2 focus:outline-none rounded-lg px-3 mb-1`}
          maxLength={255}
        />
        <button className="w-1/12 font-sans text-base text-gray-400 hover:text-black hover:font-bold" onClick={() => {
          if (sticker.id === 0) return
          setDeleted(true)
          deleteSticker(sticker.id)
        }}>X</button>
        <textarea
          placeholder="..."
          name="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          className={` ${className} w-full h-[19rem] text-xl text-gray-500 font-semibold focus:border-white focus:border-2 rounded-lg px-3 resize-none focus:outline-none`}
        />
      </div>}
  </>
  );
};
