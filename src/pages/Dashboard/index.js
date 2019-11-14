import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
// import { Container } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Header />
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
