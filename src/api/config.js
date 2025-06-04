// API 기본 URL 설정
export const API_BASE_URL = 'https://port-0-cass-be-manqdhj2c5bed591.sel4.cloudtype.app'; // 백엔드 서버 URL을 여기에 설정

// API 엔드포인트
export const ENDPOINTS = {
    SIGN_IN: '/api/accounts/signin',
    SIGN_UP: '/api/accounts/signup'
};

// API 요청 기본 설정
export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
    },
}; 