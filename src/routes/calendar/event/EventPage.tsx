import {PagePattern, PagePatternProps} from "../../../components/page_pattern/PagePattern";
import {EventPageContent} from "./EventPageContent";

export const EventPage = () => {

    
    const pageProps: PagePatternProps = {
        page:  <EventPageContent></EventPageContent>,
        heading: "Event",
    }
    return (
        <PagePattern {...pageProps}> </PagePattern>
    );


}