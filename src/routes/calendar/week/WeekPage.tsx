import {PagePattern} from "../../../components/page_pattern/PagePattern"
import {WeekPageContent} from "./WeekPageContent"


export const WeekPage = () => {
    
    const pageProps = {
        page: <WeekPageContent></WeekPageContent>,
        heading: "Week",
    }
    return(

        <PagePattern {...pageProps}></PagePattern>
    )

}