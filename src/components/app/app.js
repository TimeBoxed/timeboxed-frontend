import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Favicon from 'react-favicon';

// ===============================
// ===== MATERIAL UI IMPORTS =====
// ===============================
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import deepOrange from '@material-ui/core/colors/deepOrange';


// ===============================
// ====== COMPONENT IMPORTS ======
// ===============================
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import AuthRedirect from '../auth-redirect/auth-redirect';
import MenuAppBar from '../material-ui/menu-app-bar';
import Dashboard from '../dashboard/dashboard';
import Landing from '../landing/landing';
import Preferences from '../preferences/preferences';
import PrivacyDialog from '../material-ui/privacy-dialog';
import PrivacyRejectionAlert from '../material-ui/privacy-rejection-alert';
import NotFound from '../not-found/not-found';

// ===============================
// ======== OTHER IMPORTS ========
// ===============================
import favicon from '../../assets/logo/tb-favicon.png';
import ROUTES from '../../routes';
import '../../style/main.scss';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop>
            <Favicon url={favicon}/>
            <Helmet>
              <meta name='viewport' content='width=device-width, initial-scale=1.0' />
              <meta property="og:title" content="TimeBoxed" />
              <meta property="og:type" content="website" />
              {/* <meta property="og:url" content="" /> */}
              {/* <meta property="og:image" content="../../assets/site-preview.png" /> */}
            </Helmet>
            <MenuAppBar/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path={ROUTES.LANDING} component={Landing}/>
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard}/>
            <Route exact path={ROUTES.PRIVACY} component={PrivacyDialog}/>
            <Route exact path={ROUTES.PRIVACY_REJECTED} component={PrivacyRejectionAlert}/>
            <Route exact path={ROUTES.NOT_FOUND} component={NotFound}/>
            <Route exact path={ROUTES.PREFERENCES} component={Preferences}/>
          </ScrollToTop>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
