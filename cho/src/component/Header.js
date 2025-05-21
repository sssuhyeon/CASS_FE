import "./Header.css";
import userIcon from "../img/user_icon.png";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestList, setRequestList] = useState([]);
  
  const handleLogoClick = () => {
    navigate('/mainteacher');
  };

  const handlePlusClick = () => {
    setIsModalOpen(true);
    // TODO: API 호출하여 요청 리스트 가져오기
    // 임시 데이터
    setRequestList([
      {
        id: 1,
        studentName: "김학생",
        studentId: "student123",
        requestTime: "2024-03-19 14:30:00"
      },
      {
        id: 2,
        studentName: "이학생",
        studentId: "student456",
        requestTime: "2024-03-19 15:45:00"
      },
      {
        id: 3,
        studentName: "박학생",
        studentId: "student789",
        requestTime: "2024-03-19 16:20:00"
      },
      {
        id: 4,
        studentName: "박학생",
        studentId: "student789",
        requestTime: "2024-03-19 16:20:00"
      },
      {
        id: 5,
        studentName: "박학생",
        studentId: "student789",
        requestTime: "2024-03-19 16:20:00"
      },
    ]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = (requestId) => {
    // TODO: 수락 API 호출
    console.log('Accepted request:', requestId);
    setRequestList(requestList.filter(request => request.id !== requestId));
  };

  const handleReject = (requestId) => {
    // TODO: 거절 API 호출
    console.log('Rejected request:', requestId);
    setRequestList(requestList.filter(request => request.id !== requestId));
  };

  const handleAcceptAll = () => {
    // TODO: 전체 수락 API 호출
    console.log('Accepting all requests');
    setRequestList([]);
  };

  return (
    <>
      <header className="header">
        <div className="logo" onClick={handleLogoClick}>CASS</div>
        <div className="user-section">
          <div className="user-plus-container">
            <div className="user-plus" onClick={handlePlusClick}>＋</div>
            {requestList.length > 0 && (
              <div className="request-badge">{requestList.length}</div>
            )}
          </div>
          <img src={userIcon} alt="User Icon" className="user-icon" />
        </div>
      </header>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content request-list-modal">
            <div className="modal-header">
              <h2 className="modal-title">등록 요청 목록</h2>
              <button className="close-button" onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="request-list-container">
              {requestList.length > 0 ? (
                <>
                  <button className="accept-all-button" onClick={handleAcceptAll}>
                    전체 수락
                  </button>
                  <div className="request-list">
                    {requestList.map((request) => (
                      <div key={request.id} className="request-item">
                        <div className="request-info">
                          <div className="student-name">{request.studentName}</div>
                          <div className="student-id">{request.studentId}</div>
                          <div className="request-time">{request.requestTime}</div>
                        </div>
                        <div className="request-actions">
                          <button 
                            className="accept-button"
                            onClick={() => handleAccept(request.id)}
                          >
                            수락
                          </button>
                          <button 
                            className="reject-button"
                            onClick={() => handleReject(request.id)}
                          >
                            거절
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-requests">
                  현재 등록 요청이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
