import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAppBar from '../AppBar/AppBar';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';

function SharedLayout() {
  return (
    <>
      <HeaderAppBar />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer/>
    </>
  );
}

export default SharedLayout;