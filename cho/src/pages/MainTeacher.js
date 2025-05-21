import React, { useState } from 'react';
import './MainTeacher.css';
import Header from '../component/Header';
import { useNavigate } from 'react-router-dom';

export default function MainTeacher() {
  const [workbookList, setWorkbookList] = useState([
    {
      id: 1,
      title: "초등 수학 기초",
      createdAt: "2024-03-19",
      problems: [
        { id: 1, title: "덧셈 연습 1", type: "객관식" },
        { id: 2, title: "뺄셈 연습 1", type: "주관식" },
        { id: 3, title: "곱셈 연습 1", type: "객관식" }
      ]
    },
    {
      id: 2,
      title: "중등 수학 심화",
      createdAt: "2024-03-19",
      problems: [
        { id: 4, title: "방정식의 이해", type: "객관식" },
        { id: 5, title: "함수와 그래프", type: "서술형" }
      ]
    },
    {
      id: 3,
      title: "고등 수학 문제집",
      createdAt: "2024-03-20",
      problems: [
        { id: 6, title: "미분의 개념", type: "객관식" },
        { id: 7, title: "적분의 활용", type: "서술형" }
      ]
    }
  ]);

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedWorkbook, setSelectedWorkbook] = useState(null);

  const studentList = [
    {
      id: 1,
      name: "김학생",
      studentId: "student123",
      solvedCount: 15
    },
    {
      id: 2,
      name: "이학생",
      studentId: "student456",
      solvedCount: 8
    },
    {
      id: 3,
      name: "박학생",
      studentId: "student789",
      solvedCount: 20
    }
  ];

  const navigate = useNavigate();

  const handleDeleteStudent = (studentId) => {
    // TODO: 학생 삭제 API 호출
    console.log('Delete student:', studentId);
  };

  const handleAddWorkbook = () => {
    navigate('/add-workbook');
  };

  const handleDeleteWorkbook = (workbookId) => {
    if (window.confirm('정말로 이 문제집을 삭제하시겠습니까?')) {
      setWorkbookList(workbookList.filter(workbook => workbook.id !== workbookId));
      if (selectedWorkbook?.id === workbookId) {
        setSelectedWorkbook(null);
      }
    }
  };

  const handleWorkbookClick = (workbook) => {
    if (!isDeleteMode) {
      setSelectedWorkbook(workbook);
    }
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedWorkbook(null);
  };

  return (
    <div className="main-teacher">
      <Header />
      <div className="content-container">
        <div className="workbook-section">
          <div className="section-header">
            <h2>문제집 목록</h2>
            <div className="header-buttons">
              <button 
                className={`delete-mode-button ${isDeleteMode ? 'active' : ''}`}
                onClick={toggleDeleteMode}
              >
                {isDeleteMode ? '삭제 완료' : '삭제'}
              </button>
              <button 
                className="add-button"
                onClick={handleAddWorkbook}
              >
                + 새 문제집
              </button>
            </div>
          </div>
          <div className="workbook-list">
            {workbookList.map(workbook => (
              <div 
                key={workbook.id} 
                className={`workbook-item ${selectedWorkbook?.id === workbook.id ? 'selected' : ''}`}
                onClick={() => handleWorkbookClick(workbook)}
              >
                <div className="workbook-info">
                  <span className="workbook-title">{workbook.title}</span>
                  <span className="workbook-date">{workbook.createdAt}</span>
                </div>
                {isDeleteMode && (
                  <div className="workbook-actions">
                    <button 
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWorkbook(workbook.id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="right-section">
          <div className="section-header">
            <h2>
              {selectedWorkbook ? `${selectedWorkbook.title}의 문제 목록` : '등록된 학생'}
            </h2>
          </div>
          {selectedWorkbook ? (
            <div className="problem-list">
              {selectedWorkbook.problems.map(problem => (
                <div key={problem.id} className="problem-item">
                  <div className="problem-info">
                    <span className="problem-title">{problem.title}</span>
                    <span className="problem-type">{problem.type}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="student-list">
              {studentList.map(student => (
                <div key={student.id} className="student-item">
                  <div className="student-info">
                    <span className="student-name">{student.name}</span>
                    <span className="student-id">{student.studentId}</span>
                    <span className="solved-count">해결한 문제: {student.solvedCount}개</span>
                  </div>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}