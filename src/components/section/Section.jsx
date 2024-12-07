const Section = ({ title, children, className }) => {
    return (
        <div className={className}>
            <div className="bg-primary-blue h-20 font-semibold text-2xl flex items-center text-white px-5 rounded-t-2xl tracking-wider">
                {title}
            </div>
            <div className="border-2 border-primary-blue rounded-b-2xl p-4">{children}</div>
        </div>
    );
};

export default Section;
