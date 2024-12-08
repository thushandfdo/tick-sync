import { useState } from 'react';

// local imports
import Vendor from './Vendor';
import Customer from './Customer';
import { Label } from '../../components';

const Home = ({ isSystemOn, setIsSystemOn }) => {
    const [selectedRole, setSelectedRole] = useState(0);
    const roles = [
        {
            id: 0,
            name: 'Vendor',
            icon: () => (
                <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
            )
        },
        {
            id: 1,
            name: 'Customer',
            icon: () => (
                <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-5 mt-8">
            <div className="flex gap-2 justify-center items-center m-2">
                <div
                    className={`absolute right-20 flex gap-2 items-center cursor-pointer py-2 px-3 rounded-lg ${isSystemOn ? 'ring-2 ring-primary-blue' : 'ring-2 hover:ring-primary-blue'}`}
                    onClick={() => setIsSystemOn(!isSystemOn)}
                >
                    <svg
                        viewBox="-2 0 19 19"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-8 h-8 ${isSystemOn ? 'fill-primary-blue' : 'fill-gray-400'}`}
                    >
                        <path d="M7.498 17.1a7.128 7.128 0 0 1-.98-.068 7.455 7.455 0 0 1-1.795-.483 7.26 7.26 0 0 1-3.028-2.332A7.188 7.188 0 0 1 .73 12.52a7.304 7.304 0 0 1 .972-7.128 7.221 7.221 0 0 1 1.387-1.385 1.03 1.03 0 0 1 1.247 1.638 5.176 5.176 0 0 0-.993.989 5.313 5.313 0 0 0-.678 1.181 5.23 5.23 0 0 0-.348 1.292 5.22 5.22 0 0 0 .326 2.653 5.139 5.139 0 0 0 .69 1.212 5.205 5.205 0 0 0 .992.996 5.257 5.257 0 0 0 1.178.677 5.37 5.37 0 0 0 1.297.35 5.075 5.075 0 0 0 1.332.008 5.406 5.406 0 0 0 1.32-.343 5.289 5.289 0 0 0 2.211-1.682 5.18 5.18 0 0 0 1.02-2.465 5.2 5.2 0 0 0 .01-1.336 5.315 5.315 0 0 0-.343-1.318 5.195 5.195 0 0 0-.695-1.222 5.134 5.134 0 0 0-.987-.989 1.03 1.03 0 1 1 1.24-1.643 7.186 7.186 0 0 1 1.384 1.386 7.259 7.259 0 0 1 .97 1.706 7.413 7.413 0 0 1 .473 1.827 7.296 7.296 0 0 1-4.522 7.65 7.476 7.476 0 0 1-1.825.471 7.203 7.203 0 0 1-.89.056zM7.5 9.613a1.03 1.03 0 0 1-1.03-1.029V2.522a1.03 1.03 0 0 1 2.06 0v6.062a1.03 1.03 0 0 1-1.03 1.03z" />
                    </svg>
                    <Label className={`font-semibold text-2xl mr-2 cursor-pointer ${isSystemOn ? 'text-primary-blue' : 'text-gray-500'}`}>
                        {isSystemOn ? 'On' : 'Off'}
                    </Label>
                </div>
                <div className="border-b border-blue-200 pl-2">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                        {roles.map((role) => (
                            <li
                                key={role.id}
                                className={`me-2 cursor-pointer inline-flex items-center justify-center p-4 border-b-2 ${
                                    selectedRole === role.id
                                        ? 'border-primary-blue text-primary-blue font-semibold'
                                        : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                                } rounded-t-lg group`}
                                onClick={() => setSelectedRole(role.id)}
                            >
                                <role.icon
                                    className={`${selectedRole === role.id ? 'text-gray-400 group-hover:text-gray-500' : 'text-primary-blue'}`}
                                />
                                <Label className="cursor-pointer">{role.name}</Label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {selectedRole === 0 ? <Vendor isOn={isSystemOn} /> : <Customer isOn={isSystemOn} />}
        </div>
    );
};

export default Home;
