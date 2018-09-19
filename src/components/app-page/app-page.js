import React from 'react';
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

export default AppPage;
