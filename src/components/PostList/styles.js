import styled, { css } from 'styled-components';

export const Container = styled.ScrollView`
  padding: 14px;
`;

export const Item = styled.View`
  background: #a4508b;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  height: 300px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ItemName = styled.Text`
  font-size: 20px;
  color: #fff;
`;
