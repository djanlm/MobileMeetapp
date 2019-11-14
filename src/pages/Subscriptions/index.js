import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

export default function Subscriptions() {
  return (
    <Background>
      <Header />
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
