import { createBrowserRouter } from "react-router-dom";
import { AdminSkin } from "../skin/admin";
import { GuestSkin } from "../skin/guest";

import { Login } from "../components/Login";
import { UserDashboard } from "../components/UserDashboard";
import { PlayerDashboard } from "../components/PlayerDashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestSkin />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <AdminSkin />,
    children: [
      {
        path: "/user-dashboard",
        element: <UserDashboard />,
      },
    ],
  },
  {
    path: "/player-dashboard",
    element: <AdminSkin />,
    children: [
      {
        path: "/player-dashboard",
        element: <PlayerDashboard />,
      },
    ],
  },
]);

export default routes;
