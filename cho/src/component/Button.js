import "./Button.css";

const Button = ({ text, type, onClick, disabled, isSelected }) => {
    const btnType = ["teacher", "student"].includes(type) ? type : "default";
    const classNames = [
        "Button",
        `Button_${btnType}`,
        disabled ? "Button_disabled" : "",
        isSelected ? "Button_selected" : ""
    ].join(" ");
    return (
        
        <button className={classNames} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;