const TextBox = ({ id, name, value, onChange, placeholder }) => {
    return (
        <input
            id={id}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border-2 border-gray-400 p-1 rounded-lg focus:border-blue-500 focus:outline-none"
        />
    );
};

export default TextBox;
