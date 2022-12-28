import Communities from "./components/Communities";
import { PropsWithChildren, ReactDOM } from "react";
import { Outlet } from "react-router-dom";

const AppComponent = (props: PropsWithChildren) => {
  return <div className="px-20">{props.children}</div>;
};

const App = () => {
  return (
    <AppComponent>
      <Outlet />
    </AppComponent>
  );
};

export default App;
