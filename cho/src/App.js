import { Routes, Route } from "react-router-dom";
import './App.css';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import StudentInfo from "./pages/StudentInfo";
import TeacherInfo from "./pages/TeacherInfo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/teacherinfo" element={<TeacherInfo />} />
        <Route path="/studentinfo" element={<StudentInfo />} />
      </Routes>
    </div>
  );
}

export default App;
