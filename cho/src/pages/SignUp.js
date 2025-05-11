import './SignUp.css';
import Button from "../component/Button";

const SignUp = () => {

    return (
        <div className="page">
            <div className="titleWrap">
                <div className="welcome">
                    환영합니다 !
                </div>
                <div className="signup">
                    Sign up to
                </div>
                <div className='cass'>
                    Code Assistant Support Service
                </div>
            </div>

            <div className="contentWrap">
                <div className="inputTitle">아이디</div>
                <div className="inputWrap">
                    <input className="input" placeholder="아이디를 입력해주세요"></input>
                </div>
                <div className="errorMessageWrap">
                    중복되는 아이디입니다.
                </div>

                <div style={{ marginTop: "20px" }} className="inputTitle">비밀번호</div>
                <div className="inputWrap">
                    <input className="input" placeholder="비밀번호를 입력해주세요"></input>
                </div>

                <div style={{ marginTop: "20px" }} className="inputTitle">비밀번호 확인</div>
                <div className="inputWrap">
                    <input className="input" placeholder="비밀번호를 입력해주세요"></input>
                </div>
                <div className="errorMessageWrap">
                    비밀번호가 일치하지 않습니다.
                </div>
                <div className="bottomBtn">
                    <Button text={"회원가입"} />
                </div>

            </div>

        </div>
    );
};

export default SignUp;

// <div>
//     <Button text={"회원가입"}
//         onClick={() => {
//             alert("회원가입 완료");

//         }} />
//     <Button type="teacher" text={"선생님"} />
//     <Button type="student" text={"학생"} />
// </div>
