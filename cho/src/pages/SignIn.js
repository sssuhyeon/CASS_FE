import './SignIn.css';
import Button from "../component/Button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/auth';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        const response = await signIn(username, password);
        console.log('로그인 응답:', response);

        if (response.success === 1) {
            if(response.role === 'teacher'){
                navigate('/teacher/main');
            }
            else if(response.role === 'student'){
                navigate('/student/main');
            }

        } else {
            setError(response.message || '로그인에 실패했습니다.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && username && password) {
            handleLogin();
        }
    };

    return (
        <div className="signinPage">
            <div className="titleWrap">
                <div className="welcome">
                    환영합니다 !
                </div>
                <div className="signin">
                    Sign in to
                </div>
                <div className='cass'>
                    Code Assistant Support Service
                </div>
            </div>

            <div className="contentWrap">
                <div className="inputTitle id">아이디</div>
                <div className="inputWrap">
                    <input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        onKeyDown={handleKeyPress}
                        className="input" 
                        placeholder="아이디를 입력해주세요"
                    />
                </div>

                <div className="inputTitle pw">비밀번호</div>
                <div className="inputWrap">
                    <input 
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onKeyDown={handleKeyPress}
                        className="input" 
                        placeholder="비밀번호를 입력해주세요"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="btn">
                    <Button 
                        text={"로그인"} 
                        onClick={handleLogin}
                        disabled={!username || !password} 
                    />
                </div>

                <div className="signup">
                    <span className="text_normal">아직 계정이 없으신가요 ?</span>
                    <span className="text_highlight" onClick={()=>navigate("/signup")}>회원가입</span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;