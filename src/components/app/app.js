import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import Favicon from 'react-favicon';

// -------------------------------------------------------------------------------------------------
// COMPONENT IMPORTS
// -------------------------------------------------------------------------------------------------
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import AuthRedirect from '../auth-redirect/auth-redirect';
import Header from '../header/header';
import Landing from '../landing/landing';
import Footer from '../footer/footer';
import Preferences from '../preferences/preferences';

import ROUTES from '../../routes';
import '../../style/main.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          {/* <Favicon url={}/> */}
          <Helmet>
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta property="og:title" content="TimeBoxed" />
            <meta property="og:type" content="website" />
            {/* <meta property="og:url" content="" /> */}
            {/* <meta property="og:image" content="../../assets/site-preview.png" /> */}
          </Helmet>
          <Header/>
          <Route path='*' component={AuthRedirect}/>
          <Route exact path={ROUTES.LANDING} component={Landing}/>
          <Route exact path={ROUTES.SETUP} component={Preferences}/>
          <Footer/>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}
