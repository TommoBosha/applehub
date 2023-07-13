import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import HeaderAppBar from "../AppBar/AppBar";
import Loader from "../Loader/Loader";
import Footer from "../Footer/Footer";
import { Container } from "@mui/system";

function SharedLayout() {
  return (
    <>
      <HeaderAppBar />
      <main>
        <Suspense fallback={<Loader />}>
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default SharedLayout;
