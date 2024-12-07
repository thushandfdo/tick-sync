import { useRoutes } from 'react-router-dom';

// local imports
import { Home, Vendor } from './pages';

const Router = () => {
    return useRoutes([
        {
            path: '*',
            element: <Vendor />
        }
    ]);
};

export default Router;
