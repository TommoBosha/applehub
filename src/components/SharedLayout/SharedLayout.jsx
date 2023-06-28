import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAppBar from '../AppBar/AppBar';
import Loader from '../Loader/Loader';

function SharedLayout() {
  return (
    <>
      <HeaderAppBar />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

export default SharedLayout;