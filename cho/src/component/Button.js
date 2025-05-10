import "./Button.css";

const Button = ({ text, type, onClick }) => {
    const btnType = ["teacher", "student"].includes(type) ? type : "default";
    return (
        <button className={["Button", `Button_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;