import { Route, Switch } from "wouter";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Boards from "./pages/Boards";
import BoardView from "./pages/BoardView";
import Test from "./pages/Test";

export default function App() {
  return (
    <>
    <Toaster reverseOrder={false} />
    <Switch>
      <Route path="/" component={Index}></Route>
      <Route path="/test" component={Test}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/boards" component={Boards}></Route>
      <Route path="/board/:id" component={BoardView}></Route>
      <Route path="/board/:board_id/card/:card_id" component={BoardView}></Route>
    </Switch>
    </>
  );
}