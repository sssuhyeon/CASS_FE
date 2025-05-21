import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import './AddWorkbook.css';

export default function AddWorkbook() {
  const navigate = useNavigate();
  const [workbookTitle, setWorkbookTitle] = useState('');
  const [problems, setProblems] = useState([]);
  const [workbookList] = useState([
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
    }
  ]);

  const handleAddProblem = () => {
    const newProblem = {
      id: Date.now(),
      title: "",
      type: "객관식"
    };
    setProblems([...problems, newProblem]);
  };

  const handleProblemChange = (problemId, field, value) => {
    setProblems(problems.map(problem => 
      problem.id === problemId 
        ? { ...problem, [field]: value }
        : problem
    ));
  };

  const handleDeleteProblem = (problemId) => {
    setProblems(problems.filter(problem => problem.id !== problemId));
  };

  const handleSaveWorkbook = () => {
    if (!workbookTitle.trim()) {
      alert('문제집 이름을 입력해주세요.');
      return;
    }
    if (problems.length === 0) {
      alert('최소 한 개의 문제를 추가해주세요.');
      return;
    }
    if (problems.some(problem => !problem.title.trim())) {
      alert('모든 문제의 제목을 입력해주세요.');
      return;
    }

    // TODO: API 호출하여 문제집 저장
    console.log('Save workbook:', {
      title: workbookTitle,
      problems: problems
    });
    
    navigate('/mainteacher');
  };

  return (
    <div className="add-workbook">
      <Header />
      <div className="content-container">
        <div className="workbook-section">
          <div className="section-header">
            <h2>문제집 목록</h2>
          </div>
          <div className="workbook-list">
            {workbookList.map(workbook => (
              <div key={workbook.id} className="workbook-item">
                <div className="workbook-info">
                  <span className="workbook-title">{workbook.title}</span>
                  <span className="workbook-date">{workbook.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-section">
          <div className="section-header">
            <h2>새 문제집 만들기</h2>
            <button className="save-button" onClick={handleSaveWorkbook}>
              저장
            </button>
          </div>
          <div className="workbook-form">
            <div className="form-group">
              <label htmlFor="workbookTitle">문제집 이름</label>
              <input
                id="workbookTitle"
                type="text"
                className="workbook-title-input"
                placeholder="문제집 이름을 입력하세요"
                value={workbookTitle}
                onChange={(e) => setWorkbookTitle(e.target.value)}
              />
            </div>
            <div className="problems-section">
              <div className="problems-header">
                <h3>문제 목록</h3>
                <button className="add-problem-button" onClick={handleAddProblem}>
                  + 문제 추가
                </button>
              </div>
              <div className="problem-list">
                {problems.map((problem, index) => (
                  <div key={problem.id} className="problem-item">
                    <div className="problem-number">#{index + 1}</div>
                    <div className="problem-form">
                      <input
                        type="text"
                        className="problem-title-input"
                        placeholder="문제 제목을 입력하세요"
                        value={problem.title}
                        onChange={(e) => handleProblemChange(problem.id, 'title', e.target.value)}
                      />
                      <select
                        className="problem-type-select"
                        value={problem.type}
                        onChange={(e) => handleProblemChange(problem.id, 'type', e.target.value)}
                      >
                        <option value="객관식">객관식</option>
                        <option value="주관식">주관식</option>
                        <option value="서술형">서술형</option>
                      </select>
                      <button 
                        className="delete-problem-button"
                        onClick={() => handleDeleteProblem(problem.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
                {problems.length === 0 && (
                  <div className="no-problems">
                    문제를 추가해주세요.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
