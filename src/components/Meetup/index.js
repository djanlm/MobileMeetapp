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
  imageURL,
}) {
  // because the image address comes with localhost, http://localhost:3332/files/e928783c449ea297d18b5651db6c4eae.jpg, it needs to be replaced by the address our emulator uses
  function formatImageURL(url) {
    const urlSplitted = url.split(''); // turns string into an array so that we can use the splice method
    urlSplitted.splice(
      7,
      9,
      ['1'],
      ['0'],
      ['.'],
      ['0'],
      ['.'],
      ['2'],
      ['.'],
      ['2']
    );
    return urlSplitted.join('');
  }

  return (
    <Container>
      <Picture
        source={{
          uri: imageURL
            ? formatImageURL(imageURL)
            : `https://fakeimg.pl/350x200/?text=NoImage`, // in case there's no banner image, this webpage creates a fake image
        }}
      />
      <MeetupInfo>
        <MeetupTitle>{title}</MeetupTitle>

        <MeetupDate>
          <Icon name="date-range" size={15} color="rgba(0,0,0,0.4)" /> {date}
        </MeetupDate>
        <MeetupLocation>
          <Icon name="room" size={15} color="rgba(0,0,0,0.4)" /> {location}
        </MeetupLocation>
        <MeetupHost>
          <Icon name="person" size={15} color="rgba(0,0,0,0.4)" /> Host:{' '}
          {hostName}
        </MeetupHost>
        <MeetupButton>{buttonText}</MeetupButton>
      </MeetupInfo>
    </Container>
  );
}
