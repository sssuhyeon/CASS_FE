import "./SignUp.css";
import Button from "../component/Button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: '',
        name: '',
        role: 'student' // 기본값은 student
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("회원가입 버튼 클릭됨");
        setError('');


        const response = await signUp(
            formData.username,
            formData.password,
            formData.password2,
            formData.name,
            formData.role
        );

        if (response.success === 1) {
            alert('회원가입이 완료되었습니다.');
            navigate('/signin');
        } else {
            setError(response.message || '회원가입에 실패했습니다.');
        }
    };

    return (
        <div className="signupPage">
            <div className="titleWrap">
                <div className="welcome">
                    환영합니다 !
                </div>
                <div className="sign">
                    Sign up to
                </div>
                <div className='cass'>
                    Code Assistant Support Service
                </div>
            </div>

            <div className="contentWrap">

                <div className="nameAndRole">
                    <div className="nameBlock">
                        <div className="inputTitle">이름</div>
                        <div className="inputWrap nameInput">
                            <input value={formData.name} onChange={handleChange} name="name" className="input" placeholder="이름을 입력해주세요"></input>
                        </div>
                    </div>

                    <div className="roleBlock">
                        <div className="inputTitle">유형</div>
                        <div className="roleSelect">
                            <Button text={"선생님"} type={"teacher"} onClick={() => setFormData(prev => ({ ...prev, role: 'teacher' }))} isSelected={formData.role === "teacher"} />
                            <Button text={"학생"} type={"student"} onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))} isSelected={formData.role === "student"} />
                        </div>
                    </div>

                </div>

                <div className="inputTitle id">아이디</div>
                <div className="inputWrap">
                    <input value={formData.username} onChange={handleChange} name="username" className="input" placeholder="아이디를 입력해주세요"></input>
                </div>

                <div className="inputTitle pw">비밀번호</div>
                <div className="inputWrap">
                    <input value={formData.password} onChange={handleChange} name="password" className="input" placeholder="비밀번호를 입력해주세요"></input>
                </div>

                <div className="inputTitle pw">비밀번호 확인</div>
                <div className="inputWrap">
                    <input value={formData.password2} onChange={handleChange} name="password2" className="input" placeholder="비밀번호를 다시 입력해주세요"></input>
                </div>

                <div className={`errorMessageWrap ${formData.password && formData.password !== formData.password2 && formData.password2 ? "visible" : ""}`}>
                    비밀번호가 일치하지 않습니다.
                </div>

                <Button text={"회원가입"} onClick={handleSubmit} disabled={!formData.name || !formData.role || !formData.username || !formData.password || !formData.password2} />

            </div>

        </div>
    );
};

export default SignUp;