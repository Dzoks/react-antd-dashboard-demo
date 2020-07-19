import React, { useState, useEffect } from 'react';
import './App.css';
import {  BasicLayout } from 'react-antd-dashboard';
import ParamDemo from './pages/ParamDemo';
import Users from './pages/Users';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from './logo.svg';
function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading]=useState(true);
  useEffect(() => {
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true")
      setLoggedIn(true);
    setLoading(false);
  }, [])
  // Required parameters are :authenticated, onLogin (if using default login page), user, pages, menuItems
  return <BasicLayout
    loading={loading} // if set true, it will show spinner or custom loading page. Best used when initializing application.
    loadingPage={null} // custom component for loading page, optional
    logo={null} // optional, source or component intended for logo in top left corner when side menu is collapsed
    expandedLogo={null} // optional, source or component intended for logo in top left corner when side menu is expanded
    applicationName={'My example application'} // appplication  name shown on left side of toolbars
    authenticated={loggedIn} // Flag which indicated if user is logged in, if user is not 
    onLogin={({ username, password }) => {
      if (username === 'user' && password === 'password') {
        sessionStorage.setItem("authenticated",true);
        setLoggedIn(true);
      }

    }} // callback that occurs on click of login button on default page
    user={{
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe'
    }} // information about logged in user
    pages={[
      {
        key: 'users', // key is used for routing, you can access this page via route endpoint e.g. (app.com/users)
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
        // first page is automatically loaded and is available via '/' route
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
    loginLogoStyle={null} // optional, style object for login logo, also you can override 'login-logo' class
    loginPage={null} // optional, you can customize login page by creating and supplying custom page component. 
    // BasicLayout will pass to your component loginLogo, loginLogoStyle props and onLogin callbacks
    notFound={null} // optional, custom not found (404) page component
    forbidden={null} // optional, custom forbidden (403) page component
    footer={null} // optional, footer component
    footerStyle={null} // optional, footer container style object, default style is textAlign:center
  />

}

export default App;
