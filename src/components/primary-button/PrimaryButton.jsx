const PrimaryButton = ({ text, onClick, disabled }) => {
    return (
        <button
            type="button"
            className={`text-white bg-primary-blue hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between ${disabled ? 'cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default PrimaryButton;
