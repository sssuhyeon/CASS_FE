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
            throw new Error(`HTTP error! status: ${response.status}`);
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