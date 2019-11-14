import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { Container } from './styles';

export default function Subscriptions() {
  return (
    <Background>
      <Header />
      <Container>
        <Meetup
          title="ReactJS Meetup"
          location="306 Broadway Avenue"
          date="24 de Junho"
          hostName="Djanilson"
          buttonText="Cancel subscription"
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
