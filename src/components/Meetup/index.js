import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Picture,
  MeetupInfo,
  MeetupTitle,
  MeetupDate,
  MeetupLocation,
  MeetupHost,
  MeetupButton,
} from './styles';

export default function Meetup({
  title,
  date,
  location,
  hostName,
  buttonText,
}) {
  return (
    <Container>
      <Picture
        source={{
          uri:
            'https://facilityexecutive.com/wp-content/uploads/2019/08/Varidesk_FullOffice_600x315_3.jpg',
        }}
      />
      <MeetupInfo>
        <MeetupTitle>{title}</MeetupTitle>

        <MeetupDate>
          <Icon name="person" size={15} color="rgba(0,0,0,0.4)" /> {date}
        </MeetupDate>
        <MeetupLocation>
          <Icon name="person" size={15} color="rgba(0,0,0,0.4)" /> {location}
        </MeetupLocation>
        <MeetupHost>
          <Icon name="person" size={15} color="rgba(0,0,0,0.4)" /> Organizador:
          {hostName}
        </MeetupHost>
        <MeetupButton>{buttonText}</MeetupButton>
      </MeetupInfo>
    </Container>
  );
}
