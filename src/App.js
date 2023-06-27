import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';
import IphonePage from './pages/IphonePage/IphonePage';
import IpadPage from './pages/IpadPage/IpadPage';
import WatchPage from './pages/WatchPage/WatchPage';
import HeadphonePage from './pages/HeadphonePage/HeadphonePage';
import Modal from './components/Modal/Modal';
import { useSelector } from 'react-redux';
import { getAccessToken } from './redux/auth/authSelectors';


function App() {
  const accessToken = useSelector(getAccessToken);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/iphone" element={<IphonePage />} />
      <Route path="/ipad" element={<IpadPage />} />
      <Route path="/watch" element={<WatchPage />} />
      <Route path="/headphones" element={<HeadphonePage />} />
      {accessToken ? (
        <Route path="/user" element={<UserPage />} />
      ) : (
        <Route path="/user" element={<Modal />} />
      )}

    </Routes>
  );
}

export default App;
