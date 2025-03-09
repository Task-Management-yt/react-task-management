type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    text: string
    className?: string;
    onClick?: () => void;
    // children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, text, onClick, className }) => {
    return (
        <button type={type} className={`my-3 btn btn-primary w-100 ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
