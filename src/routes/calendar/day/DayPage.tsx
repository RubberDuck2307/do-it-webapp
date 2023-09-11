import {PagePattern, PagePatternProps} from "../../../components/page_pattern/PagePattern";
import {DayContent} from "./DayContent";


export const DayPage = () => {
    const today = new Date();
    

    const pageProps: PagePatternProps = {
        page:  <DayContent></DayContent>,
        heading: "Day",
    }
    return (
        <PagePattern {...pageProps}> </PagePattern>
    );

}