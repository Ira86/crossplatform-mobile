import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useSelector, useDispatch } from "react-redux";
import { PostList } from "./src/screens/PostList/PostList"
import { PostForm }  from "./src/screens/PostForm/PostForm";
import { UserForm } from "./src/screens/UserForm/UserForm";
import { UserInfo } from "./src/screens/UserInfo/UserInfo";
import { UserList } from "./src/screens/UserList/UserList";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";


const UserListStack = createNativeStackNavigator();

const UserListStackScreen = () => {
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
      <UserListStack.Screen name="UserForm" component={UserForm} />
    </UserListStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const NavigationWrapper = () => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="UserListStack"
          component={UserListStackScreen}
          options={{ headerShown: false }}
        />
       <Tab.Screen name="PostForm" component={PostForm} />
         <Tab.Screen name="UserForm" component={UserForm} />
        {loggedInAs && (
          <Tab.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              title: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
            }}
          />)}
        <Tab.Screen name="PostList" component={PostList} />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <NavigationWrapper />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 36,
  },
  infoContainer: {
    marginBottom: 24,
  },
  actionsContainer: {
    marginBottom: 24,
  },
});