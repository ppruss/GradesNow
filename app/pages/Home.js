import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Grades from "./Home/Grades";
import Statistics from "./Home/Statistics";
import AddGrades from "./Home/AddGrades";

const TabNavigator = createBottomTabNavigator(
  {
    Grades: Grades,
    Statistics: Statistics,
    "Add Grades": AddGrades
  },
  {
    tabBarOptions: {
      inactiveBackgroundColor: "#222",
      activeBackgroundColor: "#333",
      activeTintColor: "#f7c08a",
      labelStyle: {
        fontSize: 20
      }
    }
  }
);

export default createAppContainer(TabNavigator);
