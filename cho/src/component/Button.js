import "./Button.css";

const Button = ({ text, type, onClick, disabled }) => {
    const btnType = ["teacher", "student"].includes(type) ? type : "default";
    const classNames = [
        "Button",
        `Button_${btnType}`,
        disabled ? "Button_disabled" : ""
    ].join(" ");
    return (
        
        <button className={classNames} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;