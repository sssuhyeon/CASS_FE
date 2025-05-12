import "./SignUp.css";
import Button from "../component/Button";
import { useState } from 'react';

const SignUp = () => {
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    const isMatch = pw === confirmPw;

    const handleSetName = (e) => { setName(e.target.value); };
    const handleSetId = (e) => { setId(e.target.value); };
    const handleSetPw = (e) => { setPw(e.target.value); };
    const handleSetConfirmPw = (e) => { setConfirmPw(e.target.value); };

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
                            <input value={name} onChange={handleSetName} className="input" placeholder="이름을 입력해주세요"></input>
                        </div>
                    </div>

                    <div className="roleBlock">
                        <div className="inputTitle">유형</div>
                        <div className="roleSelect">
                            <Button text={"선생님"} type={"teacher"} onClick={() => setRole("teacher")} isSelected={role==="teacher"} />
                            <Button text={"학생"} type={"student"} onClick={() => setRole("student")} isSelected={role==="student"} />
                        </div>
                    </div>

                </div>

                <div className="inputTitle id">아이디</div>
                <div className="inputWrap">
                    <input value={id} onChange={handleSetId} className="input" placeholder="아이디를 입력해주세요"></input>
                </div>

                <div className="inputTitle pw">비밀번호</div>
                <div className="inputWrap">
                    <input value={pw} onChange={handleSetPw} className="input" placeholder="비밀번호를 입력해주세요"></input>
                </div>

                <div className="inputTitle pw">비밀번호 확인</div>
                <div className="inputWrap">
                    <input value={confirmPw} onChange={handleSetConfirmPw} className="input" placeholder="비밀번호를 다시 입력해주세요"></input>
                </div>

                {pw && confirmPw && !isMatch && (
                    <div className="errorMessageWrap">
                        비밀번호가 일치하지 않습니다.
                    </div>
                )}


                <div className="btn">
                    <Button text={"회원가입"} disabled={!name || !id || !pw || !confirmPw} />
                </div>

            </div>

        </div>
    );
};

export default SignUp;