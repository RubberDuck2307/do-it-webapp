export const YellowButton = ({onClick, text, width, height}: {onClick: () => void, text: string, width:number, height:number}) => {

    return (
        <button
            className="bg-yellow-400 rounded-lg hover:outline-2 hover:outline m-2 active:bg-yellow-500"
            onClick={onClick}
            style={{width:width, height:height}}
        >
           {text}
        </button>)
}