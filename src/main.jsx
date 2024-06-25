import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';


import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Projects from "./pages/Projects.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from './components/PrivateRoute.jsx';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import PostPage from './pages/PostPage.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'dashboard',
        element: [
          <PrivateRoute />,
          <Dashboard />
        ]
      },
      {
        path: 'create-post',
        element: [
          <OnlyAdminPrivateRoute />,
          <CreatePost />
        ] 
      },
      {
        path: 'update-post/:postId',
        element: [
          <OnlyAdminPrivateRoute />,
          <UpdatePost />
        ] 
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'post/:postSlug',
        element: <PostPage />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/search',
        element: <Search />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </Provider>
  </PersistGate>
)
