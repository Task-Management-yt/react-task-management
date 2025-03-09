interface InputFieldProps {
    label: string;
    type: string;
    name?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, placeholder, value, onChange }) => {
    return (
        <div className="mt-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                name={name}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;
