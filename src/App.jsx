import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import StepOne from "./pages/StepOne";
import Home from "./pages/Home";
import StepTwo from "./pages/StepTwo";
import { Toaster } from "react-hot-toast";
import { useStoreContext } from "./store/StoreProvider";
export default function App() {
  const { user } = useStoreContext();
  let { id, step_1, step_2 } = user;
  id = id || localStorage.getItem("id"); 
  const whichRoute = () => {
    if (!id) {
      return "/signup";
    } else if (!step_1) {
      return "/step1";
    } else if (!step_2) {
      return "/step2";
    } else {
      return "/";
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={
            whichRoute() == "/signup" ? (
              <Signup />
            ) : (
              <Navigate to={whichRoute()} />
            )
          }
        />
        <Route
          path="/step1"
          element={
            whichRoute() == "/step1" ? (
              <StepOne />
            ) : (
              <Navigate to={whichRoute()} />
            )
          }
        />
        <Route
          path="/step2"
          element={
            whichRoute() == "/step2" ? (
              <StepTwo />
            ) : (
              <Navigate to={whichRoute()} />
            )
          }
        />
        <Route
          path="/"
          element={
            whichRoute() == "/" ? <Home /> : <Navigate to={whichRoute()} />
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}
