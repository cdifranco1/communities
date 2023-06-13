import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Communities from "./objects/community/Communities";
import CommunityHome from "./objects/community/CommunityHome";
import TopicForum from "./objects/topic/TopicForum";
import { Navigate } from "react-router-dom";

const PrivateRoute = (children: { children: ReactNode }) => {
  const auth = { token: false };
  return <>{auth.token ? children : <Navigate to="/" />}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Communities />,
      },
      {
        path: "/community/:id",
        element: (
          // <PrivateRoute>
          <CommunityHome />
          // </PrivateRoute>
        ),
      },
      {
        path: "/c/:communityId/t/:topicId",
        element: <TopicForum />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
