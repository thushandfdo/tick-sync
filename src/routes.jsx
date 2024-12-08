import { useState } from 'react';
import { useRoutes } from 'react-router-dom';

// local imports
import { Home, CustomerPage, VendorPage } from './pages';

const Router = () => {
    const [isSystemOn, setIsSystemOn] = useState(true);

    return useRoutes([
        {
            path: '*',
            element: <Home isSystemOn={isSystemOn} setIsSystemOn={setIsSystemOn} />
        },
        {
            path: '/customer',
            element: <CustomerPage isOn={isSystemOn} />
        },
        {
            path: '/vendor',
            element: <VendorPage isOn={isSystemOn} />
        },
    ]);
};

export default Router;
