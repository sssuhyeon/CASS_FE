import { API_BASE_URL, API_CONFIG } from './config';

export const getDataTeacher = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/info`, {
            method: 'GET',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
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

export const matchingAccept = async (username) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/m_accept/${username}`, {
            method: 'POST',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
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

export const matchingReject = async (username) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/m_reject/${username}`, {
            method: 'DELETE',
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

export const deleteProblem = async (problemId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/delete_problem/${problemId}`, {
            method: 'DELETE',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`deleteProblem error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('문제 삭제 실패:', error);
        throw error;
    }
};

export const deleteStudent = async (username) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/delete_student/${username}`, {
            method: 'DELETE',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`deleteStudent error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('학생 삭제 실패:', error);
        throw error;
    }
};

export const addProblem = async (name, url) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/teacher/add_problem`, {
            method: 'POST',
            headers: {
                ...API_CONFIG.headers,
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
                name: name,
                url: url
            })
        });

        if (!response.ok) {
            throw new Error(`addProblem error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error('문제 추가 실패:', error);
        throw error;
    }
};

