export interface gapHeightProps {
    gap: number
  }

  export const EventGap = ({gap}: gapHeightProps) => {
    return <div style={{height:gap}}></div>
  }
  
  