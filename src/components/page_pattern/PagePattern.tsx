import {ReactElement} from "react";
import Menu from "../menu/Menu";
import {font} from "../../css/css";


export interface PagePatternProps {
  page: ReactElement;
  heading: string;
}

export const PagePattern = ({ page, heading }: PagePatternProps) => {


  return (<>
    <div className={`${font} flex p-3 h-screen text-xl`}>
      <Menu/>
      <div className=" p-5 flex flex-col w-4/5 max-h-full">
        <h1 className=" text-5xl font-bold mb-2">{heading}</h1>
        {page}
      </div>
    </div>
    </>
  );
}