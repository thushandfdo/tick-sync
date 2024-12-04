import { BrowserRouter } from 'react-router-dom';

// local imports
import Router from './routes';

function App() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}

export default App;
