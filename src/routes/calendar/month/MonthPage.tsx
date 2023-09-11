import {PagePattern, PagePatternProps} from "../../../components/page_pattern/PagePattern"
import {MonthPageContent} from "./MonthPageContent"

const pagePatternProps : PagePatternProps ={
    heading:"Month",
    page: <MonthPageContent></MonthPageContent>

}
export const MonthPage = () => {
    return (
    <PagePattern {...pagePatternProps}></PagePattern>)}