
import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  Pressable,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { useToast } from "react-native-toast-notifications";

import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../store/api/usersApi";

export const UserForm = ({ route, navigation }) => {
  const lastNameRef = useRef(null);
  const toast = useToast();

  const user = route?.params?.user || {};
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");

  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  const handleSubmit = () => {
    if (firstName === "" || lastName === "") {
      console.log("Invalid form!");
      toast.show("Please fill out all inputs", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }

    if (user.id) {
      updateUser({
        user: { id: user.id, firstName: firstName, lastName: lastName },
      })
        .then(() => {
          navigation.navigate("UserList");
          toast.show(`User ${firstName} ${lastName} has been updated!`, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    } else {
      createUser({
        user: {
          firstName,
          lastName,
        },
      })
        .then(() => {
          navigation.navigate("UserList");
          toast.show(`User ${firstName} ${lastName} has been created!`, {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
          setFirstName("");
          setLastName("");
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text>Create/Edit your user</Text>
          <Input
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            value={firstName}
            disabled={isCreatingUser || isUpdatingUser}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First name"
          />
          <Input
            ref={lastNameRef}
            value={lastName}
            disabled={isCreatingUser || isUpdatingUser}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
          />
          <View style={styles.buttonContainer}>
            <Button
              title={user.id ? "Update user" : "Create user"}
              disabled={isCreatingUser || isUpdatingUser}
              loading={isCreatingUser || isUpdatingUser}
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#CF9FFF",
    margin: 36,
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 16,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 16,
    alignItems: "center",
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
