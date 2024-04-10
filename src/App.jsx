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
export default function App() {
  const id = localStorage.getItem("id"); 
  console.log(id);
  return (
    <Router>
      <Routes>
        <Route path="/signup" Component={Signup} />
        <Route path="/step1" Component={StepOne} />
        <Route path="/step2" Component={StepTwo} />
        <Route path="/" element={id ? <Home /> : <Navigate to="/signup" />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
