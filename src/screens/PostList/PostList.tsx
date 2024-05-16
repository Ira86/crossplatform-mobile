import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useGetPostsQuery } from '../../store/api/postsApi';

export const PostList = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetPostsQuery({});

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Post: {item.text}</ListItem.Title>
                <View style={{ flexDirection: "row" }}>
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

export default PostList;