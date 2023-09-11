import {useRouteError} from "react-router";

export default function ErrorPage() {
        const error :any = useRouteError();
      
        return (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold mb-3">Oops!</h1>
            <p className="text-2xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-xl">
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        );
      }
      