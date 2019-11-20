import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, subDays, addDays } from 'date-fns';

import api from '~/services/api';
import Meetup from '~/components/Meetup';
import Background from '~/components/Background';
import Header from '~/components/Header';
import { Container, DatePicker, DateDashboard, List } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [dashboardDate, setDashboardDate] = useState(new Date());
  const [dashboardDateString, setDashboardDateString] = useState(
    format(new Date(), 'MMMM dd')
  );

  useEffect(() => {
    async function loadMeetups() {
      const today = new Date();

      const response = await api.get(
        `meetups?date=${today.getFullYear()}-${today.getMonth() +
          1}-${today.getDate()}&page=1`
      ); // meetups?date=2019-10-10&page=1

      const pattern = "MMMM dd 'at' HH'h'mm'm'";

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(parseISO(meetup.date), pattern),
        };
      });

      setMeetups(data);
      console.tron.log(format(new Date(), 'MMMM dd'));
      // setDashboardDateString(format(dashboardDate, 'MMMM dd'));
    }

    loadMeetups();
  }, []);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get(
        `meetups?date=${dashboardDate.getFullYear()}-${dashboardDate.getMonth() +
          1}-${dashboardDate.getDate()}&page=1`
      ); // meetups?date=2019-10-10&page=1

      const pattern = "MMMM dd 'at' HH'h'mm'm'";

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(parseISO(meetup.date), pattern),
        };
      });
      setMeetups(data);
    }

    loadMeetups();
    setDashboardDateString(format(dashboardDate, 'MMMM dd'));
  }, [dashboardDate]);

  function decreaseDays() {
    setDashboardDate(subDays(dashboardDate, 1));
  }
  function increaseDays() {
    setDashboardDate(addDays(dashboardDate, 1));
  }

  return (
    <Background>
      <Header />
      <DatePicker>
        <Icon
          name="keyboard-arrow-left"
          size={30}
          color="#fff"
          onPress={decreaseDays}
        />
        <DateDashboard>{dashboardDateString}</DateDashboard>
        <Icon
          name="keyboard-arrow-right"
          size={30}
          color="#fff"
          onPress={increaseDays}
        />
      </DatePicker>
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              title={item.title}
              location={item.location}
              date={item.formattedDate}
              hostName={item.user.name}
              buttonText="Subscribe"
              imageURL={item.banner.url}
              meetupID={item.id}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
