import { BrowserRouter, Route, Routes } from 'react-router';
import PublicRoutes from './routes/PublicRoutes';
import ForbiddenPage from './pages/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<PublicRoutes />} />
        <Route path='/forbidden' element={<ForbiddenPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
