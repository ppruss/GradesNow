import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "./app/pages/Login";
import Home from "./app/pages/Home";

const MainNavigator = createStackNavigator(
  {
    Login: Login,
    Home: Home
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(MainNavigator);
