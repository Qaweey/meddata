import React, { useState } from 'react';
import SideNav from './SideNav';
import Header from './Header';
import View from './View';
import Authorize from './Authorize';
import Uploads from './Uploads';

const Layouts = () => {
  const [toDisplay, setToDisplay] = useState('view');

  return (
    <div>
      <Header />
      <SideNav />
      {/* {toDisplay === 'view' ? (
        <View />
      ) : toDisplay === 'uploads' ? (
        <Uploads />
      ) : (
        <Authorize />
      )} */}
    </div>
  );
};

export default Layouts;
