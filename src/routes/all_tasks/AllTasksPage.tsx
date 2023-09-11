import {PagePattern, PagePatternProps} from "../../components/page_pattern/PagePattern"
import {AllTasksPageContent} from "./AllTasksPageContent"

export const AllTasksPage = () => {
    const pageProps: PagePatternProps = {
        page: <AllTasksPageContent></AllTasksPageContent>,
        heading: "All Tasks",
    }

    return (
        <PagePattern {...pageProps}>

        </PagePattern>
    )
}