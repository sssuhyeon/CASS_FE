import Button from "../component/Button";

const SignUp = () => {
    return (
        <div>
            <Button text={"회원가입"}
                onClick={() => {
                    alert("회원가입 완료");

                }} />
            <Button type="teacher" text={"선생님"} />
            <Button type="student" text={"학생"} />
        </div>
    );
};

export default SignUp;