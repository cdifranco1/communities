import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./objects/login/Login";

const AppComponent = (props: PropsWithChildren) => {
  return <div className="px-20">{props.children}</div>;
};

const App = () => {
  return (
    // <GoogleOAuthProvider clientId="882755271272-vqj7avqpa935r7p4vt2l56lemimrcl5t.apps.googleusercontent.com">
    <AppComponent>
      {/* <Login /> */}
      <Outlet />
    </AppComponent>
    // </GoogleOAuthProvider>
  );
};

export default App;
