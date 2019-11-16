import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO } from 'date-fns';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { Container, List } from './styles';

export default function Subscriptions() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('subscriptions');

      const pattern = "MMMM dd 'at' HH'h'mm'm'";

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(parseISO(meetup.Meetup.date), pattern),
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);

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
