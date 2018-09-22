import React from 'react';
import PropTypes from 'prop-types';

import MenuAppBar from '../material-ui/menu-app-bar';

const AppPage = (props) => {
  return (
    <React.Fragment>
      <MenuAppBar/>
      {
        props.children
      }
    </React.Fragment>
  );
};

AppPage.propTypes = {
  children: PropTypes.array,
};

export default AppPage;
