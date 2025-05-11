import { Routes, Route, Link } from "react-router-dom";
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
      {/* <div>
        <Link to={"/signup"}>SignUp</Link>
        <Link to={"/signin"}>SignIn</Link>
        <Link to={"/teacherinfo"}>TeacherInfo</Link>
        <Link to={"/studentinfo"}>StudentInfo</Link>
      </div> */}
    </div>
  );
}

export default App;
