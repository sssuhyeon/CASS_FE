import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataTeacher } from "../api/teacher";
import userIcon from "../img/user_icon.png";
import "../pages/MainTeacher.css";

const TeacherMain = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [matchingStudents, setMatchingStudents] = useState([]);
  const [problems, setProblems] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // response 받아오기
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 인증 토큰 없으면 로그인 페이지로 이동
    if (!token) {
      navigate("/signin");
      return;
    }

    // 백엔드로 데이터 요청
    const getInfo = async () => {
      try {
        const data = await getDataTeacher();

        console.log(data);

        // 대기 중인 학생 리스트
        setPendingStudents(data.pending_students || []);
        // 매칭된 학생 리스트
        setMatchingStudents(data.matching_students || []);
        // 등록한 문제 리스트
        setProblems(data.problems || []);
        
      } catch (error) {
        console.error("에러:", error);
      }
    };

    getInfo();
  }, [navigate]);

  const handleAcceptStudent = async (studentId) => {
    // TODO: Implement accept student API call
    console.log("Accept student:", studentId);
    // After successful API call, update the pending students list
    setPendingStudents(pendingStudents.filter(student => student.id !== studentId));
    // Add the accepted student to matching students
    const acceptedStudent = pendingStudents.find(student => student.id === studentId);
    if (acceptedStudent) {
      setMatchingStudents([...matchingStudents, acceptedStudent]);
    }
  };

  const handleRejectStudent = async (studentId) => {
    // TODO: Implement reject student API call
    console.log("Reject student:", studentId);
    // After successful API call, update the pending students list
    setPendingStudents(pendingStudents.filter(student => student.id !== studentId));
  };

  const handleAcceptAllStudents = async () => {
    // TODO: Implement accept all students API call
    console.log("Accept all students");
    // Add all pending students to matching students
    setMatchingStudents([...matchingStudents, ...pendingStudents]);
    // Clear pending students list
    setPendingStudents([]);
    // Close modal
    setShowModal(false);
  };

  return (
    <div className="main-teacher">

      {/* 헤더 */}
      <div className="header">
        <div className="logo" onClick={() => navigate("/teacher/main")}>CASS</div>
        <div className="header-right">
          <div className="user-plus" onClick={() => setShowModal(true)}>
            ＋
            {pendingStudents.length > 0 && (
              <span className="notification-badge">{pendingStudents.length}</span>
            )}
          </div>
          <img src={userIcon} alt="User Icon" className="user-icon" />
        </div>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">학생 등록 요청</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            {pendingStudents.length > 0 ? (
              <>
                <div className="modal-actions">
                  <button
                    className="accept-all-button"
                    onClick={handleAcceptAllStudents}
                  >
                    전체 수락
                  </button>
                </div>
                <div className="modal-student-list">
                  {pendingStudents.map((student) => (
                    <li key={student.id} className="modal-student-item">
                      <div className="student-info">
                        <div className="student-name">{student.name}</div>
                        <div className="student-username">@{student.username}</div>
                      </div>
                      <div className="student-actions">
                        <button
                          className="accept-button"
                          onClick={() => handleAcceptStudent(student.id)}
                        >
                          수락
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectStudent(student.id)}
                        >
                          거절
                        </button>
                      </div>
                    </li>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-requests">
                현재 대기 중인 학생이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 메인 페이지 */}
      <div className="teacherMain">
        {/* 왼쪽 섹션 - 문제 리스트 */}
        <div className="section">
          <h2>문제 리스트</h2>
          <ul className="problem-list">
            {problems.map((problem) => (
              <li key={problem.id} className="problem-item">
                <div className="problem-title">{problem.title}</div>
              </li>
            ))}
            {problems.length === 0 && (
              <div className="no-items">등록된 문제가 없습니다.</div>
            )}
          </ul>
        </div>

        {/* 오른쪽 섹션 - 수강 학생 */}
        <div className="section">
          <h2>수강 학생</h2>
          <ul className="student-list">
            {matchingStudents.map((student) => (
              <li key={student.id} className="student-item">
                <div className="student-name">{student.name}</div>
              </li>
            ))}
            {matchingStudents.length === 0 && (
              <div className="no-items">등록된 학생이 없습니다.</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherMain;
