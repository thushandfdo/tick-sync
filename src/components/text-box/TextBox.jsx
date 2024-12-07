import Label from "../label/Label";

const TextBox = ({ id, name, value, onChange, placeholder, register, errors }) => {
    return (
        <div className="inline">
            <input
                id={id}
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border-2 border-gray-400 p-1 rounded-lg focus:border-blue-500 focus:outline-none"
                {...(register ? register(name) : {})}
            />
            {errors?.[name] && <Label variant="error" className="ml-3">{errors?.[name]?.message}</Label>}
        </div>
    );
};

export default TextBox;
