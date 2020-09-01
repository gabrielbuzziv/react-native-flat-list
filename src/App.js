import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';

import { Container, ItemsList, Title, Loading } from './styles';

import api from './services/api';

import PostsList from './components/PostList';
import UserList from './components/UserList';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const loadPosts = useCallback(
    async (paginating = false) => {
      try {
        setLoadingPost(true);
        const response = await api.get(`/users`, {
          params: { per_page: 3, page },
        });

        // setPosts(response.data.data);
        if (paginating) {
          setPosts((prev) => [...prev, ...response.data.data]);
        } else {
          setPosts(response.data.data);
        }
      } finally {
        setLoadingPost(false);
        setPaginating(false);
      }
    },
    [page]
  );

  const loadUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const response = await api.get(`/users`);

      setUsers(response.data.data);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    loadPosts();
  }, []);

  // const handlePaginate = useCallback(
  //   () => !!posts.length && setPage(page + 1),
  //   [posts, page]
  // );

  // useEffect(() => {
  //   if (!!posts.length) {
  //     setPaginating(true);
  //     loadPosts(true);
  //   }
  // }, [posts, page]);

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  const { data, indices } = useMemo(() => {
    const items = [
      {
        key: 'org-title',
        render: () => <Title>Organizações</Title>,
        isTitle: true,
      },
      {
        key: 'org-list',
        render: () => <UserList data={users} loading={loadingUsers} />,
      },
      {
        key: 'Post-title',
        render: () => <Title>Postsitórios</Title>,
        isTitle: true,
      },
      {
        key: 'Post-list',
        render: () => <PostsList data={posts} loading={loadingPost} />,
      },
    ];

    const indices = [];
    items.forEach((item, index) => item.isTitle && indices.push(index));

    return { data: items, indices };
  }, [posts, users, loadingUsers, loadingPost, page]);

  return (
    <Container>
      <ItemsList
        data={data}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => item.render()}
        stickyHeaderIndices={indices}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} title="Recarregando" titleColor="#EABFCB" tintColor="#EABFCB" />
        }
        // onEndReached={() => handlePaginate()}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={() =>
        //   paginating && <ActivityIndicator size="large" color="#EABFCB" />
        // }
      />
    </Container>
  );
};

export default App;
