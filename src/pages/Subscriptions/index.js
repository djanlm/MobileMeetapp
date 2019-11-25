import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { Container, List } from './styles';

export default function Subscriptions() {
  // const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetup.meetups);

  console.tron.log(meetups);
  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.Meetup.id)}
          renderItem={({ item }) => (
            <Meetup
              title={item.Meetup.title}
              location={item.Meetup.location}
              date={item.formattedDate}
              hostName={item.Meetup.user.name}
              buttonText="Cancel subscription"
              imageURL={item.Meetup.banner.url}
              subscriptionID={item.id}
            />
          )}
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
