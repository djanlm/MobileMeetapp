import styled from 'styled-components/native';
import { Image } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 4px;
`;

export const Picture = styled(Image)`
  height: 150px;
  border-radius: 4px;
`;
export const MeetupInfo = styled.View`
  padding: 25px;
`;

export const MeetupTitle = styled.Text`
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #222222;
`;
export const MeetupDate = styled.Text`
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #999999;
`;
export const MeetupLocation = styled.Text`
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #999999;
`;
export const MeetupHost = styled.Text`
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #999999;
`;

export const MeetupButton = styled(Button)`
  margin-top: 15px;
`;
