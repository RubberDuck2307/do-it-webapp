import {PagePattern} from "../../components/page_pattern/PagePattern"
import HomePageContent from "./HomePageContent"


export const HomePage = () => {
const pageProps = {
    page: <HomePageContent></HomePageContent>,
    heading: "Home",
}

    return (
    <PagePattern {...pageProps}>

    </PagePattern>
)
}