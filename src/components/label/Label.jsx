const Label = ({ children, forId, className, variant }) => {
    const getVariant = () => {
        const heading = ' block font-bold mb-4';

        switch (variant) {
            case 'h1':
                return 'text-4xl' + heading;
            case 'h2':
                return 'text-3xl' + heading;
            case 'h3':
                return 'text-2xl' + heading;
            case 'h4':
                return 'text-xl' + heading;
            case 'h5':
                return 'text-lg' + heading;
            case 'h6':
                return 'text-base' + heading;
            case 'error':
                return 'text-red-600 text-sm';
            case 'success':
                return 'text-green-600 text-sm';
            case 'warning':
                return 'text-yellow-600 text-sm';
            default:
                return 'text-base';
        }
    };

    return (
        <label htmlFor={forId} className={`${className} ${getVariant()}`}>
            {children}
        </label>
    );
};

export default Label;
