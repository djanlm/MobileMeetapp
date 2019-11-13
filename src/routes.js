// import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default createAppContainer(
  createSwitchNavigator({
    Signin,
    Signup,
  })
);
