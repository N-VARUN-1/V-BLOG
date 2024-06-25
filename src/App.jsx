import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import { useLocation } from 'react-router-dom';



export default function App() {
  const location = useLocation();
  return (
    <>
      <ThemeProvider>
        <ScrollToTop/>
        <Header  />
        <main>
          {location.pathname === '/' && <Home />}
          <Outlet/>
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}
