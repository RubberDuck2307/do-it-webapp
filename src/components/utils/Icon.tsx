export const Icon = (props: {onClick : ()=> void, src: string, }) => {
    return <img
        className="w-7 h-7 p-1 mr-1 rounded-full hover:bg-gray-200 hover:cursor-pointer"
        src={props.src}
        onClick={props.onClick}
    />
}