import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataTeacher, matchingAccept, matchingReject, deleteStudent } from "../api/teacher";
import userIcon from "../img/user_icon.png";
import "../pages/MainTeacher.css";

const TeacherMain = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [matchingStudents, setMatchingStudents] = useState([]);
  const [problems, setProblems] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProblemEditMode, setIsProblemEditMode] = useState(false);

  // 학생 검색
  const [studentSearch, setStudentSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    // 백엔드로 문제, 대기 중인 학생, 매칭된 학생 데이터 요청
    const getInfo = async () => {
      try {
        const data = await getDataTeacher();
        setPendingStudents(data.pending_students || []);
        setMatchingStudents(data.matching_students || []);
        setProblems(data.problems || []);
      } catch (error) {
        console.error("에러:", error);
      }
    };

    getInfo();
  }, [navigate]);

  // 학생 등록 요청 수락
  const handleAcceptStudent = async (username) => {
    try {
      const data = await matchingAccept(username);

      if (data.success === 0) {
        alert(data.message);
        return;
      }

      const updatedData = await getDataTeacher();

      setPendingStudents(updatedData.pending_students || []);
      setMatchingStudents(updatedData.matching_students || []);
      setProblems(updatedData.problems || []);
    }
    catch (error) {
      console.error('학생 수락 실패:', error);
    }
  };

  // 학생 등록 요청 거절
  const handleRejectStudent = async (username) => {
    try {
      const data = await matchingReject(username);

      if (data.success === 0) {
        alert(data.message);
        return;
      }

      const updatedData = await getDataTeacher();

      setPendingStudents(updatedData.pending_students || []);
      setMatchingStudents(updatedData.matching_students || []);
      setProblems(updatedData.problems || []);
    }
    catch (error) {
      console.error('학생 거절 실패:', error);
    }
  };

  // 모든 학생 등록 요청 수락
  const handleAcceptAllStudents = async () => {
    try {
      for (const student of pendingStudents) {
        await matchingAccept(student.username);
      }
  
      // 한 번만 데이터 갱신
      const updatedData = await getDataTeacher();
      setPendingStudents(updatedData.pending_students || []);
      setMatchingStudents(updatedData.matching_students || []);
      setProblems(updatedData.problems || []);

    } catch (error) {
      console.error("전체 학생 수락 실패:", error);
    }
  };

  // 학생 삭제 처리 함수
  const handleDeleteStudent = async (username) => {
    if (window.confirm("정말로 이 학생을 삭제하시겠습니까?")) {
      try {
        const response = await deleteStudent(username);
        if (response.success) {
          const updatedData = await getDataTeacher();
          setMatchingStudents((prevStudents) =>
            prevStudents.filter((student) => student.username !== username)
          );
          // setMatchingStudents(updatedData.matching_students || []);
          setIsEditMode(true);
        }
        console.log("학생 삭제:", username);
      } catch (error) {
        console.error("학생 삭제 실패:", error);
      }
    }
  };

  // 문제 삭제 처리 함수
  const handleDeleteProblem = async (problemId) => {
    if (window.confirm("정말로 이 문제를 삭제하시겠습니까?")) {
      try {
        // TODO: API 호출 부분 구현 필요
        console.log("문제 삭제:", problemId);
      } catch (error) {
        console.error("문제 삭제 실패:", error);
      }
    }
  };

  // 학생 검색
  const filteredStudents = matchingStudents.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.username.toLowerCase().includes(studentSearch.toLowerCase())
  );

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
                        <div className="student-username">#{student.username}</div>
                      </div>
                      <div className="student-actions">
                        <button
                          className="accept-button"
                          onClick={() => handleAcceptStudent(student.username)}
                        >
                          수락
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectStudent(student.username)}
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
          <div className="section-header">
            <h2>문제 리스트</h2>
            <div className="section-controls">
              <button
                className={`edit-button ${isProblemEditMode ? 'active' : ''}`}
                onClick={() => setIsProblemEditMode(!isProblemEditMode)}
              >
                {isProblemEditMode ? '수정 완료' : '편집'}
              </button>
              <button className="add-button">
                추가
              </button>
            </div>
          </div>
          <ul className="problem-list">
            {problems.map((problem) => (
              <li key={problem.id} className="problem-item">
                <div className="problem-info">
                  <span className="problem-id">#{problem.id}</span>
                  <span className="problem-title">{problem.title}</span>
                </div>
                {isProblemEditMode && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteProblem(problem.id)}
                  >
                    삭제
                  </button>
                )}
              </li>
            ))}
            {problems.length === 0 && (
              <div className="no-items">등록된 문제가 없습니다.</div>
            )}
          </ul>
        </div>

        {/* 오른쪽 섹션 - 수강 학생 */}
        <div className="section">
          <div className="section-header">
            <h2>수강 학생</h2>
            <div className="section-controls">
              <input
                type="text"
                placeholder="학생 검색..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="search-input"
              />
              <button
                className={`edit-button ${isEditMode ? 'active' : ''}`}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? '수정 완료' : '편집'}
              </button>
            </div>
          </div>
          <ul className="student-list">
            {filteredStudents.map((student) => (
              <li key={student.username} className="student-item">
                <div className="student-info">
                  <span className="student-name">{student.name}</span>
                  <span className="student-username">#{student.username}</span>
                </div>
                {isEditMode && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteStudent(student.username)}
                  >
                    삭제
                  </button>
                )}
              </li>
            ))}
            {filteredStudents.length === 0 && (
              <div className="no-items">
                {matchingStudents.length === 0 ? "등록된 학생이 없습니다." : "검색 결과가 없습니다."}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherMain;