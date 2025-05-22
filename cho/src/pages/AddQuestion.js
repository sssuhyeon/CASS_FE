import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDataTeacher, matchingAccept, matchingReject, addProblem, deleteProblem } from "../api/teacher";
import userIcon from "../img/user_icon.png";
import "./AddQuestion.css";

const AddQuestion = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [problems, setProblems] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    name: "",
    url: ""
  });
  
  const [showModal, setShowModal] = useState(false);
  const [isProblemEditMode, setIsProblemEditMode] = useState(false);

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
      setProblems(updatedData.problems || []);

    } catch (error) {
      console.error("전체 학생 수락 실패:", error);
    }
  };

  // 문제 삭제 처리 함수
  const handleDeleteProblem = async (problemId) => {
    if (window.confirm("정말로 이 문제를 삭제하시겠습니까?")) {
      try {
        const response = await deleteProblem(problemId);
        if (response.success) {
          const updatedData = await getDataTeacher();
          setProblems(updatedData.problems || []);
          setIsProblemEditMode(true);
        }
        console.log("문제 삭제:", problemId);
      } catch (error) {
        console.error("문제 삭제 실패:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddQuestion = async () => {
    // 입력값이 비어있는지 확인
    if (!newQuestion.name || !newQuestion.url) {
      alert("문제 이름과 링크를 모두 입력하세요.");
      return;
    }

    try {
      const response = await addProblem(newQuestion.name, newQuestion.url);
      if (response.success) {
        const updatedData = await getDataTeacher();
        setProblems(updatedData.problems || []);
      }
      console.log("문제 추가 응답:", response);
    } catch (error) {
      console.error("문제 추가 실패:", error);
    }

    // Reset form after submission
    setNewQuestion({
      name: "",
      url: ""
    });
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
        {/* 왼쪽 섹션 - 문제 리스트 (읽기 전용) */}
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
            </div>
          </div>
          <ul className="problem-list">
            {problems.map((problem) => (
              <li key={problem.id} className="problem-item">
                <div className="problem-info">
                  <span className="problem-id">#{problem.id}</span>
                  <span className="problem-name">{problem.name}</span>
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

        {/* 오른쪽 섹션 - 문제 추가 폼 */}
        <div className="section">
          <div className="section-header">
            <h2>문제 추가</h2>
          </div>
          <div className="question-form">
            <div className="form-group">
              <label htmlFor="name">문제 이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newQuestion.name}
                onChange={handleInputChange}
                placeholder="문제 이름을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">문제 링크</label>
              <input
                type="url"
                id="url"
                name="url"
                value={newQuestion.url}
                onChange={handleInputChange}
                placeholder="문제 링크를 입력하세요"
              />
            </div>
            <button 
              className="add-question-button"
              onClick={handleAddQuestion}
            >
              문제 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;