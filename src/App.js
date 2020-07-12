import React, { useState, useEffect } from 'react';
import './App.css';
import { Datatable, BasicLayout } from 'react-antd-dashboard';
import moment from 'moment';
import ParamDemo from './pages/ParamDemo';
import Users from './pages/Users';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from './logo.svg';
function App() {

  const customItems = []
  const pages = [];
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true")
      setLoggedIn(true);
  }, [])
  // Required parameters are :authenticated, onLogin (if using default login page), user, pages, menuItems
  return <BasicLayout
    applicationName={'My example application'} // appplication  name shown on left side of toolbars
    authenticated={loggedIn} // Flag which indicated if user is logged in, if user is not 
    onLogin={({ username, password }) => {
      if (username === 'user' && password === 'password') {
        sessionStorage.setItem("authenticated",true);
        setLoggedIn(true);
      }

    }} // function that occurs on click of login button on default page
    user={{
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe'
    }} // information about logged user
    pages={[
      {
        key: 'users', // key is used for routing, you can access this page with routing e.g. (app.com/users)
        component: Users
      },
      {
        key: 'paramDemo',
        hasParam: true, // optional, if true, route has one param e.g. (app.com/user/3)
        component: ParamDemo,
      }
    ]} // array which contains all available pages in app, all pages are accessible via route endpoints
    menuItems={[
      {
        // first page is automatically loaded and is available via / route
        key: 'users', // key must match key atrribute of page item
        value: 'Home',
        icon: <HomeOutlined />,
        // rules: {}  optional, used for component view management with <View> component
      }
    ]} // array which contains all visible pages in side menu
    otherItems={[
      {
        key: 'paramDemo', // key must match key atrribute of page item
        rules: {} // optional, used for component view management with <View> component
      }
    ]} // array which contains all pages that are not visible in side menu but are available for logged user
    dropdownItems={[
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        value: 'Logout',
        callback: () => {
          setLoggedIn(false);
          sessionStorage.setItem("authenticated", false);
        }
      }
    ]} // menu items for dropdown menu beneath user information

    loginLogo={logo} // optional, source for picture on default login page
  />

}

export default App;
