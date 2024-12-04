import { useRoutes } from 'react-router-dom';

// local imports
import { Home } from './pages';

const Router = () => {
    return useRoutes([
        {
            path: '*',
            element: <Home />
        }
    ]);
};

export default Router;
