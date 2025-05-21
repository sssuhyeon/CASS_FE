import { API_BASE_URL, API_CONFIG } from './config';

export const getDataTeacher = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/info`, {
            method: 'GET',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`getDataTeacher error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('데이터 요청 실패:', error);
        return {
            pending_students: [],
            matching_students: [],
            problems: []
        };
    }
}; 

export const matchingAccept = async (studentId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/m_accept/${studentId}`, {
            method: 'POST',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`matchingAccept error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('요청 수락 실패:', error);
        throw error;
    }
};

export const matchingReject = async (studentId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/m_reject/${studentId}`, {
            method: 'POST',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`matchingReject error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('요청 거절 실패:', error);
        throw error;
    }
};
