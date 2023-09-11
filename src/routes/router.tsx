import {createBrowserRouter} from "react-router-dom";

import {DayPage} from "./calendar/day/DayPage";
import {EventPage} from "./calendar/event/EventPage";
import {StickyWall} from "./sticky_wall/StickyWall";
import {AllTasksPage} from "./all_tasks/AllTasksPage";
import {WeekPage} from "./calendar/week/WeekPage";
import {HomePage} from "./home/HomePage";
import {MonthPage} from "./calendar/month/MonthPage";
import {LoginPage} from "./access/login/LoginPage";
import {ConfirmEmailPage} from "./access/confirm_email/ConfirmEmailPage";
import {ResetPasswordPage} from "./access/reset_password/ResetPasswordPage";
import {GoogleRedirect} from "./access/google_redirect/GoogleRedirect";
import {SetPasswordPage} from "./access/set_password/SetPassword";
import ErrorPage from "./error_page/ErrorPage";

export const ACCESS_URLS = ["/login", "/login/", "/confirmEmail", "/confirmEmail/", "/resetPassword", "/resetPassword/", "/oauth2/callback/google", "/oauth2/callback/google/", "/setPassword", "/setPassword/"]

export const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "allTasks",
    element: <AllTasksPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "stickyWall",
    element: <StickyWall />,
    errorElement: <ErrorPage />
  },
  { path: "calendar/week", element: <WeekPage />, errorElement: <ErrorPage /> },
  { path: "calendar/month", element: <MonthPage />, errorElement: <ErrorPage /> },
  { path: "calendar/day", element: <DayPage />, errorElement: <ErrorPage /> },

  { path: "calendar/event/:eventId", element: <EventPage />, errorElement: <ErrorPage /> },

  { path: "calendar/event/", element: <EventPage />, errorElement: <ErrorPage /> },

  { path: "login", element: <LoginPage />, errorElement: <ErrorPage /> },
  { path: "confirmEmail", element: <ConfirmEmailPage />, errorElement: <ErrorPage /> },
  { path: "resetPassword", element: <ResetPasswordPage />, errorElement: <ErrorPage /> },
  { path: "oauth2/callback/google", element: <GoogleRedirect></GoogleRedirect>, errorElement: <ErrorPage /> },
  { path: "setPassword", element: <SetPasswordPage />, errorElement: <ErrorPage /> }
]);
