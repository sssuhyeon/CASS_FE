import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import StudentInfo from "./pages/StudentInfo";
import TeacherInfo from "./pages/TeacherInfo";
import MainTeacher from "./pages/MainTeacher";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/teacherinfo" element={<TeacherInfo />} />
        <Route path="/studentinfo" element={<StudentInfo />} />
        <Route path="/mainteacher" element={<MainTeacher />} />
      </Routes>

    </div>
  );
}

export default App;
