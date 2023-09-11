import {Sticker} from "../../components/sticker/Sticker"
import {createStickerRequest, deleteStickerRequest, getStickersRequest, modifyStickerRequest} from "../requests"
import {StickerModifyDTO} from "./StickerDTOs"

export const createSticker = async (color?:string) :Promise<number> => {
   const sticker = (await createStickerRequest(color)).data
   return sticker.id
}

export const modifySticker = (StickerModifyDTO : StickerModifyDTO) => {
   if(StickerModifyDTO.id !== 0)
   modifyStickerRequest(StickerModifyDTO)
}

export const deleteSticker = async (stickerId:number) => {
   await deleteStickerRequest(stickerId)
}


 
 export const getStickers = async (): Promise<Sticker[]> => {
   let stickers: Sticker[] = [];
 
    stickers = (await getStickersRequest()).data;
   

 
   return  stickers;
 
 };