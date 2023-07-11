import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';
import IphonePage from './pages/IphonePage/IphonePage';
import IpadPage from './pages/IpadPage/IpadPage';
import WatchPage from './pages/WatchPage/WatchPage';
import HeadphonePage from './pages/HeadphonePage/HeadphonePage';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { PrivateRoute } from './components/routes/PrivateRoute';



function App() {

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="/iphone" element={<IphonePage />} />
        <Route path="/ipad" element={<IpadPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/headphones" element={<HeadphonePage />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/user" element={<UserPage />} />

        </Route>
      </Route>
    </Routes>

  );
}

export default App;
