import { API_BASE_URL, ENDPOINTS, API_CONFIG } from './config';

export const signIn = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SIGN_IN}`, {
            method: 'POST',
            ...API_CONFIG,
            body: JSON.stringify({
                username,
                password
            })
        });

        console.log("Raw response:", response);

        const data = await response.json();
        console.log("Parsed response JSON:", data);
        
        if (data.success === 1) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: 0,
            message: '서버 연결에 실패했습니다.'
        };
    }
};


export const signUp = async (username, password, password2, name, role) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SIGN_UP}`, {
            method: 'POST',
            ...API_CONFIG,
            body: JSON.stringify({
                username,
                password,
                password2,
                name,
                role // 'student' 또는 'teacher'
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: 0,
            message: '서버 연결에 실패했습니다.'
        };
    }
}; 