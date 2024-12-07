import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ items, text, name }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [selectedItem, setSelectedItem] = useState(text);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsClicked(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                name={name}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none min-w-32 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                onClick={() => setIsClicked(!isClicked)}
            >
                {selectedItem}
                <div className={`${isClicked ? 'rotate-180' : ''} ms-3`}>
                    <svg
                        className="w-2.5 h-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </div>
            </button>

            <div
                className={`absolute mt-2 z-10 bg-gray-100 divide-y rounded-lg shadow min-w-44 ${isClicked ? 'block' : 'hidden'}`}
            >
                <ul className="py-2 text-sm text-gray-700">
                    {items &&
                        items.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setIsClicked(false);
                                }}
                                className={`block px-4 py-2 hover:bg-gray-200 hover:font-semibold cursor-pointer ${item === selectedItem ? 'bg-gray-200 font-semibold' : ''}`}
                            >
                                {item}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
