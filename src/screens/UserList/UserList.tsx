import React, { useCallback } from "react";
import { ListItem } from "@rneui/base";
import { View, Text, FlatList } from "react-native";
import { Button } from "@rneui/themed";
import { useDeleteUserMutation, useGetUsersQuery } from "../../store/api/usersApi";



export const UserList = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const deleteUserFunc = (id) => {
    deleteUser(id);
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              onPress={() => navigation.navigate("UserInfo", { user: item })}
            >
              <ListItem.Content>
                <ListItem.Title>
                  {`${item.firstName} ${item.lastName}`}
                </ListItem.Title>
                <View style={{ flexDirection: "row" }}>
                  <Button
                    onPress={() => navigation.navigate('UserForm', { user: item })}
                    title="Edit"
                    color="pink"
                  />
                  <Button
                    onPress={() => deleteUserFunc(item.id)}
                    title="Delete"
                    color="red"
                  />
                </View>
              </ListItem.Content>
            </ListItem>
          )}
        />
      )}
    </View>
  );
};
export default UserList;
