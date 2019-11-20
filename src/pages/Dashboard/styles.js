import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  margin-bottom: 90px;
`;

export const DatePicker = styled.View`
  padding: 30px 0 0 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateDashboard = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 20;
  color: #eee;
  margin: 0 10px 0 10px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
