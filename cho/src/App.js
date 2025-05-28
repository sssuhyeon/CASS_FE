import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MainTeacher from "./pages/MainTeacher";
import MainStudent from "./pages/MainStudent";
import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/teacher/main" element={<MainTeacher />} />
        <Route path="/student/main" element={<MainStudent />} />
        <Route path="/teacher/add-question" element={<AddQuestion />} />
      </Routes>

    </div>
  );
}

export default App;
