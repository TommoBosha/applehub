import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';
import IphonePage from './pages/IphonePage/IphonePage';
import IpadPage from './pages/IpadPage/IpadPage';
import WatchPage from './pages/WatchPage/WatchPage';
import HeadphonePage from './pages/HeadphonePage/HeadphonePage';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { PublicRoute } from './components/routes/PublicRoute';
import AuthModal from './components/Modal/ModalAuth';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="" element={<MainPage />} />
          <Route path="/iphone" element={<IphonePage />} />
          <Route path="/:categoryName" element={<CategoryPage />} />
          <Route path="/ipad" element={<IpadPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/headphones" element={<HeadphonePage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path="" element={<PublicRoute redirectTo="user" restricted />}>
            <Route path="/" element={<AuthModal />} />
          </Route>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
