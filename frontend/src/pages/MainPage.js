import React from 'react';
import Layouts from '../components/Layouts';
import View from '../components/View';
import Uploads from '../components/Uploads';
import Authorize from '../components/Authorize';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  let componentToRender;

  // switch (location.pathname) {
  //   case '/component1':
  //     componentToRender = <View />;
  //     break;
  //   case '/component2':
  //     componentToRender = <Uploads />;
  //     break;
  //   case '/component3':
  //     componentToRender = <Authorize />;
  //     break;
  //   default:
  //     componentToRender = <View />;
  // }
  return (
    <div>
      <Layouts />
    </div>
  );
};

export default MainPage;
