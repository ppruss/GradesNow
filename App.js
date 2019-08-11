import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button } from "react-native";

import Login from "./app/pages/Login";
import Home from "./app/pages/Home";

const MainNavigator = createStackNavigator(
  {
    Login: Login,
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Logout",
        headerStyle: {
          backgroundColor: "#333"
        },
        headerTintColor: "#f7c08a"
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(MainNavigator);
