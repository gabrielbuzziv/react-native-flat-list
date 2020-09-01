import React, { useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';

import { Container, Item, ItemName } from './styles';

const RepoList = ({ data, loading }) => {
  return (
    <Container
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {loading && <ActivityIndicator size="small" color="#fff" />}

      {data.map((item) => (
        <Item key={String('user' + item.id)}>
          <ItemName>{item.first_name}</ItemName>
        </Item>
      ))}
    </Container>
  );
};

export default RepoList;
