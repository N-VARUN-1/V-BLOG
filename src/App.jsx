import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';




export default function App() {
  return (
    <>
      <ThemeProvider>
        <ScrollToTop/>
        <Header  />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  )
}
