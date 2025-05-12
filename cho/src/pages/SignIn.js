import './SignIn.css';
import Button from "../component/Button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    const handleSetId = (e) => {
        setId(e.target.value);
    };
    const handleSetPw = (e) => {
        setPw(e.target.value);
    };

    const navigate = useNavigate();

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
                    <input value={id} onChange={handleSetId} className="input" placeholder="아이디를 입력해주세요"></input>
                </div>

                <div className="inputTitle pw">비밀번호</div>
                <div className="inputWrap">
                    <input value={pw} onChange={handleSetPw} className="input" placeholder="비밀번호를 입력해주세요"></input>
                </div>

                <div className="btn">
                    <Button text={"로그인"} disabled={!id || !pw} />
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