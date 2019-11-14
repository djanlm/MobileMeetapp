import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';
import Background from '~/components/Background';

export default function Profile() {
  return (
    <Background>
      <Header />
      <Text>Profile</Text>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'My profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
