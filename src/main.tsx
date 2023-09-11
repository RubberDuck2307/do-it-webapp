import ReactDOM from "react-dom/client";
import "./css/index.css";
import AppContext from "./context";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { ScreenCheck } from "./routes/ScreenCheck";




ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <AppContext>
    <ScreenCheck>
      <RouterProvider router={router} />
    </ScreenCheck>
  </AppContext>
);
